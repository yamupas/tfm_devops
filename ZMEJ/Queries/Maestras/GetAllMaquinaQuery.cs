using MediatR;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class GetAllMaquinaQuery:IRequest<IEnumerable<TMaquinas>>
    {
        public string Centro;
        public GetAllMaquinaQuery(string centro="GN10")
        {
            Centro = centro;
        }
    }
}
