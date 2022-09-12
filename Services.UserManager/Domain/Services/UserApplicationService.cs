using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class UserApplicationService : IUserApplicationService
    {
        private IUserApplicationRepository _userApplicationRepository;

        public UserApplicationService(IUserApplicationRepository userApplicationRepository)
        {
            _userApplicationRepository = userApplicationRepository;

        }
        public async Task<bool> Add(AspNetUserApplication aspNetUserApplication)
        {
            return await _userApplicationRepository.Add(aspNetUserApplication);
        }

        public async Task<bool> delete(AspNetUserApplication aspNetUserApplication)
        {
            return await _userApplicationRepository.delete(aspNetUserApplication);
        }

        public async Task<AspNetUserApplication> Validate(Guid UserId, Guid ApplicationId)
        {
            return await _userApplicationRepository.Validate(UserId, ApplicationId);
        }
    }
}
