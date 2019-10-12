using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_MailOperate")]
    public class MailOperate
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 操作类型 1：一线添加  2：合同审核通过 3：合同审核驳回 4：一线编辑提交
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
