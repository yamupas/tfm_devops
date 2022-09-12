using MediatR;
using ZMEJ.Domain.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Queries
{
    public class GetRoleStatusByCodeQuery:IRequest<IEnumerable<RoleStatusCode>>
    {
        public int Code { get; set; }
        public GetRoleStatusByCodeQuery(int code)
        {
            Code = code;
        }
    }
}
