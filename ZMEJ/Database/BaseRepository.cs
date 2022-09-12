using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace ZMEJ.Database
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
        public string _connectionString;

        public BaseRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
            try
            {
                _connectionString = configuration.GetConnectionString("DefaultConnectionString");

            }
            catch (Exception e)
            {

                throw;
            }
        }
        public IDbConnection DapperConnection
        {
            get
            {

                con = new SqlConnection(_connectionString);
                return con;
            }
        }
        public void Dispose()
        {
            if (con != null && con.State == ConnectionState.Open)
            {
                con.Close();
                con = null;
            }
        }
    
}
}
