//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Chat oder Gruppe hinzufügen
async function createChat(userID, nameChat) {
    await fetch(`${urlToSpringBoot}/newChat`, {
        method: 'POST',
        body: JSON.stringify({
            'userID': userID,
            'chatName': document.getElementById("new-chatname").value
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

async function updateChatNames(chatID) {
    await fetch(`${urlToSpringBoot}/updateChatName`, {
        method: 'PUT',
        body: JSON.stringify({
            'chatID': chatID,
            'chatName': document.getElementById("new-chatname").value
        })
    });
}

async function addUserToChat(chatID) {
    await fetch(`${urlToSpringBoot}/addUserToChat`, {
        method: 'POST',
        body: JSON.stringify({
            'username': document.getElementById("add-user").value,
            'chatID': chatID
        })
    });
}

async function removeUserFromChat(chatID) {
    await fetch(`${urlToSpringBoot}/removeUserFromChat`, {
        method: 'POST',
        body: JSON.stringify({
            'username': document.getElementById("add-user").value,
            'chatID': chatID
        })
    });
}

function backToHome() {
    window.location.href = '../home/home.html';
}