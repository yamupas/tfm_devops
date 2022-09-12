using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class UserRoleApplicationService : IUserRoleApplicationService
    {
        private IUserRoleApplicationRepository _repository;

        public UserRoleApplicationService(IUserRoleApplicationRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> AddRoleForUser(UserRoleApplication userRoleApplication)
        {
            return await _repository.AddRoleForUser(userRoleApplication);
        }

        public async Task<bool> DeleteRoleForUser(Guid UserId, Guid ApplicationId)
        {
            return await _repository.DeleteRoleForUser(UserId, ApplicationId);
        }
    }
}
