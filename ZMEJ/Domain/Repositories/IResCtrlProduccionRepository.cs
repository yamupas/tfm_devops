using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
    public interface IResCtrlProduccionRepository
    {
        Task<List<ResCtrlProduccion>> GetAll(string centro);
        Task<ResCtrlProduccion> GetByCode(string centro, string code);
        Task<ResCtrlProduccion> Save(ResCtrlProduccion resCtrlProduccion);

        Task<ResCtrlProduccion> Update(ResCtrlProduccion resCtrlProduccion);
    }
}
