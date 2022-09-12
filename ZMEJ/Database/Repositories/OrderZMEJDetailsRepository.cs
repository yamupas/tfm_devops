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
    public class OrderZMEJDetailsRepository : BaseRepository, IOrderZMEJDetailsRepository
    {
        public OrderZMEJDetailsRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<bool> AddOrderDetails(OrderZMEJDetails orderZMEJDetails)
        {
           
            string sqlQuery = "insert into ZMEJ.OrderDetails  (Id,Observacion,FechaDeCreacion,UsuarioCreacion,OrderId,AsignadoA) VALUES (@Id,@Observacion,@FechaDeCreacion,@UsuarioCreacion,@OrderId,@AsignadoA)";
            DynamicParameters parameters = new DynamicParameters();
            //AsignadoA
            parameters.Add("@Id", orderZMEJDetails.Id);
            parameters.Add("@Observacion", orderZMEJDetails.Observacion);
            parameters.Add("@FechaDeCreacion", orderZMEJDetails.FechaDeCreacion);
            parameters.Add("@UsuarioCreacion", orderZMEJDetails.UsuarioCreacion);
            parameters.Add("@OrderId", orderZMEJDetails.OrderId);
            parameters.Add("@AsignadoA", orderZMEJDetails.AsignadoA);

            using (IDbConnection conn = DapperConnection)
            {
                var r = await SqlMapper.ExecuteAsync(conn, sqlQuery, parameters, commandType: CommandType.Text);
                if (r > 0)
                    return true;
                return false;
            }


          
            //throw new NotImplementedException();
        }

        public async Task<List<OrderZMEJDetails>> getAllByOrderId(Guid orderId)
        {
            string SqlQuery = "SELECT Id,Observacion,FechaDeCreacion,UsuarioCreacion,OrderId FROM ZMEJ.OrderDetails where OrderId=@OrderId ORDER BY FechaDeCreacion DESC";

            using (IDbConnection conn = DapperConnection)
            {
                var result = await SqlMapper.QueryAsync<OrderZMEJDetails>(conn, SqlQuery, new { orderId = orderId }, commandType: CommandType.Text);
                return result.ToList();
            }
          
            //throw new NotImplementedException();
        }
    }
}
