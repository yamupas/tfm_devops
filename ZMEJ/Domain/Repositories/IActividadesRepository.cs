using ZMEJ.Domain.models;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Repositories
{
    public interface IActividadesRepository
    {
        Task<ClaseDeActividad> GetByCodeAsync(int id, string centro);
        Task<ClaseDeActividad> GetAsync(int id, string centro);
        Task<List<ClaseDeActividadDto>> GetAllAsync(string centro);
        Task<List<ClaseDeActividadDto>> GetAllActiveAsync(string centro);
        Task<bool> AddAsync(ClaseDeActividad grupoRecetaSimulacionDto);
        Task DeleteAsync(Guid id);
    }
}
