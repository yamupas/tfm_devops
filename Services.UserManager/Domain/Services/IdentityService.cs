using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
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
            try
            {
                //public string UserId { get { return _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier); } }
                return _context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
            catch (Exception)
            {

                throw;
            }
           
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
