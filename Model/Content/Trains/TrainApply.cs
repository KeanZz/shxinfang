using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Trains
{
    [DataTable("TrainApply")]
    public class TrainApply    {
       
        [Identity]
        public int ID { set; get; }
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
        public string ApplyName { set; get; }
        /// <summary>
        /// 添加人email
        /// </summary>
        [Field]
        public string CreateEmail { set; get; }
        /// <summary>
        /// 添加时间
        /// </summary>
        [Field]
        public DateTime ApplyTime { set; get; }
                
        [Field]
        public int Status { set; get; }
        [Field]
        public string  Remark { set; get; }
    }
}
