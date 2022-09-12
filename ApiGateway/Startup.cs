using ApiGatewayZMEJ.Infrastructure;
using ApiGatewayZMEJ.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.Middleware;
using System;

using ApiGatewayZMEJ.Config;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using Polly;
using Polly.Extensions.Http;
using ApiGatewayZMEJ.Handlers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Ocelot.DependencyInjection;
using Ocelot.Cache.CacheManager;



using ApiGatewayZMEJ.Support;

namespace ApiGateway
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            services.AddControllers();
            services.AddDevspaces();
            services.AddCustomAuthentication(Configuration);
            services.AddApplicationServices();
            services.AddOcelot().AddCacheManager(settings => settings.WithDictionaryHandle());
            //services.AddOcelot();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public  void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseCors
            //  (b => b

            //      .WithOrigins("*").AllowAnyOrigin()
            //      .AllowAnyMethod()
            //      .AllowAnyHeader()
            //      .AllowCredentials()
            //  );

            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseOcelot().Wait();
        }
    }
    //
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            var identityUrl = configuration.GetValue<string>("urls:identity");
            var Authkey = configuration.GetValue<string>("AuthKey");
            var key = Encoding.ASCII.GetBytes(Authkey);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer("ApiSecurity", x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

            });

            return services;
        }
        //public static IServiceCollection AddCustomMvc(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddOptions();
        //    services.Configure<UrlsConfig>(configuration.GetSection("urls"));
        //    services.AddMvc()
        //        .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

        //    return services;
        //}
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            //register delegating handlers

            services.AddTransient<HttpClientAuthorizationDelegatingHandler>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddTransient<DevspacesMessageHandler>();

            //register http services

            services.AddHttpClient<IOrderZMEJService, OrderZMEJService>()
             .AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>()
             .AddPolicyHandler(GetRetryPolicy())
             .AddPolicyHandler(GetCircuitBreakerPolicy())
             .AddDevspacesSupport();
            //IRolesStatusCodeService
            services.AddHttpClient<IRolesStatusCodeService, RolesStatusCodeService>()
              .AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>()
              .AddPolicyHandler(GetRetryPolicy())
              .AddPolicyHandler(GetCircuitBreakerPolicy())
              .AddDevspacesSupport();

            services.AddHttpClient<IUserService, UserService>()
                 .AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>()
                 .AddPolicyHandler(GetRetryPolicy())
                 .AddPolicyHandler(GetCircuitBreakerPolicy())
                 .AddDevspacesSupport();
            //INotificationService
            services.AddHttpClient<INotificationService, NotificationService>()
                .AddHttpMessageHandler<HttpClientAuthorizationDelegatingHandler>()
                .AddPolicyHandler(GetRetryPolicy())
                .AddPolicyHandler(GetCircuitBreakerPolicy())
                .AddDevspacesSupport();
            return services;
        }

        static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return HttpPolicyExtensions
              .HandleTransientHttpError()
              .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
              .WaitAndRetryAsync(6, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

        }

        static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));
        }
    }

}
