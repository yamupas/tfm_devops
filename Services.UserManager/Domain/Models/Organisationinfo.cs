using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class Organisationinfo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Org_image { get; set; }
        public string Domain { get; set; }
        public string Website { get; set; }
        public string Orgdescription { get; set; }

        public bool Isactive { get; set; }
    }
}
