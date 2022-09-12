using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Proxies.Commands;

namespace ZMEJ.Proxies
{
  public  interface IZMEJProxy
    {
        Task SendNotificationAsync(SendEmailCommand command);
    }
}
