using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ApiGatewayZMEJ.Config;
using ApiGatewayZMEJ.Dtos;
using ApiGatewayZMEJ.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ApiGatewayZMEJ.Services
{
    public class OrderZMEJService : IOrderZMEJService
    {

        private readonly HttpClient _apiClient;
        //private readonly ILogger<BasketService> _logger;
        private readonly UrlsConfig _urls;

        public OrderZMEJService(HttpClient httpClient,  IOptions<UrlsConfig> config)
        {
            _apiClient = httpClient;
            //_logger = logger;
            _urls = config.Value;
        }
        public async Task<bool> Approved(AprovedOrderZMEJ aprovedOrderZMEJ)
        {
            try
            {
                var orderContent = new StringContent(JsonConvert.SerializeObject(aprovedOrderZMEJ), System.Text.Encoding.UTF8, "application/json");

                var r = await _apiClient.PostAsync(_urls.Order + UrlsConfig.OrderOperations.AprovedOrderZMEJ(), orderContent);
                if (r.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;
                }
                //var k = r;
                //
                //var receiveStream = r.Content.ReadAsStringAsync();
                return false;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<OrderZMEJDto> GetById(Guid id)
        {
            try
            {
                var data = await _apiClient.GetStringAsync(_urls.Order + UrlsConfig.OrderOperations.GetOrderById(id));
                var RoleStatusCodeData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<OrderZMEJDto>(data) : null;
                return RoleStatusCodeData;
            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
        }

        public async Task<OrderZMEJDto> GetOrderDatails(Guid id)
        {
            try
            {
                var data = await _apiClient.GetStringAsync(_urls.Order + UrlsConfig.OrderOperations.GetOrderDetails(id));
                var RoleStatusCodeData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<OrderZMEJDto>(data) : null;
                return RoleStatusCodeData;
            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
        }

        public async Task<object> GetUserByIdStatus(int code)
        {
            try
            {
                var r = await _apiClient.GetAsync(_urls.Order + UrlsConfig.OrderOperations.GetUserByStatus(code));
                if (r.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var receiveStream = r.Content.ReadAsStringAsync();
                    return receiveStream;
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
        }

        public async  Task<bool> Reject(AprovedOrderZMEJ aprovedOrderZMEJ)
        {
            try
            {
                var orderContent = new StringContent(JsonConvert.SerializeObject(aprovedOrderZMEJ), System.Text.Encoding.UTF8, "application/json");

                var r = await _apiClient.PostAsync(_urls.Order + UrlsConfig.OrderOperations.RejectOrderZMEJ(), orderContent);
                if (r.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return true;
                }
                //var k = r;
                //
                // var receiveStream = r.Content.ReadAsStringAsync();
                return false;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<Guid> save(OrderZMEJ orderZMEJ)
        {
            try
            {
                var orderContent = new StringContent(JsonConvert.SerializeObject(orderZMEJ), System.Text.Encoding.UTF8, "application/json");

                var r = await _apiClient.PostAsync(_urls.Order + UrlsConfig.OrderOperations.SaveOrderZMEJ(), orderContent);
                if(r.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    
                    // CreateOrderResult
                    return Guid.Empty;
                }
                //var k = r;
                //

                var receiveStream = r.Content.ReadAsStringAsync();
                var UserData = JsonConvert.DeserializeObject<CreateOrderResult>(receiveStream.Result.ToString());
                return UserData.OrderId; //Guid.Parse(UserData.OrderId);
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }

        public async Task<CreateOrderResult> Update(OrderZMEJ orderZMEJ)
        {
            try
            {
                var orderContent = new StringContent(JsonConvert.SerializeObject(orderZMEJ), System.Text.Encoding.UTF8, "application/json");

                var r = await _apiClient.PostAsync(_urls.Order + UrlsConfig.OrderOperations.UpdateOrderZMEJ(), orderContent);
                if (r.StatusCode != System.Net.HttpStatusCode.OK)
                {

                    var vCreateOrderResult = new CreateOrderResult();
                    vCreateOrderResult.OrderId = Guid.Empty;
                    vCreateOrderResult.StatusCode = ((int)r.StatusCode).ToString();
                    // CreateOrderResult
                    return vCreateOrderResult;// Guid.Empty;
                }
                //var k = r;
                //

                var receiveStream = r.Content.ReadAsStringAsync();
                var UserData = JsonConvert.DeserializeObject<CreateOrderResult>(receiveStream.Result.ToString());
                return UserData; //Guid.Parse(UserData.OrderId);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}
