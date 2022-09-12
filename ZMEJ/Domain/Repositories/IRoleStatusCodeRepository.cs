using ZMEJ.Domain.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Repositories
{
    public interface IRoleStatusCodeRepository
    {
        Task<List<RoleStatusCode>> GetAllByCodeAsync(int code);
        Task<RoleStatusCode> GetAllByCodeAndUserAsync(int code,Guid userId);
        Task<bool> AddAsync(RoleStatusCode roleStatusCode);
    }
}
