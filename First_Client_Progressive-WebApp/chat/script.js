//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Chat oder Gruppe hinzufügen
async function createChat() {
    await fetch(`${urlToSpringBoot}/newChat`, {
        method: 'POST',
        body: JSON.stringify({
            'userID': window.userID,
            'chatName': document.getElementById("new-chatname").value
        })
    });
}

//Chat/Gruppe löschen
async function deleteChat() {
    await fetch(`${urlToSpringBoot}/deleteChat`, {
        method: 'DELETE',
        body: JSON.stringify({
            'chatID': window.chatID
        })
    });
}

async function updateChatNames() {
    await fetch(`${urlToSpringBoot}/updateChatName`, {
        method: 'PUT',
        body: JSON.stringify({
            'chatID': window.chatID,
            'chatName': document.getElementById("new-chatname").value
        })
    });
}

async function addUserToChat() {
    await fetch(`${urlToSpringBoot}/addUserToChat`, {
        method: 'POST',
        body: JSON.stringify({
            'username': document.getElementById("add-user").value,
            'chatID': window.chatID
        })
    });
}

async function removeUserFromChat() {
    await fetch(`${urlToSpringBoot}/removeUserFromChat`, {
        method: 'POST',
        body: JSON.stringify({
            'username': document.getElementById("add-user").value,
            'chatID': window.chatID
        })
    });
}

function backToHome() {
    window.location.href = '../home/home.html';
}