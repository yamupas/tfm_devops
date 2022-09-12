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
    public class GetAllActiveUbicacionTecnicaHandler : IRequestHandler<GetAllActiveUbicacionTecnicaQuery, IEnumerable<UbicacionTecnica>>
    {
        private IUbicacionTecnicaRepository _ubicacionTecnicaRepository;
        private ILogger<GetAllActiveUbicacionTecnicaHandler> _logger;

        public GetAllActiveUbicacionTecnicaHandler(IUbicacionTecnicaRepository ubicacionTecnicaRepository, ILogger<GetAllActiveUbicacionTecnicaHandler> logger)
        {
            _ubicacionTecnicaRepository = ubicacionTecnicaRepository;
            _logger = logger;
        }
        public async Task<IEnumerable<UbicacionTecnica>> Handle(GetAllActiveUbicacionTecnicaQuery request, CancellationToken cancellationToken)
        {
            var data= await _ubicacionTecnicaRepository.GetAllActive();
            return data;
        }
    }
}
