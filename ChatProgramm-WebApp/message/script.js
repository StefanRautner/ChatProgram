//Autor: Stefan Rautner
//WebApp auf inaktiv setzen
localStorage.setItem('webAppStatus', "inactive");

//Nachricht aktualisieren/updaten
async function updateMessage(event) {
    try {
        event.preventDefault();
        const messageText = document.getElementById('new-message').value;
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {

            if (messageText !== null && messageText !== "") {
                if (localStorage.getItem('userID') !== null && localStorage.getItem('userID') !== ""
                    && localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== ""
                    && localStorage.getItem('messageID') !== null && localStorage.getItem('messageID') !== "") {
                    const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/updateMessage`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            'userID': localStorage.getItem('userID'),
                            'chatID': localStorage.getItem('chatID'),
                            'messageID': localStorage.getItem('messageID'),
                            'message': messageText
                        })
                    });

                    if (localStorage.getItem('urlParameter') != null && localStorage.getItem('urlParameter') !== "") {
                        if (!await response.text()) {
                            localStorage.setItem('webAppStatus', "active");
                            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                            alert("Nachricht existiert schon zu lange");
                        } else {
                            localStorage.setItem('webAppStatus', "active");
                            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                            alert("Nachricht wurde erfolgreich aktualisiert");
                        }
                    } else {
                        alert("Interner Fehler, bitte laden Sie die WebApp erneut (Url kann nicht erreicht werden)");
                    }
                } else {
                    alert("UserID, ChatID oder MessageID ist falsch gesetzt worden");
                }
            } else {
                alert("Bitte geben Sie einen Nachrichten-Text ein");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//Nachricht löschen
async function deleteMessage(event) {
    try {
        event.preventDefault();
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (localStorage.getItem('userID') !== null && localStorage.getItem('userID') !== ""
                && localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== ""
                && localStorage.getItem('messageID') !== null && localStorage.getItem('messageID') !== "") {
                const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/deleteMessage`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        'userID': localStorage.getItem('userID'),
                        'chatID': localStorage.getItem('chatID'),
                        'messageID': localStorage.getItem('messageID')
                    })
                });

                if (localStorage.getItem('urlParameter') != null && localStorage.getItem('urlParameter') !== "") {
                    if (!await response.text()) {
                        localStorage.setItem('webAppStatus', "active");
                        window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                        alert("Nachricht konnte nicht entfernt werden");
                    } else {
                        localStorage.setItem('webAppStatus', "active");
                        window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                        alert("Nachricht wurde erfolgreich aktualisiert");
                    }
                } else {
                    alert("Interner Fehler, bitte laden Sie die WebApp erneut (Url kann nicht erreicht werden)");
                }
            } else {
                alert("UserID, ChatID oder MessageID ist falsch gesetzt worden");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//Zurück zu Home
async function backToHome() {
    if (localStorage.getItem('urlParameter') !== null && localStorage.getItem('urlParameter') !== "") {
        localStorage.setItem('webAppStatus', "active");
        window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
    } else {
        alert("Interner Fehler, bitte laden Sie die WebApp erneut (Url kann nicht erreicht werden)")
    }
}

//Unload Evventhandler
window.addEventListener('beforeunload', async function () {
    if (localStorage.getItem('webAppStatus') !== "active") {
        localStorage.removeItem('userID');
        localStorage.removeItem('chatID');
        localStorage.removeItem('messageID');
        localStorage.removeItem('urlParameter');
        localStorage.removeItem('urlToSpringBootServer');
        localStorage.removeItem('webAppStatus');
    }
});