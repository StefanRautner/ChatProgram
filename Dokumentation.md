# Dokumentation Semesterprojekt Rautner

## Softwaredesign (Architektur)

Das Chat-Programm wurde in einer Client-Client-Server-Architektur entwicklet, wobei der Client als WPF-Anwendung oder WebApp implementiert ist und diese beide mit dem Server (welcher auf Spring Boot basiert) kommunizieren. Die Daten werden in einer MongoDB-Datenbank gespeichert.

## Beschreibung der Software

Das Chat-Programm (tinyWhatsApp) ermöglicht es Benutzern miteinander in Echtzeit zu chatten. Es bietet eine benutzerfreundliche Oberfläche sowohl als Desktopanwendung (WPF) als auch als Webanwendung. Die Software überträgt die Daten natürlich verschlüsselt, sodass keiner Zugang zu den Benutzerdaten erhalten kann

##  API-Beschreibung

Der Spring-Boot Server basiert auf dem REST-Pinzip, dadurch ermöglicht er den Clients, Nachrichten zu senden, zu empfangen und vieles mehr. (Kein GET-Endpoint, da diese im Web keinen Body haben dürfen & ich mein System einheitlich halten wollte)
### Die Endpunkte umfassen:

<!-- Genereller Endpoint -->
<details>
  <summary>/tinyWhatsApp []</summary>
  
  **Beschreibung:** Dieser Endpunkt ist der generelle Endpoint der API, welcher vor dem jeweiligen spezifischen Endpoint geschrieben werden muss.
</details>
<!-- Benutzer -->
<details>
  <summary>/checkUser [POST]</summary>
  
  **Beschreibung:** Dieser Endpunkt wird verwendet, um die Zugangsdaten eines Benutzers zu überprüfen.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "password": "Beispiel-Passwort"
  }
  ```
</details>
<details>
  <summary>/newUser [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wird verwendet, um einen Neuen Benutzer anzulegen.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "password": "Beispiel-Passwort"
  }
  ```
</details>
<details>
  <summary>/updateUser [PUT]</summary>
  
  **Beschreibung:** Dieser Endpoint wird verwedent, um das Passwort eines Benutzers zu ändern.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "password": "Beispiel-Passwort"
  }
  ```
</details>
<details>
  <summary>/deleteUser [DELETE]</summary>
  
  **Beschreibung:** Dieser Endpoint wird verwendet, um einen Benutzer zu löschen.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "password": "Beispiel-Passwort"
  }
  ```
</details>
<!-- Chat -->
<details>
  <summary>/getChatNames [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um die Namen aller Chats eines Benutzers zu erhalten.
  
  **JSON-Body:**
  ```json
  {
    "userID": "Beispiel-userID"
  }
  ```
</details>
<details>
  <summary>/newChat [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um einen neuen Chat anzulegen.
  
  **JSON-Body:**
  ```json
  {
    "userID": "Beispiel-userID",
    "chatName": "Beispiel-Chatnamen"
  }
  ```
</details>
<details>
  <summary>/updateChatName [PUT]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um den Namen eines Chats zu aktualisieren.
  
  **JSON-Body:**
  ```json
  {
    "chatID": "Beispiel-chatID",
    "chatName": "Beispiel-Chatnamen"
  }
  ```
</details><details>
  <summary>/deleteChat [DELETE]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um einen Chat zu löschen.
  
  **JSON-Body:**
  ```json
  {
    "chatID": "Beispiel-chatID"
  }
  ```
</details>
<!-- Benutzer & Chat -->
<details>
  <summary>/addUserToChat [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um einen Benutzer zu einem Chat hinzuzufügen.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "chatID": "Beispiel-chatID"
  }
  ```
</details>
<details>
  <summary>/removeUserFromChat [DELETE]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um einen Benutzer aus einem Chat zu entfernen.
  
  **JSON-Body:**
  ```json
  {
    "username": "Beispiel-Benutzername",
    "chatID": "Beispiel-chatID"
  }
  ```
</details>
<!-- Nachrichten -->
<details>
  <summary>/getMessages [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um alle Nachrichten eines Chats zu erhalten.
  
  **JSON-Body:**
  ```json
  {
    "chatID": "Beispiel-chatID",
    "userID": "Beispiel-userID"
  }
  ```
</details>
<details>
  <summary>/newMessage [POST]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um eine neue Nachricht zum Chat hinzuzufügen.
  
  **JSON-Body:**
  ```json
  {
    "userID": "Beispiel-userID",
    "chatID": "Beispiel-chatID",
    "message": "Beispiel-Nachrichtentext"
  }
  ```
</details>
<details>
  <summary>/updateMessage [PUT]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um den Inhalt einer Nachricht zu aktualisieren (geht nur in den ersten 5 Minuten nch erstellen der Nachricht).
  
  **JSON-Body:**
  ```json
  {
    "userID": "Beispiel-userID",
    "chatID": "Beispiel-chatID",
    "messageID": "Beispiel-messageID",
    "message": "Beispiel-Nachrichtentext"
  }
  ```
</details>
<details>
  <summary>/deleteMessage [DELETE]</summary>
  
  **Beschreibung:** Dieser Endpoint wirde verwendet, um eine Nachricht aus einem Chat zu löschen.
  
  **JSON-Body:**
  ```json
  {
    "userID": "Beispiel-userID",
    "chatID": "Beispiel-chatID",
    "messageID": "Beispiel-messageID"
  }
  ```
</details>

## Verwendung der API

Unterhalb sind Codeblöcke, die das Login meines ChatProgramms darstellen

<details>
  <Summary>Spring-Boot Server</summary>

  **Beschreibung:** Login von dem Spring-Boot Server aus

  **Java-Endpoint:**
  ```java
    @PostMapping("/checkUser")
    public String checkUser(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.checkUser(jsonBody.getString("username"), jsonBody.getString("password"));
    }
  ```

  **Java-Backend:**
  ```java
    //UserID aus MongoDB erhalten
    public String checkUser(String username, String password) {
        User user = userRepository.findUserByUsernameAndPassword(username, this.encrypt(password));
        if (user != null) {
            return user.getUserID();
        }
        return null;
    }
  ```
</details>

<details>
  <Summary>WPF-Client</summary>

  **Beschreibung:** Login von dem WPF-Client aus

  **C#-Code:**
  ```csharp
    //Benutzerdaten überprüfen
    async public Task<string?> Login(string name, string passwort)
    {
      try
      {
        //Username & Passwort an den Server schicken
        RestRequest request = new RestRequest("/checkUser", Method.Post);
        var body = new
        {
          username = name,
          password = this.Hash(passwort)
        };
        request.AddJsonBody(body);

        //Antwort (userID oder "" erhalten)
        RestResponse? response = await client.ExecuteAsync(request);
        return response.Content;
      }
      catch (Exception ex)
      {
        //MessageBox zum Anzeigen der Error-Message
        MessageBox.Show(ex.Message);
      }
      return null;
    }
  ```
</details>

<details>
  <Summary>WebApp-Client</summary>

  **Beschreibung:** Login von dem WebApp-Client aus

  **JS-Code:**
 ```js
    //Benutzerdaten überprüfen
    async function checkUserExistence(event) {
      try {
        event.preventDefault();
        //Benutzername & Passwort erhalten
        const username = document.getElementById("usernameLogin").value;
        const password = document.getElementById("passwordLogin").value;

        //Überprüfen, ob die Url zum Server in localStorage gesetzt wurde
        if (localStorage.getItem('urlToSpringBootServer') !== null && localStorage.getItem('urlToSpringBootServer') !== "") {
          //Überprpfen, ob Benutzername & Passwort richtig eingegeben wurde
          if (username !== null && username !== "" && password !== null && password !== "") {
            //Anfrage an den Server senden
            const response = await fetch(`${localStorage.getItem('urlToSpringBootServer')}/checkUser`, {
              method: 'POST', body: JSON.stringify({
              'username': username, 'password': await hash(password)
              })
            });

            //Login-Form leeren
            document.getElementById("usernameLogin").value = "";
            document.getElementById("passwordLogin").value = "";

            //Antwort erhalten
            const data = await response.text();
            //Wenn userID und nicht "" erhalten, dann weiter zu Home
            if (data !== null && data !== "") {
              localStorage.setItem('userID', data);
              localStorage.setItem('webAppStatus', "active");
              window.location.href = '../home/home.html' + localStorage.  getItem('urlParameter');
            } else {
              //Anzeigen, dass Anmeldedaten falsch waren
              alert("Anmeldung fehlgeschlagen");
            }
          } else {
            //Anzeigen, dass Benutzername und/oder Passwort nicht eingegeben wurde
            alert("Bitte geben Sie einen Benutzernamen und Passwort ein");
          }
        } else {
          //Anzeigen, dass der Server nicht erreicht werden aknn (weil die Url fehlt)
          alert("Server konnte nicht erreicht werden");
        }
      } catch (error) {
        //Error in Console loggen
       console.error(error);
      }
    }
  ```
</details>

## Diskussion der Ergebnisse

### Zusammenfassung

### Hintergründe

### Ausblicke

## Diagramme

### Konfiguration zwischen den Clients, dem Server & der Datenbank
```mermaid
graph TD;
  A[WPF Client] <--> C[Spring Boot Server];
  B[Web-App Client] <--> C[Spring Boot Server];
  C[Spring Boot Server] <--> D[MongoDB Datenbank];
```

### Klassendiagramm des WPF-Clients
```mermaid
classDiagram
    Login *-- Home
    Regsiter *-- Home
    PasswordForgotten *-- Home
    Delete *-- Home
    Home *--o Chat
    Home *--o Message
```

### Klassendiagramm des WebApp-Clients
```mermaid
classDiagram
    Login-Register-PasswortForgotten-Delete *-- Home
    Home *-- Chat
    Home *-- Message
```

### Klassendiagramm des Spring-Boot Servers
```mermaid
classDiagram
    Application o-- ChatController
    ChatController o-- ChatService
    ChatService o-- Chat
    ChatService o-- ChatRepository
    ChatService o-- Message
    ChatService o-- MessageRepository
    ChatService o-- User
    ChatService o-- UserRepository
```

### Use-Cases Diagramm
```mermaid
graph TD;
    User --> |USE| Check-User;
    User --> |USE| New-User;
    User --> |USE| Update-User;
    User --> |USE| Delete-User;

    User --> |USE| Get-Chatnames;
    User --> |USE| New-Chat;
    User --> |USE| Update-Chat;
    User --> |USE| Delete-Chat;

    User --> |USE| Get-Messages;
    User --> |USE| Send-Messages;
    User --> |USE| Update-Messages;
    User --> |USE| Delete-Messages;

    User --> |USE| Add-User-To-Chat;
    User --> |USE| Remove-User-From-Chat;
```