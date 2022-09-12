using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllGrupoPlanificadorQuery : IRequest<IEnumerable<GruposPlanificacion>>
    {
        
        public string Centro { get; set; }
        public GetAllGrupoPlanificadorQuery( string centro)
        {
            
            Centro = centro;
        }
    }
}
