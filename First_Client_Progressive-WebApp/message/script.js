//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Nachricht aktualisieren/updaten
async function updateMessage(userID, chatID, messageID) {
    await fetch(`${urlToSpringBoot}/updateMessage`, {
        method: 'PUT',
        body: JSON.stringify({
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID,
            'message': document.getElementById("new-message").value
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

//Zurück zu Home
function backToHome() {
    window.location.href = '../home/home.html';
}