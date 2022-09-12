using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class RefreshTokenRequest
    {
        public string refresh_token { get; set; }
    }
}
