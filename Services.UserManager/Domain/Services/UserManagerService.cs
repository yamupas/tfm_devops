using Services.UserManager.Domain.Dtos;
using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class UserManagerService : IUserManagerService
    {
        private IUserRepository _repository;

        public UserManagerService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<AspNetUser> AddAsync(AspNetUser user)
        {
            return await _repository.AddAsync(user);
        }

        public async  Task<AspNetUser> ChangePasswordAsync(AspNetUser user)
        {
            return await _repository.ChangePasswordAsync(user);
        }

        public async Task<bool> ConfirmEmailAsync(Guid userId, string code)
        {
            return await _repository.ConfirmEmailAsync(userId, code);
        }

        public async Task<ICollection<UserDto>> GetAllAsync(Guid organisationId)
        {
            return await _repository.GetAllAsync(organisationId);
        }

        public async Task<ICollection<AspNetUser>> GetAllByApplicationIdAsync(Guid applicationId)
        {
            return await _repository.GetAllByApplicationIdAsync(applicationId);
        }

        public async Task<ICollection<AspNetUser>> GetAllByRolesAsync(Guid organisationId, string ids, Guid applicationId)
        {
            return await _repository.GetAllByRolesAsync(organisationId, ids, applicationId);
        }

        public async Task<UserDto> GetAsync(Guid id)
        {
            var data = await _repository.GetAsync(id);

            return data != null ? new UserDto
            {
                Id = data.Id,
                UserName = data.UserName,
                Email = data.Email,
                FullName = data.FullName

            } : null;
        }

        public async Task<AspNetUser> GetAsync(string email)
        {
            return await _repository.GetAsync(email);
        }

        public async Task<ICollection<UserDto>> getUserAllUser()
        {
            var r = await _repository.GetAllAsync(Guid.Empty);
            return r;
            //GetAllByRolesAsync
            //throw new NotImplementedException();
        }

        public async Task<ICollection<UserDto>> getUserAllUserByOrganisationId(string ids,Guid applicationId)
        {
            try
            {
                var data = await _repository.GetAllByRolesAsync(Guid.NewGuid(), ids, applicationId);
                if (data != null)
                {
                    List<UserDto> vUserDto = data
                       .Select(t => new UserDto
                       {
                           Id = t.Id,
                           UserName = t.UserName,
                           PhoneNumber = t.PhoneNumber,
                           FullName = t.FullName,
                           Email = t.Email,
                       }).ToList();
                    return vUserDto;
                }
                return null;
            }
            catch (Exception ex)
            {
                return new List<UserDto>();
                //throw;
            }


        }

        public async Task<ICollection<UserDto>> getUserAllUserZMEJByOrganisationId(string ids)
        {

            try
            {
                var data = await _repository.GetAllZMEJByRolesAsync(Guid.NewGuid(), ids);
                if (data != null)
                {
                    List<UserDto> vUserDto = data
                       .Select(t => new UserDto
                       {
                           Id = t.Id,
                           UserName = t.UserName,
                           PhoneNumber = t.PhoneNumber,
                           FullName = t.FullName,
                           Email = t.Email,
                       }).ToList();
                    return vUserDto;
                }
                return null;
            }
            catch (Exception ex)
            {
                return new List<UserDto>();
                //throw;
            }

        }

        public async Task<ICollection<UserDto>> GetUserNotificationZMEJ()
        {
            var data = await _repository.GetUserNotificationZMEJ();
            return data;
        }

        public Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId, Guid ApplicationId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ResetPassword(Guid userId, string code, string password)
        {
            return await _repository.ResetPassword(userId, code, password);
        }

        public async Task<AspNetUser> UpdateAsync(AspNetUser user)
        {
            return await _repository.UpdateAsync(user);
        }
    }
}

