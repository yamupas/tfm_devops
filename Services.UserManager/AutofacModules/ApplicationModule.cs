using DataManagement.Common.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Services.UserManager.Domain.Repositories;
using Services.UserManager.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.AutofacModules
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplicationModule(this IServiceCollection services)
        {
            // configure DI for application services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<ILdapAuthenticationService, LdapAuthenticationService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMenusRepository, MenusRepository>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEncrypter, Encrypter>();
            services.AddScoped<IEncrypterSha1, EncrypterSha1>();
            services.AddScoped<IJwtHandler, JwtHandler>();
            services.AddScoped<IUserManagerService, UserManagerService>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUserRoleApplicationService, UserRoleApplicationService>();
            services.AddScoped<IUserApplicationService, UserApplicationService>();
            services.AddScoped<IApplicationRoleService, ApplicationRoleService>();
            services.AddScoped<IApplicationRoleRepository, ApplicationRoleRepository>();

            services.AddScoped<IMenusService, MenusService>();
            services.AddScoped<IUserApplicationRepository ,UserApplicationRepository>();
            services.AddScoped<IUserRoleApplicationRepository, UserRoleApplicationRepository>();
            services.AddScoped<IOrganisationinfoRepository, OrganisationinfoRepository>();
            
            return services;
        }
    }
}
