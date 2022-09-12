using ZMEJ.Domain.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Repositories
{
   public interface IOrderZMEJDetailsRepository
    {
        Task<List<OrderZMEJDetails>> getAllByOrderId(Guid orderId);
        Task<bool> AddOrderDetails(OrderZMEJDetails orderZMEJDetails);
    }
}
