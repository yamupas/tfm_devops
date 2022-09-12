using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllResCtrlProduccionQuery : IRequest<IEnumerable<ResCtrlProduccion>>
    {
        
        public string Centro { get; set; }
        public GetAllResCtrlProduccionQuery( string centro)
        {
            
            Centro = centro;
        }
    }
}
