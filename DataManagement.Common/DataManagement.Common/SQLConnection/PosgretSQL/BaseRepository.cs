using System;
using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace DataManagement.Common.SQLConnection.PosgretSQL
{
    public class BaseRepository : IDisposable
    {
        private IConfiguration _configuration;
        private string server;
        private string database;
        private string uid;
        private string password;     
        protected NpgsqlConnection con; // postgre sql

        public BaseRepository(IConfiguration configuration)
        {
            this._configuration = configuration;
            try
            {

                var connectionString = configuration.GetConnectionString("DefaultConnectionString");
                con = new NpgsqlConnection(connectionString);

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
