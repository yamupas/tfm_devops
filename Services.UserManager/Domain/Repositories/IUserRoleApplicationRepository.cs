using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
   public interface IUserRoleApplicationRepository
    {
        Task<bool> AddRoleForUser(UserRoleApplication userRoleApplication);
        Task<bool> DeleteRoleForUser(Guid UserId, Guid ApplicationId);
    }
}
