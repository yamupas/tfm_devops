using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class UserRoles
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public Roles Roles { get; set; }
    }
}
