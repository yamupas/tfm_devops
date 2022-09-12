using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllActivePuestoDeTrabajoQuery : IRequest<IEnumerable<PuestoDeTrabajo>>
    {
        public string Centro;
        public GetAllActivePuestoDeTrabajoQuery(string centro = "GN10")
        {
            Centro = centro;
        }
    }
}
