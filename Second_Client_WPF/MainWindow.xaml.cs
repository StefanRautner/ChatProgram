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

        public MainWindow(string userID)
        {
            InitializeComponent();

            ShowMessagesFromChat(userID);
        }

        //Funktion zum Laden aller Chatnamen
        async public void ShowMessagesFromChat(string userID)
        {
            while(true)
            {
                ShowChats.ItemsSource = await VerbindungZuServer.Instance.ChatsNamenErhalten(userID);
            }
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        async private void ChangeChat(object sender, SelectionChangedEventArgs e)
        {
            ChatField.ItemsSource = await VerbindungZuServer.Instance.NachrichtenErhalten(ShowChats.SelectedIndex);
        }

        //Nachricht senden, wenn Senden-Knopf wurde gedrückt
        async private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            bool? erfolgreich = await VerbindungZuServer.Instance.NachrichtHinzufuegen(ShowChats.SelectedIndex, MessageField.Text);             //CHATID ANDERS HOLEN
        }
        
        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        async private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                //Methode zum Senden der Nachrichten aufrufen
                bool? erfolgreich = await VerbindungZuServer.Instance.NachrichtHinzufuegen(ShowChats.SelectedIndex, MessageField.Text);         //CHATID ANDERS HOLEN
            }
        }

        //Funktion um Nachricht zu aktualisieren
        async private void NachrichtUpdaten(object sender, RoutedEventArgs e)
        {
            bool? erfolgreich = await VerbindungZuServer.Instance.NachrichtUpdaten(ShowChats.SelectedIndex, ChatField.SelectedIndex, MessageField.Text);
        }

        //Funktion zum Löschen einer Nachricht
        async private void NachrichtLoeschen(object sender, RoutedEventArgs e)
        {
            bool? erfolgreich = await VerbindungZuServer.Instance.NachrichtLoeschen(ShowChats.SelectedIndex, ChatField.SelectedIndex);
        }

        //Funktion um Chat zu Löschen
        async private void ChatLoeschen(object sender, RoutedEventArgs e)
        {
            bool? erfolgreich = await VerbindungZuServer.Instance.ChatLoeschen(ShowChats.SelectedIndex);
        }

        //Funktion un Chat hinzuzufügen
        async private void ChatHinzufuegen(object sender, RoutedEventArgs e)
        {
            bool? erfolgreich = await VerbindungZuServer.Instance.ChatHinzufuegen(newChat.Text);
        }
    }
}