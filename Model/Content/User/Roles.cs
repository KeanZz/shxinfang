using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.User
{
    [DataTable("Roles")]
    public class Roles
    {
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 唯一标示FID
        /// </summary>
        [Field]
        public string Fid { set; get; }
        /// <summary>
        /// 用户uid
        /// </summary>
        [Field]
        public string Uid { set; get; }
        /// <summary>
        /// 部门Id
        /// </summary>
        [Field]
        public string DepId { set; get; }
        /// <summary>
        /// 部门Id
        /// </summary>
        [Field]
        public string DepMajorId { set; get; }
        /// <summary>
        /// 部门Id
        /// </summary>
        [Field]
        public string DepLittleId { set; get; }
        /// <summary>
        /// 角色ID
        /// </summary>
        [Field]
        public string RoleId { set; get; }
        /// <summary>
        /// 是否授权
        /// </summary>
        [Field]
        public string IsAuthor { set; get; }
        /// <summary>
        /// 特殊名称
        /// </summary>
        [Field]
        public string SpecialName { set; get; }
        /// <summary>
        /// 是否删除
        /// </summary>
        [Field]
        public int IsDel { set; get; }
    }
}
