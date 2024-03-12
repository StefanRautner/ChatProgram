//Autor: Stefan Rautner

/*
getChats(userID, return:List<string>Chatnamen) = Chats erhalten
getMessages(chatID, return:List<string> NachrichtenDesChats) = Nachrichten eines Chats erhalten
newMessage(userID, chatID, message, return:NONE) = Neue Nachricht erstellen
newChat(userID, chatName, return:NONE) = Neuen Chat/Gruppe erstellen
updateMessage(userID, chatID, messageID, message, return:NONE) = Nachricht aktualisieren
deleteMessage(userID, chatID, messageID, return:NONE) = Nachricht löschen
deleteChat(userID, chatID, return:NONE) = Chat löschen
checkUser(username, password, return:int? ID) = Userdaten überprüfen
newUser(username, password, return:int? ID) = Neuen Nutzer anlegen
updateUser(username, password, return:int? ID) = Nutzer aktualisieren
*/


// URL zur MongoDB Datenbank definieren
const urlToMongoDBDatabase = 'http://localhost:8080/api';

//Chatnamen erhalten
async function getChatNames(userID) {
    const response = await fetch(`${urlToMongoDBDatabase}/getChats`, {
        methode: 'GET',
        body: {
            'userID': userID
        }
    });
    return await response.json();       //Hier erhaltene Daten verarbeiten, sodass Sie angezeigt werden
}

//Nachrichten erhalten
async function getData(chatID) {
    const response = await fetch(`${urlToMongoDBDatabase}/getMessages`, {
        methode: 'GET',
        body: {
            'chatID': chatID
        }
    });
    return await response.json();       //Hier erhaltene Daten verarbeiten, sodass Sie angezeigt werden
}

//Nachricht hinzufügen
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

//Chat oder Gruppe hinzufügen
async function createChat(userID, nameChat) {
    const response = await fetch(`${urlToMongoDBDatabase}/newChat`, {
        method: 'POST',
        body: {
            'userID': userID,
            'chatName': nameChat
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

//Nachricht löschen
async function deleteMessage(userID, type, chatID, messageID) {
    const response = await fetch(`${urlToMongoDBDatabase}/deletemessage`, {
        method: 'DELETE',
        body: {
            'userID': userID,
            'chatID': chatID,
            'messageID': messageID
        }
    });
}

//Chat/Gruppe löschen
async function deleteChat(userID, type, chatID, messageID) {
    const response = await fetch(`${urlToMongoDBDatabase}/deleteChat`, {
        method: 'DELETE',
        body: {
            'userID': userID,
            'chatID': chatID
        }
    });
}
