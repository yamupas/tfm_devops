using ApiGatewayZMEJ.Dtos;
using ApiGatewayZMEJ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Services
{
    public interface IUserService
    {
        Task<List<UserDto>> GetUserByRoleAsync(IEnumerable<Guid> guids);
        Task<List<UserDto>> GetUserByRoleAsync(IEnumerable<Guid> guids, Guid applicationid);

        Task<UserDto> GetUserByIdyAsync(Guid id);
        Task<UserDto> GetUserByNotificationZMEJ();
        Task<List<UserDto>> GetUserByRoleDataAsync(RolesAplicationViewModels parametros);
    }
}
