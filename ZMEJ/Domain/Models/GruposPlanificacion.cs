using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class GruposPlanificacion
    {
     public string Centro {get; set;}
     public Guid ResControlProdId {get; set;}
     public string GrupoPlanificador {get; set;}
     public string Descripcion { get; set; }
     public bool Estado {get; set;}
     public DateTime FechaCreacion {get; set;}
     public string UsuarioCreacion {get; set;}
     public DateTime FechaModificacion {get; set;}
     public string UltimoUsuarioModificacion {get; set;}   
     public Guid Id {get; set;}
        public GruposPlanificacion()
        {

        }
   public GruposPlanificacion( Guid vResControlProdId, string vGrupoPlanificador, string vDescripcion, bool vEstado, string vUsuarioCreacion="",string vUltimoUsuarioModificacion = "")
        {
            try
            {
                Id = Guid.NewGuid();
                ResControlProdId = vResControlProdId;
                GrupoPlanificador = vGrupoPlanificador;
                Descripcion = vDescripcion;
                Estado = vEstado;
                FechaCreacion = DateTime.Now;
                FechaModificacion = DateTime.Now;
                UsuarioCreacion = vUsuarioCreacion;
                UltimoUsuarioModificacion = vUltimoUsuarioModificacion;
                Centro = "GN10";

            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
