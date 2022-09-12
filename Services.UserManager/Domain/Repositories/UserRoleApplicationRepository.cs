using Dapper;
using Microsoft.Extensions.Configuration;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public class UserRoleApplicationRepository : BaseRepository, IUserRoleApplicationRepository
    {
        public UserRoleApplicationRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> AddRoleForUser(UserRoleApplication user)
        {
            try
            {
               var sqlQuery = "insert into AspNetUserRoleApplication " +
                    "(UserId,ApplicationId,RoleId) values (@UserId,@ApplicationId,@RoleId)";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", user.UserId);
                parameters.Add("@ApplicationId", user.ApplicationId);
                parameters.Add("@RoleId", user.RoleId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery,parameters, commandType: CommandType.Text);
                    if (result > 0)
                    {
                        return true;
                    }
                }

            }
            catch (SqlException sqlException)
            {
                return false;
            }
            catch (Exception exception)
            {
                //TODO: Use Logger
            }

            return false;
        }

        public async Task<bool> DeleteRoleForUser(Guid UserId, Guid ApplicationId)
        {
            try
            {
                var sqlQuery = "delete from AspNetUserRoleApplication " +
                     " where UserId=@UserId AND ApplicationId=@ApplicationId";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                parameters.Add("@ApplicationId", ApplicationId);
              
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery,parameters, commandType: CommandType.Text);
                    if (result > 0)
                    {
                        return true;
                    }
                }

            }
            catch (SqlException sqlException)
            {
                return false;
            }
            catch (Exception exception)
            {
                //TODO: Use Logger
            }

            return false;
        }
    }
}
