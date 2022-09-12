using MediatR;
using ZMEJ.EventHandlers.Commands;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.models;

namespace ZMEJ.EventHandlers
{
    public class RejectOrderZMEJHandler : IRequestHandler<RejectOrderZMEJCommand, bool>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        private IOrderZMEJDetailsRepository _orderZMEJDetailsRepository;

        public RejectOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService, IOrderZMEJDetailsRepository orderZMEJDetailsRepository)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
            _orderZMEJDetailsRepository = orderZMEJDetailsRepository;
        }
        public async Task<bool> Handle(RejectOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                //paso 1: validar si existe la orden.
                 var data = await _orderZMEJRepository.GetAsync(request.Id, _identityService.GetOrganisationId());
                if (data == null)
                {
                    throw new System.ArgumentException("no se encontro la orden intente mas tarde", "original");
                }
                if (data.Estado == 6 || data.Estado==7)
                {
                    throw new System.ArgumentException("No se puede cambiar el estado de este proyecto.", "original");
                }
                //Validar si ya fue cerrado
                if (data.Estado == 6)
                {
                    throw new System.ArgumentException("Este proyecto ya fue aprobado no se puede cancelar..", "original");
                }
                var NewStatus =  request.Estado;
                data.setEstado(NewStatus);
              //  data.SetAsignadoA
              
                var userId = Guid.Parse(_identityService.GetUserIdentity());
              

                //paso 2: validar si el userId usuario  puede realizar la accion
                if(data.AsignadoA!=userId)
                {
                    throw new System.ArgumentException("No puedes realizar esta accion en estos momentos..", "original");
                }
                data.SetAsignadoA(request.AsignadoA);
                data.SetRemitente(userId);


                var result = await _orderZMEJRepository.UpdateAsync(data);
                //paso 3 actualizar estado y insertar log de observacion

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
                return result;

            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
            
        }
    }
}
