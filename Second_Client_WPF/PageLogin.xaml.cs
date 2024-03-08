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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Second_Client_WPF
{
    /// <summary>
    /// Interaktionslogik für Page1.xaml
    /// </summary>
    public partial class PageLogin : Page
    {
        public PageLogin()
        {
            InitializeComponent();
        }

        //Einloggen
        private void Login(object sender, RoutedEventArgs e)
        {
            int? tmpUserID = VerbindungZuServer.Instance.Login(loginName.Text, loginPassword.Password.GetHashCode());
            if (tmpUserID != null)
            {
                MainWindow mainWindow = new MainWindow((int)tmpUserID);
                mainWindow.Show();
                Window.GetWindow(this).Close();
            }
        }

        //Registrieren
        private void Register(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.Register(loginName.Text, loginPassword.Password.GetHashCode());
        }

        //Passwort vergessen
        private void ForgotPassword(object sender, RoutedEventArgs e)
        {
            VerbindungZuServer.Instance.UpdateUser(loginName.Text, loginPassword.Password.GetHashCode());
        }
    }
}
