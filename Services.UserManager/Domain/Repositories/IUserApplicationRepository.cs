using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public interface IUserApplicationRepository
    {
        Task<AspNetUserApplication> Validate(Guid UserId, Guid ApplicationId);
        Task<bool> Add(AspNetUserApplication aspNetUserApplication);
        Task<bool> delete(AspNetUserApplication aspNetUserApplication);

    }
}
