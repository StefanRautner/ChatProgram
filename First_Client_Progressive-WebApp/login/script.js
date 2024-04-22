//Autor: Stefan Rautner
//Variablen definieren
let uID = "";

//Login zu Registerform ändern
function changeToRegister() {
    document.title = "Registrieren";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
}

//Register zu Loginform ändern
function    changeToLogin() {
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
const urlToMongoDBDatabase = 'http://localhost:8080/tinyWhatsApp';

//Verschlüsselungs-Schlüssel
const key = "g9F@3H#kdE7q8nT$S!zG5*bW+mY2p^VhA6vC";

//Passwort mit AES verschlüsseln
function encrypt(password) {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedPassword = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(key), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: 32,
        blockSize: 4
    });
    return iv.concat(encryptedPassword.ciphertext).toString(CryptoJS.enc.Base64);
}

//Benutzer überprüfen
async function checkUserExistence() {
    try {
        const response = await fetch(`${urlToMongoDBDatabase}/checkUser`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("usernameLogin").value,
                'password': encrypt(document.getElementById("passwordLogin").value)
            })
        });

        const data = await response.text();
        console.log(data);
        if(data === null) {
            document.getElementById("messageBoxText").value = "Anmeldung fehlgeschlagen";
        } else {
            uID = data.userID;
            window.location.href = '../home/home.html';
        }
        document.getElementById("messageBox").style.display = "block";
    } catch (error) {
        console.error(error);
    }
}


//Benutzer hinzufügen
async function createNewUser() {
    const response = await fetch(`${urlToMongoDBDatabase}/newUser`, {
        method: 'POST',
        body: JSON.stringify({
            'username': document.getElementById("usernameRegister").value,
            'password': encrypt(document.getElementById("passwordRegister").value)
        })
    });
    const data = await response.text();

    if(data === null) {
        document.getElementById("messageBoxText").value = "Benutzer existiert bereits";
    } else {
        uID = data.userID;
        window.location.href = '../home/home.html';
    }
    document.getElementById("messageBox").style.display = "block";
}

//Benutzer aktualisieren/updaten
async function updateUser() {
    const response = await fetch(`${urlToMongoDBDatabase}/updateUser`, {
        method: 'PUT',
        body: JSON.stringify({
            'username': document.getElementById("usernamePasswordLost").value,
            'password': encrypt(document.getElementById("passwordPasswordLost").value)
        })
    });
    const data = await response.text();

    if(data === null) {
        document.getElementById("messageBoxText").value = "Dieser Username existiert nicht";
    } else {
        uID = data.userID;
        window.location.href = '../home/home.html';
    }
    document.getElementById("messageBox").style.display = "block";
}

function hideMessageBox() {
    document.getElementById("messageBox").style.display = "none";
}

//Variable für andere Scripte verfügbar machen
window.userID = uID;