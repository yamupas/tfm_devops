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
    public interface IOrganisationinfoRepository
    {
         Task< List<Organisationinfo>> getAll();
        Task<List<Organisationinfo>> getAllActive();
        Task<Organisationinfo> getById(Guid id);
    }
    public class OrganisationinfoRepository : BaseRepository, IOrganisationinfoRepository
    {
        public OrganisationinfoRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<Organisationinfo>> getAll()
        {
            try
            {
                string sqlQuery = "SELECT * FROM Organisationinfo";
                using (IDbConnection conn = DapperConnection)
                {
                    var organisationinfos = await SqlMapper.QueryAsync<Organisationinfo>(conn, sqlQuery, commandType: CommandType.Text);
                    if (organisationinfos.Count() > 0)
                    {
                        return organisationinfos.ToList();
                    }
                }
                return null;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<List<Organisationinfo>> getAllActive()
        {
            try
            {
                string sqlQuery = "SELECT * FROM Organisationinfo where isactive=1";
                using (IDbConnection conn = DapperConnection)
                {
                    var organisationinfos = await SqlMapper.QueryAsync<Organisationinfo>(conn, sqlQuery, commandType: CommandType.Text);
                    if (organisationinfos.Count() > 0)
                    {
                        return organisationinfos.ToList();
                    }
                }
                return null;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<Organisationinfo> getById(Guid id)
        {
            try
            {
                string sqlQuery = "SELECT * FROM Organisationinfo WHERE id=@Id";
                using (IDbConnection conn = DapperConnection)
                {
                    var organisationinfos = await SqlMapper.QueryAsync<Organisationinfo>(conn, sqlQuery, new {Id=id },commandType: CommandType.Text);                   
                    return organisationinfos.FirstOrDefault();
                    
                }
                
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
