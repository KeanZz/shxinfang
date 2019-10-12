using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Trains
{
    [DataTable("TrainOperate")]
    public  class TrainOperate
    {
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 唯一编码
        /// </summary>
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 操作类型 1.合同编号录入 2.合同领取 3.合同归档 4.合同驳回 5.搁置合同 
        /// 		 6.合同作废 7.客户丢失 8.销售丢失 9.已扣款 10.丢失已登报 11.退款合同回收 12 退款合同丢失 13 删除  14 上传文件
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
