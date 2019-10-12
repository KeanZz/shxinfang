using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_Mail")]
    public class Mail
    {      
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 唯一标示
        /// </summary>
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 发起时间
        /// </summary>
        [Field]
        public DateTime InitTime { set; get; }
        /// <summary>
        /// 发起人
        /// </summary>
        [Field]
        public string InitPerson { set; get; }
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
        /// 序号
        /// </summary>
        [Field]
        public string Serial { set; get; }
        /// <summary>
        /// 运营单位
        /// </summary>
        [Field]
        public string OperateUnit { set; get; }
        /// <summary>
        /// 公司名称
        /// </summary>
        [Field]
        public string Company { set; get; }
        /// <summary>
        /// 公司所在城市
        /// </summary>
        [Field]
        public string City { set; get; }
        /// <summary>
        /// 是否为百度高管
        /// </summary>
        [Field]
        public string IsManage { set; get; }
        /// <summary>
        /// 现任职位
        /// </summary>
        [Field]
        public string Position { set; get; }
        /// <summary>
        /// 百度 职位
        /// </summary>
        [Field]
        public string PrePosition { set; get; }
        /// <summary>
        /// 营业执照注册地
        /// </summary>
        [Field]
        public string RegisterAdr { set; get; }
        /// <summary>
        /// 详细地址
        /// </summary>
        [Field]
        public string DetailAdr { set; get; }
        /// <summary>
        /// 负责联系人
        /// </summary>
        [Field]
        public string Contract { set; get; }
        /// <summary>
        /// 对接人邮件
        /// </summary>
        [Field]
        public string Email { set; get; }
        /// <summary>
        /// 电话
        /// </summary>
        [Field]
        public string Phone { set; get; }
        /// <summary>
        /// 中间商状态
        /// </summary>
        [Field]
        public string  BrokerStatus { set; get; }
        /// <summary>
        /// 抄送人邮箱
        /// </summary>
        [Field]
        public string CCEmail { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        [Field]
        public string Remark { set; get; }
        /// <summary>
        /// 驳回次数
        /// </summary>
        [Field]
        public int Times { set; get; }

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
        /// 创建时间
        /// </summary>
        [Field]
        public DateTime CreateTime { set; get; }
        /// <summary>
        /// 流程状态 1：待审核  2：审核通过 3：审核驳回 4：废弃
        /// </summary>
        [Field]
        public int Status { set; get; }
        /// <summary>
        /// 邮件内容
        /// </summary>
        [Field]
        public string Content { set; get; }

    }
}
