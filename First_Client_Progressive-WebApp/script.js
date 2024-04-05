//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp/api';

//Chatnamen erhalten
document.onload = async function getChatNames(userID) {
    const response = await fetch(`${urlToSpringBoot}/getChats`, {
        methode: 'GET',
        body: JSON.stringify({
            'userID': userID
        })
    });
    const data = await response.json();

    //Listenelement erhalten
    const list = document.getElementById("namesOfChats");

    //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
    data.forEach(function(element) {
        const listElement = document.createElement("li");
        listElement.Text = element.Chatname;
        listElement.id = element.ID;
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
    const data = await response.json();

    //Listenelement erhalten
    const list = document.getElementById("messagesOfChat");

    //Für jedes JSON Object ein li erstellen und in die Liste hinzufügen
    data.forEach(function(element) {
        const listElement = document.createElement("li");
        listElement.Text = element.Nachricht;
        listElement.id = ID;
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

//Chat oder Gruppe hinzufügen
async function createChat(userID, nameChat) {
    await fetch(`${urlToSpringBoot}/newChat`, {
        method: 'POST',
        body: JSON.stringify({
            'userID': userID,
            'chatName': nameChat
        })
    });
}

//Nachricht aktualisieren/updaten
async function updateMessage(userID, chatID, messageID, data) {
    await fetch(`${urlToSpringBoot}/updateMessage`, {
        method: 'PUT',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID,
            'message': data
        })
    });
}

//Nachricht löschen
async function deleteMessage(userID, type, chatID, messageID) {
    await fetch(`${urlToSpringBoot}/deleteMessage`, {
        method: 'DELETE',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID
        })
    });
}

//Chat/Gruppe löschen
async function deleteChat(userID, type, chatID, messageID) {
    await fetch(`${urlToSpringBoot}/deleteChat`, {
        method: 'DELETE',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID
        })
    });
}
