
using ApiGatewayZMEJ.Config;
using ApiGatewayZMEJ.Dtos;
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
    public class UserService : IUserService
    {
        private readonly HttpClient _apiClient;
        //private readonly ILogger<BasketService> _logger;
        private readonly UrlsConfig _urls;

        public UserService(HttpClient httpClient, IOptions<UrlsConfig> config)
        {
            _apiClient = httpClient;
            //_logger = logger;
            _urls = config.Value;
        }

        public async Task<UserDto> GetUserByIdyAsync(Guid id)
        {
            var data = await _apiClient.GetStringAsync(_urls.Identity + UrlsConfig.IdentityOperations.GetUserById(id));
            var UserData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<UserDto>(data) : null;
            return UserData;
        }

        public async Task<UserDto> GetUserByNotificationZMEJ()
        {
            var data = await _apiClient.GetStringAsync(_urls.Identity + UrlsConfig.IdentityOperations.GetUserNotificationZMEJ());
            var UserData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<UserDto>(data) : null;
            return UserData;
        }

        public async Task<List<UserDto>> GetUserByRoleAsync(IEnumerable<Guid> guids)
        {
            var url = UrlsConfig.IdentityOperations.GetUserZMEJByIds();
            var data = await _apiClient.GetStringAsync(_urls.Identity +url );
            var UserData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<List<UserDto>>(data) : null;
            return UserData;
        }

        public async Task<List<UserDto>> GetUserByRoleAsync(IEnumerable<Guid> guids, Guid applicationid)
        {
            var url = UrlsConfig.IdentityOperations.GetIUserByRolesId(guids,applicationid);
            var data = await _apiClient.GetStringAsync(_urls.Identity + url);
            var UserData = !string.IsNullOrEmpty(data) ? JsonConvert.DeserializeObject<List<UserDto>>(data) : null;
            return UserData;
        }

        public async Task<List<UserDto>> GetUserByRoleDataAsync(RolesAplicationViewModels parametros)
        {
            try
            {
                var orderContent = new StringContent(JsonConvert.SerializeObject(parametros), System.Text.Encoding.UTF8, "application/json");
                var url = _urls.Identity + UrlsConfig.IdentityOperations.GetUserZMEJByIds();
                var r = await _apiClient.PostAsync(url, orderContent);
                if (r.StatusCode != System.Net.HttpStatusCode.OK)
                {

                    // CreateOrderResult
                    return null;
                }
                //var k = r;
                //

                var receiveStream = r.Content.ReadAsStringAsync();
                var UserData = JsonConvert.DeserializeObject<List<UserDto>>(receiveStream.Result.ToString());
                return UserData; //Guid.Parse(UserData.OrderId);
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
