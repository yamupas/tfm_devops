using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Queries
{
    public class getAllClasificacionActiveQuery:IRequest<IEnumerable<Clasificacion>>
    {
    }
}
