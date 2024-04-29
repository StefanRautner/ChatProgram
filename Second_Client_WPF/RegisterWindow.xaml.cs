//Autor: Stefan Rautner
using System.Windows;

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
            try
            {
                LoginWindow loginWindow = new LoginWindow();
                loginWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Registrieren
        async private void Register(object sender, RoutedEventArgs e)
        {
            try
            {
                string? tmpUserID = await VerbindungZuServer.Instance.Register(registerName.Text, registerPassword.Password);
                registerName.Text = "";
                registerPassword.Password = "";
                if (tmpUserID != null && tmpUserID != "")
                {
                    MainWindow mainWindow = new MainWindow(tmpUserID);
                    mainWindow.Show();
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Benutzer existíert bereits");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Passwort vergessen
        private void ForgotPassword(object sender, RoutedEventArgs e)
        {
            try
            {
                PasswordForgotWindow passwordForgotWindow = new PasswordForgotWindow();
                passwordForgotWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Konto löschen
        private void DeleteAccount(object sender, RoutedEventArgs e)
        {
            try
            {
                DeleteWindow deleteWindow = new DeleteWindow();
                deleteWindow.Show();
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
