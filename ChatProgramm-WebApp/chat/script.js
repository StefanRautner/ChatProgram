//Autor: Stefan Rautner

//Chat oder Gruppe hinzufügen
async function createChat(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${window.urlToSpringBoot}/newChat`, {
            method: 'POST',
            body: JSON.stringify({
                'userID': window.userID,
                'chatName': document.getElementById("new-chatname").value
            })
        });

        if(!await response.text()) {
            alert("Chat konnte nicht hinzugefügt werden");
        } else {
            window.location.href = '../home/home.html' + window.urlParameter;
            alert("Chat erfolgreich hinzugefügt");
        }
    } catch (error) {
        console.error(error);
    }
}

//Chat/Gruppe löschen
async function deleteChat(event) {
    try {
        event.preventDefault();
        if(chatID !== null && chatID !== "") {
            const response = await fetch(`${window.urlToSpringBoot}/deleteChat`, {
                method: 'DELETE',
                body: JSON.stringify({
                    'chatID': window.chatID
                })
            });

            if(!await response.text()) {
                alert("Chat konnte nicht hinzugefügt werden");
            } else {
                window.location.href = '../home/home.html' + window.urlParameter;
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
        event.preventDefault();
        if(chatID !== null && chatID !== "") {
            const response = await fetch(`${window.urlToSpringBoot}/updateChatName`, {
                method: 'PUT',
                body: JSON.stringify({
                    'chatID': window.chatID,
                    'chatName': document.getElementById("new-chatname").value
                })
            });

            if(!await response.text()) {
                alert("Chatname konnte nicht aktualisiert werden");
            } else {
                window.location.href = '../home/home.html' + window.urlParameter;
                alert("Chatname wurde erfolgreich aktualisiert");
            }
        } else {
            alert("Bitte wählen Sie einen Chat aus");
        }
    } catch (error) {
        console.error(error);
    }
}

async function addUserToChat(event) {
    try {
        event.preventDefault();
        if(chatID !== null && chatID !== "") {
            const response = await fetch(`${window.urlToSpringBoot}/addUserToChat`, {
                method: 'POST',
                body: JSON.stringify({
                    'username': document.getElementById("add-user").value,
                    'chatID': window.chatID
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
    } catch (error) {
        console.error(error);
    }
}

async function removeUserFromChat(event) {
    try {
        event.preventDefault();
        if(chatID !== null && chatID !==  "") {
            const response = await fetch(`${window.urlToSpringBoot}/removeUserFromChat`, {
                method: 'POST',
                body: JSON.stringify({
                    'username': document.getElementById("add-user").value,
                    'chatID': window.chatID
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
    } catch (error) {
        console.error(error);
    }
}

function backToHome() {
    window.location.href = '../home/home.html' + window.urlParameter;
}