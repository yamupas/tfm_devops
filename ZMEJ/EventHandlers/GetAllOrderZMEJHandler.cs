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

namespace ZMEJ.EventHandlers
{
    public class GetAllOrderZMEJHandler : IRequestHandler<GetAllOrderZMEJQuery, IEnumerable<OrderZMEJDto>>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;

        public GetAllOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository,IIdentityService identityService)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
        }
        public async Task<IEnumerable<OrderZMEJDto>> Handle(GetAllOrderZMEJQuery request, CancellationToken cancellationToken)
        {
            var data = await _orderZMEJRepository.GetAllAsync(_identityService.GetOrganisationId());
            if (data==null || data.Count == 0)
            {
                return null;
            }
            return data;
            throw new NotImplementedException();
        }
    }
}
