
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
  public  interface IPuestoDeTrabajoRepository
    {
        Task<List<PuestoDeTrabajo>> GetAll();
        Task<List<PuestoDeTrabajo>> GetAllActive();
        Task<List<PuestoDeTrabajo>> GetAllByCentro(string centro);
        Task<PuestoDeTrabajo> GetByCode(string code);
        PuestoDeTrabajo Save(PuestoDeTrabajo pets);

        PuestoDeTrabajo Update(PuestoDeTrabajo pets);
    }
}
