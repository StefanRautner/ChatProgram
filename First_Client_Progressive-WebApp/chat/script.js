//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Chat oder Gruppe hinzufügen
async function createChat(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/newChat`, {
            method: 'POST',
            body: JSON.stringify({
                'userID': window.userID,
                'chatName': document.getElementById("new-chatname").value
            })
        });
    } catch (error) {
        console.error(error);
    }
}

//Chat/Gruppe löschen
async function deleteChat(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/deleteChat`, {
            method: 'DELETE',
            body: JSON.stringify({
                'chatID': window.chatID
            })
        });
    } catch (error) {
        console.error(error);
    }
}

async function updateChatNames(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/updateChatName`, {
            method: 'PUT',
            body: JSON.stringify({
                'chatID': window.chatID,
                'chatName': document.getElementById("new-chatname").value
            })
        });
    } catch (error) {
        console.error(error);
    }
}

async function addUserToChat(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/addUserToChat`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("add-user").value,
                'chatID': window.chatID
            })
        });
    } catch (error) {
        console.error(error);
    }
}

async function removeUserFromChat(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/removeUserFromChat`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("add-user").value,
                'chatID': window.chatID
            })
        });
    } catch (error) {
        console.error(error);
    }
}

function backToHome() {
    window.location.href = '../home/home.html';
}