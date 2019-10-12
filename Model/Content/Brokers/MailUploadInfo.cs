using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("Broker_MailUploadInfo")]
    public class MailUploadInfo
    {
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// Mail中的唯一标示
        /// </summary>
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 文件名称
        /// </summary>
        [Field]
        public string Name { set; get; }
        /// <summary>
        /// 文件大小  kb
        /// </summary>
        [Field]
        public int Data { set; get; }
        /// <summary>
        /// 文件路径地址
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

        [Field]
        public int IsDel { set; get; }
    }
}
