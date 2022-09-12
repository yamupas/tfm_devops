using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllActiveUbicacionTecnicaQuery:IRequest<IEnumerable<UbicacionTecnica>>
    {
        public string Centro;
        public GetAllActiveUbicacionTecnicaQuery(string centro = "GN10")
        {
            Centro = centro;
        }
    }
}
