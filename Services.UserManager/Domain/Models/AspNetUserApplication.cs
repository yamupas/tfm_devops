using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class AspNetUserApplication
    {
        public Guid UserId { get; set; }
        public Guid ApplicationId { get; set; }
    }
}
