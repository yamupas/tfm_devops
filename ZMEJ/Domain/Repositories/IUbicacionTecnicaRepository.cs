
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
  public  interface IUbicacionTecnicaRepository
    {
        Task<List<UbicacionTecnica>> GetAll();
        Task<List<UbicacionTecnica>> GetAllActive();
        Task<List<UbicacionTecnica>> GetAllByCentro(string centro);
        Task<UbicacionTecnica> GetByCode(string code);
        Task<UbicacionTecnica> GetById(Guid guid);
        Task<UbicacionTecnica> Save(UbicacionTecnica pets);
        Task<UbicacionTecnica> Update(UbicacionTecnica pets);
    }
}
