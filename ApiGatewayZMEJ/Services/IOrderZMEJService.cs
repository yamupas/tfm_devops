using ApiGatewayZMEJ.Dtos;
using ApiGatewayZMEJ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGatewayZMEJ.Services
{
    public interface IOrderZMEJService
    {
        Task<OrderZMEJDto> GetById(Guid id);
        Task<OrderZMEJDto> GetOrderDatails(Guid id);
        Task<Object> GetUserByIdStatus(int code);
        Task<Guid> save(OrderZMEJ orderZMEJ);

        Task<CreateOrderResult> Update(OrderZMEJ orderZMEJ);
        Task<bool> Approved(AprovedOrderZMEJ aprovedOrderZMEJ);
        Task<bool> Reject(AprovedOrderZMEJ aprovedOrderZMEJ);

    }
}
