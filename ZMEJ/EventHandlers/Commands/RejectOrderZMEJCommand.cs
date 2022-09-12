using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.EventHandlers.Commands
{
    public class RejectOrderZMEJCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
        public Guid AsignadoA { get; set; }
        public int Estado { get; set; }
        public string observacion { get; set; }
    }
}
