using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [Serializable]
    public class OperatorModel
    {
        /// <summary>
        /// 用户Uid
        /// </summary>
        public string Uid { set; get; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { set; get; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { set; get; }
        /// <summary>
        /// 百度HI
        /// </summary>
        public string Hi { set; get; }
        /// <summary>
        /// 是否可用
        /// </summary>
        public int Enable { set; get; }
        /// <summary>
        /// 角色-部门-用户  唯一标示
        /// </summary>
        public string Fid { set; get; }
        /// <summary>
        /// 一级，二级...部门集合
        /// </summary>
        public DepInfo Deps { set; get; }
        /// <summary>
        /// 角色ID
        /// </summary>
        public string RoleId { set; get; }
        /// <summary>
        /// 角色名称
        /// </summary>
        public string RoleName { set; get; }
    }
    [Serializable]
    public class DepInfo
    {
        public string DepId { set; get; }
        public string DepMajorId { set; get; }
        public string DepSmallId { set; get; }
    }
}
