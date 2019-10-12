using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Renewal
{
    [DataTable("Renewal_Operation_Log")]
    public class RenewalOperation
    {
        [Identity]
        public int id
        {
            set;
            get;
        }
        /// <summary>
        /// 合同表ID
        /// </summary>
        [Field]public int? RenewalID
        {
            set;
            get;
        }
        /// <summary>
        /// 操作人ID
        /// </summary>
        [Field]public int? Add_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 操作人名称
        /// </summary>
        [Field]public string Add_UserName
        {
            set;
            get;
        }
        /// <summary>
        /// 操作前状态
        /// </summary>
        [Field]public int? Last_Status
        {
            set;
            get;
        }
        /// <summary>
        /// 操作后状态
        /// </summary>
        [Field]public int? Status
        {
            set;
            get;
        }
        /// <summary>
        /// 操作记录
        /// </summary>
        [Field]public string Status_Marks
        {
            set;
            get;
        }
        /// <summary>
        /// 类型
        /// </summary>
        [Field]public string type
        {
            set;
            get;
        }
        /// <summary>
        /// 操作时间
        /// </summary>
        [Field]public DateTime? Create_Date
        {
            set;
            get;
        }
    }
}
