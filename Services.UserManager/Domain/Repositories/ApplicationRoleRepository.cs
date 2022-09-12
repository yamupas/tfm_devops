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
    public class ApplicationRoleRepository : BaseRepository, IApplicationRoleRepository
    {
        public ApplicationRoleRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> AddRole(ApplicationRole applicationRole)
        {
            try
            {
                var sqlQuery = "insert into AspNetApplicationRoles " +
                     "(ApplicationId,RoleId) values (@ApplicationId,@RoleId)";
                DynamicParameters parameters = new DynamicParameters();
               
                parameters.Add("@ApplicationId", applicationRole.ApplicationId);
                parameters.Add("@RoleId", applicationRole.RoleId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, commandType: CommandType.Text);
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

        public async Task<bool> DeleRole(ApplicationRole applicationRole)
        {
            try
            {
                var sqlQuery = "delete from AspNetApplicationRoles " +
                     " where RoleId=@RoleId AND ApplicationId=@ApplicationId";
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@ApplicationId", applicationRole.ApplicationId);
                parameters.Add("@RoleId", applicationRole.RoleId);
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, commandType: CommandType.Text);
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

        public async Task<List<Roles>> GetRoles(Guid ApplicactionId)
        {
            try
            {
                var sqlQuery = "SELECT DISTINCT A.*  FROM AspNetRoles A INNER JOIN AspNetApplicationRoles " +
                    " B ON A.Id = B.RoleId WHERE  B.applicationId=@ApplicationId";
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@ApplicationId", ApplicactionId);
               
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<Roles>(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    return result.ToList();
                }

            }
            catch (SqlException sqlException)
            {
                return null;
            }
            catch (Exception exception)
            {
                return null;
                //TODO: Use Logger
            }

        }

        public async Task<ApplicationRole> ValidateRole(ApplicationRole applicationRole)
        {
            try
            {
                var sqlQuery = "SELECT DISTINCT  * from AspNetApplicationRoles " +
                    "  WHERE  applicationId=@ApplicationId  AND RoleId=@RoleId";
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@ApplicationId", applicationRole.ApplicationId);
                parameters.Add("@RoleId", applicationRole.RoleId);

                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<ApplicationRole>(conn, sqlQuery, commandType: CommandType.Text);
                    return result.FirstOrDefault();
                }

            }
            catch (SqlException sqlException)
            {
                return null;
            }
            catch (Exception exception)
            {
                return null;
                //TODO: Use Logger
            }
        }
    }
}
