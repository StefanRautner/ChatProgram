//Autor: Stefan rautner
using System.Windows;
using System.Windows.Input;

namespace Second_Client_WPF
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            //Methode zum Laden der Nachrichten & Chats Überprüfen
            VerbindungZuServer.Instance.NachrichtenErhalten(/*<USER ID, WELCHE BEIM EINLOGGEN ERHALTEN WIRD>*/0);
        }

        //Nachricht senden Knopf wurde gedrückt
        private void NachrichtSenden(object sender, RoutedEventArgs e)
        {
            //Methode zum Senden der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, ShowChats.Selected);
        }
        
        //Enter Überprüfen, um zu Überprüfen ob in Nachrichtenfeld Enter gedrückt wurde
        private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                //Methode zum Senden der Nachrichten aufrufen
                VerbindungZuServer.Instance.NachrichtHinzufuegen(MessageField.Text, ShowChats.Selected);
            }
        }

        private void NachrichtUpdaten()
        {
            //Methode zum Aktualisieren/Updaten der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtUpdaten(CHATID, MESSAGEID, MessageField.Text);
        }

        private void NachrichtLoeschen()
        {
            //Methode zum Löschen der Nachrichten aufrufen
            VerbindungZuServer.Instance.NachrichtLoeschen(CHATID, MESSAGEID);
        }
    }
}
//Login, etc. fehlt (dadurch userid nicht vorhanden, und dadurch wiederum keine Daten vorhanden)
//Rückgabewert in VerbindungZuServer in Klassen parsen (dadurch leichtere Struktur) Liste von Chat-Klasse, indesse Liste von Nachrichten-Klasse
