//Autor: Stefan Rautner
//Prompt des WebApp-Downloads
let installPrompt = null;

//Interval zum Erhalten der Nachrichten
let chatUpdateIntervall = null;

document.addEventListener('DOMContentLoaded', async (event) => {
    await getChatNames(event);
})

//Chatnamen erhalten
async function getChatNames(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/getChatNames`, {
            methode: 'POST', body: JSON.stringify({
                'userID': localStorage.getItem('userID')
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
            listElement.Text = chatName.chatName;
            listElement.id = chatName.chatID;
            listElement.onclick = function () {
                localStorage.setItem('chatID', this.id);
                chatUpdateIntervall = setInterval(async function () {
                    await getChatNames(event);
                    await getData(event);
                }, 50);
            };
            listElement.ondblclick = function () {
                addEditDeleteChat();
            };
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
        const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/getMessages`, {
            methode: 'POST', body: JSON.stringify({
                'userID': localStorage.getItem('userID'),
                'chatID': localStorage.getItem('chatID')
            })
        });
        const data = await response.json;

        //Listenelement erhalten
        const list = document.getElementById("messagesOfChat");

        //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
        data.forEach(function (element) {
            const listElement = document.createElement("li");
            listElement.Text = element.message;
            listElement.id = element.messageID;
            listElement.onclick = function () {
                localStorage.setItem('messageID', this.id);
            };
            listElement.ondblclick = function () {
                editDeleteMessage();
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
        const messageText = document.getElementById("user-input").value;
        event.preventDefault();
        if(messageText !== null && messageText !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/newMessage`, {
                method: 'POST', body: JSON.stringify({
                    'userID': localStorage.getItem('userID'),
                    'chatID': localStorage.getItem('chatID'),
                    'message': messageText
                })
            });

            document.getElementById("user-input").value = "";

            if (!await response.text()) {
                alert("Nachricht konnte nicht hinzugefügt werden");
            }
        } else {
            alert("Bitte geben Sie eine Nachricht ein");
        }
    } catch (error) {
        console.error(error);
    }
}

function editDeleteMessage() {
    if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "" && localStorage.getItem('messageID') != null && localStorage.getItem('messageID') !== "") {
        window.location.href = '../message/message.html' + localStorage.getItem('urlParameter');
    } else {
        alert("Bitte wählen Sie eine Nachricht aus");
    }
}

function addEditDeleteChat() {
    window.location.href = '../chat/chat.html' + localStorage.getItem('urlParameter');
}

// Funktion um das Install-Prompt aufzurufen
async function downloadWebApp() {
    if (installPrompt) {
        // Install-Prompt anzeigen
        installPrompt.prompt();

        // Benutzereingabe auf das Install-Prompt abfragen
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log("WebApp downloaded");
            } else {
                console.log("WebApp not downloaded");
            }
            // Install-Prompt variable resetten (kann nur einmal verwendet werden)
            installPrompt = null;
        });
    }
}

// Eventlistener zum Abfangen des "beforeinstallprompt"s
window.addEventListener('beforeinstallprompt', (event) => {
    // Standard Install-Prompt abfangen & verhindern
    event.preventDefault();

    // Install-Prompt auf die Variable zuweisen
    installPrompt = event;

    // Install-Button anzeigen
    document.getElementById('download-button').style.visibility = 'visible';
});

//Variablen aus dem LocalStorage löschen
window.addEventListener('beforeunload', (event) => {
    localStorage.removeItem('userID');
    localStorage.removeItem('chatID');
    localStorage.removeItem('messageID');
    localStorage.removeItem('urlParameter');
});
