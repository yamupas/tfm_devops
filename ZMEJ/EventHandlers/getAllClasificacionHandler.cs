using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Queries;

namespace ZMEJ.EventHandlers
{
    public class getAllClasificacionHandler : IRequestHandler<getAllClasificacionQuery, IEnumerable<Clasificacion>>
    {
        private IClasificacionRepository _clasificacionRepository;

        public getAllClasificacionHandler(IClasificacionRepository clasificacionRepository)
        {
            _clasificacionRepository = clasificacionRepository;
        }
        public async Task<IEnumerable<Clasificacion>> Handle(getAllClasificacionQuery request, CancellationToken cancellationToken)
        {
            var data = await _clasificacionRepository.GetAll();
            return data;
        }
    }
}
