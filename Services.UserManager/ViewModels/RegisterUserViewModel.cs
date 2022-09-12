using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.ViewModels
{
    public class RegisterUserViewModel
    {

        [Required]
        public string UserName { get;  set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Boolean LockoutEnabled { get; set; }
        [Required]
        public string FullName { get; set; }

        public List<string> Roles { get; set; }

        public Guid ApplicationId { get; set; }
        public Guid OrganisationId { get;  set; }
    }

    public class ChangeAdminPasswordRequest
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string NewPassword { get; set; }
       
    }
}
