using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface ILdapAuthenticationService
    {
        Task<AspNetUser> Login(string UserName, string Passord);
    }
}
