using System;
using System.Collections.Generic;
using System.Text;

namespace DataManagement.Common.Models
{
   public class General_Log
    {
        public DateTime event_time { get; set ; }
        public string username { get; set; }
        public string argument { get; set; }

        public General_Log(string UserName, string Argument)
        {
            event_time = DateTime.Now;
            username = UserName;
            argument = Argument;

        }
    }
}
