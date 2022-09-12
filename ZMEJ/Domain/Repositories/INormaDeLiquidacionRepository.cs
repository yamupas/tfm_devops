using ZMEJ.Domain.models;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Domain.Repositories
{
    public interface INormaDeLiquidacionRepository
    {
        Task<NormaDeLiquidacion> GetByCodeAsync(int id, string centro);
        Task<NormaDeLiquidacion> GetAsync(int id, string centro);
        Task<List<NormaDeLiquidacionDto>> GetAllAsync(string centro);
        Task<List<NormaDeLiquidacionDto>> GetAllActiveAsync(string centro);
        Task<bool> AddAsync(NormaDeLiquidacion grupoRecetaSimulacionDto);
        Task DeleteAsync(Guid id);
    }
}
