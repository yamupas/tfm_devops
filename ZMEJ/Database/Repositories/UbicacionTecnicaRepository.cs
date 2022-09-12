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
    public class UbicacionTecnicaRepository : BaseRepository, IUbicacionTecnicaRepository
    {
        public UbicacionTecnicaRepository(IConfiguration configuration) : base(configuration)
        {
        }
        public async Task<List<UbicacionTecnica>> GetAll()
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TUbicacionTecnica  order by Descripcion ";

                using (IDbConnection conn = DapperConnection)
                {

                    var r = await SqlMapper.QueryAsync<UbicacionTecnica>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception)
            {

                return null;
            }
           
        }

        public async Task<List<UbicacionTecnica>> GetAllActive()
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TUbicacionTecnica where Estado=1 order by Descripcion ";
                using (IDbConnection conn = DapperConnection)
                {

                    var r = await SqlMapper.QueryAsync<UbicacionTecnica>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }
               
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public async Task<List<UbicacionTecnica>> GetAllByCentro(string centro)
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TUbicacionTecnica where Centro=@Centro order by Descripcion ";
                using (IDbConnection conn = DapperConnection)
                {

                    var r = await SqlMapper.QueryAsync<UbicacionTecnica>(conn, sqlQuery, new { Centro = centro }, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception)
            {

                return null;
            }
        }

        public Task<UbicacionTecnica> GetByCode(string code)
        {
            throw new NotImplementedException();
        }

        public async Task<UbicacionTecnica> GetById(Guid guid)
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TUbicacionTecnica where uuid=@vuuid order by Descripcion ";
                using (IDbConnection conn = DapperConnection)
                {

                    var r = await SqlMapper.QueryAsync<UbicacionTecnica>(conn, sqlQuery, new { vuuid = guid }, commandType: CommandType.Text);
                    return r.FirstOrDefault();
                }


            }
            catch (Exception)
            {

                return null;
            }
        }

        public async Task<UbicacionTecnica> Save(UbicacionTecnica ubicacionTecnica)
        {
            try
            {
                string sqlQuery = "insert into ZMEJ.TUbicacionTecnica  (uuid,Centro,Ubicacion,Descripcion) VALUES (@uuid,@Centro,@Ubicacion,@Descripcion)";
                DynamicParameters parameters = new DynamicParameters();
                //AsignadoA
                parameters.Add("@uuid", ubicacionTecnica.uuid);
                parameters.Add("@Centro", ubicacionTecnica.Centro);
                parameters.Add("@Ubicacion", ubicacionTecnica.Ubicacion);
                parameters.Add("@Descripcion", ubicacionTecnica.Descripcion);
              
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    if (r > 0)
                        return ubicacionTecnica;
                    return null;
                }

            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public async Task<UbicacionTecnica> Update(UbicacionTecnica ubicacionTecnica)
        {
            try
            {
                string sqlQuery = "UPDATE ZMEJ.TUbicacionTecnica SET Ubicacion=@Ubicacion,Descripcion=@Descripcion where uuid=@uuid";
                DynamicParameters parameters = new DynamicParameters();
                //AsignadoA
                parameters.Add("@uuid", ubicacionTecnica.uuid);
               // parameters.Add("@Centro", ubicacionTecnica.Centro);
                parameters.Add("@Ubicacion", ubicacionTecnica.Ubicacion);
                parameters.Add("@Descripcion", ubicacionTecnica.Descripcion);

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    if (r > 0)
                        return ubicacionTecnica;
                    return null;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
