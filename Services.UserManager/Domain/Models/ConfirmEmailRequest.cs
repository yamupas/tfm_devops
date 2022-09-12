using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class ConfirmEmailRequest
    {
        public Guid userId { get; set; }
        public string code { get; set; }

    }
}
