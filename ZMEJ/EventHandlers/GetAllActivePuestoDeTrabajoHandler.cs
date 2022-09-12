using MediatR;
using Microsoft.Extensions.Logging;
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
    public class GetAllActivePuestoDeTrabajoHandler : IRequestHandler<GetAllActivePuestoDeTrabajoQuery, IEnumerable<PuestoDeTrabajo>>
    {
        private IPuestoDeTrabajoRepository _puestoDeTrabajoRepository;
        private ILogger<GetAllActivePuestoDeTrabajoHandler> _logger;

        public GetAllActivePuestoDeTrabajoHandler(IPuestoDeTrabajoRepository puestoDeTrabajoRepository, ILogger<GetAllActivePuestoDeTrabajoHandler> logger)
        {
            _puestoDeTrabajoRepository = puestoDeTrabajoRepository;
            _logger = logger;
        }
        public async Task<IEnumerable<PuestoDeTrabajo>> Handle(GetAllActivePuestoDeTrabajoQuery request, CancellationToken cancellationToken)
        {
            var data = await _puestoDeTrabajoRepository.GetAllActive();
            return data;
        }
    }
}
