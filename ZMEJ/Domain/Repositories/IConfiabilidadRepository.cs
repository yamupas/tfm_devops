using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
    public interface IClasificacionRepository
    {
        Task<List<Clasificacion>> GetAll();
        Task<List<Clasificacion>> GetAllActive();
        Task<Boolean> Add(Clasificacion confiabilidad);
        Task<Boolean> Update(Clasificacion confiabilidad);

    }
}
