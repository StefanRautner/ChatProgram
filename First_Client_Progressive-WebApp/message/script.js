//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Nachricht aktualisieren/updaten
async function updateMessage() {
    await fetch(`${urlToSpringBoot}/updateMessage`, {
        method: 'PUT',
        body: JSON.stringify({
            'userID': window.userID,
            'chatID': window.chatID,
            'messageID': window.messageID,
            'message': document.getElementById("new-message").value
        })
    });
}

//Nachricht löschen
async function deleteMessage() {
    await fetch(`${urlToSpringBoot}/deleteMessage`, {
        method: 'DELETE',
        body: JSON.stringify({
            'userID': window.userID,
            'chatID': window.chatID,
            'messageID': window.messageID
        })
    });
}

//Zurück zu Home
function backToHome() {
    window.location.href = '../home/home.html';
}