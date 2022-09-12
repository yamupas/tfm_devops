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

namespace ZMEJ.EventHandlers
{
    public class AprovedOrderZMEJHandler : IRequestHandler<AprovedOrderZMEJCommand, bool>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        private IOrderZMEJDetailsRepository _orderZMEJDetailsRepository;

        public AprovedOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService, IOrderZMEJDetailsRepository orderZMEJDetailsRepository)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
            _orderZMEJDetailsRepository = orderZMEJDetailsRepository;
        }
        public async Task<bool> Handle(AprovedOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                //paso 1: validar si existe la orden.
                var data = await _orderZMEJRepository.GetAsync(request.Id, _identityService.GetOrganisationId());
                if (data == null)
                {
                    throw new System.ArgumentException("no se encontro la orden intente mas tarde", "original");
                }
                if (data.Estado == 5)
                {
                    throw new System.ArgumentException("Este proyecto ya fue aprobado no se puede cancelar..", "original");
                }

                //guardar log del objeto actual



                var NewStatus = data.Estado + 1;
                data.setEstado(NewStatus);
                //  data.SetAsignadoA
              
                var userId = Guid.Parse(_identityService.GetUserIdentity());
                data.SetRemitente(userId);
                data.SetFechaModificacion();
                //paso 2: validar si el userId usuario  puede realizar la accion
                if (data.AsignadoA != userId)
                {
                    throw new System.ArgumentException("No puedes realizar esta accion en estos momentos..", "original");
                }
                data.SetAsignadoA(request.AsignadoA);
                //paso 3 actualizar estado y insertar log de observacion
                var result = await _orderZMEJRepository.UpdateAsync(data);

                if (result)
                {
                    var orderZMEJDetails = new OrderZMEJDetails(data.Id, request.AsignadoA, request.observacion, userId, NewStatus);
                   // var orderZMEJDetails = new OrderZMEJDetails(data.Id,request.observacion, userId);
                    try
                    {
                        _orderZMEJDetailsRepository.AddOrderDetails(orderZMEJDetails);
                    }
                    catch (Exception ex)
                    {

                       // throw;
                    }
                   
                }
                //_orderZMEJRepository
                return result;

            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }

        }
      
    }
}
