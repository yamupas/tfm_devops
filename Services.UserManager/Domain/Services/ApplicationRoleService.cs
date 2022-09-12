using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class ApplicationRoleService : IApplicationRoleService
    {
        private IApplicationRoleRepository _repository;

        public ApplicationRoleService(IApplicationRoleRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> AddRole(ApplicationRole applicationRole)
        {
            return await _repository.AddRole(applicationRole);
        }

        public async Task<bool> DeleRole(ApplicationRole applicationRole)
        {
            return await _repository.DeleRole(applicationRole);
        }

        public async Task<List<Roles>> GetRoles(Guid ApplicactionId)
        {
            return await _repository.GetRoles(ApplicactionId);
        }

        public async Task<ApplicationRole> ValidateRole(ApplicationRole applicationRole)
        {
            return await _repository.ValidateRole(applicationRole);
        }
    }
}
