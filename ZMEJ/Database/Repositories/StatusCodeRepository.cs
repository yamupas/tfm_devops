using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;
using Dapper;
using System.Data;
using System.Linq;

namespace ZMEJ.Database.Repositories
{
    public class StatusCodeRepository : BaseRepository, IStatusCodeRepository
    {
        public StatusCodeRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<StatusCode>> GetAll()
        {
            try
            {
                string SqlQuery = "SELECT Code,Name,Description FROM ZMEJ.StatusCode ORDER BY Code";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<StatusCode>(conn, SqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }
              
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }

        public async Task<StatusCode> GetByCode(int code)
        {
            try
            {
                string SqlQuery = "SELECT Code,Name,Description FROM ZMEJ.StatusCode ORDER BY Code";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<StatusCode>(conn, SqlQuery, new { Code = code }, commandType: CommandType.Text);
                    return r.FirstOrDefault();
                }

               
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }
        public async Task<List<StatusCode>> GetAllLowCode(int code)
        {
            try
            {
                string SqlQuery = "SELECT Code,Name,Description FROM ZMEJ.StatusCode WHERE Code<@Code " +
                                        "UNION  " +
                                  "SELECT Code,Name,Description FROM ZMEJ.StatusCode WHERE Name='Cancelado'  ORDER BY Code";

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<StatusCode>(conn, SqlQuery, new { Code = code }, commandType: CommandType.Text);
                    return r.ToList();
                }

              
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }



        public StatusCode Save(StatusCode statusCode)
        {
            try
            {
                return statusCode;
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }

        public StatusCode Update(StatusCode statusCode)
        {
            try
            {
                return statusCode;
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
        }
    }
}
