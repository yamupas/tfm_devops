using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Models
{
    public class StatusCode
    {
        public Guid Id { get; private set; }

        public int Code { get; set; }
        public string Name { get; protected set; }
        public string Description { get; protected set; }
        
    }
}
