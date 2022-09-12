using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Dtos;

namespace ZMEJ.Queries
{
    public class GetFilterOrderZMEJQuery : IRequest<IEnumerable<OrderZMEJDto>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GetFilterOrderZMEJQuery(int vId,string name)
        {
            Id = vId;
            Name = name;
        }
    }
}
