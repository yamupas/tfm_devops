using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Proxies.Commands
{
    public class SendEmailCommand
    {
        public string subject { get; set; }
        public List<EmailRecipient> emailRecipients { get; set; }
        public string body { get; set; }
    }
    public class EmailRecipient
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
