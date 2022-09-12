using System;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace DataManagement.Common.SQLConnection.Mysql
{
    public class BaseRepository : IDisposable
    {
        private IConfiguration _configuration;
        private string server;
        private string database;
        private string uid;
        private string password;     
        //protected NpgsqlConnection con; // postgre sql
        // para mysql  
        protected MySqlConnection con;

        public BaseRepository(IConfiguration configuration)
        {
            this._configuration = configuration;
            try
            {
                var connectionString = configuration.GetConnectionString("DefaultConnectionString");
                con = new MySqlConnection(connectionString);

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
            //throw new NotImplementedException();
        }
    }


}
