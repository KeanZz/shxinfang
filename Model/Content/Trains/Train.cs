using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Trains
{
    [DataTable("Train")]
    public class Train
    {
        /// <summary>
        /// 
        /// </summary>
        [Identity]
        public int  ID { set; get; }
        /// <summary>
        /// 唯一编码
        /// </summary>
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 合同编号
        /// </summary>
        [Field]
        public string ContractNumber { set; get; }
        /// <summary>
        /// 添加人
        /// </summary>
        [Field]
        public string AddPerson { set; get; }
        /// <summary>
        /// 添加时间
        /// </summary>
        [Field]
        public DateTime AddTime { set; get; }
        /// <summary>
        /// 领取人
        /// </summary>
        [Field]
        public string ReceivePerson { set; get; }
        /// <summary>
        /// 领取合同地点/部门，区域
        /// </summary>
        [Field]
        public string ReceivePlace { set; get; }
        /// <summary>
        /// 领取时间
        /// </summary>
        [Field]
        public DateTime ReceiveTime { set; get; }
        /// <summary>
        /// 合同份数
        /// </summary>
        [Field]
        public int Several { set; get; }
        /// <summary>
        /// 金额
        /// </summary>
        [Field]
        public double Amount { set; get; }
        /// <summary>
        /// 合同类型 普通合同 直通车合同
        /// </summary>
        [Field]
        public int Type { set; get; }
        /// <summary>
        /// 返还时间
        /// </summary>
        [Field]
        public DateTime ReturnTime { set; get; }
        /// <summary>
        /// 返还地点
        /// </summary>
        [Field]
        public string ReturnPlace { set; get; }
        /// <summary>
        /// 返还人
        /// </summary>
        [Field]
        public string ReturnPerson { set; get; }
        /// <summary>
        /// 商家名称
        /// </summary>
        [Field]
        public string BusinessName { set; get; }
        /// <summary>
        /// 总店账号
        /// </summary>
        [Field]
        public string MainAccount { set; get; }
        /// <summary>
        /// 主体资质
        /// </summary>
        [Field]
        public string Qualification { set; get; }
        /// <summary>
        /// 主体资质其他
        /// </summary>
        [Field]
        public string QualificationInfo { set; get; }

        /// <summary>
        /// 部门
        /// </summary>
        [Field]
        public string Depart { set; get; }
        /// <summary>
        /// 大部
        /// </summary>
        [Field]
        public string MajorDepart { set; get; }
        /// <summary>
        /// 小部
        /// </summary>
        [Field]
        public string SmallDepart { set; get; }
        /// <summary>
        /// 是否可扫描 0可以 1不可以
        /// </summary>
        [Field]
        public int Scan { set; get; }
        /// <summary>
        /// 不一致类型时的信息
        /// </summary>
        [Field]
        public string ScanInfo { set; get; }
        /// <summary>
        /// 授权范围 
        /// </summary>
        [Field]
        public int License { set; get; }
        /// <summary>
        /// 直通车账号
        /// </summary>
        [Field]
        public string LAccount { set; get; }
        /// <summary>
        /// 联系人
        /// </summary>
        [Field]
        public string LCPerson { set; get; }
        /// <summary>
        /// 身份证号码
        /// </summary>
        [Field]
        public string LCreadit { set; get; }
        /// <summary>
        /// 联系人邮箱
        /// </summary>
        [Field]
        public string LEmail { set; get; }
        /// <summary>
        /// 授权时间
        /// </summary>
        [Field]
        public DateTime LTime { set; get; }
        /// <summary>
        /// 资质单反信息
        /// </summary>
        [Field]
        public string LInfo { set; get; }
        /// <summary>
        /// 驳回次数
        /// </summary>
        [Field]
        public int Times { set; get; }
        /// <summary>
        /// 驳回类型
        /// </summary>
        [Field]
        public int RejectType { set; get; }
        /// <summary>
        /// 驳回原因
        /// </summary>
        [Field]
        public string RejectReason { set; get; }
        /// <summary>
        /// 延期日期
        /// </summary>
        [Field]
        public DateTime DelayTime { set; get; }
        /// <summary>
        /// 延期原因
        /// </summary>
        [Field]
        public string DelayReason { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        [Field]
        public string Remark { set; get; }
        /// <summary>
        /// 流程状态  1.暂未使用 2.暂未归档 3.本地归档 4.合同作废 5.客户丢失 6.销售丢失 7.合同搁置  8.已扣款
        ///			  9.丢失已登报 10.退款合同回收 11.退款合同丢失
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
        /// 联系人电话
        /// </summary>
        [Field]
        public string LCPhone { set; get; }

        /// <summary>
        /// 是否删除 
        /// </summary>
        [Field]
        public int IsDel { set; get; }
    }
}
