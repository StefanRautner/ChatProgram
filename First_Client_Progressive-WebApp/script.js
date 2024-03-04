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
        headers: {
            'userID': userID
        }
    });
    return await response.json();
}

//Nachricht oder Gruppe hinzufügen
async function sendData(userID, chatID, data) {
    const response = await fetch(`${urlToMongoDBDatabase}/newMessage`, {
        method: 'POST',
        headers: {
            'userID': userID,
            'chatID': chatID
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

//Nachricht aktualisieren/updaten
async function updateMessage(userID, chatID, updateID, data) {
    const response = await fetch(`${urlToMongoDBDatabase}/updateMessage`, {
        method: 'PUT',
        headers: {
            'userID': userID,
            'chatID': chatID,
            'updateID': updateID
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

//Nachricht/Chat löschen
async function deleteData(userID, type, chatID, messageID) {
    const response = await fetch(`${urlToMongoDBDatabase}/deleteData`, {
        method: 'DELETE',
        headers: {
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID
        }
    });
    return await response.json();
}
