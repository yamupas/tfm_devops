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
    public class CreateGrupoPlanificadorHandler : IRequestHandler<CreateGruposPlanificacionCommand, CreateOrderResult>
    {
        private IGruposPlanificacionRespository _gruposPlanificacionRespository;
        private IIdentityService _identityServices;

        public CreateGrupoPlanificadorHandler(IGruposPlanificacionRespository gruposPlanificacionRespository ,IIdentityService identityServices)
        {
            _gruposPlanificacionRespository = gruposPlanificacionRespository;
            _identityServices = identityServices;
        }
        public async Task<CreateOrderResult> Handle(CreateGruposPlanificacionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var vResCtrlProduccion = new GruposPlanificacion(request.ResControlProdId,request.GrupoPlanificador,request.Descripcion,request.Estado,userName);
                  
                var r = await _gruposPlanificacionRespository.Save(vResCtrlProduccion);
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
