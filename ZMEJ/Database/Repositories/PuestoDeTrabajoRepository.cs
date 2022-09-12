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
    public class PuestoDeTrabajoRepository :BaseRepository, IPuestoDeTrabajoRepository
    {
        public PuestoDeTrabajoRepository(IConfiguration configuration) : base(configuration)
        {
        }
        public async Task<List<PuestoDeTrabajo>> GetAll()
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TPuestoDeTrabajo order by Descripcion ";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<PuestoDeTrabajo>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception)
            {

                return null;
            }
           
        }

        public async Task<List<PuestoDeTrabajo>> GetAllActive()
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TPuestoDeTrabajo where Estado=1 order by Descripcion ";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<PuestoDeTrabajo>(conn, sqlQuery, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception)
            {

                return null;
            }
        }

        public async Task<List<PuestoDeTrabajo>> GetAllByCentro(string centro)
        {
            try
            {
                string sqlQuery = "SELECT * from ZMEJ.TPuestoDeTrabajo where Centro=@Centro order by Descripcion ";

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<PuestoDeTrabajo>(conn, sqlQuery, new { Centro = centro }, commandType: CommandType.Text);
                    return r.ToList();
                }

               
            }
            catch (Exception)
            {

                return null;
            }
        }

        public Task<PuestoDeTrabajo> GetByCode(string code)
        {
            throw new NotImplementedException();
        }

        public PuestoDeTrabajo Save(PuestoDeTrabajo puestoDeTrabajo)
        {
            try
            {
                string sqlQuery = "INSERT INTO  ZMEJ.TPuestoDeTrabajo  (uuid,Centro,PstoTbjo,Descripcion,Estado) Values (@uuid,@Centro,@PstoTbjo,@Descripcion,@Estado) ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@uuid", puestoDeTrabajo.uuid);
                parameters.Add("@Centro", puestoDeTrabajo.Centro);
                parameters.Add("@PstoTbjo", puestoDeTrabajo.PstoTbjo);
                parameters.Add("@Descripcion", puestoDeTrabajo.Descripcion);
                parameters.Add("@Estado", puestoDeTrabajo.Estado);
                using (IDbConnection conn = DapperConnection)
                {
                    var r =  SqlMapper.Execute(conn, sqlQuery,parameters, commandType: CommandType.Text);
                    return puestoDeTrabajo;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public PuestoDeTrabajo Update(PuestoDeTrabajo puestoDeTrabajo)
        {
            try
            {
                string sqlQuery = "UPDATE  ZMEJ.TPuestoDeTrabajo  SET PstoTbjo=@PstoTbjo,Descripcion=@Descripcion,Estado=@Estado WHERE uuid=@uuid ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@uuid", puestoDeTrabajo.uuid);
               // parameters.Add("@Centro", puestoDeTrabajo.Centro);
                parameters.Add("@PstoTbjo", puestoDeTrabajo.PstoTbjo);
                parameters.Add("@Descripcion", puestoDeTrabajo.Descripcion);
                parameters.Add("@Estado", puestoDeTrabajo.Estado);
                using (IDbConnection conn = DapperConnection)
                {
                    var r = SqlMapper.Execute(conn, sqlQuery,parameters ,commandType: CommandType.Text);
                    return puestoDeTrabajo;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
