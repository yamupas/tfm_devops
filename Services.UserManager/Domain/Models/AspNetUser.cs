using DataManagement.Common.Exceptions;

using Services.UserManager.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class AspNetUser
    {
        public Guid Id { get;  set; }
        public string UserName { get;  set; }
        public string NormalizedUserName { get;  set; }
        public string Email { get;  set; }
        public string NormalizedEmail { get;  set; }
        public Boolean EmailConfirmed { get;  set; }
        public string SecurityStamp { get;  set; }
        public string ConcurrencyStamp { get;  set; }
        public string PhoneNumber { get;  set; }
        public Boolean PhoneNumberConfirmed { get;  set; }
        public Boolean TwoFactorEnabled { get;  set; }
        public DateTime LockoutEnd { get;  set; }
        public Boolean LockoutEnabled { get;  set; }
        public Boolean AccessFailedCount { get;  set; }
        public string PasswordHash { get;  set; }
        public string FullName { get; set; }
        public string Salt { get;  set; }
        public Guid OrganisationId { get;  set; }
        public DateTime CreateDate { get;  set; }

        public AspNetUser()
        {
        }


        public List<Roles> Roles { get; set; }

        public Organisationinfo organisationinfo { get; set; }

        public List<UserLogins> Logins { get; set; }

        public AspNetUser(string email, string username,string fullName, Guid OrganisationId, Boolean emailConfirmed, Boolean PhoneNumberConfirmed = false, string PhoneNumber = "", string normalizedUserName = "", string normalizedEmail = "", string securityStamp = "", string concurrencyStamp = "", Boolean twoFactorEnabled = true)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ActioException("empty_user_email",
                    "User email can not be empty.");
            }
            if (string.IsNullOrWhiteSpace(username))
            {
                throw new ActioException("empty_user_name",
                    "User name can not be empty.");
            }
            EmailConfirmed = EmailConfirmed;
            Id = Guid.NewGuid();
            Email = email.ToLowerInvariant();
            TwoFactorEnabled = twoFactorEnabled;
            UserName = username;
            CreateDate = DateTime.UtcNow;
            FullName = fullName;
            // SetNormalizedEmail();
        }
        public void SetSalt(string salt)
        {
            Salt = salt;
        }

        public void SetPassword(string password, IEncrypter encrypter)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ActioException("empty_password",
                    "Password can not be empty.");
            }
            
            PasswordHash = encrypter.GetHash(password, Salt);
        }

        public void SetNormalizedEmail(Boolean emailConfirmed)
        {
            if (emailConfirmed)
            {
                byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
                byte[] key = Guid.NewGuid().ToByteArray();
                string token = Convert.ToBase64String(time.Concat(key).ToArray());
                NormalizedEmail = token;
            }

        }
        public bool ValidateToken(string token)
        {
            byte[] data = Convert.FromBase64String(token);
            DateTime when = DateTime.FromBinary(BitConverter.ToInt64(data, 0));
            if (when < DateTime.UtcNow.AddHours(-24))
            {
                return false;
            }
            return true;
        }

        public bool ValidatePassword(string password, IEncrypter encrypter)
        {
            var hs = encrypter.GetHash(password, Salt);
            var r = PasswordHash.Equals(hs);
            return r;
        }
           
    }
}
