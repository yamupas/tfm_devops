using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers.Commands
{
    public class UpdatePuestoDeTrabajoCommand : IRequest<CreateResultData>
    {
        public Guid uuid { get; set; }
        public string Centro { get; set; }
        public string PstoTbjo { get; set; }

        public bool Estado { get; set; }
        public string Descripcion { get; set; }
    }
}
