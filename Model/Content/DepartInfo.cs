using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    public class DepartInfo
    {
        /// <summary>
        /// 自增ID
        /// </summary>
        public int Id { set; get; }
        /// <summary>
        /// 部门ID
        /// </summary>
        public string DepId { set; get; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string DepName { set; get; }
        /// <summary>
        /// 父ID
        /// </summary>
        public string Pid { set; get; }
        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { set; get; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public int IsDel { set; get; }

    }
}
