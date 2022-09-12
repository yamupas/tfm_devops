using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Database.Repositories;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using ZMEJ.EventHandlers.Commands;

namespace ZMEJ.EventHandlers
{
    public class AsingClassificationOrderZMEJHandler : IRequestHandler<AsingClassificationOrderZMEJCommand, bool>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        private IOrderZMEJDetailsRepository _orderZMEJDetailsRepository;
        public AsingClassificationOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService, IOrderZMEJDetailsRepository orderZMEJDetailsRepository)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
            _orderZMEJDetailsRepository = orderZMEJDetailsRepository;
        }
        public async Task<bool> Handle(AsingClassificationOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _orderZMEJRepository.GetAsync(request.Id, _identityService.GetOrganisationId());
                if (data == null)
                {
                    throw new System.ArgumentException("no se encontro la orden intente mas tarde", "original");
                }
                data.Clasificacion = request.Clasificacion;
                var result = await _orderZMEJRepository.UpdateAsync(data);
                return result;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
