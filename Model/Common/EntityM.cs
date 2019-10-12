using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;
using Model.Attribute;
using Model.Tools;

namespace Model.Common
{
    public class EntityM
    {      
        public string DatabaseName =>Regex.Match( Configs.GetValue("ConnectionString"), @"database=(\w+);").Groups[1].Value+".dbo.";// "bjnew_yezhi.dbo.";
        public string TableName { get; set; }
        public string TableFullName => DatabaseName + TableName;
        public string Identity { get; set; }
        public Dictionary<string, object> Fields { get; set; }
    }

    public class EntityInfo<T> where T : class
    {
        public static EntityM GeEntityInfo()
        {
            var entity = new EntityM
            {
                Fields = new Dictionary<string, object>()
            };

            var type = typeof(T);

            //表名
            var dataTableAttribute = (DataTableAttribute)type.GetCustomAttribute(typeof(DataTableAttribute));
            entity.TableName = dataTableAttribute == null ? typeof(T).Name : dataTableAttribute.Name;

            //字段处理
            var properties = type.GetTypeInfo().GetProperties();
            foreach (var p in properties)
            {
                if (p.GetCustomAttribute(typeof(FieldAttribute)) is FieldAttribute)
                {
                    entity.Fields.Add(p.Name, null);                    
                }
                if (p.GetCustomAttribute(typeof(IdentityAttribute)) is IdentityAttribute)
                {
                    entity.Identity = p.Name;
                }
               
            }
            return entity;
        }
    }
}
