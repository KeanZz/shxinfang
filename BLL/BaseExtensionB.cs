using IBLL;
using IDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class BaseExtensionB<T>: IBaseExtensionB<T>  where T:class
    {
        private readonly IBaseExtensionD<T> _baseExtensionD;
        public BaseExtensionB(IBaseExtensionD<T> baseExtensionD)
        {
            _baseExtensionD = baseExtensionD;
        }
        public T GetModelByValue(string sql,object value)
        {
            return _baseExtensionD.GetModelByValue(sql,value);
        }
        public List<T> GetModelsByValue(string sql,object value)
        {
            return _baseExtensionD.GetModelsByValue(sql,value);
        }
        public DataSet GetDataBySql(string sql,object param)
        {
            return _baseExtensionD.GetDataSet(sql, param);
        }
        public int Delete(string sql, object value)
        {
            return _baseExtensionD.Delete(sql, value);
        }
    }
}
