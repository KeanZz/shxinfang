using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_Account")]
    public class Account
    {

        [Identity]
        public int ID { set; get; }
        public int rank { set; get; }
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 添加时间
        /// </summary>
        [Field]
        public DateTime AddTime { set; get; }
        /// <summary>
        /// 添加人
        /// </summary>
        [Field]
        public string AddPerson { set; get; }
        /// <summary>
        /// 部门
        /// </summary>
        [Field]
        public string Depart { set; get; }
        /// <summary>
        /// 大部门
        /// </summary>
        [Field]
        public string MajorDepart { set; get; }
        /// <summary>
        /// 小部门
        /// </summary>
        [Field]
        public string LittleDepart { set; get; }
        /// <summary>
        /// 中间商名字
        /// </summary>
        [Field]
        public string BrokerName { set; get; }
        /// <summary>
        /// 中间商产品合同
        /// </summary>
        [Field]
        public string BrokerContractNumber { set; get; }
        /// <summary>
        /// 广告主
        /// </summary>
        [Field]
        public string Advertisers { set; get; }
        /// <summary>
        /// 驳回次数
        /// </summary>
        [Field]
        public int Times { set; get; }
        /// <summary>
        /// 提报金额
        /// </summary>
        [Field]
        public decimal Amount { set; get; }
        /// <summary>
        /// 报销单号
        /// </summary>
        [Field]
        public string AdvertisersNo { set; get; }
        /// <summary>
        /// 提交erp时间
        /// </summary>
        [Field]
        public DateTime ErpTime { set; get; }
        /// <summary>
        /// 提交财务时间
        /// </summary>
        [Field]
        public DateTime FinanceTime { set; get; }
        /// <summary>
        /// 财务通过时间
        /// </summary>
        [Field]
        public DateTime PassTime { set; get; }
        /// <summary>
        /// 流程状态 --1.待交材料到业支 2.合同审核通过 3.erp审批中 4.财务审核中 5.财务审核完成 
        ///--6.业支审核驳回
        /// </summary>
        [Field]
        public int Status { set; get; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [Field]
        public DateTime CreateTime { set; get; }
        /// <summary>
        /// 创建人
        /// </summary>
        [Field]
        public string CreatePerson { set; get; }
        /// <summary>
        /// 创建人邮箱
        /// </summary>
        [Field]
        public string CreateEmail { set; get; }
        /// <summary>
        /// 创建人部门
        /// </summary>
        [Field]
        public string depid { set; get; }

    }
}
