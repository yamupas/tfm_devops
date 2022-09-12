using Dapper;
using Microsoft.Extensions.Configuration;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public class UserApplicationRepository : BaseRepository, IUserApplicationRepository
    {
        public UserApplicationRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> Add(AspNetUserApplication aspNetUserApplication)
        {
            try
            {
                string sqlQuery = $"INSERT INTO AspNetUserApplication " +
                    $"(UserId,ApplicationId) values (@UserId,@ApplicationId) ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", aspNetUserApplication.UserId);
                parameters.Add("@ApplicationId", aspNetUserApplication.ApplicationId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    if (result > 0)
                        return true;
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;               
            }
        }

        public async Task<bool> delete(AspNetUserApplication aspNetUserApplication)
        {
            try
            {
                string sqlQuery = $"delete from AspNetUserApplication  " +
                    $" where UserId=@UserId AND ApplicationId=@ApplicationId ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", aspNetUserApplication.UserId);
                parameters.Add("@ApplicationId", aspNetUserApplication.ApplicationId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    if (result > 0)
                        return true;
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<AspNetUserApplication> Validate(Guid UserId, Guid ApplicationId)
        {
            try
            {
                string sqlQuery = $"SELECT * from AspNetUserApplication  " +
                    $" where UserId=@UserId AND ApplicationId=@ApplicationId ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@ApplicationId", ApplicationId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<AspNetUserApplication>(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return result.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
