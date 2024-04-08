//Autor: Stefan Rautner
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
    public partial class ChatAddUpdateDelete : Window
    {
        string chatID = "";
        public ChatAddUpdateDelete(string chatID)
        {
            this.chatID = chatID;
            InitializeComponent();
        }

        //Funktion um Chat zu Löschen
        async private void ChatLoeschen(object sender, RoutedEventArgs e)
        {
            if (!await VerbindungZuServer.Instance.ChatLoeschen(chatID))
            {
                MessageBox.Show("Chat konnte nicht entfernt werden");
            }
        }

        //Funktion un Chat hinzuzufügen
        async private void ChatHinzufuegen(object sender, RoutedEventArgs e)
        {
            if (!await VerbindungZuServer.Instance.ChatHinzufuegen(userID, ChatName.Text))
            {
                MessageBox.Show("Chat konnte nicht hinzugefügt werden");
            }
        }

        //Funktion um Chatnamen zu updaten
        async private void ChatUpdaten(object sender, RoutedEventArgs e)
        {
            if(!await VerbindungZuServer.Instance.UpdateChatName(chatID, ChatName.Text))
            {
                MessageBox.Show("Chatname konnte nicht aktulisiert werden");
            }
        }

        //Funktion um Benutzer zu Chat hinzufügen
        async private void BenutzerZuChatHinzufuegen(object sender, RoutedEventArgs e)
        {
            if(!await VerbindungZuServer.Instance.AddUserToChat(chatID, UserName.Text))
            {
                MessageBox.Show("Benutzer konnte nicht zum Chat hinzugefügt werden");
            }
        }

        //Funktion um Benutzer vom CHat zu entfernen
        async private void BenutzerAusChatEntfernen(object sender, RoutedEventArgs e)
        {
            if(!await VerbindungZuServer.Instance.RemoveUserFromChat(chatID, UserName.Text))
            {
                MessageBox.Show("Benutzer konnte nicht aus dem Chat entfernt werden");
            }
        }
    }
}
