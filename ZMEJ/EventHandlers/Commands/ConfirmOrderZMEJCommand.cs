using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.EventHandlers.Commands
{
    public class ConfirmOrderZMEJCommand:IRequest<bool>
    {
        public Guid Id { get; set; }
        public string observacion { get; set; }
    }
}
