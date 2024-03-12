//Autor: Stefan Rautner

//Variablen definieren
let loginSucessfull = false;

//Login zu Registerform ändern
function changeToRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
}

//Register zu Loginform ändern
function changeToLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
}

//PasswordLost wieder zu aufrufenForm zurück
function changeToPasswordLost() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("passwordLostForm").style.display = "block";
}

// URL zur MongoDB Datenbank definieren
const urlToMongoDBDatabase = 'http://localhost:8080/api';

//Benutzer überprüfen
async function checkUserExistence() {
    const hashedPassword = hashCode(document.getElementById("passwordLogin").value);

    const response = await fetch(`${urlToMongoDBDatabase}/checkUser`, {
        method: 'POST',
        body: {
            'username': document.getElementById("usernameLogin").value,
            'password': hashedPassword
        }
    });

    if(response != null) {
        document.getElementById("messageBoxText").value = "Anmeldung erfolgreich";
        loginSucessfull = true;
    } else {
        document.getElementById("messageBoxText").value = "Anmeldung fehlgeschlagen";
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer hinzufügen
async function createNewUser() {
    const hashedPassword = hashCode(document.getElementById("passwordLogin").value);

    const response = await fetch(`${urlToMongoDBDatabase}/newUser`, {
        method: 'POST',
        body: {
            'username': document.getElementById("passwordLogin").value,
            'password': password
        }
    });

    const newUserCreated = await response.json();
    if(newUserCreated != null) {
        document.getElementById("messageBoxText").value = "Benutzer erfolgreich aktualisiert";
    } else {
        document.getElementById("messageBoxText").value = "Fehler beim Erstellen des Benutzers";
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer aktualisieren/updaten
async function updateUser() {
    const hashedPassword = hashCode(document.getElementById("passwordLogin").value);

    const response = await fetch(`${urlToMongoDBDatabase}/updateUser`, {
        method: 'PUT',
        body: {
            'username': document.getElementById("usernamePasswordLost").value,
            'password': hashedPassword
        }
    });
    const passwordChanged = await response.json();
    if(passwordChanged != null) {
        document.getElementById("messageBoxText").value = "Passwort erfolgreich aktualisiert";
    } else {
        document.getElementById("messageBoxText").value = "Fehler beim Aktualisieren des Passworts";
    }
    document.getElementById("messageBox").style.display = "block";
}

function hideMessageBox() {
    document.getElementById("messageBox").style.display = "none";
    if(loginSucessfull) {
        window.location.href = 'home.html';
    }
}

//MessageBox schließt sich automatisch, warum?
//Passwort Hashen bevor es gesendet wird