using System;


namespace ApiGatewayZMEJ.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public Boolean PhoneNumberConfirmed { get; set; }
        public Boolean TwoFactorEnabled { get; set; }
        public DateTime LockoutEnd { get; set; }
        public Boolean LockoutEnabled { get; set; }
        public Boolean AccessFailedCount { get; set; }
        public string FullName { get; set; }
        public Guid OrganisationId { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
