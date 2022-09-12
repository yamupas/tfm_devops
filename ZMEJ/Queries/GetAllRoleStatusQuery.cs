using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.models;

namespace ZMEJ.Queries
{
    public class GetAllRoleStatusQuery:IRequest<IEnumerable<RoleStatusCode>>
    {
    }
}
