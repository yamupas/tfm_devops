using MediatR;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Queries
{
    public class FindClaseDeActividadByCodeQuery:IRequest<ClaseDeActividadDto>
    {
        public int Id { get; set; }
        public FindClaseDeActividadByCodeQuery(int vId)
        {
            Id = vId;
        }
    }
}
