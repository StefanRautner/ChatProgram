/* Autor: Stefan Rautner */

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() !== '') {
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat', 'user');
        userMessage.innerHTML = '<div class="message">' + userInput + '</div>';
        chatBox.appendChild(userMessage);

        // Clear input field
        document.getElementById('user-input').value = '';

        // Send data to Spring Boot server
        sendDataToServer(userInput);
    }
}

function sendDataToServer(userInput) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/sendMessageToServer'); // Assuming the server endpoint is '/sendMessageToServer'
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Do nothing on successful sending
        }
    };
    const data = JSON.stringify({ userInput: userInput });
    xhr.send(data);
}

// Load previous chats on page load
window.onload = function() {
    loadChatsFromServer();
}

function loadChatsFromServer() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/loadChatsFromServer'); // Assuming the server endpoint is '/loadChatsFromServer'
    xhr.onload = function() {
        if (xhr.status === 200) {
            const chats = JSON.parse(xhr.responseText);
            chats.forEach(chat => {
                displayUserMessage(chat.message);
            });
        }
    };
    xhr.send();
}

function displayUserMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat', 'user');
    userMessage.innerHTML = '<div class="message">' + message + '</div>';
    chatBox.appendChild(userMessage);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
