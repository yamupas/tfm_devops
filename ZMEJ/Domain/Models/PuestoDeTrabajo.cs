using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class PuestoDeTrabajo
    {
        public Guid uuid { get; set; }
        public string Centro { get; set; }
        public string PstoTbjo { get; set; }
        public string Descripcion { get; set; }
        public bool Estado { get; set; }
        public string FullDescripcion { get { return PstoTbjo + " - " + Descripcion; } }

        public PuestoDeTrabajo()
        {

        }
        public PuestoDeTrabajo(string VPstoTbjo, string vDescripcion, string vCentro = "GN10", bool vEstado=true)
        {
            uuid = Guid.NewGuid();
            Centro = vCentro;
            PstoTbjo = VPstoTbjo;
            Descripcion = vDescripcion;
            Estado = vEstado;
        }
    }
}
