using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Config
{
    public class UrlsConfig
    {
        public class OrderOperations
        {
            public static string GetOrderById(Guid id) => $"/api/OrderZMEJ/FindbyId/{id}";
            public static string GetOrderDetails(Guid id) => $"/api/OrderZMEJ/OrderDetails/{id}";
            public static string GetUserByStatus(int statusCode) => $"/api/RoleStatusCode/getByCode/{statusCode}";
            public static string SaveOrderZMEJ() => "/api/OrderZMEJ/save";
            public static string AprovedOrderZMEJ() => "/api/OrderZMEJ/aproved";
            public static string RejectOrderZMEJ() => "/api/OrderZMEJ/reject";
            //public static string SaveOrderZMEJ() => "/api/OrderZMEJ/save";

            public static string UpdateOrderZMEJ() => "/api/OrderZMEJ/update";
        }

        public class IdentityOperations
        {
            public static string GetUserById(Guid id) => $"/api/users/GetUserById/{id}";
            public static string GetUserNotificationZMEJ() => $"/api/users/GetUserNotificationZMEJ";
            public static string GetUserByIds(string ids) => $"/api/OrderZMEJ/GetUserByStatus/{ids}";
            public static string GetUserZMEJByIds() => "/api/users/GetUserZMEJByStatus";
            public static string GetIUserByRolesId(IEnumerable<Guid> ids,Guid applicationId) => $"/api/users/byapplicationAndroles/{applicationId}/{string.Join(',', ids)}";
        }
        public class NotificationOperations
        {
            public static string SendEmail() => $"/api/sendEmail/Email";
            //public static string UpdateBasket() => "/api/v1/basket";
        }

        public class FrontendOperations
        {
            public static string OrderDetails(Guid id) => $"/#/ordenes/order-zmej-details/{id}";
        }

        public string Order { get; set; }
        public string Notifications { get; set; }
        public string Identity { get; set; }

        public string Frontendurl { get; set; }
    }
}
