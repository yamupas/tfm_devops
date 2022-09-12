using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Threading.Tasks;
using DataManagement.Common.Exceptions;
using Microsoft.Extensions.Options;
using Services.UserManager.Domain.Models;
using Services.UserManager.Extensions;

namespace Services.UserManager.Domain.Services
{
    public class LdapAuthenticationService : ILdapAuthenticationService
    {
        private const string DisplayNameAttribute = "DisplayName";
        private const string DisplayEmailAttribute = "Email";
        private const string SAMAccountNameAttribute = "SAMAccountName";

        private readonly LdapConfig config;

        public LdapAuthenticationService(IOptions<LdapConfig> config)
        {
            this.config = config.Value;
        }

        public async Task<AspNetUser> Login(string UserName, string Password)
        {
            try
            {
                //using (DirectoryEntry entry = new DirectoryEntry(config.Path, config.UserDomainName + "\\" + UserName, Password))
                using (DirectoryEntry entry = new DirectoryEntry(config.UserDomainName, UserName, Password))
                {
                    using (DirectorySearcher searcher = new DirectorySearcher(entry))
                    {
                        searcher.Filter = String.Format("({0}={1})", SAMAccountNameAttribute, UserName);
                        searcher.PropertiesToLoad.Add(DisplayNameAttribute);
                        searcher.PropertiesToLoad.Add(SAMAccountNameAttribute);
                        var result = searcher.FindOne();
                        if (result != null)
                        {
                            var displayName = result.Properties[DisplayNameAttribute];
                            var samAccountName = result.Properties[SAMAccountNameAttribute];
                            var emailName = result.Properties[DisplayEmailAttribute];
                            var Email = emailName == null || emailName.Count <= 0 ? UserName : emailName[0].ToString();
                            var fullname = displayName == null || displayName.Count <= 0 ? "" : displayName[0].ToString();
                            //  var email = result.Properties[SA];

                            var user = new AspNetUser(Email, UserName, fullname, Guid.Empty, false, false);
                            return user;
                            //return new AspNetUser
                            //{
                            //    DisplayName = displayName == null || displayName.Count <= 0 ? null : displayName[0].ToString(),
                            //    UserName = samAccountName == null || samAccountName.Count <= 0 ? null : samAccountName[0].ToString()
                            //};
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw new ActioException(ex.ToString());
                // if we get an error, it means we have a login failure.
                // Log specific exception
            }
            return null;
        }

    }
}
