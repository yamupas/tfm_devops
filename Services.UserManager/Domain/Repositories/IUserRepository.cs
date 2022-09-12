using Services.UserManager.Domain.Dtos;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<AspNetUser> GetAsync(Guid id);
        //Task<User> GetAsync(string email);
        Task<AspNetUser> GetAsync(string email);
        AspNetUser FindByIdAsync(Guid id);
        Task<AspNetUser> AddAsync(AspNetUser user);
        Task<AspNetUser> UpdateAsync(AspNetUser user);
        Task<AspNetUser> ChangePasswordAsync(AspNetUser user);
        Task<ICollection<AspNetUser>> GetAllByApplicationIdAsync(Guid applicationId);
        Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId);
        Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId,Guid ApplicationId);
        Task<ICollection<UserDto>> GetAllAsync(Guid organisationId);
        Task<ICollection<AspNetUser>> GetAllByRolesAsync(Guid organisationId, string ids, Guid applicationId);
        Task<bool> ConfirmEmailAsync(Guid userId, string code);
        Task<Boolean> ResetPassword(Guid userId, string code, string password);
        Task<ICollection<UserDto>> GetUserNotificationZMEJ();
        Task<ICollection<AspNetUser>> GetAllZMEJByRolesAsync(Guid guid, string ids);
    }
}
