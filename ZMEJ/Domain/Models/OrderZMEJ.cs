using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.models
{
    public class OrderZMEJ
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

        public decimal CostoMaterial { get; protected set; }
        public decimal Costomanodeobra { get; protected set; }
        public decimal CostoServicios { get; protected set; }
        public decimal CostoPlaneado { get; protected set; }
        public string BeneficioCualitativo { get; protected set; }
        public decimal BeneficioCuantitativo { get; protected set; }
        public string AprobadoPor { get; protected set; }
        public string ValidadoPor { get; protected set; }

        public DateTime FechaInicio { get; protected set; }
        public DateTime FechaFin { get; protected set; }

        public string UsuarioCreacion { get; protected set; }
        public DateTime FechaDeCreacion { get;protected set; }
        public DateTime FechaDeModificacion { get; protected set; }

        public string UsuarioModificacion { get; protected set; }
        public Guid AsignadoA { get; protected set; }
        public Guid RemitidoPor { get; protected set; }
        public int Estado { get; protected set; }

        public string Evidencia { get; set; }
        public string TipodeTrabajo { get; set; }
        public string OrdenMantenimiento { get; set; }
        public string NotaMantenimiento { get; set; }

        public double DuraciondelTrabajo { get; set; }
        public string Pregunta1 { get; set; }
        public string Pregunta2 { get; set; }
        public string Pregunta3 { get; set; }
        public int Clasificacion { get; set; }
        public string Linea { get; set; }
        public string Horno { get; set; }
        public decimal CostoReal { get; set; }

        public string NombreEstado { get; set; }
        public string NombreClasificacion { get; set; }
        public decimal valComprometido { get; set; }
        private OrderZMEJ()
        { }
        public OrderZMEJ (string vNombre,string vDescripcion,Guid vProponente,string vNombreDelPet,string vResponsableDelPuestoDetrabajo,string vUbicacionTecnica, 
            string vPasoTPM,string vResponsableEjecutor,string vCodigoDelEquipo,int vClaseDeActividadID,
            int vNormaDeLiquidacionId,string vCodigoNormaDeLiquidacion,string vBeneficioCualitativo,decimal vBeneficioCuantitativo, DateTime vFechaInicio, 
            string vUsuario,decimal costomaterial,decimal costomanodeobra,decimal costoservicios, double vduraciondelTrabajo,string vdescripcionDelEquipo,
            string vDescripcionDeUbicacionTecnica,string pregunta1,string pregunta2,string pregunta3,
            string vLinea="",string vHorno="",decimal vCostoReal=0
            )
        {
            Id = Guid.NewGuid();
            FechaDeEntrega = DateTime.Now;
            FechaDeCreacion = DateTime.Now;
            Nombre = vNombre;
            Descripcion = vDescripcion;
            Proponente = vProponente;
            NombreDelPet = vNombreDelPet;
            ResponsableDelPuestoDetrabajo = vResponsableDelPuestoDetrabajo;
            UbicacionTecnica = vUbicacionTecnica;
            PasoTPM = vPasoTPM;
            ResponsableEjecutor = vResponsableEjecutor;
            CodigoDelEquipo = vCodigoDelEquipo;
            ClaseDeActividadID = vClaseDeActividadID;
            NormaDeLiquidacionId = vNormaDeLiquidacionId;
            CodigoNormaDeLiquidacion = vCodigoNormaDeLiquidacion;
            CostoPlaneado = (costoservicios+costomaterial+costomanodeobra);
            BeneficioCualitativo = vBeneficioCualitativo;
            BeneficioCuantitativo = vBeneficioCuantitativo;
            FechaInicio = vFechaInicio;
            FechaFin = vFechaInicio.AddDays(vduraciondelTrabajo);
            UsuarioCreacion = vUsuario;
            DescripcionDelEquipo = vdescripcionDelEquipo;
            CostoMaterial = costomaterial;
            Costomanodeobra = costomanodeobra;
            CostoServicios = costoservicios;
            DuraciondelTrabajo = vduraciondelTrabajo;
            DescripcionDeUbicacionTecnica = vDescripcionDeUbicacionTecnica;
            Pregunta1 = pregunta1;
            Pregunta2 = pregunta2;
            Pregunta3 = pregunta3;
            Linea = vLinea;
            Horno = vHorno;            
            CostoReal = vCostoReal;
            
        }

        public void SetAprobadoPor(string nombre)
        {
            AprobadoPor = nombre;
        }
        public void SetValidadoPor(string nombre)
        {
            ValidadoPor = nombre;
        }

        public void SetUsuarioModificacion(string nombre)
        {
            UsuarioModificacion = nombre;
        }

        public void SetFechaModificacion()
        {
            FechaDeModificacion = DateTime.Now;
        }
        public void setEstado(int vEstado)
        {
            Estado = vEstado;
        }
        public void SetRemitente(Guid remitenteId)
        {
            RemitidoPor = remitenteId;
        }
        public void SetAsignadoA(Guid asignadoId)
        {
            AsignadoA = asignadoId;
        }


    }
}
