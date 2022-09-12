using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
   public interface IApplicationRoleService
    {
        Task<bool> AddRole(ApplicationRole applicationRole);
        Task<ApplicationRole> ValidateRole(ApplicationRole applicationRole);
        Task<bool> DeleRole(ApplicationRole applicationRole);
        Task<List<Roles>> GetRoles(Guid ApplicactionId);
    }
}
