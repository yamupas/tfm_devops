using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class RecoveryCodesRequest
    {
        public string[] RecoveryCodes { get; set; }
    }
}
