using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ApiGatewayZMEJ.Config;
using ApiGatewayZMEJ.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ApiGatewayZMEJ.Services
{
    public class NotificationService : INotificationService
    {
        private readonly HttpClient _apiClient;
        //private readonly ILogger<BasketService> _logger;
        private readonly UrlsConfig _urls;
        public NotificationService(HttpClient httpClient, IOptions<UrlsConfig> config)
        {
            _apiClient = httpClient;
            //_logger = logger;
            _urls = config.Value;

        }
        public async Task SendEmail(SendEmail sendEmail)
        {
            try
            {
                var sendEmailContent = new StringContent(JsonConvert.SerializeObject(sendEmail), System.Text.Encoding.UTF8, "application/json");
                var r2 = JsonConvert.SerializeObject(sendEmail);
                  _apiClient.PostAsync(_urls.Notifications + UrlsConfig.NotificationOperations.SendEmail(), sendEmailContent);
                
            }
            catch (Exception ex)
            {

                throw;
            }
          

           // throw new NotImplementedException();
        }
    }
}
