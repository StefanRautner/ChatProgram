//Autor: Stefan Rautner
// URL zur MongoDB Datenbank definieren
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Nachricht aktualisieren/updaten
async function updateMessage(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/updateMessage`, {
            method: 'PUT',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': window.chatID,
                'messageID': window.messageID,
                'message': document.getElementById("new-message").value
            })
        });
    } catch (error) {
        console.error(error);
    }
}

//Nachricht löschen
async function deleteMessage(event) {
    try {
        event.preventDefault();
        await fetch(`${urlToSpringBoot}/deleteMessage`, {
            method: 'DELETE',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': window.chatID,
                'messageID': window.messageID
            })
        });
    } catch (error) {
        console.error(error);
    }
}

//Zurück zu Home
function backToHome() {
    window.location.href = '../home/home.html';
}