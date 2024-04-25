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
    /// <summary>
    /// Interaktionslogik für DeleteWindow.xaml
    /// </summary>
    public partial class DeleteWindow : Window
    {
        public DeleteWindow()
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

        //Registrieren
        async private void Delete(object sender, RoutedEventArgs e)
        {
            try
            {
                string? message = await VerbindungZuServer.Instance.DeleteUser(deleteName.Text, deletePassword.Password);
                deleteName.Text = "";
                deletePassword.Password = "";
                MessageBox.Show(message);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }
    }
}