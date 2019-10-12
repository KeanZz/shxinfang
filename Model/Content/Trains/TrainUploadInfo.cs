using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Trains
{
    [DataTable("TrainUploadInfo")]
    public class TrainUploadInfo
    {
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 唯一标示
        /// </summary>
        [Field]
        public string Gid { set; get; }
        /// <summary>
        /// 文件名
        /// </summary>
        [Field]
        public string Name { set; get; }
        /// <summary>
        /// 文件大小
        /// </summary>
        [Field]
        public float Data { set; get; }
        /// <summary>
        /// 文件路径
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
    }
}
