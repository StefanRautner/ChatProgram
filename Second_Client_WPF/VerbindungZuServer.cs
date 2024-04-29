//Autor: Stefan Rautner
using RestSharp;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Windows;

namespace Second_Client_WPF
{
    class VerbindungZuServer
    {
        //Variablen definieren
        private RestClient client = new RestClient("http://localhost:8080/tinyWhatsApp");
        private string IDuser = "";

        //Instance (Singleton)
        private static VerbindungZuServer? instance = null;
        public static VerbindungZuServer Instance { get { if (instance == null) { instance = new VerbindungZuServer(); } return instance; } }

        //Verschlüsselung-Schlüssel
        byte[] key = Encoding.UTF8.GetBytes("g9F@3H#kdE7q8nT$S!zG5*bW+mY2p^Vh");

        //Konstruktor
        private VerbindungZuServer()
        {
        }

        //Nachricht hinzufügen
        async public Task<bool> NachrichtHinzufuegen(string IDchat, string messageString)
        {
            try
            {
                RestRequest request = new RestRequest("/newMessage", Method.Post);
                var body = new
                {
                    userID = IDuser,
                    chatID = IDchat,
                    message = messageString
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Chat/Gruppe hinzufügen
        async public Task<bool> ChatHinzufuegen(string nameChat)
        {
            try
            {
                RestRequest request = new RestRequest("/newChat", Method.Post);
                var body = new
                {
                    userID = IDuser,
                    chatName = nameChat
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Names aller Chats/Gruppen erhalten
        async public Task<List<Chat_Model>?> ChatsNamenErhalten(string IDuser)
        {
            this.IDuser = IDuser;
            try
            {
                RestRequest request = new RestRequest("/getChatNames", Method.Post);
                var body = new
                {
                    userID = IDuser
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                string? content = response.Content;
                if (content != null)
                {
                    return JsonSerializer.Deserialize<List<Chat_Model>>(content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //Nachrichten der ausgewählten Chats/der ausgewählten Gruppe anzeigen
        async public Task<List<Message_Model>?> NachrichtenErhalten(string IDchat)
        {
            try
            {
                RestRequest request = new RestRequest("/getMessages", Method.Post);
                var body = new
                {
                    chatID = IDchat,
                    userID = IDuser
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                string? content = response.Content;
                if (content != null)
                {
                    return JsonSerializer.Deserialize<List<Message_Model>>(content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //Nachrichten aktualisieren/updaten
        async public Task<bool> NachrichtUpdaten(string IDchat, string IDmessage, string messageString)
        {
            try
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
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Nachricht/Chat löschen
        async public Task<bool> NachrichtLoeschen(string IDchat, string IDmessage)
        {
            try
            {
                RestRequest request = new RestRequest("/deleteMessage", Method.Delete);
                var body = new
                {
                    userID = IDuser,
                    chatID = IDchat,
                    messageID = IDmessage
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Nachricht/Chat löschen
        async public Task<bool> ChatLoeschen(string IDchat)
        {
            try
            {
                RestRequest request = new RestRequest("/deleteChat", Method.Delete);
                var body = new
                {
                    chatID = IDchat
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Benutzerdaten checken
        async public Task<string?> Login(string name, string passwort)
        {
            try
            {
                RestRequest request = new RestRequest("/checkUser", Method.Post);
                var body = new
                {
                    username = name,
                    password = this.Encrypt(passwort)
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                return response.Content;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //Benutzerdaten hinzufügen
        async public Task<string?> Register(string name, string passwort)
        {
            try
            {
                RestRequest request = new RestRequest("/newUser", Method.Post);
                var body = new
                {
                    username = name,
                    password = this.Encrypt(passwort)
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                return response.Content;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //Passwort ändern
        async public Task<string?> UpdateUser(string name, string passwort)
        {
            try
            {
                RestRequest request = new RestRequest("/updateUser", Method.Put);
                var body = new
                {
                    username = name,
                    password = this.Encrypt(passwort)
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                return response.Content;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //User löchen
        async public Task<string?> DeleteUser(string name, string passwort)
        {
            try
            {
                RestRequest request = new RestRequest("/deleteUser", Method.Delete);
                var body = new
                {
                    username = name,
                    password = this.Encrypt(passwort)
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                return response.Content;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }

        //Beutzer zu Chat hinzufügen
        async public Task<bool> AddUserToChat(string IDchat, string username)
        {
            try
            {
                RestRequest request = new RestRequest("/addUserToChat", Method.Post);
                var body = new
                {
                    username = username,
                    chatID = IDchat
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Benutzer von Chat entfernen
        async public Task<bool> RemoveUserFromChat(string IDchat, string username)
        {
            try
            {
                RestRequest request = new RestRequest("/removeUserFromChat", Method.Post);
                var body = new
                {
                    username = username,
                    chatID = IDchat
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //Chatnamen updaten
        async public Task<bool> UpdateChatName(string IDchat, string nameChat)
        {
            try
            {
                RestRequest request = new RestRequest("/updateChatName", Method.Put);
                var body = new
                {
                    chatID = IDchat,
                    chatName = nameChat
                };
                request.AddJsonBody(body);
                RestResponse? response = await client.ExecuteAsync(request);
                if (response.Content != null)
                {
                    return bool.Parse(response.Content);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return false;
        }

        //AES Verschlüsselungs Algorithmus
        public string? Encrypt(string password)
        {
            try
            {
                byte[] ivBytes = new byte[16];

                using (Aes aes = Aes.Create())
                {
                    aes.KeySize = 256;
                    aes.BlockSize = 128;
                    aes.Key = key;
                    aes.IV = ivBytes;
                    aes.Mode = CipherMode.CBC;
                    aes.Padding = PaddingMode.PKCS7;

                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                    byte[] encryptedPasssword = encryptor.TransformFinalBlock(passwordBytes, 0, passwordBytes.Length);

                    //IV und verschlüsseltes-Passwort verketten
                    byte[] combinedBytes = new byte[ivBytes.Length + encryptedPasssword.Length];
                    Buffer.BlockCopy(ivBytes, 0, combinedBytes, 0, ivBytes.Length);
                    Buffer.BlockCopy(encryptedPasssword, 0, combinedBytes, ivBytes.Length, encryptedPasssword.Length);

                    //Bytes zu String konvertieren
                    return Convert.ToBase64String(combinedBytes);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }
    }
}
//Chat-ID wird nicht richtig erhalten(angezeigt, verarbeitet)