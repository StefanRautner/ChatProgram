//Autor: Stefan Rautner
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Second_Client_WPF
{
    class VerbindungZuServer
    {
        //Variablen definieren
        private RestClient client = new RestClient("https://your-spring-boot-server-url.com");
        private int IDuser = 0;

        //Instance (Singleton)
        private static VerbindungZuServer? instance = null;
        public static VerbindungZuServer Instance { get { if (instance == null) { instance = new VerbindungZuServer(); } return instance; } }
        
        //Konstruktor
        private VerbindungZuServer()
        {
        }

        public void NachrichtHinzufuegen(string messageString, int IDchat)
        {
            RestRequest request = new RestRequest("/newMessage", Method.Post);
            var body = new
            {
                userID = IDuser,
                chatID = IDchat,
                message = messageString
            };
            request.AddJsonBody(body);
            client.Execute(request);
        }

        public string NachrichtenErhalten(int IDuser)
        {
            this.IDuser = IDuser;
            RestRequest request = new RestRequest("/getData", Method.Get);
            var body = new
            {
                userID = IDuser
            };
            request.AddJsonBody(body);
            return client.Execute(request);
        }

        //Nachrichten aktualisieren/updaten
        public void NachrichtUpdaten(int IDchat, int IDmessage, string messageString)
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
            client.Execute(request);
        }

        //Nachricht/Chat löschen
        public void NachrichtLoeschen(int IDchat, int IDmessage)
        {
            RestRequest request = new RestRequest("/deleteData", Method.Delete);

            var body = new
            {
                userID = IDuser,
                chatID = IDchat,
                messageID = IDmessage
            };
            request.AddJsonBody(body);
            client.Execute(request);
        }
    }
}
