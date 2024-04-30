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

            //Chat(namen)-Anzeigen updaten
            UpdateChatInterval();
        }

        //Konstruktor (von Chat & Message aus)
        public MainWindow(string userID, string chatID)
        {
            InitializeComponent();

            this.userID = userID;
            this.chatID = chatID;

            //Chat(namen)-Anzeigen updaten
            UpdateChatInterval();
        }

        //Funktion um alle 100ms die Chat-Nachrichten zu updaten
        private void UpdateChatInterval()
        {
            try
            {
                DispatcherTimer updateMessagesOfChat = new DispatcherTimer();
                updateMessagesOfChat.Interval = TimeSpan.FromSeconds(0.05);
                updateMessagesOfChat.Tick += UpdateChatnamesAndMessages;
                updateMessagesOfChat.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Funktion zum Laden aller Chatnamen & erhalten der Nachrichten des aktuellen Chats
        async private void UpdateChatnamesAndMessages(object? sender, EventArgs e)
        {
            try
            {
                if (chatID != null && chatID != "")
                {
                    ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(chatID);
                }
                ShowChats.ItemsSource = await VerbindungZuServer.Instance.ChatsNamenErhalten(userID);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        private void ChangeChat(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                Chat_Model? chat = (Chat_Model?)ShowChats.SelectedItem;
                if (chat != null)
                {
                    this.chatID = chat.chatID;
                }
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
                MessageField.Text = "";
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
                    MessageField.Text = "";
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
                if (messageID != null && messageID != "" && chatID != null && chatID != "")
                {
                    MessageDeleteUpdate messageDeleteUpdate = new MessageDeleteUpdate(userID, chatID, messageID);
                    messageDeleteUpdate.Show();
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Bitte wählen Sie eine Nachricht aus");
                }
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
                Message_Model? message = (Message_Model?)ChatField.SelectedItem;
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