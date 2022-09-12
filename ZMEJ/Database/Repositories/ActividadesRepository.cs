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
    public class ActividadesRepository : BaseRepository, IActividadesRepository
    {
        public ActividadesRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> AddAsync(ClaseDeActividad claseDeActividad)
        {
            try
            {
                string sqlQuery = "INSERT INTO ZMEJ.ClaseDeActividad(Nombre) VALUES (@Nombre) ";
                DynamicParameters parameters = new DynamicParameters();
                //AsignadoA
                //parameters.Add("@Id", claseDeActividad.Id);
                parameters.Add("@Nombre", claseDeActividad.Nombre);
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    if (r > 0)
                        return true;
                    return false;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ClaseDeActividadDto>> GetAllActiveAsync(string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.ClaseDeActividad ORDER BY Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<ClaseDeActividadDto>(conn, sqlQuery, commandType: CommandType.Text);
                return r.ToList();
            }
           

        }

        public async Task<List<ClaseDeActividadDto>> GetAllAsync(string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.ClaseDeActividad  ORDER BY Id";
            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<ClaseDeActividadDto>(conn, sqlQuery, commandType: CommandType.Text);
                return r.ToList();
            }

          
            //throw new NotImplementedException();
        }

        public async Task<ClaseDeActividad> GetAsync(int id, string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.ClaseDeActividad WHERE Id =@Id";
            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<ClaseDeActividad>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault();
            }

          
        }

        public async Task<ClaseDeActividad> GetByCodeAsync(int id, string centro)
        {
            string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.ClaseDeActividad WHERE Id =@Id";
            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<ClaseDeActividad>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault();
            }

          
        }
    }
}
