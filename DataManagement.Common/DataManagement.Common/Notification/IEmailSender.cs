using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataManagement.Common.Notification
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendAsync(IEnumerable<EmailRecipient> recipients, string subject, string body);
    }
}
