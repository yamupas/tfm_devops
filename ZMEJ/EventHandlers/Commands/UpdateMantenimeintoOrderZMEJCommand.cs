using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.EventHandlers.Commands
{
    public class UpdateMantenimeintoOrderZMEJCommand : IRequest<bool>
    {
        public Guid Id { get; set; }

        public string Evidencia { get; set; }
        public string OrdenMantenimiento { get; set; }
        public string TipodeTrabajo { get; set; }
        public string NotaMantenimiento { get; set; }
    }
}
