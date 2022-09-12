using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.Domain.Repositories
{
     public interface IStatusCodeRepository
    {
        Task<List< StatusCode>> GetAll();
        Task<List<StatusCode>> GetAllLowCode(int code);
        Task<StatusCode> GetByCode(int code);
        StatusCode Save(StatusCode statusCode);

        StatusCode Update(StatusCode statusCode);
    }
}
