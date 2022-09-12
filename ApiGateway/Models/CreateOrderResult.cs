using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Models
{
    public class CreateOrderResult
    {
        public Guid OrderId { get; set; }
        public string StatusCode { get; set; }
    }
}
