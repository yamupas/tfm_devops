using Dapper;
using DataManagement.Common.Exceptions;
using Microsoft.Extensions.Configuration;
using Services.UserManager.Domain.Dtos;
using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<AspNetUser> AddAsync(AspNetUser user)
        {
            string sqlQuery = $"INSERT INTO AspNetUsers " +
           "(Id , AccessFailedCount , ConcurrencyStamp,FullName ,Email , EmailConfirmed, LockoutEnabled , LockoutEnd, NormalizedEmail, NormalizedUserName, " +
           " PasswordHash, PhoneNumber, PhoneNumberConfirmed, SecurityStamp, TwoFactorEnabled, UserName, OrganisationId , CreateDate , Salt) VALUES " +
           "(@Id , @AccessFailedCount , @ConcurrencyStamp,@FullName ,@Email , @EmailConfirmed, @LockoutEnabled , @LockoutEnd, @NormalizedEmail, @NormalizedUserName, " +
           " @PasswordHash, @PhoneNumber, @PhoneNumberConfirmed, @SecurityStamp, @TwoFactorEnabled, @UserName, @OrganisationId , @CreateDate , @Salt) ";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", user.Id);
            parameters.Add("@AccessFailedCount", user.AccessFailedCount);
            parameters.Add("@ConcurrencyStamp", user.ConcurrencyStamp);
            parameters.Add("@FullName", user.FullName);
            parameters.Add("@Email", user.Email);
            parameters.Add("@EmailConfirmed", user.EmailConfirmed);
            parameters.Add("@LockoutEnabled", user.LockoutEnabled);
            parameters.Add("@LockoutEnd", null);
            parameters.Add("@NormalizedEmail", user.NormalizedEmail);
            parameters.Add("@NormalizedUserName", user.NormalizedUserName);
            parameters.Add("@PasswordHash", user.PasswordHash);
            parameters.Add("@PhoneNumber", user.PhoneNumber);
            parameters.Add("@PhoneNumberConfirmed", user.PhoneNumberConfirmed);
            parameters.Add("@SecurityStamp", user.SecurityStamp);
            parameters.Add("@TwoFactorEnabled", user.TwoFactorEnabled);
            parameters.Add("@UserName", user.UserName);
            parameters.Add("@OrganisationId", user.OrganisationId);
            parameters.Add("@CreateDate", user.CreateDate);
            parameters.Add("@Salt", user.Salt);

            try
            {
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return user;
                }
                //if (await SqlMapper.ExecuteAsync(con, sqlQuery, param: parameters, commandType: CommandType.Text) > 0)
                //{
                //    return user;
                //}

            }
            catch (SqlException sqlException)
            {
                throw new ActioException("SqlException",
                    $"Error code: " + sqlException.ErrorCode.ToString());
                //TODO: Use Logger
                //throw sqlException;
            }
            catch (Exception exception)
            {
                throw new ActioException("Exception",
                   $"Error code: " + exception.Message);
                //TODO: Use Logger
                //throw exception;
            }

            return null;
        }

        public async Task<bool> ConfirmEmailAsync(Guid userId, string code)
        {

            string sqlQuery = "UPDATE AspNetUsers SET AccessFailedCount=0,EmailConfirmed=0,LockoutEnd=NULL,NormalizedEmail=NULL WHERE Id=@UserId AND NormalizedEmail=@Code";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, new { UserId = userId, Code = code }, commandType: CommandType.Text);
                if (r > 0)
                {
                    return true;
                }
                return false;
            }
           

        }

        public async Task<ICollection<UserDto>> GetAllAsync(Guid organisationId)
        {
            try
            {
                string sqlQuery = $"SELECT Id, AccessFailedCount, ConcurrencyStamp,FullName ,Email , EmailConfirmed, LockoutEnabled, LockoutEnd    , NormalizedEmail, NormalizedUserName," +
                                  " PhoneNumber, PhoneNumberConfirmed , SecurityStamp , TwoFactorEnabled , UserName  , OrganisationId   , CreateDate  from AspNetUsers order by FullName ";


                try
                {
                    using (IDbConnection conn = DapperConnection)
                    {
                        var users = await SqlMapper.QueryAsync<UserDto>(conn, sqlQuery, commandType: CommandType.Text);
                        if (users.Count() > 0)
                        {
                            return users.ToList();
                        }
                    }
                   
                }
                catch (SqlException sqlException)
                {
                    //TODO: Use logger
                }
                catch (Exception exception)
                {
                    //TODO: Use Logger
                }

                return null;
            }
            catch (Exception)
            {

                throw;
            }
            throw new NotImplementedException();
        }

        public async Task<ICollection<AspNetUser>> GetAllByApplicationIdAsync(Guid applicationId)
        {
            try
            {
                //string sqlQuery = $"SELECT DISTINCT A.Id, A.AccessFailedCount, A.ConcurrencyStamp,A.FullName ,A.Email , A.EmailConfirmed, A.LockoutEnabled, A.LockoutEnd    , A.NormalizedEmail, A.NormalizedUserName," +
                //                  " A.PhoneNumber, A.PhoneNumberConfirmed , A.SecurityStamp , A.TwoFactorEnabled , A.UserName  , A.OrganisationId   , A.CreateDate  from AspNetUsers A  INNER JOIN AspNetUserApplication B on " +
                //                  " A.Id=B.UserId where B.ApplicationId=@ApplicationId order by FullName ";

                
                var sql = "SPGetAllUserByRolesByApplication";
                var orderDictionary = new Dictionary<Guid, AspNetUser>();
                using (IDbConnection conn = DapperConnection)
                {
                    var list = await conn.QueryAsync<AspNetUser, Roles, AspNetUser>(
                                 sql,
                                 (order, roles) =>
                                 {
                                     AspNetUser users;

                                     if (!orderDictionary.TryGetValue(order.Id, out users))
                                     {
                                         users = order;
                                         users.Roles = new List<Roles>();
                                         orderDictionary.Add(users.Id, users);
                                     }

                                     users.Roles.Add(roles);
                                     return users;
                                 }, new { ApplicationId = applicationId }
                                 , commandType: CommandType.StoredProcedure
                                 ,
                                 splitOn: "RoleId");
                    var result = list.Distinct().ToList();
                    return result;
                }

                
            }
            catch (Exception ex)
            {

                throw;
            }
            throw new NotImplementedException();
        }

        public async Task<ICollection<AspNetUser>> GetAllByRolesAsync(Guid organisationId, string ids,Guid applicationId)
        {
            try
            {
                string[] Tags = ids.Split(',');
                if (Tags.Count() > 0)
                {
                    ids = "";
                    foreach (var item in Tags)
                    {
                        ids = ids + "'" + item + "',";
                    }
                    ids = ids.Remove(ids.Length - 1);
                    

                }

               
                string sql = "SELECT DISTINCT A.*,B.RoleId,C.Id,C.Name FROM  AspNetUsers A  " +
                    "INNER JOIN AspNetUserApplication B1 ON A.Id=B1.UserId " +
                    "INNER JOIN AspNetUserRoleApplication B ON B1.[UserId]=B.UserId and b1.ApplicationId=b.ApplicationId " +
                    "INNER JOIN AspNetRoles C ON c.Id=b.RoleId where B.ApplicationId='" + applicationId+"' AND C.Id IN (" + ids+")  Order By A.FullName";
              
                    var orderDictionary = new Dictionary<Guid, AspNetUser>();
                using (IDbConnection conn = DapperConnection)
                {
                    var list = await conn.QueryAsync<AspNetUser, Roles, AspNetUser>(
                                 sql,
                                 (order, roles) =>
                                 {
                                     AspNetUser users;

                                     if (!orderDictionary.TryGetValue(order.Id, out users))
                                     {
                                         users = order;
                                         users.Roles = new List<Roles>();
                                         orderDictionary.Add(users.Id, users);
                                     }

                                     users.Roles.Add(roles);
                                     return users;
                                 }
                                 ,
                                 splitOn: "RoleId");
                    var result = list.Distinct().ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            //.Distinct()
            //.ToList();

            //throw new NotImplementedException();
        }
        
            public AspNetUser FindByIdAsync(Guid id)
        {
            string sqlQuery = $"SELECT Id,Email,EmailConfirmed,NormalizedEmail,NormalizedUserName,PasswordHash,Salt,OrganisationId,LockoutEnabled,UserName" +
                 $", LockoutEnd, FullName " +
                 $" FROM AspNetUsers   " +
                 $" WHERE Id = @UserId ";
            try
            {
                using (IDbConnection conn = DapperConnection)
                {
                    var users = SqlMapper.Query<AspNetUser>(conn, sqlQuery, new { UserId = id }, commandType: CommandType.Text);
                    if (users.Count() > 0)
                    {
                        return users.FirstOrDefault();

                    }
                }
            }
            catch (SqlException sqlException)
            {
                //TODO: Use logger
            }
            catch (Exception exception)
            {
                //TODO: Use Logger
            }

            return null;
        }
        public async Task<AspNetUser> GetAsync(Guid id)
        {
            string sqlQuery = $"SELECT Id,Email,EmailConfirmed,NormalizedEmail,NormalizedUserName,PasswordHash,Salt,OrganisationId,LockoutEnabled,UserName" +
                 $", LockoutEnd, FullName " +
                 $" FROM AspNetUsers   " +
                 $" WHERE Id = @UserId ";
            try
            {
                using (IDbConnection conn = DapperConnection)
                {
                    var users = await SqlMapper.QueryAsync<AspNetUser>(conn, sqlQuery, new { UserId = id }, commandType: CommandType.Text);
                    if (users.Count() > 0)
                    {
                        return users.FirstOrDefault();
                    }
                }
            }
            catch (SqlException sqlException)
            {
                //TODO: Use logger
            }
            catch (Exception exception)
            {
                //TODO: Use Logger
            }

            return null;
        }
        public async Task<AspNetUser> GetAsync(string email)
        {
            string sqlQuery = $"SELECT Id,Email,EmailConfirmed,NormalizedEmail,NormalizedUserName,PasswordHash,Salt,OrganisationId,LockoutEnabled,UserName" +
                 $", LockoutEnd " +
                 $" FROM AspNetUsers " +
                 $" WHERE Email = @Email or UserName=@Email ";
            try
            {
                using (IDbConnection conn = DapperConnection)
                {
                    var organisations = await SqlMapper.QueryAsync<AspNetUser>(conn, sqlQuery, new { Email = email.ToLowerInvariant().Trim() }, commandType: CommandType.Text);
                    if (organisations.Count() > 0)
                    {
                        return organisations.FirstOrDefault();
                    }
                }
            }
            catch (SqlException sqlException)
            {
                //TODO: Use logger
            }
            catch (Exception exception)
            {
                //TODO: Use Logger
            }

            return null;
            //throw new NotImplementedException();
        }

        //public async Task<User> GetAsync(string email)
        //{
        //    string sqlQuery = $"SELECT  pkID as Id,Centro,Usuario,Nombre,Rol,Clave,AdministradorCentro,uuid " +
        //        $", SuperUsuario " +
        //        $" FROM TUsuarios   " +
        //        $" WHERE Usuario = @Email "; 
        //    try
        //    {
        //        var organisations = await SqlMapper.QueryAsync<User>(con, sqlQuery, new { Email = email.ToLowerInvariant().Trim() }, commandType: CommandType.Text);
        //        if (organisations.Count() > 0)
        //        {
        //            return organisations.FirstOrDefault();
        //        }
        //    }
        //    catch (SqlException sqlException)
        //    {
        //        //TODO: Use logger
        //    }
        //    catch (Exception exception)
        //    {
        //        //TODO: Use Logger
        //    }

        //    return null;
        //    //throw new NotImplementedException();
        //}

        public async Task<bool> ResetPassword(Guid userId, string code, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId)
        {
            try
            {
                var sqlQuery = "SELECT DISTINCT A.*  FROM[dbo].[AspNetRoles] A INNER JOIN[AspNetUserRoles] B ON A.Id = B.RoleId WHERE B.[UserId]= @Userid";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<Roles>(conn, sqlQuery, new { UserId = userId }, commandType: CommandType.Text);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public async Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid userId, Guid ApplicationId)
        {
            try
            {
                var sqlQuery = "SELECT DISTINCT A.*  FROM AspNetRoles A INNER JOIN AspNetUserRoleApplication " +
                    " B ON A.Id = B.RoleId WHERE B.[UserId]= @Userid  AND B.applicationId=@ApplicationId";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<Roles>(conn, sqlQuery, new { UserId = userId, applicationId= ApplicationId }, commandType: CommandType.Text);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public Task<ICollection<UserDto>> GetUserNotificationZMEJ()
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<AspNetUser>> GetAllZMEJByRolesAsync(Guid guid, string ids)
        {
            try
            {
                string[] Tags = ids.Split(',');
                if (Tags.Count() > 0)
                {
                    ids = "";
                    foreach (var item in Tags)
                    {
                        ids = ids + "'" + item + "',";
                    }
                    ids = ids.Remove(ids.Length - 1);


                }
                string sql = "spGetAllUserByZMEJByRolesId";

                // string sql = "SELECT DISTINCT A.*,B.RoleId,C.Id,C.Name FROM  AspNetUsers A   INNER JOIN AspNetUserRoleApplication B ON B.[UserId]=A.Id " +
                //" JOIN AspNetRoles C ON c.Id=b.RoleId where B.ApplicationId='" + applicationId + "' AND C.Id IN (" + ids + ")";

                var orderDictionary = new Dictionary<Guid, AspNetUser>();
                using (IDbConnection conn = DapperConnection)
                {
                    var list = await conn.QueryAsync<AspNetUser, Roles, AspNetUser>(
                                 sql,
                                 (order, roles) =>
                                 {
                                     AspNetUser users;

                                     if (!orderDictionary.TryGetValue(order.Id, out users))
                                     {
                                         users = order;
                                         users.Roles = new List<Roles>();
                                         orderDictionary.Add(users.Id, users);
                                     }

                                     users.Roles.Add(roles);
                                     return users;
                                 }
                                 ,
                                 new {Ids=ids }
                                 ,                                 
                                 splitOn: "RoleId",
                                 commandType:CommandType.StoredProcedure
                                 );
                    var result = list.Distinct().ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<AspNetUser> UpdateAsync(AspNetUser user)
        {
            string sqlQuery = $"UPDATE AspNetUsers SET FullName=@FullName ,Email=@Email where Id=@Id";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", user.Id);          
            parameters.Add("@FullName", user.FullName);
            parameters.Add("@Email", user.Email);
          

            try
            {
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return user;
                }
                //if (await SqlMapper.ExecuteAsync(con, sqlQuery, param: parameters, commandType: CommandType.Text) > 0)
                //{
                //    return user;
                //}

            }
            catch (SqlException sqlException)
            {
                throw new ActioException("SqlException",
                    $"Error code: " + sqlException.ErrorCode.ToString());
                //TODO: Use Logger
                //throw sqlException;
            }
            catch (Exception exception)
            {
                throw new ActioException("Exception",
                   $"Error code: " + exception.Message);
                //TODO: Use Logger
                //throw exception;
            }

        }

        public async Task<AspNetUser> ChangePasswordAsync(AspNetUser user)
        {
            string sqlQuery = "UPDATE AspNetUsers SET PasswordHash=@PasswordHash_ WHERE Id=@UserId";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, new { PasswordHash_ = user.PasswordHash, UserId = user.Id }, commandType: CommandType.Text);
                if (r > 0)
                {
                    return user;
                }
                return null;
            }
        }
    }

}
