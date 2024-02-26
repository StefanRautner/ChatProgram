import threading
import socket
from cryptography.fernet import Fernet

# IP-Adresse und Port abrufen
host = socket.gethostbyname(socket.gethostname())
port = int(input("Geben Sie den Server-Port ein: "))

# Socket erstellen und binden
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((host, port))
server.listen()
clients = []  # Liste zur Verfolgung der verbundenen Clients
aliases = []  # Liste zur Zuordnung von Aliasnamen zu Clients

# Generiere einen Fernet-Schlüssel für die Verschlüsselung
key = Fernet.generate_key()
cipher_suite = Fernet(key)


# Funktion zum Senden von Nachrichten an alle Clients
def broadcast(message):
    for client in clients:
        client.send(cipher_suite.encrypt(message.encode('utf-8')))


# Funktion zur Behandlung der Verbindungen zu den Clients
def handle_client(client):
    while True:
        try:
            # Nachricht empfangen und entschlüsseln
            message = cipher_suite.decrypt(client.recv(1024)).decode('utf-8')
            broadcast(message)
        except:
            # Client hat die Verbindung unterbrochen
            index = clients.index(client)
            clients.remove(client)
            client.close()
            alias = aliases[index]
            broadcast(f'{alias} hat den Chat verlassen')
            aliases.remove(alias)
            break


# Hauptfunktion zum Empfangen von Client-Verbindungen
def receive():
    while True:
        print(f'Server läuft und hört auf {host}:{port} ...')
        client, address = server.accept()

        # Sende den Verschlüsselungsschlüssel an den Client
        client.sendall(key)

        # Verbindung mit Client aufbauen
        print(f'Verbindung hergestellt mit {str(address)}')
        client.send(cipher_suite.encrypt('alias?'.encode('utf-8')))
        alias = cipher_suite.decrypt(client.recv(1024)).decode('utf-8')
        aliases.append(alias)
        clients.append(client)
        print(f'Das Alias dieses Clients ist {alias}')
        broadcast(f'{alias} hat sich dem Chatraum angeschlossen')
        client.send(cipher_suite.encrypt('Sie sind jetzt verbunden'.encode('utf-8')))
        thread = threading.Thread(target=handle_client, args=(client,))
        thread.start()


# Main
if __name__ == "__main__":
    receive()
