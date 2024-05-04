//Autor: Stefan Rautner

//Nachricht aktualisieren/updaten
async function updateMessage() {
    try {
        const messageText = document.getElementById('new-message').value;
        if(messageText !== null && messageText !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/updateMessage`, {
                method: 'PUT',
                body: JSON.stringify({
                    'userID': localStorage.getItem('userID'),
                    'chatID': localStorage.getItem('chatID'),
                    'messageID': localStorage.getItem('messageID'),
                    'message': document.getElementById("new-message").value
                })
            });

            if(!await response.text()) {
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                alert("Nachricht existiert schon zu lange");
            } else {
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                alert("Nachricht wurde erfolgreich aktualisiert");
            }
        } else {
            alert("Bitte geben Sie einen Nachrichten-Text ein");
        }
    } catch (error) {
        console.error(error);
    }
}

//Nachricht löschen
async function deleteMessage() {
    try {
        const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/deleteMessage`, {
            method: 'DELETE',
            body: JSON.stringify({
                'userID': localStorage.getItem('userID'),
                'chatID': localStorage.getItem('chatID'),
                'messageID': localStorage.getItem('messageID')
            })
        });

        if(!await response.text()) {
            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
            alert("Nachricht konnte nicht entfernt werden");
        } else {
            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
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