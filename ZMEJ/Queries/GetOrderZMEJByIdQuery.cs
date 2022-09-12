using MediatR;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Queries
{
    public class GetOrderZMEJByIdQuery:IRequest<OrderZMEJDto>
    {
        public Guid Id { get; set; }
        public GetOrderZMEJByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
