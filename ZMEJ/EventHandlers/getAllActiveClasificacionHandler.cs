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
    public class GetAllActiveClasificacionHandler : IRequestHandler<getAllClasificacionActiveQuery,IEnumerable<Clasificacion>>
    {
        private IClasificacionRepository _clasificacionRepository;

        public GetAllActiveClasificacionHandler(IClasificacionRepository clasificacionRepository)
        {
            _clasificacionRepository = clasificacionRepository;
        }

        public async Task<IEnumerable<Clasificacion>> Handle(getAllClasificacionActiveQuery request, CancellationToken cancellationToken)
        {
            var data = await _clasificacionRepository.GetAllActive();
            return data;
        }
    }
}
