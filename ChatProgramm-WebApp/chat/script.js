//Autor: Stefan Rautner

//Chat oder Gruppe hinzufügen
async function createChat(event) {
    try {
        const chatName = document.getElementById("new-chatname").value;
        event.preventDefault();
        if(chatName !== null && chatName !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/newChat`, {
                method: 'POST',
                body: JSON.stringify({
                    'userID': localStorage.getItem('userID'),
                    'chatName': document.getElementById("new-chatname").value
                })
            });

            if(!await response.text()) {
                alert("Chat konnte nicht hinzugefügt werden");
            } else {
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                alert("Chat erfolgreich hinzugefügt");
            }
        } else {
            alert("Bitte geben Sie einen Chatnamen ein");
        }
    } catch (error) {
        console.error(error);
    }
}

//Chat/Gruppe löschen
async function deleteChat(event) {
    try {
        event.preventDefault();
        if(localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/deleteChat`, {
                method: 'DELETE',
                body: JSON.stringify({
                    'chatID': localStorage.getItem('chatID')
                })
            });

            if(!await response.text()) {
                alert("Chat konnte nicht hinzugefügt werden");
            } else {
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                alert("Chat erfolgreich gelöscht");
            }
        } else {
            alert("Bitte wählen Sie einen Chat aus");
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateChatNames(event) {
    try {
        const chatName = document.getElementById("new-chatname").value;
        event.preventDefault();
        if(chatName !== null && chatName !== "") {
            if(localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/updateChatName`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'chatID': localStorage.getItem('chatID'),
                        'chatName': chatName
                    })
                });

                if(!await response.text()) {
                    alert("Chatname konnte nicht aktualisiert werden");
                } else {
                    window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
                    alert("Chatname wurde erfolgreich aktualisiert");
                }
            } else {
                alert("Bitte wählen Sie einen Chat aus");
            }
        } else {
            alert("Bitte geben Sie einen Chatnamen ein");
        }
    } catch (error) {
        console.error(error);
    }
}

async function addUserToChat(event) {
    try {
        event.preventDefault();
        const username = document.getElementById("add-user").value;
        if(username !== null && username !== "") {
            if(localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !== "") {
                const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/addUserToChat`, {
                    method: 'POST',
                    body: JSON.stringify({
                        'username': username,
                        'chatID': localStorage.getItem('chatID')
                    })
                });

                if(!await response.text()) {
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
    } catch (error) {
        console.error(error);
    }
}

async function removeUserFromChat(event) {
    try {
        event.preventDefault();
        const username = document.getElementById("add-user").value;
        if(username !== null && username !== "") {
            if(localStorage.getItem('chatID') !== null && localStorage.getItem('chatID') !==  "") {
                const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/removeUserFromChat`, {
                    method: 'POST',
                    body: JSON.stringify({
                        'username': username,
                        'chatID': localStorage.getItem('chatID')
                    })
                });

                if(!await response.text()) {
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
    } catch (error) {
        console.error(error);
    }
}

function backToHome() {
    window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
}