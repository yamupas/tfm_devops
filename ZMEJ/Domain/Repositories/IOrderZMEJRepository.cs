using ZMEJ.Domain.models;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Repositories
{
    public interface IOrderZMEJRepository
    {
        Task<List<Object>> GetAllDashboardAsync(string centro);
        Task<OrderZMEJ> GetByCodeAsync(string GrupoReceta, string centro);
        Task<OrderZMEJ> GetAsync(Guid id, string centro);
        Task<OrderZMEJDto> GetOrderDetailbyIdAsync(Guid id, string centro);
        Task<List<OrderZMEJDto>> GetAllFilterAsync(int estado, string nombre);
        Task<List<OrderZMEJDto>> GetAllAsync(string centro);

        Task<List<OrderZMEJDto>> GetAllAssignedAsync(string centro,Guid userId);
        Task<List<OrderZMEJDto>> GetAllActiveAsync(string centro);
        Task<bool> AddAsync(OrderZMEJ grupoRecetaSimulacionDto);
        Task<bool> UpdateAsync(OrderZMEJ orderZMEJ);
        Task<bool> UpdateMantemientoAsync(OrderZMEJ orderZMEJ);
        Task DeleteAsync(Guid id);
    }
}
