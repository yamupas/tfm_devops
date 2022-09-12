using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Services
{
    public class IdentityService : IIdentityService
    {
        private IHttpContextAccessor _context;
        public IdentityService(IHttpContextAccessor context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public string GetOrganisationId()
        {
            try
            {

                return _context.HttpContext.User.FindFirst("organisationid").Value;
            }
            catch (Exception ex)
            {

                return string.Empty;
            }

        }

        public string GetUserIdentity()
        {
            return _context.HttpContext.User.FindFirst("sub").Value;
        }

        public string GetUserName()
        {
            return _context.HttpContext.User.FindFirst("username").Value;

            // return _context.HttpContext.User.Identity.Name;
        }
        public string GetClientIP()
        {
            return _context.HttpContext.Connection.RemoteIpAddress.ToString();
        }

        public string GetRoles()
        {
            return _context.HttpContext.User.FindFirst("roles").Value;
        }

        //_accessor.HttpContext.Connection.RemoteIpAddress.ToString()
    }
}
