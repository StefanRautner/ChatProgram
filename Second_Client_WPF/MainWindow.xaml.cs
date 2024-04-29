//Autor: Stefan Rautner
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Threading;

namespace Second_Client_WPF
{
    public partial class MainWindow : Window
    {
        string userID = "";
        string chatID = "";
        string messageID = "";

        //Konstruktor
        public MainWindow(string userID)
        {
            InitializeComponent();

            this.userID = userID;

            //Chatnamen laden
            ShowNamesOfChats(userID);
        }

        //Konstruktor (von Chat & Message aus)
        public MainWindow(string userID, string chatID)
        {
            InitializeComponent();

            this.userID = userID;
            this.chatID = chatID;

            ShowNamesOfChats(userID);
        }

        //Funktion um alle 100ms die Chat-Nachrichten zu updaten
        private void UpdateChatInterval()
        {
            try
            {
                DispatcherTimer timer = new DispatcherTimer();
                timer.Interval = TimeSpan.FromSeconds(0.1);
                timer.Tick += UpdateChat;
                timer.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //ChatID updaten & anderen Chat anzeigen, um Chat zu Updaten
        async private void UpdateChat(object? sender, EventArgs e)
        {
            try
            {
                ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(chatID);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion zum Laden aller Chatnamen
        async public void ShowNamesOfChats(string userID)
        {
            try
            {
                ShowChats.ItemsSource = await VerbindungZuServer.Instance.ChatsNamenErhalten(userID);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        async private void ChangeChat(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                Chat_Model? chat = (Chat_Model?)ShowChats.SelectedItems[0];
                if (chat != null)
                {
                    this.chatID = chat.chatID;
                }
                ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(chatID);

                //Chat alle 10ms laden
                UpdateChatInterval();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Nachricht senden, wenn Senden-Knopf wurde gedrückt
        async private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            try
            {
                if (!await VerbindungZuServer.Instance.NachrichtHinzufuegen(chatID, MessageField.Text))
                {
                    MessageBox.Show("Nachricht konnte nicht hinzugefügt werden");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        async private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            try
            {
                if (e.Key == Key.Enter)
                {
                    //Methode zum Senden der Nachrichten aufrufen
                    if (!await VerbindungZuServer.Instance.NachrichtHinzufuegen(chatID, MessageField.Text))
                    {
                        MessageBox.Show("Nachricht konnte nicht hinzugefügt werden");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion um einen Chat zu updaten, löschen oder hinzufügen
        private void AddUpdateDeleteChat(object sender, RoutedEventArgs e)
        {
            try
            {
                ChatAddUpdateDelete chatUpdateAddDelete = new ChatAddUpdateDelete(userID, chatID);
                chatUpdateAddDelete.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //FUnktion um eine Nachricht zu updaten & löschen
        private void UpdateDeleteMessage(object sender, RoutedEventArgs e)
        {
            try
            {
                MessageDeleteUpdate messageDeleteUpdate = new MessageDeleteUpdate(userID, chatID, messageID);
                messageDeleteUpdate.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void NachrichtAusgewaehlt(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                Message_Model? message = (Message_Model?)ShowChats.SelectedItems[0];
                if (message != null)
                {
                    this.messageID = message.messageID;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}