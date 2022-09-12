using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Models
{
    public class SendEmail
    {
        public string subject { get; set; }
        public List<EmailRecipient> emailRecipients = new List<EmailRecipient>();// { get; set; }
        public string body { get; set; }

    }
}
