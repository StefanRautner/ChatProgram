//Autor: Stefan Rautner
//Variablen definieren
let uID = "";

//Zu RegisterForm wechseln
function changeToLogin() {
    document.title = "Einloggen";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("passwordLostForm").style.display = "none";
    document.getElementById("deleteForm").style.display = "none";
}

//Zu LoginForm wechseln
function changeToRegister() {
    document.title = "Registrieren";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("passwordLostForm").style.display = "none";
    document.getElementById("deleteForm").style.display = "none";
}

//Zu PasswordLostForm wechseln
function changeToPasswordLost() {
    document.title = "Password Vergessen";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("passwordLostForm").style.display = "block";
    document.getElementById("deleteForm").style.display = "none";
}

//Zu DeleteForm wechseln
function changeToDelete() {
    document.title = "Konto löschen";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("passwordLostForm").style.display = "none";
    document.getElementById("deleteForm").style.display = "block";
}

// URL zur MongoDB Datenbank definieren
const urlToMongoDBDatabase = 'http://localhost:8080/tinyWhatsApp';

//Verschlüsselungs-Schlüssel
const key = "g9F@3H#kdE7q8nT$S!zG5*bW+mY2p^Vh";

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
async function checkUserExistence(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToMongoDBDatabase}/checkUser`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("usernameLogin").value,
                'password': encrypt(document.getElementById("passwordLogin").value)
            })
        });

        //Form leeren
        document.getElementById("usernameLogin").value = "";
        document.getElementById("passwordLogin").value = "";

        const data = await response.text();
        console.log(data);
        if (data === null) {
            document.getElementById("messageBoxText").value = "Anmeldung fehlgeschlagen";
            document.getElementById("messageBox").style.display = "block";
        } else {
            uID = data.userID;
            window.location.href = '../home/home.html';
        }
    } catch (error) {
        console.error(error);
    }
}


//Benutzer hinzufügen
async function createNewUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToMongoDBDatabase}/newUser`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("usernameRegister").value,
                'password': encrypt(document.getElementById("passwordRegister").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernameRegister").value = "";
        document.getElementById("passwordRegister").value = "";
        changeToLogin();

        const data = await response.text();

        if (data === null) {
            document.getElementById("messageBoxText").value = "Dieser User existiert bereits";
            document.getElementById("messageBox").style.display = "block";
        } else {
            uID = data.userID;
            window.location.href = '../home/home.html';
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function updateUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToMongoDBDatabase}/updateUser`, {
            method: 'PUT',
            body: JSON.stringify({
                'username': document.getElementById("usernamePasswordLost").value,
                'password': encrypt(document.getElementById("passwordPasswordLost").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernamePasswordLost").value = "";
        document.getElementById("passwordPasswordLost").value = "";
        changeToLogin();

        const data = await response.text();

        if (data === null) {
            document.getElementById("messageBoxText").value = "Dieser User existiert nicht";
            document.getElementById("messageBox").style.display = "block";
        } else {
            uID = data.userID;
            window.location.href = '../home/home.html';
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function deleteUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToMongoDBDatabase}/deleteUser`, {
            method: 'DELETE',
            body: JSON.stringify({
                'username': document.getElementById("usernameDelete").value,
                'password': encrypt(document.getElementById("passwordDelete").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernameDelete").value = "";
        document.getElementById("passwordDelete").value = "";
        changeToLogin();

        document.getElementById("messageBoxText").value = await response.text();
        document.getElementById("messageBox").style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

function hideMessageBox() {
    document.getElementById("messageBox").style.display = "none";
}

//Variable für andere Scripte verfügbar machen
window.userID = uID;