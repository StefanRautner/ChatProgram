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
const urlToSpringBoot = 'http://localhost:8080/tinyWhatsApp';

//Passwort hashen
async function hash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

//Benutzer überprüfen
async function checkUserExistence(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/checkUser`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("usernameLogin").value,
                'password': await hash(document.getElementById("passwordLogin").value)
            })
        });

        //Form leeren
        document.getElementById("usernameLogin").value = "";
        document.getElementById("passwordLogin").value = "";

        const data = await response.text();
        if (data !== null && data !== "") {
            uID = data.userID;
            window.location.href = '../home/home.html';
        } else {
            alert("Anmeldung fehlgeschlagen");
        }
    } catch (error) {
        console.error(error);
    }
}


//Benutzer hinzufügen
async function createNewUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/newUser`, {
            method: 'POST',
            body: JSON.stringify({
                'username': document.getElementById("usernameRegister").value,
                'password': await hash(document.getElementById("passwordRegister").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernameRegister").value = "";
        document.getElementById("passwordRegister").value = "";
        changeToLogin();

        const data = await response.text();
        if (data !== null && data !== "") {
            uID = data.userID;
            window.location.href = '../home/home.html';
        } else {
            alert("Registrierung fehlgeschlagen");
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function updateUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/updateUser`, {
            method: 'PUT',
            body: JSON.stringify({
                'username': document.getElementById("usernamePasswordLost").value,
                'password': await hash(document.getElementById("passwordPasswordLost").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernamePasswordLost").value = "";
        document.getElementById("passwordPasswordLost").value = "";
        changeToLogin();

        const data = await response.text();
        if (data !== null && data !== "") {
            uID = data.userID;
            window.location.href = '../home/home.html';
        } else {
            alert("Passwort aktualisieren fehlgeschlagen");
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function deleteUser(event) {
    try {
        event.preventDefault();
        const response = await fetch(`${urlToSpringBoot}/deleteUser`, {
            method: 'DELETE',
            body: JSON.stringify({
                'username': document.getElementById("usernameDelete").value,
                'password': await hash(document.getElementById("passwordDelete").value)
            })
        });

        //Form leeren & zu Login wechseln
        document.getElementById("usernameDelete").value = "";
        document.getElementById("passwordDelete").value = "";
        changeToLogin();

        alert(await response.text());
    } catch (error) {
        console.error(error);
    }
}

//Variable für andere Scripte verfügbar machen
window.userID = uID;
window.urlToSpringBoot = urlToSpringBoot;