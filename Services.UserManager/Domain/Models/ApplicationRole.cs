﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class ApplicationRole
    {
        public Guid ApplicationId { get; set; }
        public Guid RoleId { get; set; }
    }
}
