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
    public class GetOrderZMEJDetailsByIdHandler : IRequestHandler<GetOrderZMEJDetailsByIdQuery, OrderZMEJDto>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityService;
        public GetOrderZMEJDetailsByIdHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityService)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityService = identityService;
        }
        public async Task<OrderZMEJDto> Handle(GetOrderZMEJDetailsByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var userId = Guid.Parse(_identityService.GetUserIdentity());
                var data = await _orderZMEJRepository.GetOrderDetailbyIdAsync(request.Id,_identityService.GetOrganisationId());
                bool vPuedeAprobar = false;
                if (data!=null && userId == data.AsignadoA)
                {
                    vPuedeAprobar = true;
                }


                return data != null ? new OrderZMEJDto
                {

                    Id = data.Id,
                    FechaDeEntrega = data.FechaDeEntrega,
                    FechaDeCreacion = data.FechaDeCreacion,
                    Nombre = data.Nombre,
                    Descripcion = data.Descripcion,
                    Proponente = data.Proponente,
                    NombreDelPet = data.NombreDelPet,
                    ResponsableDelPuestoDetrabajo = data.ResponsableDelPuestoDetrabajo,
                    UbicacionTecnica = data.UbicacionTecnica,
                    PasoTPM = data.PasoTPM,
                    ResponsableEjecutor = data.ResponsableEjecutor,
                    CodigoDelEquipo = data.CodigoDelEquipo,
                    ClaseDeActividadID = data.ClaseDeActividadID,
                    NormaDeLiquidacionId = data.NormaDeLiquidacionId,
                    CodigoNormaDeLiquidacion = data.CodigoNormaDeLiquidacion,
                    Costomanodeobra = data.Costomanodeobra,
                    CostoServicios = data.CostoServicios,
                    CostoMaterial = data.CostoMaterial,
                    CostoPlaneado = data.CostoPlaneado,
                    BeneficioCualitativo = data.BeneficioCualitativo,
                    BeneficioCuantitativo = data.BeneficioCuantitativo,
                    FechaInicio = data.FechaInicio,
                    FechaFin = data.FechaFin,
                    UsuarioCreacion = data.UsuarioCreacion,
                    Estado = data.Estado,
                    PuedeAprobar = vPuedeAprobar,
                    AsignadoA = data.AsignadoA,
                    RemitidoPor = data.RemitidoPor,
                    DescripcionDelEquipo = data.DescripcionDelEquipo,
                    DescripcionDeUbicacionTecnica = data.DescripcionDeUbicacionTecnica,
                    Clasificacion = data.Clasificacion,
                    Pregunta1 = data.Pregunta1,
                    Pregunta2 = data.Pregunta2,
                    Pregunta3 = data.Pregunta3,
                    Linea = data.Linea,
                    Horno = data.Horno,
                    NotaMantenimiento=data.NotaMantenimiento,
                    OrdenMantenimiento=data.OrdenMantenimiento,
                    Evidencia=data.Evidencia,
                    CostoReal=data.CostoReal,
                    NombreEstado=data.NombreEstado,
                    NombreClasificacion=data.NombreClasificacion,
                    NombreClaseActividad=data.NombreClaseActividad


                } : null;
              
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
                // throw;
            }
            
        }
    }
}
