using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class TMaquinas
    {
      public string Centro {get;set;} 
      public string Maquina {get;set;}
      public string Descripcion {get;set;}
      public string CodTecnologia {get;set;}
      public Boolean Estado {get;set;}
      public Guid uuid {get;set;}
      public string FullDescripcion { get { return Maquina +" - "+ Descripcion; } }

        public TMaquinas()
        {

        }
        public TMaquinas(string vMaquina, string vDescripcion,string vCentro="GN10",bool vEstado  =true)
        {
            uuid = Guid.NewGuid();
            Maquina = vMaquina;
            Descripcion = vDescripcion;
            CodTecnologia = "00";
            Estado = vEstado;
            Centro = vCentro;
        }
    }
}
 