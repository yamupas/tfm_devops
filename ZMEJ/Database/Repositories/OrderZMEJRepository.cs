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
    public class OrderZMEJRepository : BaseRepository, IOrderZMEJRepository
    {
        private object dynamicparameter;

        public OrderZMEJRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> AddAsync(OrderZMEJ orderZMEJ)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", orderZMEJ.Id);
            parameters.Add("@Nombre", orderZMEJ.Nombre);
            parameters.Add("@FechaDeEntrega", orderZMEJ.FechaDeEntrega);
            parameters.Add("@FechaRecepcion", null);
            parameters.Add("@Descripcion", orderZMEJ.Descripcion);
            parameters.Add("@Proponente", orderZMEJ.Proponente);
            parameters.Add("@NombreDelPet", orderZMEJ.NombreDelPet);
            parameters.Add("@PasoTPM", orderZMEJ.PasoTPM);
            parameters.Add("@ResponsableDelPuestoDetrabajo", orderZMEJ.ResponsableDelPuestoDetrabajo);
            parameters.Add("@ResponsableEjecutor", orderZMEJ.ResponsableEjecutor);
            parameters.Add("@DescripcionDelEquipo", orderZMEJ.DescripcionDelEquipo);
            parameters.Add("@CodigoDelEquipo", orderZMEJ.CodigoDelEquipo);
            parameters.Add("@DescripcionDeUbicacionTecnica", orderZMEJ.DescripcionDeUbicacionTecnica);
            parameters.Add("@UbicacionTecnica", orderZMEJ.UbicacionTecnica);
            parameters.Add("@ClaseDeActividadID", orderZMEJ.ClaseDeActividadID);

            parameters.Add("@NormaDeLiquidacionId", orderZMEJ.NormaDeLiquidacionId);
            parameters.Add("@CodigoNormaDeLiquidacion", orderZMEJ.CodigoNormaDeLiquidacion);
            parameters.Add("@CostoPlaneado", orderZMEJ.CostoPlaneado);
            parameters.Add("@BeneficioCualitativo", orderZMEJ.BeneficioCualitativo);
            parameters.Add("@BeneficioCuantitativo", orderZMEJ.BeneficioCuantitativo);
            parameters.Add("@FechaInicio", orderZMEJ.FechaInicio);
            parameters.Add("@FechaFin", orderZMEJ.FechaFin);
            parameters.Add("@FechaDeCreacion", orderZMEJ.FechaDeCreacion);
            parameters.Add("@UsuarioCreacion", orderZMEJ.UsuarioCreacion);
            parameters.Add("@UsuarioModificacion", orderZMEJ.UsuarioCreacion);
            parameters.Add("@AsignadoA", orderZMEJ.AsignadoA);
            parameters.Add("@RemitidoPor", orderZMEJ.RemitidoPor);

            parameters.Add("@CostoMaterial", orderZMEJ.CostoMaterial);
            parameters.Add("@CostoManodeobra", orderZMEJ.Costomanodeobra);
            parameters.Add("@CostoServicios", orderZMEJ.CostoServicios);
            parameters.Add("@DuraciondelTrabajo", orderZMEJ.DuraciondelTrabajo);
            parameters.Add("@RemitidoPor", orderZMEJ.RemitidoPor);
            parameters.Add("@Pregunta1", orderZMEJ.Pregunta1);
            parameters.Add("@Pregunta2", orderZMEJ.Pregunta2);
            parameters.Add("@Pregunta3", orderZMEJ.Pregunta3);
            parameters.Add("@Linea", orderZMEJ.Linea);
            parameters.Add("@Horno", orderZMEJ.Horno);
            parameters.Add("@Clasificacion", orderZMEJ.Clasificacion);
            parameters.Add("@Estado", orderZMEJ.Estado);
            string sqlQuery = "INSERT INTO ZMEJ.[Order]  (Id, Nombre, Descripcion, FechaDeEntrega, FechaRecepcion, Proponente, NombreDelPet, PasoTPM ," +
                " ResponsableDelPuestoDetrabajo, ResponsableEjecutor, DescripcionDelEquipo, CodigoDelEquipo, DescripcionDeUbicacionTecnica, UbicacionTecnica," +
                " ClaseDeActividadID,NormaDeLiquidacionId,CodigoNormaDeLiquidacion,CostoPlaneado,BeneficioCualitativo,BeneficioCuantitativo,FechaInicio, " +
                " FechaFin,FechaDeCreacion,UsuarioCreacion,UsuarioModificacion,AsignadoA,RemitidoPor,CostoMaterial,CostoManodeobra,CostoServicios,DuraciondelTrabajo,Pregunta1,Pregunta2,Pregunta3,Linea,Horno,Clasificacion,Estado)" +
                               "VALUES (@Id, @Nombre, @Descripcion, @FechaDeEntrega, @FechaRecepcion, @Proponente, @NombreDelPet, @PasoTPM, " +
                               " @ResponsableDelPuestoDetrabajo, @ResponsableEjecutor, @DescripcionDelEquipo, @CodigoDelEquipo, @DescripcionDeUbicacionTecnica, @UbicacionTecnica, " +
                               " @ClaseDeActividadID,@NormaDeLiquidacionId,@CodigoNormaDeLiquidacion,@CostoPlaneado,@BeneficioCualitativo,@BeneficioCuantitativo,@FechaInicio, " +
                               " @FechaFin,@FechaDeCreacion,@UsuarioCreacion,@UsuarioModificacion,@AsignadoA,@RemitidoPor,@CostoMaterial,@CostoManodeobra,@CostoServicios,@DuraciondelTrabajo,@Pregunta1,@Pregunta2,@Pregunta3,@Linea,@Horno,@Clasificacion,@Estado)";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                if (r > 0)
                    return true;
                return false;
            }
           

            //parameters.Add("@Id", orderZMEJ.Ben);
            //parameters.Add("@Id", orderZMEJ.Id);
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderZMEJDto>> GetAllActiveAsync(string centro)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderZMEJDto>> GetAllAsync(string centro)
        {
            try
            {
                //string sqlQuery = "SELECT  B.Name 'NombreEstado',C.Nombre	'NombreClasificacion',A.*  FROM ZMEJ.[Order] A LEFT JOIN " +
                //    "ZMEJ.StatusCode B ON A.Estado = B.Code LEFT JOIN ZMEJ.Clasificacion C ON C.Id = A.Clasificacion WHERE A.Estado>=1  ORDER BY  A.OrdenMantenimiento DESC";


                string sqlQuery = "zmej.GetAllOrders";
                //   string sqlQuery = "SELECT  Id  , Nombre , FechaDeEntrega , FechaRecepcion , Descripcion, Proponente, NombreDelPet,  ResponsableDelPuestoDetrabajo, " +
                //"DescripcionDelEquipo, DescripcionDeUbicacionTecnica , UbicacionTecnica, PasoTPM, ResponsableEjecutor , CodigoDelEquipo, NormaDeLiquidacionId," +
                //" CodigoNormaDeLiquidacion, ClaseDeActividadID , CostoPlaneado, BeneficioCualitativo, BeneficioCuantitativo, AprobadoPor , ValidadoPor, FechaInicio, FechaFin, " +
                //" FechaDeCreacion , UsuarioCreacion , FechaDeModificacion   , UsuarioModificacion,Clasificacion  FROM ZMEJ.[Order]  WHERE Estado>=1  ORDER BY  FechaDeCreacion DESC";

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<OrderZMEJDto>(conn, sqlQuery, commandType: CommandType.StoredProcedure);
                    return r.ToList();
                }
               
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }
         
        }

        public async Task<List<Object>> GetAllDashboardAsync(string centro)
        {
            try
            {
                //string sqlQuery = "SELECT  B.Name 'NombreEstado',C.Nombre	'NombreClasificacion',A.*  FROM ZMEJ.[Order] A LEFT JOIN " +
                //    "ZMEJ.StatusCode B ON A.Estado = B.Code LEFT JOIN ZMEJ.Clasificacion C ON C.Id = A.Clasificacion WHERE A.Estado>=1  ORDER BY  A.OrdenMantenimiento DESC";


                string sqlQuery = "zmej.GetAllOrdersByDashboard";
              
                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<Object>(conn, sqlQuery, commandType: CommandType.StoredProcedure);
                    return r.ToList();
                }

            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }

        }



        public async Task<List<OrderZMEJDto>> GetAllAssignedAsync(string centro, Guid userid)
        {
            try
            {
                /*string sqlQuery = "SELECT  Id  , Nombre , FechaDeEntrega , FechaRecepcion , Descripcion, Proponente, NombreDelPet,  ResponsableDelPuestoDetrabajo, " +
             "DescripcionDelEquipo, DescripcionDeUbicacionTecnica , UbicacionTecnica, PasoTPM, ResponsableEjecutor , CodigoDelEquipo, NormaDeLiquidacionId," +
             " CodigoNormaDeLiquidacion, ClaseDeActividadID , CostoPlaneado, BeneficioCualitativo, BeneficioCuantitativo, AprobadoPor , ValidadoPor, FechaInicio, FechaFin, " +
             " FechaDeCreacion , UsuarioCreacion , FechaDeModificacion   , UsuarioModificacion  FROM ZMEJ.[Order] WHERE AsignadoA=@AsignadoA  AND Estado>=1 ORDER BY  FechaDeCreacion DESC";
                */
                string sqlQuery = "SELECT  B.Name 'NombreEstado',C.Nombre	'NombreClasificacion',A.*  FROM ZMEJ.[Order] A LEFT JOIN " +
                    "ZMEJ.StatusCode B ON A.Estado = B.Code LEFT JOIN ZMEJ.Clasificacion C ON C.Id = A.Clasificacion WHERE A.AsignadoA=@AsignadoA AND A.Estado>=1  ORDER BY  A.FechaDeCreacion DESC";

                using (IDbConnection conn = DapperConnection)
                {
                    var r = await SqlMapper.QueryAsync<OrderZMEJDto>(conn, sqlQuery, new { AsignadoA = userid }, commandType: CommandType.Text);
                    return r.ToList();
                }
               
            }
            catch (Exception ex)
            {
                return null;
                //throw;
            }

        }

        public async Task<OrderZMEJ> GetAsync(Guid id, string centro)
        {
            string sqlQuery = "SELECT  *  FROM ZMEJ.[Order] WHERE Id=@Id";
            //string sqlQuery = "SELECT  Id  , Nombre , FechaDeEntrega , FechaRecepcion , Descripcion, Proponente, NombreDelPet,  ResponsableDelPuestoDetrabajo, " +
            //    "DescripcionDelEquipo, DescripcionDeUbicacionTecnica , UbicacionTecnica, PasoTPM, ResponsableEjecutor , CodigoDelEquipo, NormaDeLiquidacionId," +
            //    " CodigoNormaDeLiquidacion, ClaseDeActividadID , CostoPlaneado, BeneficioCualitativo, BeneficioCuantitativo, AprobadoPor , ValidadoPor, FechaInicio, FechaFin, " +
            //    " FechaDeCreacion , UsuarioCreacion , FechaDeModificacion   , UsuarioModificacion,Estado, AsignadoA,RemitidoPor   FROM ZMEJ.[Order] WHERE Id=@Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<OrderZMEJ>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault();
            }
           
        }
        public async Task<List<OrderZMEJDto>> GetAllFilterAsync(int  estado, string nombre)
        {
            string sqlQuery = "ZMEJ.SPConsltarOrdenPorNombre";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Estado", estado);
            parameters.Add("@Nombre", nombre);

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.QueryAsync<OrderZMEJDto>(conn, sqlQuery, parameters, commandType: CommandType.StoredProcedure);
                return r.ToList();
            }

            
        }

        public Task<OrderZMEJ> GetByCodeAsync(string GrupoReceta, string centro)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAsync(OrderZMEJ orderZMEJ)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", orderZMEJ.Id);
            parameters.Add("@Nombre", orderZMEJ.Nombre);         
            parameters.Add("@Descripcion", orderZMEJ.Descripcion);
            parameters.Add("@Proponente", orderZMEJ.Proponente);
            parameters.Add("@NombreDelPet", orderZMEJ.NombreDelPet);
            parameters.Add("@ResponsableDelPuestoDetrabajo", orderZMEJ.ResponsableDelPuestoDetrabajo);
            parameters.Add("@DescripcionDelEquipo", orderZMEJ.DescripcionDelEquipo);
            parameters.Add("@UbicacionTecnica", orderZMEJ.UbicacionTecnica);
            parameters.Add("@DescripcionDeUbicacionTecnica", orderZMEJ.DescripcionDeUbicacionTecnica);
            parameters.Add("@PasoTPM", orderZMEJ.PasoTPM);            
            parameters.Add("@ResponsableEjecutor", orderZMEJ.ResponsableEjecutor);            
            parameters.Add("@CodigoDelEquipo", orderZMEJ.CodigoDelEquipo);
            parameters.Add("@NormaDeLiquidacionId", orderZMEJ.NormaDeLiquidacionId);
            parameters.Add("@CodigoNormaDeLiquidacion", orderZMEJ.CodigoNormaDeLiquidacion);
            parameters.Add("@ClaseDeActividadID", orderZMEJ.ClaseDeActividadID);
            parameters.Add("@CostoPlaneado", orderZMEJ.CostoPlaneado);
            parameters.Add("@BeneficioCualitativo", orderZMEJ.BeneficioCualitativo);
            parameters.Add("@BeneficioCuantitativo", orderZMEJ.BeneficioCuantitativo);
            parameters.Add("@FechaInicio", orderZMEJ.FechaInicio);
            parameters.Add("@FechaFin", orderZMEJ.FechaFin);
            parameters.Add("@FechaDeModificacion", DateTime.Now);        
            parameters.Add("@UsuarioModificacion", orderZMEJ.UsuarioCreacion);
            parameters.Add("@Estado", orderZMEJ.Estado);
            parameters.Add("@AsignadoA", orderZMEJ.AsignadoA);
            parameters.Add("@Clasificacion", orderZMEJ.Clasificacion);
            parameters.Add("@Linea", orderZMEJ.Linea);
            parameters.Add("@Horno", orderZMEJ.Horno);
            parameters.Add("@OrdenMantenimiento", orderZMEJ.OrdenMantenimiento);
            parameters.Add("@NotaMantenimiento", orderZMEJ.NotaMantenimiento);
            parameters.Add("@Costomanodeobra", orderZMEJ.Costomanodeobra);
            parameters.Add("@CostoMaterial", orderZMEJ.CostoMaterial);
            parameters.Add("@CostoServicios", orderZMEJ.CostoServicios);
            parameters.Add("@CostoReal", orderZMEJ.CostoReal);
            parameters.Add("@Pregunta1", orderZMEJ.Pregunta1);
            parameters.Add("@Pregunta2", orderZMEJ.Pregunta2);
            parameters.Add("@Pregunta3", orderZMEJ.Pregunta3);
            parameters.Add("@DuraciondelTrabajo", orderZMEJ.DuraciondelTrabajo);
            parameters.Add("@valComprometido", orderZMEJ.valComprometido);
            
            string sqlQuery = "UPDATE ZMEJ.[Order] SET Nombre=@Nombre,Descripcion=@Descripcion,Proponente=@Proponente,NombreDelPet=@NombreDelPet,ResponsableDelPuestoDetrabajo=@ResponsableDelPuestoDetrabajo, " +
                "DescripcionDelEquipo=@DescripcionDelEquipo,UbicacionTecnica=@UbicacionTecnica,DescripcionDeUbicacionTecnica=@DescripcionDeUbicacionTecnica,PasoTPM=@PasoTPM, " +
                "ResponsableEjecutor=@ResponsableEjecutor,CodigoDelEquipo=@CodigoDelEquipo,NormaDeLiquidacionId=@NormaDeLiquidacionId, " +
                "CodigoNormaDeLiquidacion=@CodigoNormaDeLiquidacion,ClaseDeActividadID=@ClaseDeActividadID,CostoPlaneado=@CostoPlaneado,BeneficioCualitativo=@BeneficioCualitativo, " +
                "BeneficioCuantitativo=@BeneficioCuantitativo,FechaInicio=@FechaInicio,FechaFin=@FechaFin,FechaDeModificacion=@FechaDeModificacion,UsuarioModificacion=@UsuarioModificacion,Estado=@Estado, " +
                "AsignadoA=@AsignadoA,Clasificacion=@Clasificacion,Linea=@Linea,Horno=@Horno,OrdenMantenimiento=@OrdenMantenimiento,NotaMantenimiento=@NotaMantenimiento,Costomanodeobra=@Costomanodeobra," +
                "CostoMaterial=@CostoMaterial,CostoReal=@CostoReal,Pregunta1=@Pregunta1,Pregunta2=@Pregunta2,Pregunta3=@Pregunta3,DuraciondelTrabajo=@DuraciondelTrabajo,valComprometido=@valComprometido " +
                " where Id=@Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                if (r > 0)
                    return true;
                return false;
            }

           

           
           // throw new NotImplementedException();
        }
        public async Task<bool> UpdateMantemientoAsync(OrderZMEJ orderZMEJ)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", orderZMEJ.Id);
            parameters.Add("@Evidencia", orderZMEJ.Evidencia);
            parameters.Add("@TipodeTrabajo", orderZMEJ.TipodeTrabajo);
            parameters.Add("@OrdenMantenimiento", orderZMEJ.OrdenMantenimiento);
            parameters.Add("@NotaMantenimiento", orderZMEJ.NotaMantenimiento);
            parameters.Add("@FechaDeModificacion", DateTime.Now);
            parameters.Add("@UsuarioModificacion", orderZMEJ.UsuarioModificacion);

            string sqlQuery = "UPDATE ZMEJ.[Order] SET Evidencia=@Evidencia,TipodeTrabajo=@TipodeTrabajo,OrdenMantenimiento=@OrdenMantenimiento," +
                " NotaMantenimiento=@NotaMantenimiento,FechaDeModificacion=@FechaDeModificacion,UsuarioModificacion=@UsuarioModificacion " +
                " where Id=@Id";

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                if (r > 0)
                    return true;
                return false;
            }

           


            // throw new NotImplementedException();
        }

        public async Task<OrderZMEJDto> GetOrderDetailbyIdAsync(Guid id, string centro)
        {
            string sqlQuery = "SELECT  B.Name 'NombreEstado',C.Nombre	'NombreClasificacion',E.Nombre 'NombreClaseActividad',A.*  FROM ZMEJ.[Order] A LEFT JOIN " +
                   "ZMEJ.StatusCode B ON A.Estado = B.Code LEFT JOIN ZMEJ.Clasificacion C ON C.Id = A.Clasificacion " +
                   "LEFT JOIN ZMEJ.ClaseDeActividad E ON E.id=A.ClaseDeActividadID WHERE  A.Id = @Id ";

            using (IDbConnection conn = DapperConnection)
            {

                var r = await SqlMapper.QueryAsync<OrderZMEJDto>(conn, sqlQuery, new { Id = id }, commandType: CommandType.Text);
                return r.FirstOrDefault();
            }

        }
    }
}
