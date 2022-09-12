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
    public class UpdateGrupoPlanificadorHandler : IRequestHandler<UpdateGruposPlanificacionCommand, CreateOrderResult>
    {
        private IGruposPlanificacionRespository _gruposPlanificacionRespository;
        private IIdentityService _identityServices;

        public UpdateGrupoPlanificadorHandler(IGruposPlanificacionRespository gruposPlanificacionRespository ,IIdentityService identityServices)
        {
            _gruposPlanificacionRespository = gruposPlanificacionRespository;
            _identityServices = identityServices;
        }
        public async Task<CreateOrderResult> Handle(UpdateGruposPlanificacionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
               
                var vGruposPlanificacion = new GruposPlanificacion(request.ResControlProdId, request.GrupoPlanificador, request.Descripcion, request.Estado, userName);
                vGruposPlanificacion.Id = request.Id;
                var r = await _gruposPlanificacionRespository.Update(vGruposPlanificacion);
                //Comunicar microservicios para el envio de correo electronico.
                //SendNotification(vOrderZMEJ);
                return new CreateOrderResult
                {
                    OrderId = vGruposPlanificacion.Id
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
