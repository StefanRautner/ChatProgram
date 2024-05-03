//Autor: Stefan Rautner
//Prompt des WebApp-Downloads
let installPrompt = null;

//Variable setzen
let chatID = "";
let messageID = "";

//Interval zum Erhalten der Nachrichten
let chatUpdateIntervall = null;

//Chatnamen erhalten
document.onload = async function getChatNames(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${window.urlToSpringBoot}/getChatNames`, {
            methode: 'GET',
            body: JSON.stringify({
                'userID': window.userID
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
                chatID = this.id;
                chatUpdateIntervall = setInterval(function () {
                    getData(event);
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
        const response = await fetch(`${window.urlToSpringBoot}/getMessages`, {
            methode: 'GET',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': chatID
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
                messageID = this.id;
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
        event.preventDefault();
        const response = await fetch(`${window.urlToSpringBoot}/newMessage`, {
            method: 'POST',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': chatID,
                'message': document.getElementById("user-input").value
            })
        });

        document.getElementById("user-input").value = "";

        if (!await response.text()) {
            alert("Nachricht konnte nicht hinzugefügt werden");
        }
    } catch (error) {
        console.error(error);
    }
}

function editDeleteMessage() {
    if (chatID !== null && chatID !== "" && messageID != null && messageID !== "") {
        window.location.href = '../message/message.html' + window.urlParameter;
    } else {
        alert("Bitte wählen Sie eine Nachricht aus");
    }
}

function addEditDeleteChat() {
    window.location.href = '../chat/chat.html' + window.urlParameter;
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

//Variablen für andere Skripte verfügbar machen
window.chatID = chatID;
window.messageID = messageID;