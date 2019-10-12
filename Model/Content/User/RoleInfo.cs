using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.User
{
    [DataTable("RoleInfo")]
    public class RoleInfo
    {
        /// <summary>
        /// 自增ID
        /// </summary>
        [Identity]
        public int Id { set; get; }
        /// <summary>
        /// 角色ID
        /// </summary>
        [Field]
        public string RoleId { set; get; }
        /// <summary>
        /// 角色名称
        /// </summary>
        [Field]
        public string RoleName { set; get; }
        /// <summary>
        /// 是否删除
        /// </summary>
        [Field]
        public int IsDel { set; get; }
    }
}
