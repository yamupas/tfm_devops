using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using ZMEJ.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.AutofacModules
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplicationModule(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(typeof(IIdentityService), typeof(IdentityService));
            //  services.AddSingleton(typeof(ILoggerServices), typeof(LoggerServices));


            //services.AddSingleton(typeof(IGrupoRecetasSimulacionRepository), typeof(GrupoRecetasSimulacionRepository));
            services.AddSingleton(typeof(IPasosTPMRepository), typeof(PasosTPMRepository));
            services.AddSingleton(typeof(IOrderZMEJDetailsRepository), typeof(OrderZMEJDetailsRepository));
            services.AddSingleton(typeof(INormaDeLiquidacionRepository), typeof(NormaDeLiquidacionRepository));
            services.AddSingleton(typeof(IActividadesRepository), typeof(ActividadesRepository));
            services.AddSingleton(typeof(IOrderZMEJRepository), typeof(OrderZMEJRepository));
            services.AddSingleton(typeof(IRoleStatusCodeRepository), typeof(RoleStatusCodeRepository));
            services.AddSingleton(typeof(IStatusCodeRepository), typeof(StatusCodeRepository));
            services.AddSingleton(typeof(IClasificacionRepository), typeof(ClasificacionRepository));
            //
            
            services.AddSingleton(typeof(IPuestoDeTrabajoRepository), typeof(PuestoDeTrabajoRepository));
            services.AddSingleton(typeof(IUbicacionTecnicaRepository), typeof(UbicacionTecnicaRepository));
            services.AddSingleton(typeof(IGruposPlanificacionRespository), typeof(GruposPlanificacionRespository));
            services.AddSingleton(typeof(IResCtrlProduccionRepository), typeof(ResCtrlProduccionRepository));
            services.AddSingleton(typeof(IMaquinasRepository), typeof(MaquinasRepository));
            return services;
        }
    }
}
