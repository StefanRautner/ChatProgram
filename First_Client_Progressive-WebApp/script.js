//Autor: Stefan Rautner

//userID = ID des aktiven Users
//type = Nachricht oder Chat (privater Chat oder Gruppe)
//chatID = ID des Chats (privater Chat oder Gruppe)
//messageID = ID der zu löschenden Nachricht, bzw. Chats (privater Chat oder Gruppe)
//data = Nachricht


// URL zur MongoDB Datenbank definieren
const urlToMongoDBDatabase = 'http://localhost:8080/api';

//Nachrichten erhalten
async function getData(userID) {
    const response = await fetch(`${urlToMongoDBDatabase}/getData`, {
        methode: 'GET',
        body: {
            'userID': userID
        }
    });
    return await response.json();       //Hier erhaltene Daten verarbeiten, sodass Sie angezeigt werden
}

//Nachricht oder Gruppe hinzufügen
async function sendData(userID, chatID, data) {
    const response = await fetch(`${urlToMongoDBDatabase}/newMessage`, {
        method: 'POST',
        body: {
            'userID': userID,
            'chatID': chatID,
            'message': data
        }
    });
}

//Nachricht aktualisieren/updaten
async function updateMessage(userID, chatID, messageID, data) {
    const response = await fetch(`${urlToMongoDBDatabase}/updateMessage`, {
        method: 'PUT',
        body: {
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID,
            'message': data
        }
    });
}

//Nachricht/Chat löschen
async function deleteData(userID, type, chatID, messageID) {
    const response = await fetch(`${urlToMongoDBDatabase}/deleteData`, {
        method: 'DELETE',
        body: {
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID
        }
    });
}
