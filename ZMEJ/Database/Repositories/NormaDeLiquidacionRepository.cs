using Dapper;
using Microsoft.Extensions.Configuration;
using ZMEJ.Domain.models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ZMEJ.Database.Repositories
{
    public class NormaDeLiquidacionRepository : BaseRepository, INormaDeLiquidacionRepository
    {
        public NormaDeLiquidacionRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Task<bool> AddAsync(NormaDeLiquidacion grupoRecetaSimulacionDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<NormaDeLiquidacionDto>> GetAllActiveAsync(string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.NormaDeLiquidacion ORDER BY Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<NormaDeLiquidacionDto>(conn, sqlQuery, commandType: CommandType.Text);
                return r.ToList();
            }

           
        }

        public async Task<List<NormaDeLiquidacionDto>> GetAllAsync(string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.NormaDeLiquidacion ORDER BY Id";
            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<NormaDeLiquidacionDto>(conn, sqlQuery, commandType: CommandType.Text);
                return r.ToList();
            }

          
        }

        public async Task<NormaDeLiquidacion> GetAsync(int id, string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.NormaDeLiquidacion where Id=@Id ORDER BY Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<NormaDeLiquidacion>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault();
            }

           
        }

        public async Task<NormaDeLiquidacion> GetByCodeAsync(int id, string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.NormaDeLiquidacion where Id=@Id ORDER BY Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<NormaDeLiquidacion>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault(); 
            }
          

        }
    }
}
