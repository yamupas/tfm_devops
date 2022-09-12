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
    public class GetFilterOrderZMEJHandler : IRequestHandler<GetFilterOrderZMEJQuery, IEnumerable<OrderZMEJDto>>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        public GetFilterOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
        }
        public async Task<IEnumerable<OrderZMEJDto>> Handle(GetFilterOrderZMEJQuery request, CancellationToken cancellationToken)
        {
            try
            {
              //  var userId = Guid.Parse(_identityService.GetUserIdentity());
                var data = await _orderZMEJRepository.GetAllFilterAsync(request.Id,request.Name);

                if (data == null || data.Count == 0)
                {
                    return null;
                }
                return data;

            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
                // throw;
            }
            
        }
    }
}
