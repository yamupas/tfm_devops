using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
   public interface IPasosTPMRepository
    {
        Task<PasoTPM> Add(PasoTPM pasoTPM);
        Task<PasoTPM> Update(PasoTPM pasoTPM);
        Task<List<PasoTPM>> GetAll();
        Task<PasoTPM> GeById(int id);
    }
}
