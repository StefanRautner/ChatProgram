using System.Diagnostics;
using System.Windows;

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
        private void Register(object sender, RoutedEventArgs e)
        {
            try
            {
                RegisterWindow registerWindow = new RegisterWindow();
                registerWindow.Show();
                this.Close();
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