using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;

namespace ZMEJ.Database.Repositories
{
    public class PasosTPMRepository : BaseRepository, IPasosTPMRepository
    {
        public PasosTPMRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<PasoTPM> Add(PasoTPM pasoTPM)
        {
            throw new NotImplementedException();
        }

        public Task<PasoTPM> GeById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PasoTPM>> GetAll()
        {
            string sqlQuery = "SELECT * from ZMEJ.PasosTPM ORDER BY Id";

            using (IDbConnection conn = DapperConnection)
            {

                var r = await SqlMapper.QueryAsync<PasoTPM>(conn, sqlQuery, commandType: CommandType.Text);
                return r.ToList();
            }

           
        }

        public Task<PasoTPM> Update(PasoTPM pasoTPM)
        {
            throw new NotImplementedException();
        }
    }
}
