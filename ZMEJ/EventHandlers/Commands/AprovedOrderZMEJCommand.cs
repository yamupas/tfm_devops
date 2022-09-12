using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.EventHandlers.Commands
{
    public class AprovedOrderZMEJCommand: IRequest<bool>
    {
        public Guid Id { get; set; }
        public Guid AsignadoA { get; set; }
        public string observacion { get; set; }
    }
}
