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
    public class GetAllLowStatusCodeHandler : IRequestHandler<GetAllLowStatusCodeQuery, IEnumerable<StatusCode>>
    {
        private ILogger<GetAllLowStatusCodeHandler> _logger;
        private IStatusCodeRepository _statusCodeRepository;

        public GetAllLowStatusCodeHandler(ILogger<GetAllLowStatusCodeHandler> logger, IStatusCodeRepository statusCodeRepository)
        {
            _logger = logger;
            _statusCodeRepository = statusCodeRepository;
        }
        public async Task<IEnumerable<StatusCode>> Handle(GetAllLowStatusCodeQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _statusCodeRepository.GetAllLowCode(request.Code);
                return data;
            }
            catch (Exception ex)
            {
                return null;
              //  throw;
            }
            //throw new NotImplementedException();
        }
    }
}
