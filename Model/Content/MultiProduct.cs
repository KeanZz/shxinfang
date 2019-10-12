using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("MultiProduct")]
    public class MultiProduct
    {       
        [Identity]
        [Field]
        public int Id { set; get; }
        /// <summary>
        /// 订单编号
        /// </summary>        
        [Field]
        public string OrderNumber { set; get; }
        /// <summary>
        /// 合同编号
        /// </summary>
        [Field]
        public string ContractNumber { set; get; }
        /// <summary>
        /// 广告主
        /// </summary>
        [Field]
        public string AdOwner { set; get; }
        /// <summary>
        /// 推广形式
        /// </summary>
        [Field]
        public string PromotionForm { set; get; }
        /// <summary>
        /// 代理商
        /// </summary>
        [Field]
        public string Agent { set; get; }
        /// <summary>
        /// 金额
        /// </summary>
        [Field]
        public decimal Amount { set; get; }
        /// <summary>
        /// 产品名称
        /// </summary>
        [Field]
        public string ProductName { set; get; }
        /// <summary>
        /// 是否要纸质合同
        /// </summary>
        [Field]
        public int PaperContract { set; get; }
        /// <summary>
        /// 是否补签0元合同
        /// </summary>
        [Field]
        public int Supply { set; get; }
       
        /// <summary>
        /// 申请人姓名
        /// </summary>
        [Field]
        public string ApplyName { set; get; }
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
        /// 领取合同时间
        /// </summary>
        [Field]
        public DateTime ReceiveDate { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        [Field]
        public string Remark { set; get; }
        /// <summary>
        /// 创建者姓名
        /// </summary>
        [Field]
        public string CreateName { set; get; }        
        /// <summary>
        /// 地点
        /// </summary>
        [Field]
        public string Place { set; get; }
        /// <summary>
        /// 创建日期
        /// </summary>
        [Field]
        public DateTime CreateDate { set; get; }
        /// <summary>
        /// 状态
        /// </summary>
        [Field]
        public int Status { set; get; }
        /// <summary>
        /// 是否删除
        /// </summary>
        [Field]
        public int IsDel { set; get; }
        /// <summary>
        /// 返还地点
        /// </summary>
        [Field]
        public string RetPlace { set; get; }
        /// <summary>
        /// 返还时间
        /// </summary>
        [Field]
        public DateTime RetDate { set; get; }
        /// <summary>
        /// 是否个案
        /// </summary>
        [Field]
        public int Gean { set; get; }
        /// <summary>
        /// 个案说明
        /// </summary>
        [Field]
        public string Structs { set; get; }
        /// <summary>
        /// 归还资质
        /// </summary>
        [Field]
        public string ReturnData { set; get; }
        /// <summary>
        /// 是否百度中间商
        /// </summary>
        [Field]
        public int IsBaiduAgent { set; get; }
        /// <summary>
        /// 是否签署框架补充协议
        /// </summary>
        [Field]
        public int Adds { set; get; }

        /// <summary>
        /// 是否纳框
        /// </summary>
        [Field]
        public int Box { set; get; }
        /// <summary>
        /// 变更合同
        /// </summary>
        [Field]
        public int IsChange { set; get; }
        /// <summary>
        /// 变更合同编号
        /// </summary>
        [Field]
        public string ChangeContractNumber { set; get; }
    }
}
