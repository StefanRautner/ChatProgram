//Autor: Stefan Rautner
using System.Windows;

namespace Second_Client_WPF
{
    public partial class ChatAddUpdateDelete : Window
    {
        string userID = "";
        string chatID = "";
        public ChatAddUpdateDelete(string userID, string chatID)
        {
            this.userID = userID;
            this.chatID = chatID;
            InitializeComponent();
        }

        //Funktion um Chat zu Löschen
        async private void ChatLoeschen(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.ChatLoeschen(chatID))
                {
                    MessageBox.Show("Chat konnte nicht entfernt werden");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion un Chat hinzuzufügen
        async private void ChatHinzufuegen(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.ChatHinzufuegen(ChatName.Text))
                {
                    MessageBox.Show("Chat konnte nicht hinzugefügt werden");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion um Chatnamen zu updaten
        async private void ChatUpdaten(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.UpdateChatName(chatID, ChatName.Text))
                {
                    MessageBox.Show("Chatname konnte nicht aktulisiert werden");
                }
            }
            catch (Exception ex)
            {
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        //Funktion um Benutzer zu Chat hinzufügen
        async private void BenutzerZuChatHinzufuegen(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.AddUserToChat(chatID, UserName.Text))
                {
                    MessageBox.Show("Benutzer konnte nicht zum Chat hinzugefügt werden");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion um Benutzer vom CHat zu entfernen
        async private void BenutzerAusChatEntfernen(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.RemoveUserFromChat(chatID, UserName.Text))
                {
                    MessageBox.Show("Benutzer konnte nicht aus dem Chat entfernt werden");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion um zum Chatfenster zurück zu kommen
        private void GoToMainWindow(object sender, RoutedEventArgs e)
        {
            try
            {
                MainWindow mainWindow = new MainWindow(userID, chatID);
                mainWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
