using Model.Tools;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class Connection
    {
        private static string ConnectionString = Configs.GetValue("ConnectionString");

        public static IDbConnection GetSqlConnection()
        {
            IDbConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            return conn;
        }
    }
}
