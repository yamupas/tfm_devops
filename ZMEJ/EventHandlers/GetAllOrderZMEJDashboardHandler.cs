using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using ZMEJ.Dtos;
using ZMEJ.Queries;

namespace ZMEJ.EventHandlers
{
    public class GetAllOrderZMEJDashboardHandler : IRequestHandler<GetAllOrderZMEJDashoardQuery, IEnumerable<Object>>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        public GetAllOrderZMEJDashboardHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
        }
        public async Task<IEnumerable<Object>> Handle(GetAllOrderZMEJDashoardQuery request, CancellationToken cancellationToken)
        {
            var conllection = await _orderZMEJRepository.GetAllDashboardAsync("");
            return conllection;
        }
    }
}
