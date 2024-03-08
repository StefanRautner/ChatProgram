using System.Configuration;
using System.Data;
using System.Windows;
using System.Windows.Controls;

namespace Second_Client_WPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            //Loginpage holen
            var pageLogin = new PageLogin();

            //Frame erstellen
            var mainFrame = new Frame();

            //Login Page als Frame setzen
            mainFrame.Navigate(pageLogin);

            //Startfenster erstellen/setzen
            MainWindow = new Window
            {
                Content = mainFrame
            };

            //Startfenster anzeigen
            MainWindow.Show();
        }
    }
}
