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
    public class UpdateOrderZMEJHandler : IRequestHandler<UpdateOrderZMEJCommand, CreateOrderResult>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityServices;

        public UpdateOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository,IIdentityService identityServices)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateOrderResult> Handle(UpdateOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var vOrderZMEJ = new OrderZMEJ(
                    request.Nombre, request.Descripcion, request.Proponente, request.NombreDelPet,
                    request.ResponsableDelPuestoDetrabajo, request.UbicacionTecnica, request.PasoTPM, request.ResponsableEjecutor,
                    request.CodigoDelEquipo, request.ClaseDeActividadID, request.NormaDeLiquidacionId,
                    request.CodigoNormaDeLiquidacion, request.BeneficioCualitativo, request.BeneficioCuantitativo,
                    request.FechaInicio, userName,request.CostoMaterial,request.Costomanodeobra,request.CostoServicios,request.DuraciondelTrabajo,request.DescripcionDelEquipo,request.DescripcionDeUbicacionTecnica,request.Pregunta1,request.pregunta2,request.Pregunta3, request.Linea, request.Horno, request.CostoReal);
                vOrderZMEJ.Id = request.Id;
                vOrderZMEJ.SetAsignadoA(request.AsignadoA);
                vOrderZMEJ.setEstado(request.Estado);
                vOrderZMEJ.NotaMantenimiento = request.NotaMantenimiento;
                vOrderZMEJ.Clasificacion = request.Clasificacion;
                vOrderZMEJ.CostoReal = request.CostoReal;
                vOrderZMEJ.OrdenMantenimiento = request.OrdenMantenimiento;
                vOrderZMEJ.valComprometido = request.valComprometido;
                var userid = Guid.Parse(_identityServices.GetUserIdentity());
                //vOrderZMEJ.SetRemitente(userid);
                

                var r = await _orderZMEJRepository.UpdateAsync(vOrderZMEJ);
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
