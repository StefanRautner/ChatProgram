//Autor: Stefan Rautner
//Prompt des WebApp-Downloads
let installPrompt = null;

//Ausgewählter Chat & Nachricht für Classlist
let selectedChat = "";
let selectedMessage = "";

localStorage.removeItem('chatID');      //DEBUG
localStorage.removeItem('messageID');   //DEBUG

document.addEventListener('DOMContentLoaded', async (event) => {
    //Interval zum Erhalten der Nachrichten
    setInterval(async function () {
        await getChatNames(event);
        if(localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
            await getData(event);
        }
    }, 50);
})

//Chatnamen erhalten
async function getChatNames(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/getChatNames`, {
            method: 'POST',
            body: JSON.stringify({
                'userID': localStorage.getItem('userID')
            })
        });
        const data = await response.json();

        //Listenelement erhalten
        const list = document.getElementById("namesOfChats");
        list.innerHTML = "";

        //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
        for (const chatName of data) {
            const listElement = document.createElement("li");
            listElement.textContent = chatName.chatName;
            listElement.id = chatName.chatID;
            listElement.onclick = async function () {
                selectedChat = this.id;
                listElement.classList.add("selected-chat");
                listElement.classList.remove("unselected-chat");
                localStorage.setItem('chatID', selectedChat);
                localStorage.setItem('messageID', null);
                selectedMessage = "";
            };
            listElement.ondblclick = async function () {
                await addEditDeleteChat();
            };
            if(listElement.id === selectedChat) {
                listElement.classList.add("selected-chat");
                listElement.classList.remove("unselected-chat");
            } else {
                listElement.classList.remove("selected-chat");
                listElement.classList.add("unselected-chat");
            }
            list.appendChild(listElement);
        }
    } catch (error) {
        console.error(error);
    }
}

//Nachrichten erhalten
async function getData(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/getMessages`, {
            method: 'POST', body: JSON.stringify({
                'userID': localStorage.getItem('userID'),
                'chatID': localStorage.getItem('chatID')
            })
        });
        const data = await response.json();

        //Listenelement erhalten
        const list = document.getElementById("messagesOfChat");
        list.innerHTML = "";

        //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
        for (const message of data) {
            const listElement = document.createElement("li");
            listElement.textContent = message.message;
            listElement.id = message.messageID;
            listElement.onclick = async function () {
                selectedMessage = this.id;
                listElement.classList.add("selected-message");
                listElement.classList.remove("unselected-message");
                localStorage.setItem('messageID', selectedMessage);
            };
            listElement.ondblclick = async function () {
                await editDeleteMessage();
            };
            if(listElement.id === selectedMessage) {
                listElement.classList.add("selected-message");
                listElement.classList.remove("unselected-message");
            } else {
                listElement.classList.remove("selected-message");
                listElement.classList.add("unselected-message");
            }
            list.appendChild(listElement);
        }
    } catch (error) {
        console.error(error);
    }
}

//Nachricht hinzufügen
async function sendData(event) {
    try {
        event.preventDefault();
        const messageText = document.getElementById("user-input").value;
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

async function editDeleteMessage() {
    if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "" && localStorage.getItem('messageID') != null && localStorage.getItem('messageID') !== "") {
        window.location.href = '../message/message.html' + localStorage.getItem('urlParameter');
    } else {
        alert("Bitte wählen Sie eine Nachricht aus");
    }
}

async function addEditDeleteChat() {
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
window.addEventListener('beforeinstallprompt', async function(event) {
    // Standard Install-Prompt abfangen & verhindern
    event.preventDefault();

    // Install-Prompt auf die Variable zuweisen
    installPrompt = event;

    // Install-Button anzeigen
    document.getElementById('download-button').style.visibility = 'visible';
});

//Variablen aus dem LocalStorage löschen
/*window.addEventListener('unload', async function () {
    localStorage.removeItem('userID');
    localStorage.removeItem('chatID');
    localStorage.removeItem('messageID');
    localStorage.removeItem('urlParameter');
    localStorage.removeItem('urlToSpringBootServer');
});
*/