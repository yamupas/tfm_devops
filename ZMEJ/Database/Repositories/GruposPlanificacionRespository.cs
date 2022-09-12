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
    public class GruposPlanificacionRespository : BaseRepository, IGruposPlanificacionRespository
    {
        public GruposPlanificacionRespository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<GruposPlanificacion>> GetAll(string centro)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", centro);
                string sqlQuery = "SELECT * FROM ZMEJ.TGruposPlanificacion WHERE Centro=@centro ORDER BY Descripcion";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<GruposPlanificacion>(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task<List<GruposPlanificacion>> GetAllActive(string centro)
        {
            try
            {
                //DynamicParameters parameters = new DynamicParameters();
                //parameters.Add("@Activo", 1);
                string sqlQuery = "SELECT * FROM ZMEJ.TGruposPlanificacion where Activo=1 ORDER BY Descripcion";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<GruposPlanificacion>(conn, sqlQuery, commandType: CommandType.Text);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        
        public async Task<GruposPlanificacion> GetByCode(string centro, string code)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", centro);
                parameters.Add("@Code", code);
                string sqlQuery = "SELECT * FROM ZMEJ.TGruposPlanificacion WHERE Centro=@Centro AND GrupoPlanificador=@Code";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<GruposPlanificacion>(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return result.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<List<GruposPlanificacion>> GetByResCtrlProduccion(string centro, string code)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", centro);
               

                string sqlQuery = "SELECT * FROM ZMEJ.TGruposPlanificacion WHERE Centro=@Centro AND ResControlProd=@Code";
                using (IDbConnection conn = DapperConnection)
                {
                    var result = await SqlMapper.QueryAsync<GruposPlanificacion>(conn, sqlQuery, param: parameters, commandType: CommandType.Text);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<GruposPlanificacion> Save(GruposPlanificacion resCtrlProduccion)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Centro", resCtrlProduccion.Centro);
                parameters.Add("@Descripcion", resCtrlProduccion.Descripcion);
                parameters.Add("@ResControlProdId", resCtrlProduccion.ResControlProdId);
                parameters.Add("@GrupoPlanificador", resCtrlProduccion.GrupoPlanificador);
              
                parameters.Add("@uuid", resCtrlProduccion.Id);
                string sqlQuery = "INSERT INTO ZMEJ.TGruposPlanificacion  (Centro,GrupoPlanificador,Descripcion,ResControlProdId,Id) VALUES (@Centro,@GrupoPlanificador,@Descripcion,@ResControlProdId,@uuid)";
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

        public async Task<GruposPlanificacion> Update(GruposPlanificacion resCtrlProduccion)
        {
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@centro", resCtrlProduccion.Centro);
                parameters.Add("@Descripcion", resCtrlProduccion.Descripcion);
                parameters.Add("@ResControlProdId", resCtrlProduccion.ResControlProdId);
                parameters.Add("@GrupoPlanificador", resCtrlProduccion.GrupoPlanificador);
                parameters.Add("@FechaModificacion", resCtrlProduccion.FechaModificacion);
                parameters.Add("@UltimoUsuarioModificacion", resCtrlProduccion.UltimoUsuarioModificacion);
                parameters.Add("@Id", resCtrlProduccion.Id);
                string sqlQuery = "UPDATE  ZMEJ.TGruposPlanificacion SET UltimoUsuarioModificacion=@UltimoUsuarioModificacion,FechaModificacion=@FechaModificacion ,Descripcion=@Descripcion,ResControlProdId=@ResControlProdId,GrupoPlanificador=@GrupoPlanificador  " +
                    " WHERE  Id=@Id";
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
