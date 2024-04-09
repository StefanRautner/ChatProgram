//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Intervall zum Updaten des Chats (alle 100ms)
const updateInterval = setInterval(function() {
    getData(chatID);
}, 100);

//Variable setzen
let chatID;
let messageID;

//Chatnamen erhalten
document.onload = async function getChatNames(userID) {
    const response = await fetch(`${urlToSpringBoot}/getChatNames`, {
        methode: 'GET',
        body: JSON.stringify({
            'userID': userID
        })
    });
    const data = await response;

    //Listenelement erhalten
    const list = document.getElementById("namesOfChats");

    //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
    data.forEach(function(chatName) {
        const listElement = document.createElement("li");
        listElement.Text = chatName.Chatname;
        listElement.id = chatName.ID;
        listElement.onclick = function() {
            chatID = this.id;
        };
        list.appendChild(listElement);
    })
}

//Nachrichten erhalten
async function getData(chatID) {
    const response = await fetch(`${urlToSpringBoot}/getMessages`, {
        methode: 'GET',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID
        })
    });
    const data = await response;

    //Listenelement erhalten
    const list = document.getElementById("messagesOfChat");

    //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
    data.forEach(function(element) {
        const listElement = document.createElement("li");
        listElement.Text = element.Nachricht;
        listElement.id = ID;
        listElement.onclick = function() {
            messageID = this.id;
        };
        list.appendChild(listElement);
    })
}

//Nachricht hinzufügen
async function sendData(userID, chatID, data) {
    await fetch(`${urlToSpringBoot}/newMessage`, {
        method: 'POST',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID,
            'message': data
        })
    });
}

function editDeleteMessage() {
    window.location.href = '../message/editDeleteMessage.html';
}

function addEditDeleteChat() {
    window.location.href = '../chat/addEditDeleteChat.html';
}

//Variable für andere Scripte verfügbar machen
window.chatID = chatID;
window.messageID = messageID;