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
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers
{
    public class UpdateResCtrlProduccionZMEJHandler : IRequestHandler<UpdateResCtrlProduccionCommand, CreateOrderResult>
    {
        private IResCtrlProduccionRepository _resCtrlProduccionRepository;
        private IIdentityService _identityServices;

        public UpdateResCtrlProduccionZMEJHandler(IResCtrlProduccionRepository resCtrlProduccionRepository ,IIdentityService identityServices)
        {
            _resCtrlProduccionRepository = resCtrlProduccionRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateOrderResult> Handle(UpdateResCtrlProduccionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var vResCtrlProduccion = new ResCtrlProduccion(request.ResControlProd,request.Descripcion,request.Centro);
                vResCtrlProduccion.Id = request.Id;
                var r = await _resCtrlProduccionRepository.Update(vResCtrlProduccion);
                //Comunicar microservicios para el envio de correo electronico.
                //SendNotification(vOrderZMEJ);
                return new CreateOrderResult
                {
                    OrderId = vResCtrlProduccion.Id
                };
               // return r;
            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
            //return false;
            //throw new NotImplementedException();
        }

    }
}
