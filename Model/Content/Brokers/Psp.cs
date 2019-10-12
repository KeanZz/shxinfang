using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_PspAudit")]
    public class Psp
    {
        /// <summary>
        /// 
        /// </summary>
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 
        /// </summary>       
        [Field]
        public string Gid { set; get; }      
        /// <summary>
        /// 代理公司
        /// </summary>
        [Field]
        public string AgentCompany { set; get; }
        /// <summary>
        /// 订单号
        /// </summary>
        [Field]
        public string OrderNumber { set; get; }
        /// <summary>
        /// 合同号
        /// </summary>
        [Field]
        public string ContractNumber { set; get; }
        /// <summary>
        /// 开始时间
        /// </summary>
        [Field]
        public DateTime StartTime { set; get; }
        /// <summary>
        /// 结束时间
        /// </summary>
        [Field]
        public DateTime EndTime { set; get; }
        /// <summary>
        /// 产品名称
        /// </summary>
        [Field]
        public string ProductName { set; get; }
        /// <summary>
        /// 代理政策
        /// </summary>
        [Field]
        public string AgentPolicy { set; get; }
        /// <summary>
        /// psp通过时间
        /// </summary>
        [Field]
        public DateTime PsPTime { set; get; }
        /// <summary>
        /// 领取时间
        /// </summary>
        [Field]
        public DateTime ReceiveTime { set; get; }
        /// <summary>
        /// 领取地点
        /// </summary>
        [Field]
        public string ReceivePlace { set; get; }
        /// <summary>
        /// 领取人
        /// </summary>
        [Field]
        public string ReceivePerson { set; get; }
        /// <summary>
        /// 返还时间
        /// </summary>
        [Field]
        public DateTime ReturnTime { set; get; }
        /// <summary>
        /// 返还人
        /// </summary>
        [Field]
        public string ReturnPerson { set; get; }
        /// <summary>
        /// 返还地点
        /// </summary>
        [Field]
        public string ReturnPlace { set; get; }
        /// <summary>
        /// 销售助理
        /// </summary>
        [Field]
        public string SaleAss { set; get; }
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
        /// 驳回次数
        /// </summary>
        [Field]
        public int Times { set; get; }
        /// <summary>
        /// 份数
        /// </summary>
        [Field]
        public int Num { set; get; }
        /// <summary>
        /// 合同主体
        /// </summary>
        [Field]
        public string ContractSubject { set; get; }
        /// <summary>
        /// 驳回原因
        /// </summary>
        [Field]
        public string RejectReason { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        [Field]
        public string Remark { set; get; }
        /// <summary>
        /// 流程状态 1.预审核驳回 2.预审核通过 3.待返还 4.已返回 5.已搁置 6.废弃
        /// </summary>
        [Field]
        public int Status { set; get; }
        /// <summary>
        /// 创建人
        /// </summary>
        [Field]
        public string CreatePerson { set; get; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [Field]
        public DateTime CreateTime { set; get; }
        /// <summary>
        /// 创建人邮箱
        /// </summary>
        [Field]
        public string CreateEmail { set; get; }

        /// <summary>
        /// 个案 1为是 0为否
        /// </summary>
        [Field]
        public int Cases { set; get; }

        /// <summary>
        /// 个案说明
        /// </summary>
        [Field]
        public string CasesNote { set; get; }

        [Field]
        /// 是否新签
        public string NewSign { set; get; }
        [Field]
        ///模板
        public string Temp { set; get; }
        [Field]
        ///份数
        public string Number { set; get; }
    }
}
