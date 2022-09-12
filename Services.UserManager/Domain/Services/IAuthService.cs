using DataManagement.Common.Auth;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface IAuthService
    {

        Task<IdentityResult> RegisterAsync(string email, string username, string password, string name, Guid OrganisationId);
        Task<AspNetUser> LoginAsync(string email, string password);
        Task<AspNetUser> LoginAppAsync(string email, string password,Guid ApplicationId);

        //Login Directorio activo
        Task<AspNetUser> LoginADAsync(string email, string password, Guid ApplicationId);

        //Task ConfirmEmail(Guid userid, string code);

        Task ForgotPassword(string email);
        Task<AspNetUser> FindByIdAsync(Guid userId);
        AspNetUser GetById(Guid userId);
        Task ResetPassword(string email, string Code, string password);

        Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid UserId, Guid ApplicationId);


    }
}
