//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Prompt des WebApp-Downloads
let installPrompt = null;

//Variable setzen
let chatID;
let messageID;

//Interval zum Erhalten der Nachrichten
let chatUpdateIntervall = null;

//Chatnamen erhalten
document.onload = async function getChatNames(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/getChatNames`, {
            methode: 'GET',
            body: JSON.stringify({
                'userID': userID
            })
        });
        const data = await response.json;

        //Listenelement erhalten
        const list = document.getElementById("namesOfChats");

        //Chat nicht mehr updaten, wenn anderer Chat ausgewählt wurde
        list.onselectionchange = function () {
            clearInterval(chatUpdateIntervall);
        }

        //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
        data.forEach(function (chatName) {
            const listElement = document.createElement("li");
            listElement.Text = chatName.name;
            listElement.id = chatName.chatID;
            listElement.onclick = function () {
                chatID = this.id;
                chatUpdateIntervall = setInterval(function () {
                    getData(event);
                }, 50);
            }
            list.appendChild(listElement);
        });
    } catch (error) {
        console.error(error);
    }
}

//Nachrichten erhalten
async function getData(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/getMessages`, {
            methode: 'GET',
            body: JSON.stringify({
                'userID': userID,
                'chatID': chatID
            })
        });
        const data = await response.json;

        //Listenelement erhalten
        const list = document.getElementById("messagesOfChat");

        //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
        data.forEach(function (element) {
            const listElement = document.createElement("li");
            listElement.Text = element.messageText;
            listElement.id = element.messageID;
            listElement.onclick = function () {
                messageID = this.id;
            };
            list.appendChild(listElement);
        });
    } catch (error) {
        console.error(error);
    }
}

//Nachricht hinzufügen
async function sendData(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/newMessage`, {
            method: 'POST',
            body: JSON.stringify({
                'userID': userID,
                'chatID': chatID,
                'message': document.getElementById("user-input").value
            })
        });
    } catch (error) {
        console.error(error);
    }
}

function editDeleteMessage() {
    window.location.href = '../message/message.html';
}

function addEditDeleteChat() {
    window.location.href = '../chat/chat.html';
}

// Function um das Install-Prompt aufzurufen
async function downloadWebApp() {
    if (installPrompt) {
        // Show the install prompt
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the installation prompt');
            } else {
                console.log('User dismissed the installation prompt');
            }
            // Reset the deferredPrompt variable, as it can only be used once
            installPrompt = null;
        });
    }
}

// Eventlistener zum Abfangen des "beforeinstallprompt"s
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser install prompt
    event.preventDefault();

    // Store the event object for later use
    installPrompt = event;

    // Show the install button
    document.getElementById('download-button').style.visibility = 'visible';
});

//Wartezeit für Download-Button
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


//Variablen für andere Skripte verfügbar machen
window.chatID = chatID;
window.messageID = messageID;