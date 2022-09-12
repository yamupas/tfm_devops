
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
    public interface IMaquinasRepository
    {
        Task<List<TMaquinas>> GetAll(string centro);
        Task<List<TMaquinas>> GetAllActive(string centro);
        Task<TMaquinas> GetByCode(string centro, string code);
        TMaquinas Save(TMaquinas maquinas);

        TMaquinas Update(TMaquinas maquinas);
    }
}
