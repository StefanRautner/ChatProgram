using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Second_Client_WPF
{
    internal class Chat
    {
        public string chatID { get; set; } = "";
        public string chatName{ get; set; } = "";
        public List<User>? userList { get; set; }
        public List<Message>? messageList { get; set; }
    }
}
