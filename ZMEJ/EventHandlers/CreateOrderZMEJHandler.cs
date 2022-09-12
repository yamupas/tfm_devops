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
    public class CreateOrderZMEJHandler : IRequestHandler<CreateOrderZMEJCommand, CreateOrderResult>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityServices;

        public CreateOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository,IIdentityService identityServices)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateOrderResult> Handle(CreateOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var vOrderZMEJ = new OrderZMEJ(
                    request.Nombre, request.Descripcion, request.Proponente, request.NombreDelPet,
                    request.ResponsableDelPuestoDetrabajo, request.UbicacionTecnica, request.PasoTPM, request.ResponsableEjecutor,
                    request.CodigoDelEquipo, request.ClaseDeActividadID, request.NormaDeLiquidacionId,
                    request.CodigoNormaDeLiquidacion, request.BeneficioCualitativo, request.BeneficioCuantitativo,
                    request.FechaInicio, userName,request.CostoMaterial,request.Costomanodeobra,request.CostoServicios,request.DuraciondelTrabajo,request.DescripcionDelEquipo,request.DescripcionDeUbicacionTecnica,request.Pregunta1,request.pregunta2,request.Pregunta3);

                vOrderZMEJ.SetAsignadoA(request.AsignadoA);
                vOrderZMEJ.Clasificacion = request.Clasificacion;
                var userid = Guid.Parse(_identityServices.GetUserIdentity());
                vOrderZMEJ.SetRemitente(userid);
                vOrderZMEJ.setEstado(2);
                vOrderZMEJ.Linea = request.Linea;
                vOrderZMEJ.Horno = request.Horno;
                var r = await _orderZMEJRepository.AddAsync(vOrderZMEJ);
                //Comunicar microservicios para el envio de correo electronico.
                //SendNotification(vOrderZMEJ);
                return new CreateOrderResult
                {
                    OrderId = vOrderZMEJ.Id
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
