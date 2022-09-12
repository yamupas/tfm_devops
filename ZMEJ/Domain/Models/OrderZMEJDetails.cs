using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.models
{
    public class OrderZMEJDetails
    {
        public Guid Id { get;protected set; }
        public Guid OrderId { get; protected set; }

        public Guid AsignadoA { get; set; }
        public string Observacion { get; protected set; }
        public Guid UsuarioCreacion { get; protected set; }
        public DateTime FechaDeCreacion { get;protected set; }
        public int Estado { get; set; }
        public OrderZMEJDetails(Guid vOrderId,Guid asignadoA, string vObservacion,Guid vUsuarioCreacion, int estado )
        {
            Id = Guid.NewGuid();
            OrderId = vOrderId;
            AsignadoA = asignadoA;
            Observacion = vObservacion;
            UsuarioCreacion = vUsuarioCreacion;
            FechaDeCreacion = DateTime.Now;
            Estado = estado;
        }
    }
}
