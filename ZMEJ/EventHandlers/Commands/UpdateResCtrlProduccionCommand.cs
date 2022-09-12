using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers.Commands
{
    public class UpdateResCtrlProduccionCommand : IRequest<CreateOrderResult>
    {
        public string Centro { get; set; }
        public string ResControlProd { get; set; }
        public string Descripcion { get; set; }
        public Guid Id { get; set; }
    }
}
