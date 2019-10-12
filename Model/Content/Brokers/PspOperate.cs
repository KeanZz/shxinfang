using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_PspOperate")]
    public class PspOperate
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string Gid { set; get; }
        /// <summary>       
        /// 1.预审核驳回 2.预审核通过 3.发放合同 4.返还合同 5.搁置合同 6.驳回合同（待返还合同） 7.废弃合同 
        /// </summary>
        [Field]
        public int Type { set; get; }
        /// <summary>
        /// 操作人
        /// </summary>
        [Field]
        public string Operate { set; get; }
        /// <summary>
        /// 操作时间
        /// </summary>
        [Field]
        public DateTime Time { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        [Field]
        public string Remark { set; get; }
    }
}
