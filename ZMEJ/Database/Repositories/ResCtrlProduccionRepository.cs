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
    public class ResCtrlProduccionRepository : BaseRepository, IResCtrlProduccionRepository
    {
        public ResCtrlProduccionRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<ResCtrlProduccion>> GetAll(string centro)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", centro);
                string sqlQuery = "SELECT * FROM ZMEJ.TResCtrlProduccion ORDER BY Descripcion";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<ResCtrlProduccion>(conn, sqlQuery, commandType: CommandType.Text);
                    return result.ToList();
                }
                //string sqlQuery = "ZMEJ.SPConsultarResponsablesControlXCentro";
                //using (IDbConnection conn = DapperConnection)
                //{
                //    var result = await SqlMapper.QueryAsync<ResCtrlProduccion>(conn, sqlQuery, param: parameters, commandType: CommandType.StoredProcedure);
                //    return result.ToList();
                //}
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<ResCtrlProduccion> GetByCode(string centro, string code)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", centro);
                parameters.Add("@Code", code);
                string sqlQuery = "SELECT * FROM ZMEJ.TResCtrlProduccion WHERE Centro=@Centro AND ResControlProd=@Code";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<ResCtrlProduccion>(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return result.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<ResCtrlProduccion> Save(ResCtrlProduccion resCtrlProduccion)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Centro", resCtrlProduccion.Centro);
                parameters.Add("@Descripcion", resCtrlProduccion.Descripcion);
                parameters.Add("@ResControlProd", resCtrlProduccion.ResControlProd);
                parameters.Add("@Id", resCtrlProduccion.Id);
                string sqlQuery = "INSERT INTO ZMEJ.TResCtrlProduccion  (Centro,ResControlProd,Descripcion,Id) VALUES (@Centro,@ResControlProd,@Descripcion,@Id)";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    if (result > 0)
                    {
                        return resCtrlProduccion;
                    }
                    return null;

                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ResCtrlProduccion> Update(ResCtrlProduccion resCtrlProduccion)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@centro", resCtrlProduccion.Centro);
                parameters.Add("@Id", resCtrlProduccion.Id);
                parameters.Add("@Descripcion", resCtrlProduccion.Descripcion);
                parameters.Add("@ResControlProd", resCtrlProduccion.ResControlProd);
                string sqlQuery = "UPDATE  ZMEJ.TResCtrlProduccion SET Descripcion=@Descripcion,ResControlProd=@ResControlProd    WHERE Id=@Id";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.ExecuteAsync(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    if (result > 0)
                    {
                        return resCtrlProduccion;
                    }
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
