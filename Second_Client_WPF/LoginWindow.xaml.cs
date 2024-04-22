//Autor: Stefan rautner
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Second_Client_WPF
{
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        //Einloggen
        async private void Login(object sender, RoutedEventArgs e)
        {
            try
            {
                string? tmpUserID = await VerbindungZuServer.Instance.Login(loginName.Text, loginPassword.Password);
                if (tmpUserID != null)
                {
                    MainWindow mainWindow = new MainWindow(tmpUserID);
                    mainWindow.Show();
                    this.Close();
                } else
                {
                    MessageBox.Show("Anmeldung fehlgeschlagen");
                }
            } catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }

        //Registrieren
        private void Register(object sender, RoutedEventArgs e)
        {
            RegisterWindow registerWindow = new RegisterWindow();
            registerWindow.Show();
            this.Close();
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
