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
    public class RoleStatusCodeRepository : BaseRepository, IRoleStatusCodeRepository
    {
        public RoleStatusCodeRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Task<bool> AddAsync(RoleStatusCode roleStatusCode)
        {
            throw new NotImplementedException();
        }

        public async Task<RoleStatusCode> GetAllByCodeAndUserAsync(int code, Guid userId)
        {
            string SqlQuery = "SELECT DISTINCT Code,RolId FROM ZMEJ.RoleStatusCode where Code=@Code AND userId=@UserId ";
            using (IDbConnection conn = DapperConnection)
            {

                var result = await SqlMapper.QueryAsync<RoleStatusCode>(conn, SqlQuery, new { Code = code, UserId = userId }, commandType: System.Data.CommandType.Text);
                return result.FirstOrDefault();
            }

           
        }

        public async Task<List<RoleStatusCode>> GetAllByCodeAsync(int code)
        {
            string SqlQuery = "SELECT DISTINCT Code,RolId FROM ZMEJ.RoleStatusCode where Code=@Code ";
            using (IDbConnection conn = DapperConnection)
            {

                var result = await SqlMapper.QueryAsync<RoleStatusCode>(conn, SqlQuery, new { Code = code }, commandType: System.Data.CommandType.Text);
                return result.ToList();
            }

          

        }
    }
}
