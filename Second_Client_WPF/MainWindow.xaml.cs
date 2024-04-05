//Autor: Stefan Rautner
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Threading;

namespace Second_Client_WPF
{
    public partial class MainWindow : Window
    {
        List<Message>? messages = null;
        string chatID = "";
        string messageID = "";

        public MainWindow()
        {
            InitializeComponent();
        }

        public MainWindow(string userID)
        {
            InitializeComponent();

            ShowMessagesFromChat(userID);

            //Alle 100ms den Chat updaten
            DispatcherTimer timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromSeconds(0.1);
            timer.Tick += UpdateChat;
            timer.Start();
        }

        //ChatID updaten & anderen Chat anzeigen, um Chat zu Updaten
        async private void UpdateChat(object? sender, EventArgs e)
        {
            ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(chatID);
        }

        //Funktion zum Laden aller Chatnamen
        async public void ShowMessagesFromChat(string userID)
        {
            ShowChats.ItemsSource = await VerbindungZuServer.Instance.ChatsNamenErhalten(userID);
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        async private void ChangeChat(object sender, SelectionChangedEventArgs e)
        {
            Chat? chat = (Chat?)ShowChats.SelectedItems[0];
            if(chat != null)
            {
                this.chatID = chat.chatID;
            }
            ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(chatID);
        }

        //Nachricht senden, wenn Senden-Knopf wurde gedrückt
        async private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            if(!await VerbindungZuServer.Instance.NachrichtHinzufuegen(chatID, MessageField.Text))
            {
                MessageBox.Show("Nachricht konnte nicht hinzugefügt werden");
            }
        }
        
        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        async private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                //Methode zum Senden der Nachrichten aufrufen
                if(!await VerbindungZuServer.Instance.NachrichtHinzufuegen(chatID, MessageField.Text))
                {
                    MessageBox.Show("Nachricht konnte nicht hinzugefügt werden");
                }
            }
        }

        //Funktion um einen Chat zu updaten, löschen oder hinzufügen
        private void AddUpdateDeleteChat(object sender, RoutedEventArgs e)
        {
            ChatAddUpdateDelete chatUpdateAddDelete = new ChatAddUpdateDelete(chatID);
            chatUpdateAddDelete.Show();
            this.Close();
        }

        //FUnktion um eine Nachricht zu updaten & löschen
        private void UpdateDeleteMessage(object sender, RoutedEventArgs e)
        {
            MessageDeleteUpdate messageDeleteUpdate = new MessageDeleteUpdate(chatID, messageID);
            messageDeleteUpdate.Show();
            this.Close();
        }

        private void NachrichtAusgewaehlt(object sender, SelectionChangedEventArgs e)
        {
            Message? message = (Message?)ShowChats.SelectedItems[0];
            if (message != null)
            {
                this.messageID = message.messageID;
            }
        }
    }
}