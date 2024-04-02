//Autor: Stefan Rautner
using RestSharp;
using System;
using System.Linq;
using System.Net.Http;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Documents;

namespace Second_Client_WPF
{
    class VerbindungZuServer
    {
        //Variablen definieren
        private RestClient client = new RestClient("http://localhost:8080/tinyWhatsApp");
        private int IDuser = 0;

        //Instance (Singleton)
        private static VerbindungZuServer? instance = null;
        public static VerbindungZuServer Instance { get { if (instance == null) { instance = new VerbindungZuServer(); } return instance; } }
        
        //Konstruktor
        private VerbindungZuServer()
        {
        }

        //nachricht hinzufügen
        async public void NachrichtHinzufuegen(string messageString, int IDchat)
        {
            RestRequest request = new RestRequest("/newMessage", Method.Post);
            var body = new
            {
                userID = IDuser,
                chatID = IDchat,
                message = messageString
            };
            request.AddJsonBody(body);
            await client.ExecuteAsync(request);
        }

        //Chat/Gruppe hinzufügen
        async public void ChatHinzufuegen(string nameChat)
        {
            RestRequest request = new RestRequest("/newChat", Method.Post);
            var body = new
            {
                userID = IDuser,
                chatName = nameChat
            };
            request.AddJsonBody(body);
            await client.ExecuteAsync(request);
        }

        //Names aller Chats/Gruppen erhalten
        async public Task<List<Chat>?> ChatsNamenErhalten(int IDuser)
        {
            this.IDuser = IDuser;
            RestRequest request = new RestRequest("/getChats", Method.Get);
            var body = new
            {
                userID = IDuser
            };
            request.AddJsonBody(body);
            RestResponse? response = await client.ExecuteAsync(request);
            string? content = response.Content;
            if (content != null)
            {
                return JsonSerializer.Deserialize<List<Chat>>(content);
            }
            return null;
        }

        //Nachrichten der ausgewählten Chats/der ausgewählten Gruppe anzeigen
        async public Task<List<Message>?> NachrichtenErhalten(int IDchat)
        {
            RestRequest request = new RestRequest("/getMessages", Method.Get);
            var body = new
            {
                userID = IDuser,
                chatID = IDchat
            };
            request.AddJsonBody(body);
            RestResponse? response = await client.ExecuteAsync(request);
            string? content = response.Content;
            if (content != null)
            {
                return JsonSerializer.Deserialize<List<Message>>(content);
            }
            return null;
        }

        //Nachrichten aktualisieren/updaten
        async public void NachrichtUpdaten(int IDchat, int IDmessage, string messageString)
        {
            RestRequest request = new RestRequest("/updateMessage", Method.Put);
            var body = new
            {
                userID = IDuser,
                chatID = IDchat,
                messageID = IDmessage,
                message = messageString
            };
            request.AddJsonBody(body);
            await client.ExecuteAsync(request);
        }

        //Nachricht/Chat löschen
        async public void NachrichtLoeschen(int IDchat, int IDmessage)
        {
            RestRequest request = new RestRequest("/deleteMessage", Method.Delete);

            var body = new
            {
                userID = IDuser,
                chatID = IDchat,
                messageID = IDmessage
            };
            request.AddJsonBody(body);
            await client.ExecuteAsync(request);
        }

        //Nachricht/Chat löschen
        async public void ChatLoeschen(int IDchat)
        {
            RestRequest request = new RestRequest("/deleteChat", Method.Delete);

            var body = new
            {
                userID = IDuser,
                chatID = IDchat
            };
            request.AddJsonBody(body);
            await client.ExecuteAsync(request);
        }

        //Benutzerdaten checken
        async public Task<int?> Login(string name, int passwort)
        {
            RestRequest request = new RestRequest("/checkUser", Method.Post);

            var body = new
            {
                username = name,
                password = passwort
            };
            request.AddJsonBody(body);
            RestResponse? response = await client.ExecuteAsync(request);
            string? content = response.Content;
            if (content != null)
            {
                return int.Parse(content);
            }
            return null;
        }

        //Benutzerdaten hinzufügen
        async public Task<int?> Register(string name, int passwort)
        {
            RestRequest request = new RestRequest("/newUser", Method.Post);

            var body = new
            {
                username = name,
                password = passwort
            };
            request.AddJsonBody(body);
            RestResponse? response = await client.ExecuteAsync(request);
            string? content = response.Content;
            if (content != null)
            {
                return int.Parse(content);
            }
            return null;
        }

        //Passwort ändern
        async public Task<int?> UpdateUser(string name, int passwort)
        {
            RestRequest request = new RestRequest("/updateUser", Method.Put);

            var body = new
            {
                username = name,
                password = passwort
            };
            request.AddJsonBody(body);
            RestResponse? response = await client.ExecuteAsync(request);
            string? content = response.Content;
            if(content != null)
            {
                return int.Parse(content);
            }
            return null;
        }
    }
}
