using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllLowStatusCodeQuery:IRequest<IEnumerable<StatusCode>>
    {
        public int Code { get; set; }
        public GetAllLowStatusCodeQuery(int code)
        {
            Code = code;
        }
    }
}
