using Dapper;
using IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BaseExtensionD<T>:IBaseExtensionD<T> where T : class, new()
    {
        private IDbConnection _coon = Connection.GetSqlConnection();
        public T GetModelByValue(string sql, object value)
        {
            return _coon.QueryFirst<T>(sql, value);
        }
        public List<T> GetModelsByValue(string sql, object value)
        {
            try
            {
                return _coon.Query<T>(sql, value).AsList();
            }
            catch (Exception ee)
            {
                return null;
            }
        }
        public int Delete(string sql, object value)
        {
            try
            {
                return _coon.Execute(sql, value);
            }
            catch (Exception ee)
            {
                return 0;
            }
        }
        public DataSet GetDataSet(string sql,object param=null)
        {
            DataSet dataSet = new DataSet();
            DataTable dataTable = new DataTable();
            dataTable.Load(_coon.ExecuteReader(sql, param));          
            dataSet.Tables.Add(dataTable);
            return dataSet;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                _coon.Close();
                _coon = null;
            }
        }

        ~BaseExtensionD()
        {
            Dispose(false);
        }
    }
}
