using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;

namespace ZMEJ.Database.Repositories
{
    public class ClasificacionRepository : BaseRepository, IClasificacionRepository
    {
        public ClasificacionRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> Add(Clasificacion confiabilidad)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                //AsignadoA
                string sqlQuery = "INSERT INTO ZMEJ.Clasificacion(Nombre) VALUES(@Nombre)";
                parameters.Add("@Nombre", confiabilidad.Nombre);

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

                return false;
            }
        }

        public async Task<List<Clasificacion>> GetAll()
        {
            try
            {
                string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.Clasificacion";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<Clasificacion>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }

        public async Task<List<Clasificacion>> GetAllActive()
        {
            try
            {
                string sqlQuery = "SELECT Id,Nombre FROM ZMEJ.Clasificacion WHERE Estado=1";

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<Clasificacion>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }

              
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public async Task<bool> Update(Clasificacion confiabilidad)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                //AsignadoA
                string sqlQuery = "UPDATE ZMEJ.Clasificacion SET Nombre=@Nombre,Estado=@Estado where Id=@Id";
                parameters.Add("@Id", confiabilidad.Id);
                parameters.Add("@Nombre", confiabilidad.Nombre);
                parameters.Add("@Estado", confiabilidad.Estado);

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
    }
}
