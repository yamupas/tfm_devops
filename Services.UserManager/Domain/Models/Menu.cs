using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class Menu
    {
        public int id { get; set; }
        public string title { get; set; }
        public string routerLink { get; set; }
        public string href { get; set; }
        public string icon { get; set; }
        public string target { get; set; }
        public Int16 hasSubMenu { get; set; }
        public int ParentId { get; set; }
        public int DisplayOrder { get; set; }
        public Guid AplicationId { get; set; }
    }
}
