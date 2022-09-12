using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers.Commands
{
    public class CreateaquinaCommand : IRequest<CreateResultData>
    {
        public string Centro { get; set; }
        public string Maquina { get; set; }
        public string Descripcion { get; set; }
        public string CodTecnologia { get; set; }
        public Boolean Estado { get; set; }
        public Guid uuid { get; set; }
    }
}
