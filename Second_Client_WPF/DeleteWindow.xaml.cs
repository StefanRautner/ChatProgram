using System.Diagnostics;
using System.Windows;
using System.Windows.Input;

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

        //Enter Überprüfen, um zu Überprüfen ob in Passwortfeld Enter gedrückt wurde
        async private void EnterUeberpruefen(object sender, KeyEventArgs e)
        {
            try
            {
                if (e.Key == Key.Enter)
                {
                    if(await VerbindungZuServer.Instance.DeleteUser(deleteName.Text, deletePassword.Password))
                    {
                        MessageBox.Show("Benutzer wurde gelöscht");
                    } else
                    {
                        MessageBox.Show("Benutzer existiert nicht");
                    }
                    deleteName.Text = "";
                    deletePassword.Password = "";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Löschen
        async private void Delete(object sender, RoutedEventArgs e)
        {
            try
            {
                if (await VerbindungZuServer.Instance.DeleteUser(deleteName.Text, deletePassword.Password))
                {
                    MessageBox.Show("Benutzer wurde gelöscht");
                }
                else
                {
                    MessageBox.Show("Benutzer existiert nicht");
                }
                deleteName.Text = "";
                deletePassword.Password = "";
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }
    }
}