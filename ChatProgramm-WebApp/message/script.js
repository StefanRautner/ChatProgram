//Autor: Stefan Rautner

//Nachricht aktualisieren/updaten
async function updateMessage(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${window.urlToSpringBoot}/updateMessage`, {
            method: 'PUT',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': window.chatID,
                'messageID': window.messageID,
                'message': document.getElementById("new-message").value
            })
        });

        if(!await response.text()) {
            window.location.href = '../home/home.html';
            alert("Nachricht existiert schon zu lange");
        } else {
            window.location.href = '../home/home.html';
            alert("Nachricht wurde erfolgreich aktualisiert");
        }
    } catch (error) {
        console.error(error);
    }
}

//Nachricht löschen
async function deleteMessage(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${window.urlToSpringBoot}/deleteMessage`, {
            method: 'DELETE',
            body: JSON.stringify({
                'userID': window.userID,
                'chatID': window.chatID,
                'messageID': window.messageID
            })
        });

        if(!await response.text()) {
            window.location.href = '../home/home.html';
            alert("Nachricht konnte nicht entfernt werden");
        } else {
            window.location.href = '../home/home.html';
            alert("Nachricht wurde erfolgreich aktualisiert");
        }
    } catch (error) {
        console.error(error);
    }
}

//Zurück zu Home
function backToHome() {
    window.location.href = '../home/home.html';
}