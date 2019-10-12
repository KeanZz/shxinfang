using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    public class UuapModel
    {
        #region 属性
        /// <summary>
        /// 公司名称
        /// </summary>
        public string companyName { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string departmentName { get; set; }

        /// <summary>
        /// 员工编号
        /// </summary>
        public string employeeNumber { get; set; }
        /// <summary>
        /// 级别1-25
        /// </summary>
        public string grade { get; set; }

        public string hiNumber { get; set; }
        public string name { get; set; }

        public string email { get; set; }
        public string phoneNumber { get; set; }
        #endregion
    }
}
