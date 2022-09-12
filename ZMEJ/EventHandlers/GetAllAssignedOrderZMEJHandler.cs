using MediatR;
using ZMEJ.EventHandlers.Commands;
using ZMEJ.Domain.models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Queries;
using ZMEJ.Dtos;
using Microsoft.Extensions.Logging;

namespace ZMEJ.EventHandlers
{
    public class GetAllAssignedOrderZMEJHandler : IRequestHandler<GetAllAssignedOrderZMEJQuery, IEnumerable<OrderZMEJDto>>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        private ILogger _logger;

        public GetAllAssignedOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository,IIdentityService identityService,ILogger<GetAllAssignedOrderZMEJHandler> logger)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
            _logger = logger;
        }
        public async Task<IEnumerable<OrderZMEJDto>> Handle(GetAllAssignedOrderZMEJQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("Consultado Ordenes por usuarios.");
                var userId = Guid.Parse(_identityService.GetUserIdentity());
                var data = await _orderZMEJRepository.GetAllAssignedAsync(_identityService.GetOrganisationId(), userId);
                if (data == null || data.Count == 0)
                {
                    return null;
                }
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error al consultar datos." + ex.ToString());
                return null;
                //throw;
            }
           
            //throw new NotImplementedException();
        }
    }
}
