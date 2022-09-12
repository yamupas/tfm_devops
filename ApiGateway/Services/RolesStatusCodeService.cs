using ApiGatewayZMEJ.Config;
using ApiGatewayZMEJ.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Services
{
    public class RolesStatusCodeService : IRolesStatusCodeService
    {
        private readonly HttpClient _apiClient;
        //private readonly ILogger<BasketService> _logger;
        private readonly UrlsConfig _urls;
        public RolesStatusCodeService(HttpClient httpClient, IOptions<UrlsConfig> config)
        {
            _apiClient = httpClient;
            //_logger = logger;
            _urls = config.Value;
        }
        public async Task<List<RoleStatusCode>> GetByCode(int id)
        {
            var data = await _apiClient.GetStringAsync(_urls.Order + UrlsConfig.OrderOperations.GetUserByStatus(id));

            var RoleStatusCodeData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<List<RoleStatusCode>>(data) : null;

            return RoleStatusCodeData;

           // throw new NotImplementedException();
        }
    }
}
