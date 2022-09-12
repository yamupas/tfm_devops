using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Models
{
    public class AprovedOrderZMEJ
    {
        public Guid Id { get; set; }
        public Guid AsignadoA { get; set; }
        public int Estado { get; set; }
        public string observacion { get; set; }
    }
}
