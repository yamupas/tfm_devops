using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllPuestoDeTrabajoQuery: IRequest<IEnumerable<PuestoDeTrabajo>>
    {
        public string Centro;
        public GetAllPuestoDeTrabajoQuery(string centro = "GN10")
        {
            Centro = centro;
        }
    }
   
}
