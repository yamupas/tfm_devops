
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
   public interface IGruposPlanificacionRespository
    {
        Task<List<GruposPlanificacion>> GetAll(string centro);
        Task<List<GruposPlanificacion>> GetAllActive(string centro);
        Task<GruposPlanificacion> GetByCode(string centro, string code);

        Task<List<GruposPlanificacion>> GetByResCtrlProduccion(string centro, string code);
        Task<GruposPlanificacion> Save(GruposPlanificacion gruposPlanificacion);

        Task<GruposPlanificacion> Update(GruposPlanificacion gruposPlanificacion);
    }
}
