using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers.Commands
{
    public class UpdateOrderZMEJCommand : IRequest<CreateOrderResult>
    {
        public Guid Id { get; set; }
        public DateTime FechaDeEntrega { get; set; }
        public DateTime FechaRecepcion { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public Guid Proponente { get; set; }
        public string NombreDelPet { get; set; }
        public string ResponsableDelPuestoDetrabajo { get; set; }
        public string DescripcionDelEquipo { get; set; }
        public string DescripcionDeUbicacionTecnica { get; set; }
        public string UbicacionTecnica { get; set; }
        public string PasoTPM { get; set; }
        public string ResponsableEjecutor { get; set; }
        public string CodigoDelEquipo { get; set; }
        public string CentroDeCosto { get; set; }
        public string OrderInterna { get; set; }
        public string ActivoFijo { get; set; }
        public int ClaseDeActividadID { get; set; }

        public int NormaDeLiquidacionId { get; set; }
        public string CodigoNormaDeLiquidacion { get; set; }

        public decimal CostoMaterial { get;  set; }
        public decimal Costomanodeobra { get;  set; }
        public decimal CostoServicios { get;  set; }
        public string CostoPlaneado { get;  set; }
        public decimal valComprometido { get; set; }
        public string BeneficioCualitativo { get;  set; }
        public decimal BeneficioCuantitativo { get;  set; }
        public string AprobadoPor { get;  set; }
        public string ValidadoPor { get;  set; }

        public DateTime FechaInicio { get;  set; }
        public DateTime FechaFin { get;  set; }

        public string UsuarioCreacion { get;  set; }
        public DateTime FechaDeCreacion { get;  set; }
        public DateTime FechaDeModificacion { get;  set; }

        public string UsuarioModificacion { get;  set; }
        public Guid AsignadoA { get;  set; }
        public Guid RemitidoPor { get;  set; }
        public int Estado { get;  set; }

        public string Evidencia { get; set; }
        public string TipodeTrabajo { get; set; }
        public string OrdenMantenimiento { get; set; }
        public string NotaMantenimiento { get; set; }

        public double DuraciondelTrabajo { get; set; }
        public string Pregunta1 { get; set; }
        public string pregunta2 { get; set; }
        public string Pregunta3 { get; set; }
        public int Clasificacion { get; set; }

        public string Linea { get; set; }
        public string Horno { get; set; }
        public decimal CostoReal { get; set; }
    }
}
