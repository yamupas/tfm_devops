using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class CreateOrderResult
    {
        public Guid OrderId { get; set; }
    }
    public class CreateResultData
    {
        public Guid Id { get; set; }
        public int StatusCode { get; set; }
    }
}
