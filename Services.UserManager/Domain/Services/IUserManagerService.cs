using Services.UserManager.Domain.Dtos;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface IUserManagerService
    {
        Task<UserDto> GetAsync(Guid id);
        Task<ICollection<UserDto>> getUserAllUserByOrganisationId(string ids,Guid applicationid);
        Task<ICollection<UserDto>> getUserAllUserZMEJByOrganisationId(string ids);
        Task<ICollection<UserDto>> getUserAllUser();
        Task<AspNetUser> GetAsync(string email);
        Task<ICollection<AspNetUser>> GetAllByApplicationIdAsync(Guid applicationId);
        Task<AspNetUser> AddAsync(AspNetUser user);
        Task<AspNetUser> UpdateAsync(AspNetUser user);
        Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId);
        Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId, Guid ApplicationId);
        Task<ICollection<UserDto>> GetAllAsync(Guid organisationId);
        Task<ICollection<AspNetUser>> GetAllByRolesAsync(Guid organisationId, string ids, Guid ApplicationId);
        Task<bool> ConfirmEmailAsync(Guid userId, string code);
        Task<Boolean> ResetPassword(Guid userId, string code, string password);
        Task<ICollection<UserDto>> GetUserNotificationZMEJ();
        Task<AspNetUser> ChangePasswordAsync(AspNetUser user);
    }
}
