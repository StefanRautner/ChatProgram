using System.Windows;

namespace Second_Client_WPF
{
    /// <summary>
    /// Interaktionslogik für MessageDeleteUpdate.xaml
    /// </summary>
    public partial class MessageDeleteUpdate : Window
    {
        string userID = "";
        string chatID = "";
        string messageID = "";
        public MessageDeleteUpdate(string userID, string chatID, string messageID)
        {
            this.userID = userID;
            this.chatID = chatID;
            this.messageID = messageID;
            InitializeComponent();
        }

        //Funktion um Nachricht zu aktualisieren
        async private void NachrichtUpdaten(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.NachrichtUpdaten(chatID, messageID, NeueNachricht.Text))
                {
                    MessageBox.Show("Nachricht existiert schon zu lange");
                } else
                {
                    GoToMainWindow(sender, e);
                    MessageBox.Show("Nachricht wurde erfolgreich aktualisiert");
                }
                NeueNachricht.Text = "";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion zum Löschen einer Nachricht
        async private void NachrichtEntfernen(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.NachrichtLoeschen(chatID, messageID))
                {
                    MessageBox.Show("Nachricht konnte nicht entfernt werden");
                } else
                {
                    GoToMainWindow(sender, e);
                    MessageBox.Show("Nachricht wurde erfolgreich entfernt");
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
