using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface IUserApplicationService
    {
        Task<AspNetUserApplication> Validate(Guid UserId, Guid ApplicationId);
        Task<bool> Add(AspNetUserApplication aspNetUserApplication);
        Task<bool> delete(AspNetUserApplication aspNetUserApplication);
    }
}
