//Autor: Stefan Rautner
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public partial class RegisterWindow : Window
    {
        public RegisterWindow()
        {
            InitializeComponent();
        }

        //Einloggen
        private void Login(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }   

        //Registrieren
        async private void Register(object sender, RoutedEventArgs e)
        {
            try
            {
                int? tmpUserID = await VerbindungZuServer.Instance.Register(loginName.Text, loginPassword.Password.GetHashCode());
                if (tmpUserID != null)
                {
                    MainWindow mainWindow = new MainWindow((int)tmpUserID);
                    mainWindow.Show();
                    this.Close();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }

        //Passwort vergessen
        private void ForgotPassword(object sender, RoutedEventArgs e)
        {
            PasswordForgotWindow passwordForgotWindow = new PasswordForgotWindow();
            passwordForgotWindow.Show();
            this.Close();
        }
    }
}
