using ApiGatewayZMEJ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Services
{
    public interface INotificationService
    {
        Task SendEmail(SendEmail sendEmail);
    }
}
