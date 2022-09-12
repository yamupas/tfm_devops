using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;

namespace ZMEJ.Database.Repositories
{
    public class MaquinasRepository : BaseRepository, IMaquinasRepository
    {
        public MaquinasRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<TMaquinas>> GetAll(string centro)
        {
            try
            {
                string sqlQuery = "SELECT * FROM ZMEJ.TMaquinas where centro=@Centro  ORDER BY Maquina";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<TMaquinas>(conn, sqlQuery, new { Centro = centro }, commandType: CommandType.Text);
                    return r.ToList();
                }

              
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public async Task<List<TMaquinas>> GetAllActive(string centro)
        {
            try
            {
                string sqlQuery = "SELECT * FROM ZMEJ.TMaquinas where  Estado=1  ORDER BY Maquina";
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<TMaquinas>(conn, sqlQuery, new { Centro = centro }, commandType: CommandType.Text);
                    return r.ToList();
                }


            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<TMaquinas> GetByCode(string centro, string code)
        {

            try
            {
                string sqlQuery = "SELECT TOP 1 * FROM ZMEJ.TMaquinas where Maquina=@Maquina ";
                using (IDbConnection conn = DapperConnection)
                {
                 
                    var r = await SqlMapper.QueryAsync<TMaquinas>(conn, sqlQuery, new {  Maquina = code }, commandType: CommandType.Text);
                    return r.FirstOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public TMaquinas Save(TMaquinas maquinas)
        {
            try
            {
                string sqlQuery = "INSERT INTO  ZMEJ.TMaquinas  (uuid,Centro,Maquina,Descripcion,Estado,CodTecnologia) Values (@uuid,@Centro,@Maquina,@Descripcion,@Estado,@CodTecnologia) ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@uuid", maquinas.uuid);
                parameters.Add("@Centro", maquinas.Centro);
                parameters.Add("@Maquina", maquinas.Maquina);
                parameters.Add("@Descripcion", maquinas.Descripcion);
                parameters.Add("@Estado", maquinas.Estado);
                parameters.Add("@CodTecnologia", maquinas.CodTecnologia);
                using (IDbConnection conn = DapperConnection)
                {
                    var r = SqlMapper.Execute(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    return maquinas;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public TMaquinas Update(TMaquinas maquinas)
        {
            try
            {
                string sqlQuery = "UPDATE  ZMEJ.TMaquinas  SET Maquina=@Maquina,Descripcion=@Descripcion,Estado=@Estado where uuid=@uuid ";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@uuid", maquinas.uuid);
                parameters.Add("@Centro", maquinas.Centro);
                parameters.Add("@Maquina", maquinas.Maquina);
                parameters.Add("@Descripcion", maquinas.Descripcion);
                parameters.Add("@Estado", maquinas.Estado);
                //parameters.Add("@CodTecnologia", maquinas.CodTecnologia);
                using (IDbConnection conn = DapperConnection)
                {
                    var r = SqlMapper.Execute(conn, sqlQuery, parameters, commandType: CommandType.Text);
                    return maquinas;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
