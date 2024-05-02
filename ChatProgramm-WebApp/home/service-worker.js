/* Autor: Stefan Rautner */

// Definition Cache-Version
let cacheVersion = 'my-cache';

// Überprüfen ob service-worker schon einmal gefetched wurde
let checkedForUpdatesAtOpening = false;

// Definition Versions-Dokumente
const versionDocuments = [
    /*Icons*/
    '../icon/icon.ico',
    '../icon/replacement_icon.png',
    /*Home*/
    '../home/home.html',
    '../home/style.css',
    '../home/script.js',
    /*Login/Register/PasswordForgotten*/
    '../login/login.html',
    '../login/style.css',
    '../login/script.js',
    /*Edit/Delete Message*/
    '../message/message.html',
    '../message/style.css',
    '../message/script.js',
    /*Add/Edit/Delete Chat*/
    '../chat/chat.html',
    '../chat/style.css',
    '../chat/script.js',
    /*WebApp*/
    'manifest.json',
    'service-worker.js'
];

// Hinzufügen der Ressourcen zum Cache in Chargen
const addToCacheInBatches = async () => {
    const batchSize = 10;       //Anzahl der Dateien pro Batch
    const batches = Math.ceil(versionDocuments.length / batchSize);

    for (let i = 0; i < batches; i++) {
        const batch = versionDocuments.slice(i * batchSize, (i + 1) * batchSize);
        try {
            const cache = await caches.open(cacheVersion);
            await cache.addAll(batch);
            console.log(`Added batch ${i + 1}/${batches} to Cache`);
        } catch (error) {
            console.error(`Error while adding batch ${i + 1}/${batches} to Cache: ${error}`);
        }
    }
};

// Service Worker installieren
self.addEventListener('install', (event) => {
    event.waitUntil(addToCacheInBatches());
    console.log("Service Worker installed");
});

// Service Worker aktivieren und alte Caches entfernen
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((existingCacheName) => {
                    if (existingCacheName !== cacheVersion) {
                        console.log("Newer version detected");
                        return caches.delete(existingCacheName);
                    }
                })
            );
        })
    );
    console.log("Service Worker activated");
});

// Beim Öffnen der App auf Updates prüfen
self.addEventListener('fetch', (event) => {
    if (!checkedForUpdatesAtOpening && event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                try {
                    await checkForUpdates();
                    console.log("Checked for Updates");
                    checkedForUpdatesAtOpening = true;
                } catch (error) {
                    console.error(`Error while checking for Updates: ${error}`);
                }
                return response;
            }).catch(() => {
                console.error("Failed to check for Updates, using existing version from cache");
                return caches.match(event.request);
            })
        );
    }
});

// Regelmäßiges Überprüfen auf Updates
setInterval(async () => {
    try {
        await checkForUpdates();
        console.log("Check for Updates (once every 24 hours)");
    } catch (error) {
        console.error(`Error while checking for updates: ${error}`);
    }
}, 24 * 60 * 60 * 1000);   // Alle 24 Stunden

// Überprüfen auf Updates (durch Vergleich der Versionsnummer)
async function checkForUpdates() {
    try {
        console.log("Checking for Updates");
        const versions = await Promise.all(
            versionDocuments.map((document) => fetch(document)
                .then((response) => response.text())
            )
        );
        const newerVersion = versions.some((latestVersion) => latestVersion !== cacheVersion);

        if (newerVersion) {
            console.log("Update found");
            cacheVersion = 'my-cache-' + Date.now();
            console.log("Updating cache");
            await addToCacheInBatches(); // Hinzufügen der Ressourcen in Chargen aktualisieren
            console.log("Cache updated");

            const clients = await self.clients.matchAll({type: 'window'});
            if (clients && clients.length > 0) {
                await Promise.all(clients.map(async (client) => {
                    await client.navigate(client.url);
                    console.log("Window updated to newer Version");
                }));
            } else {
                console.log("No clients found");
            }
        } else {
            console.log("No Updates found\nCache is up to date");
        }
    } catch (error) {
        console.error(`Error while checking for updates: ${error}`);
    }
}
