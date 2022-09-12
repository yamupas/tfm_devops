using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Queries;

namespace ZMEJ.EventHandlers
{
    public class GetAllStatusCodeHandler : IRequestHandler<GetAllStatusCodeQuery, IEnumerable<StatusCode>>
    {
        private ILogger<GetAllStatusCodeHandler> _logger;
        private IStatusCodeRepository _statusCodeRepository;

        public GetAllStatusCodeHandler(ILogger<GetAllStatusCodeHandler> logger, IStatusCodeRepository statusCodeRepository)
        {
            _logger = logger;
            _statusCodeRepository = statusCodeRepository;
        }
        public async  Task<IEnumerable<StatusCode>> Handle(GetAllStatusCodeQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("Consultar todos los StatusCode");
                var r = await _statusCodeRepository.GetAll();
                return r.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error al consultar todos los StatusCode "+ex.ToString());
                return null;
            }
        }
    }
}
