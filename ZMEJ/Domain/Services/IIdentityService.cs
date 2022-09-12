using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Services
{
    public interface IIdentityService
    {
        string GetUserIdentity();
        string GetRoles();

        string GetUserName();

        string GetOrganisationId();
        string GetClientIP();
    }
}
