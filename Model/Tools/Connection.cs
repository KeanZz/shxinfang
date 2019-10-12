using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Tools
{
    public class Connection
    {
        private static string ConnectionString =Configs.GetValue("ConnectionString");

        public static IDbConnection GetSqlConnection()
        {
            IDbConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            return conn;
        }
    }
}
