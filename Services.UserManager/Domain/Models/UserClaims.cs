using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class UserClaims
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string ClaimType { get; protected set; }
        public string ClaimValue { get; set; }
    }
}
