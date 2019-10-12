using Dapper;
using IDAL;
using Model.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class MenuInfoD<T>:IMenuInfoD<T>
    {
        private IDbConnection _coon = Connection.GetSqlConnection();
        /// <summary>
        /// 获取当前角色的菜单列表
        /// </summary>
        /// <returns></returns>
        public List<T> GetMeunList()
        {            
            string sql = @"select menuinfo.id,menuinfo.[uid],menuinfo.name,menuinfo.url,menuinfo.pid,menuinfo.sort,menuinfo.isdel  from menuinfo left join rolemenu on 
                         menuinfo.[uid] = rolemenu.Menuid
                         where rolemenu.fid =@fid";
            object param = new { fid= "6b489ccd-be81-49ce-bccc-a08c03ad11f0" };
            return  _coon.Query<T>(sql,param).AsList();
        }
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
            catch (Exception)
            {
                return null;
            }
        }   
    }
}
