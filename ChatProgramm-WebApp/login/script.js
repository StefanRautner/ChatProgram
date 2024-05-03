//Autor: Stefan Rautner

//Globale Variablen definieren (UrlZumSpringBootServer & urlParameter)
localStorage.setItem('urlToSpringBootServer', 'http://localhost:8080/tinyWhatsApp');
localStorage.setItem('urlParameter', window.location.search);

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
        const username = document.getElementById("usernameLogin").value;
        const password = document.getElementById("passwordLogin").value;
        event.preventDefault();
        if(username !== null && username !== "" && password !== null && password !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/checkUser`, {
                method: 'POST',
                body: JSON.stringify({
                    'username': username,
                    'password': await hash(password)
                })
            });

            //Form leeren
            document.getElementById("usernameLogin").value = "";
            document.getElementById("passwordLogin").value = "";

            const data = await response.text();
            if (data !== null && data !== "") {
                localStorage.setItem('userID', data.userID);
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
            } else {
                alert("Anmeldung fehlgeschlagen");
            }
        } else {
            alert("Bitte geben Sie einen Benutzernamen und Passwort ein");
        }
    } catch (error) {
        console.error(error);
    }
}


//Benutzer hinzufügen
async function createNewUser(event) {
    try {
        const username = document.getElementById("usernameRegister").value;
        const password = document.getElementById("passwordRegister").value;
        event.preventDefault();
        if(username !== null && username !== "" && password !== null && password !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/newUser`, {
                method: 'POST',
                body: JSON.stringify({
                    'username': username,
                    'password': await hash(password)
                })
            });

            //Form leeren & zu Login wechseln
            document.getElementById("usernameRegister").value = "";
            document.getElementById("passwordRegister").value = "";
            changeToLogin();

            const data = await response.text();
            if (data !== null && data !== "") {
                localStorage.setItem('userID', data.userID);
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
            } else {
                alert("Registrierung fehlgeschlagen");
            }
        } else {
            alert("Bitte geben Sie einen Benutzernamen und Passwort ein");
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function updateUser(event) {
    try {
        const username = document.getElementById("usernamePasswordLost").value;
        const password = document.getElementById("passwordPasswordLost").value;
        event.preventDefault();
        if(username !== null && username !== "" && password !== null && password !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/updateUser`, {
                method: 'PUT',
                body: JSON.stringify({
                    'username': username,
                    'password': await hash(password)
                })
            });

            //Form leeren & zu Login wechseln
            document.getElementById("usernamePasswordLost").value = "";
            document.getElementById("passwordPasswordLost").value = "";
            changeToLogin();

            const data = await response.text();
            if (data !== null && data !== "") {
                localStorage.setItem('userID', data.userID);
                window.location.href = '../home/home.html' + localStorage.getItem('urlParameter');
            } else {
                alert("Passwort aktualisieren fehlgeschlagen");
            }
        } else {
            alert("Bitte geben Sie einen Benutzernamen und Passwort ein");
        }
    } catch (error) {
        console.error(error);
    }
}

//Benutzer aktualisieren/updaten
async function deleteUser(event) {
    try {
        const username = document.getElementById("usernameDelete").value;
        const password = document.getElementById("passwordDelete").value;
        event.preventDefault();
        if(username !== null && username !== "" && password !== null && password !== "") {
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/deleteUser`, {
                method: 'DELETE',
                body: JSON.stringify({
                    'username': username,
                    'password': await hash(password)
                })
            });

            //Form leeren & zu Login wechseln
            document.getElementById("usernameDelete").value = "";
            document.getElementById("passwordDelete").value = "";
            changeToLogin();

            alert(await response.text());
        } else {
            alert("Bitte geben Sie einen Benutzernamen und Passwort ein");
        }
    } catch (error) {
        console.error(error);
    }
}