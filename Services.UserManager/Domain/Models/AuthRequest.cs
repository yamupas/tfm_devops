using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class AuthRequest
    {
        public string ApplicationId { get; set; }
        public string UserName { get; set; }

        //autenticacion por aplicacion o directorio activo
        public bool IsApplication { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
