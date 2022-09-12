using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class RegisterRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Nombre { get; set; }
        public string Centro { get; set; }
        public string rol { get; set; }
        public bool AdministradorCentro { get; set; }
    }
}
