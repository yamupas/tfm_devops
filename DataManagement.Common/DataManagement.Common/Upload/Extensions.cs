using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataManagement.Common.Upload
{
    public static class Extensions
    {
        public static void AddUploadSetting(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<Folders>(configuration.GetSection("UploadSettings"));
            services.AddSingleton<IFileInfoHandler, FileInfoHandler>();
            services.AddSingleton<IFileUploadManager, LocalFileUploadManager>();

        }
    }
}
