using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_AccountUploadInfo")]
    public class AccountUploadInfo
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 名称
        /// </summary>
        [Field]
        public string Name { set; get; }
        /// <summary>
        /// 大小
        /// </summary>
        [Field]
        public int Data { set; get; }
        /// <summary>
        /// 路径
        /// </summary>
        [Field]
        public string Url { set; get; }
        /// <summary>
        /// 上传时间
        /// </summary>
        [Field]
        public DateTime UploadTime { set; get; }
        /// <summary>
        /// 操作人 
        /// </summary>
        [Field]
        public string Operate { set; get; }
        /// <summary>
        /// 是否删除
        /// </summary>
        [Field]
        public int IsDel { set; get; }
    }
}
