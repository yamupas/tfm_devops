using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ZMEJ.Proxies
{
    public class ZMEJProxy
    {
       
        private readonly ApiUrls _apiUrls;
        private readonly HttpClient _httpClient;

        public ZMEJProxy(
            HttpClient httpClient,
            IOptions<ApiUrls> apiUrls
        )
        {
            _httpClient = httpClient;
            _apiUrls = apiUrls.Value;
        }

        //public async Task SendNotificationAsync(ProductInStockUpdateStockCommand command)
        //{
        //    var content = new StringContent(
        //        JsonSerializer.Serialize(command),
        //        Encoding.UTF8,
        //        "application/json"
        //    );

        //    var request = await _httpClient.PutAsync(_apiUrls.NotificationUrl + "v1/stocks", content);
        //    request.EnsureSuccessStatusCode();
        //}
    }
}
