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
    public class MenusRepository : BaseRepository, IMenusRepository
    {
        public MenusRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public Task<bool> addMenu(Menu menu)
        {
            throw new NotImplementedException();
        }

        public Task<bool> delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Menu>> getAllByUSerRole(string userId,Guid AplicationId)
        {
            try
            {
                var sqlQuery = "select distinct a.* from AspNetAplicationMenu a  inner join AspNetMenuRoles b on a.id=b.menu_id " +
                    "inner join aspnetroles c on c.id = b.role_id inner JOIN[dbo].[AspNetUserRoleApplication] d " +
                    "on d.RoleId = c.id where d.UserId = @UserId AND AplicationId = @aplicationId  order by a.DisplayOrder asc ";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await conn.QueryAsync<Menu>(sqlQuery, new { UserId = userId, aplicationId= AplicationId }, commandType: CommandType.Text);
                    return r.ToList();
                }
            }
            catch (Exception ex)
            {

                return null;
            }
            //throw new NotImplementedException();
        }

        public Task<List<Menu>> getAllMenus(Guid AplicationId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> updateMenu(Menu menu)
        {
            throw new NotImplementedException();
        }
    }
}
