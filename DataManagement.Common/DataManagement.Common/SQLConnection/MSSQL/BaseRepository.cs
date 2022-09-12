using System;
using System.Collections.Generic;
using System.Data;

using System.Data.SqlClient;
using System.Text;
using Microsoft.Extensions.Configuration;


namespace DataManagement.Common.SQLConnection.MSSQL
{
    public class BaseRepository : IDisposable
    {
        private IConfiguration _configuration;
        private string server;
        private string database;
        private string uid;
        private string password;
        // para sql server  
        protected IDbConnection con;
        private IConfiguration configuration;


        public BaseRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
            try
            {
                
                var connectionString = configuration.GetConnectionString("DefaultConnectionString");               
                con = new SqlConnection(connectionString);
               
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public void Dispose()
        {
            con.Dispose();
            //throw new NotImplementedException();
        }
    }


}
