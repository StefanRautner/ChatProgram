//Autor: Stefan rautner
using System.Windows;
using System.Windows.Input;

namespace Second_Client_WPF
{
    public partial class MainWindow : Window
    {
        //Variablen definieren
        public int chatID = 0;
        private int messageID = 0;

        public MainWindow()
        {
            InitializeComponent();

            //Methode zum Laden der Nachrichten & Chats Überprüfen
           ShowChats.ItemsSource = VerbindungZuServer.Instance.NachrichtenErhalten(USERID);
        }

        //ChatID updaten & anderen Chat anzeigen, wenn Chat gewechselt wird
        private void ChangeChat(object sender, RoutedEventArgs e)
        {
            chatID = ShowChats.Selected;
            ChatField.ItemsSource = VerbindungZuServer.Instance.NachrichtenErhalten(chatID);
        }

        private void NachrichtAusgewaehlt(object sender, RoutedEventArgs e)
        {
            messageID = ChatField.Selected;
        }

        //Nachricht senden Knopf wurde gedrückt
        private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            //Methode zum Senden der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, chatID);
        }
        
        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                //Methode zum Senden der Nachrichten aufrufen
                VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, chatID);
            }
        }

        private void NachrichtUpdaten()
        {
            //Methode zum Aktualisieren/Updaten der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtUpdaten(chatID, messageID, MessageField.Text);
        }

        private void NachrichtLoeschen()
        {
            //Methode zum Löschen der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtLoeschen(chatID, messageID);
        }
    }
}
//Login, etc. fehlt (dadurch userid nicht vorhanden, und dadurch wiederum keine Daten vorhanden)
//Rückgabewert in VerbindungZuServer in Klassen parsen (dadurch leichtere Struktur) Liste von Chat-Klasse, indesse Liste von Nachrichten-Klasse
