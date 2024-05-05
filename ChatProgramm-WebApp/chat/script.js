//Autor: Stefan Rautner

//WebApp auf inaktiv setzen
localStorage.setItem('webAppStatus', "inactive");

//Chat oder Gruppe hinzufügen
async function createChat(event) {
    try {
        event.preventDefault();
        const chatName = document.getElementById("new-chatname").value;
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (chatName !== null && chatName !== "") {
                if (localStorage.getItem('userID') != null && localStorage.getItem('userID') !== "") {
                    const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/newChat`, {
                        method: 'POST', body: JSON.stringify({
                            'userID': localStorage.getItem('userID'), 'chatName': chatName
                        })
                    });

                    if (localStorage.getItem('urlParameter') != null && localStorage.getItem('urlParameter') !== "") {
                        if (!await response.text()) {
                            alert("Chat konnte nicht hinzugefügt werden");
                        } else {
                            localStorage.setItem('webAppStatus', "active");
                            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                            alert("Chat erfolgreich hinzugefügt");
                        }
                    } else {
                        alert("Interner Fehler, bitte laden Sie die WebApp erneut (Url kann nicht erreicht werden)");
                    }
                } else {
                    alert("UserID ist falsch gesetzt worden");
                }
            } else {
                alert("Bitte geben Sie einen Chatnamen ein");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//Chat/Gruppe löschen
async function deleteChat(event) {
    try {
        event.preventDefault();
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/deleteChat`, {
                    method: 'DELETE', body: JSON.stringify({
                        'chatID': localStorage.getItem('chatID')
                    })
                });

                if (localStorage.getItem('urlParameter') != null && localStorage.getItem('urlParameter') !== "") {
                    if (!await response.text()) {
                        alert("Chat konnte nicht hinzugefügt werden");
                    } else {
                        localStorage.setItem('webAppStatus', "active");
                        window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                        localStorage.setItem('chatID', "");
                        alert("Chat erfolgreich gelöscht");
                    }
                } else {
                    alert("Interner Fehler, bitte laden Sie die WebApp erneut (Url kann nicht erreicht werden)");
                }
            } else {
                alert("Bitte wählen Sie einen Chat aus");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//Chatnamen updaten
async function updateChatNames(event) {
    try {
        event.preventDefault();
        const chatName = document.getElementById("new-chatname").value;
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (chatName !== null && chatName !== "") {
                if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                    const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/updateChatName`, {
                        method: 'PUT', body: JSON.stringify({
                            'chatID': localStorage.getItem('chatID'), 'chatName': chatName
                        })
                    });

                    if (localStorage.getItem('urlParameter') != null && localStorage.getItem('urlParameter') !== "") {
                        if (!await response.text()) {
                            alert("Chatname konnte nicht aktualisiert werden");
                        } else {
                            localStorage.setItem('webAppStatus', "active");
                            window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                            alert("Chatname wurde erfolgreich aktualisiert");
                        }
                    }
                } else {
                    alert("Bitte wählen Sie einen Chat aus");
                }
            } else {
                alert("Bitte geben Sie einen Chatnamen ein");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//User zum Chat hinzufügen
async function addUserToChat(event) {
    try {
        event.preventDefault();
        const username = document.getElementById("add-user").value;
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (username !== null && username !== "") {
                if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                    const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/addUserToChat`, {
                        method: 'POST', body: JSON.stringify({
                            'username': username, 'chatID': localStorage.getItem('chatID')
                        })
                    });

                    if (!await response.text()) {
                        alert("Benutzer konnte nicht zum Chat hinzugefügt werden");
                    } else {
                        alert("Benutzer wurde erfolgreich in den Chat hinzugefügt");
                    }
                } else {
                    alert("Bitte wählen Sie einen Chat aus");
                }
            } else {
                alert("Bitte geben Sie einen Benutzernamen ein");
            }
        } else {
            alert("Server konnte nicht erreicht werden");
        }
    } catch (error) {
        console.error(error);
    }
}

//User vom Chat löschen
async function removeUserFromChat(event) {
    try {
        event.preventDefault();
        const username = document.getElementById("add-user").value;
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
            if (username !== null && username !== "") {
                if (localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                    const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/removeUserFromChat`, {
                        method: 'POST', body: JSON.stringify({
                            'username': username, 'chatID': localStorage.getItem('chatID')
                        })
                    });

                    if (!await response.text()) {
                        alert("Benutzer konnte nicht aus dem Chat entfernt werden");
                    } else {
                        alert("Benutzer wurde erfolgreich aus dem Chat entfernt");
                    }
                } else {
                    alert("Bitte wählen Sie einen Chat aus");
                }
            } else {
                alert("Bitte geben Sie einen Benutzernamen ein");
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
    }
}

//Unload Eventhandler
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