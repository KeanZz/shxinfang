using DAL;
using Model.Common;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace BLL
{
    public class BaseB<T> where T : class,new()
    {
        private readonly BaseD<T> _dao;
        public BaseB(BaseD<T> dao)
        {
            _dao = dao;
        }

        public List<T> GetListAsync(QueryM q)
        {
            return _dao.GetListAsync(q);
        }

        public T GetModelById(string ident,string id)
        {
            return _dao.GetModelById(ident,id);
        }

        public bool Insert(T model)
        {
            return _dao.Insert(model);
        }

        public bool Update(T model)
        {
            return _dao.Update(model);
        }
      
        public T GetModelByValue(string sql, object value)
        {
            return _dao.GetModelByValue(sql, value);
        }
        public List<T> GetModelsByValue(string sql, object value)
        {
            return _dao.GetModelsByValue(sql, value);
        }
        public DataSet GetDataBySql(string sql, object param)
        {
            return _dao.GetDataSet(sql, param);
        }
        public int Delete(string sql, object value)
        {
            return _dao.Delete(sql, value);
        }
    }
}
