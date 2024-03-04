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
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const userExists = true;

    if(userExists) {
        document.getElementById("messageBoxText").value = "Anmeldung erfolgreich";
        loginSucessfull = true;
    } else {
        document.getElementById("messageBoxText").value = "Anmeldung fehlgeschlagen";
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer hinzufügen
async function createNewUser() {
    const username = document.getElementById("usernameRegister").value;
    const password = document.getElementById("passwordRegister").value;

    const response = await fetch(`${urlToMongoDBDatabase}/newUser`, {
        method: 'POST',
        body: {
            'username': username,
            'password': password
        }
    });

    const newUserCreated = await response.json();
    if(newUserCreated) {
        document.getElementById("messageBoxText").value = "Benutzer erfolgreich aktualisiert";
    } else {
        document.getElementById("messageBoxText").value = "Fehler beim Erstellen des Benutzers";
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer aktualisieren/updaten
async function updateUser() {
    const username = document.getElementById("usernamePasswordLost").value;
    const password = document.getElementById("passwordPasswordLost").value;

    const response = await fetch(`${urlToMongoDBDatabase}/updateUser`, {
        method: 'PUT',
        body: {
            'username': username,
            'password': password
        }
    });
    const passwordChanged = await response.json();
    if(passwordChanged) {
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

//Spring-Boot Sever muss true oder false zurücksenden (sonst nichts) (bei allen Anfragen an dessen Schnittstellen)
//MessageBox schließt sich automatisch, warum?