using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class ResCtrlProduccion
    {
        public string Centro { get; set; }
        public string ResControlProd { get; set; }
        public string Descripcion { get; set; }
        public Guid Id { get; set; }

        public ResCtrlProduccion()
        {

        }
        public ResCtrlProduccion(string vResControlProd,string vDescripcion,string vCentro ="GN10")
        {
            try
            {
                Centro = vCentro;
                ResControlProd = vResControlProd;
                Descripcion = vDescripcion;
                Id = Guid.NewGuid();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
