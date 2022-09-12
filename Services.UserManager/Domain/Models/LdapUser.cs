using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class LdapUser
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }

        public Guid OrganisationId { get; set; }

    }
}
