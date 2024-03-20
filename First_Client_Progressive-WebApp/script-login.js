//Autor: Stefan Rautner

//Login zu Registerform ändern
function changeToRegister() {
    document.title = "Registrieren";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
}

//Register zu Loginform ändern
function changeToLogin() {
    document.title = "Login";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
}

//PasswordLost wieder zu aufrufenForm zurück
function changeToPasswordLost() {
    document.title = "Password Vergessen";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("passwordLostForm").style.display = "block";
}

// URL zur MongoDB Datenbank definieren
const urlToMongoDBDatabase = 'http://localhost:8080/api';

//Passwort hashen
async function hashPassword(password) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hasHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

//Benutzer überprüfen
async function checkUserExistence() {
    let hashedPassword = "";
    hashedPassword(document.getElementById("passwordLogin").value).then(hash => {
        hashedPassword = hash;
    });

    const response = await fetch(`${urlToMongoDBDatabase}/checkUser`, {
        method: 'POST',
        body: {
            'username': document.getElementById("usernameLogin").value,
            'password': hashedPassword
        }
    });

    if(response == null) {
        document.getElementById("messageBoxText").value = "Anmeldung fehlgeschlagen";
    } else {
        window.location.href = 'home.html';
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer hinzufügen
async function createNewUser() {
    let hashedPassword = "";
    hashedPassword(document.getElementById("passwordRegister").value).then(hash => {
        hashedPassword = hash;
    });

    const response = await fetch(`${urlToMongoDBDatabase}/newUser`, {
        method: 'POST',
        body: {
            'username': document.getElementById("passwordLogin").value,
            'password': hashedPassword
        }
    });

    const newUserCreated = await response.json();
    if(newUserCreated == null) {
        document.getElementById("messageBoxText").value = "Benutzer existiert bereits";
    } else {
        window.location.href = 'home.html';
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer aktualisieren/updaten
async function updateUser() {
    let hashedPassword = "";
    hashedPassword(document.getElementById("passwordPasswordLost").value).then(hash => {
        hashedPassword = hash;
    });

    const response = await fetch(`${urlToMongoDBDatabase}/updateUser`, {
        method: 'PUT',
        body: {
            'username': document.getElementById("usernamePasswordLost").value,
            'password': hashedPassword
        }
    });

    const passwordChanged = await response.json();
    if(passwordChanged == null) {
        document.getElementById("messageBoxText").value = "Dieser Username existiert nicht";
    } else {
        window.location.href = 'home.html';
    }
    document.getElementById("messageBox").style.display = "block";
}

function hideMessageBox() {
    document.getElementById("messageBox").style.display = "none";
}

//MessageBox schließt sich automatisch, warum?