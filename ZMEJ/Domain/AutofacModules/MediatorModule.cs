using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.AutofacModules
{
    public static class MediatorModule
    {
        public static IServiceCollection AddMediatorModule(this IServiceCollection services)
        {
            services.AddMediatR(typeof(Startup));
            return services;

        }
    }
}
