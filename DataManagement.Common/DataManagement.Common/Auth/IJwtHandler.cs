using System;
using System.Collections.Generic;
using System.Text;

namespace DataManagement.Common.Auth
{
    public interface IJwtHandler
    {
        JsonWebToken Create(Guid userId,string username,string roles,string organisationId);
    }
}
