using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class UbicacionTecnica
    {
        public Guid uuid { get; set; }
        public string Centro { get; set; }
        public string Ubicacion { get; set; }
        public string Descripcion { get; set; }
        public string FullDescripcion { get { return Ubicacion + " - " + Descripcion; } }
        public bool Estado { get; set; }

        public UbicacionTecnica()
        {

        }
        public UbicacionTecnica(string vUbicacion,string vDescripcion,string vCentro="GN10",bool vEstado=true)
        {
            uuid = Guid.NewGuid();
            Centro = vCentro;
            Ubicacion = vUbicacion;
            Descripcion = vDescripcion;
            Estado = vEstado;

        }
    }
}
