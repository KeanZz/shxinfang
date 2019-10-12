using Dapper;
using Model.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace DAL
{
    public class BaseD<T> where T : class, new()
    {
        private IDbConnection _conn = Connection.GetSqlConnection();
        private readonly EntityM _entityM = EntityInfo<T>.GeEntityInfo();

        public  List<T> GetListAsync(QueryM q)
        {
            try
            {
                var orderBy = q.OrderBy ?? _entityM.Identity + " DESC";
                var where = string.IsNullOrEmpty(q.Where) ? "" : " " + q.Where;
                var str = $@"SELECT * FROM 
                            (
	                            SELECT ROW_NUMBER() OVER(ORDER BY {orderBy}) AS rank, {string.Join(",", _entityM.Fields.Keys)}
                                
                                FROM {_entityM.TableFullName} {where}
                            )a
                            WHERE a.rank BETWEEN {(q.PageNum - 1) * q.PageSize+1} AND {q.PageSize*q.PageNum}";
                return _conn.Query<T>(str,q.Params) as List<T>;
            }
            catch (Exception)
            {
                return null;
            }
        }        
        public T GetModelById(string ident,string id)
        {
            try
            {              
                var str = $@"SELECT {string.Join(",", _entityM.Fields.Keys)} FROM {_entityM.TableFullName} WHERE {ident} = @{ident};";
                var p = new DynamicParameters();
                p.Add($"@{ident}", id);                
                return _conn.QueryFirstOrDefault<T>(str, p);
            }
            catch (Exception)
            {
                return new T();
            }
        }
      
        public bool Insert(T model)
        {
            try
            {
                if (_entityM.Fields.ContainsKey(_entityM.Identity))
                {
                    _entityM.Fields.Remove(_entityM.Identity);
                }
                var str = $@" INSERT INTO {_entityM.TableFullName} ({string.Join(",", _entityM.Fields.Keys)}) 
                              VALUES (@{string.Join(",@", _entityM.Fields.Keys)});";
                _conn.Execute(str, model);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Update(T model)
        {
            try
            {
                if (_entityM.Fields.ContainsKey(_entityM.Identity))
                {
                    _entityM.Fields.Remove(_entityM.Identity);
                }
                var fields = string.Empty;
                foreach (var f in _entityM.Fields.Keys)
                {
                    fields += f + "=@" + f + ",";
                }
                fields = fields.TrimEnd(',');
                var str = $@" UPDATE {_entityM.TableFullName} SET {fields}
                              WHERE {_entityM.Identity} = @{_entityM.Identity};";
                _conn.Execute(str, model);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public T GetModelByValue(string sql, object value)
        {
            try
            {
                return _conn.QueryFirstOrDefault<T>(sql, value);
            }
            catch(Exception ee)
            {
                return null;
            }
            
        }
        public List<T> GetModelsByValue(string sql, object value)
        {
            try
            {
                return _conn.Query<T>(sql, value).AsList();
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
                return _conn.Execute(sql, value);
            }
            catch (Exception ee)
            {
                return 0;
            }
        }
        public DataSet GetDataSet(string sql, object param = null)
        {
            DataSet dataSet = new DataSet();
            DataTable dataTable = new DataTable();
            dataTable.Load(_conn.ExecuteReader(sql, param));
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
                _conn.Close();
                _conn = null;
            }
        }

        ~BaseD()
        {
            Dispose(false);
        }
    }
}
