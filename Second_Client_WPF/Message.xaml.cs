using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Second_Client_WPF
{
    /// <summary>
    /// Interaktionslogik für MessageDeleteUpdate.xaml
    /// </summary>
    public partial class MessageDeleteUpdate : Window
    {
        string chatID = "";
        string messageID = "";
        public MessageDeleteUpdate(string chatID, string messageID)
        {
            this.chatID = chatID;
            this.messageID = messageID;
            InitializeComponent();
        }

        //Funktion um Nachricht zu aktualisieren
        async private void NachrichtUpdaten(object sender, RoutedEventArgs e)
        {
            if (!await VerbindungZuServer.Instance.NachrichtUpdaten(chatID, messageID, NeueNachricht.Text))
            {
                MessageBox.Show("Nachricht konnte nicht aktualisiert werden");
            }
        }

        //Funktion zum Löschen einer Nachricht
        async private void NachrichtEntfernen(object sender, RoutedEventArgs e)
        {
            if (!await VerbindungZuServer.Instance.NachrichtLoeschen(chatID, messageID))
            {
                MessageBox.Show("Naxhricht konnte nicht entfernt werden");
            }
        }
    }
}
