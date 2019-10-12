using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_AccountOperate")]
    public class AccountOperate
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// --1.一线提交申请  2.业支审核通过 3.erp提单
        ///--4.交单至财务（需要录入时间）5.财务审核通过（提交时间） 6.业支审核驳回
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
