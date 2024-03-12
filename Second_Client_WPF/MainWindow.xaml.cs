//Autor: Stefan rautner
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Second_Client_WPF
{
    public partial class MainWindow : Window
    {

        public MainWindow()
        {
            InitializeComponent();
        }

        public MainWindow(int userID)
        {
            InitializeComponent();

            //Methode zum Laden der Nachrichten & Chats Überprüfen
           ShowChats.ItemsSource = VerbindungZuServer.Instance.ChatsNamenErhalten(userID);
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        private void ChangeChat(object sender, SelectionChangedEventArgs e)
        {
            ChatField.ItemsSource = VerbindungZuServer.Instance.NachrichtenErhalten(ShowChats.SelectedIndex);
        }

        //Nachricht senden, wenn Senden-Knopf wurde gedrückt
        private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, ShowChats.SelectedIndex);
        }
        
        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                //Methode zum Senden der Nachrichten aufrufen
                VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, ShowChats.SelectedIndex);
            }
        }

        //Funktion um Nachricht zu aktualisieren
        private void NachrichtUpdaten(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.NachrichtUpdaten(ShowChats.SelectedIndex, ChatField.SelectedIndex, MessageField.Text);
        }

        //Funktion zum Löschen einer Nachricht
        private void NachrichtLoeschen(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.NachrichtLoeschen(ShowChats.SelectedIndex, ChatField.SelectedIndex);
        }

        //Funktion um Chat zu Löschen
        private void ChatLoeschen(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.ChatLoeschen(ShowChats.SelectedIndex);
        }

        //Funktion un Chat hinzuzufügen
        private void ChatHinzufuegen()
        {
            VerbindungZuServer.Instance.ChatHinzufuegen(CHATNAME);
        }
    }
}