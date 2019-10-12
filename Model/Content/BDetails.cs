using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("BDetails")]
    public class BDetails
    {
        [Identity]
        [Field]
        public int ID { set; get; }
        [Field]
        public string PID { set; get; }
        /// <summary>
        /// 图片路径
        /// </summary>
        [Field]
        public string Urls { set; get; }
        /// <summary>
        /// 说明
        /// </summary>
        [Field]
        public string Explain { set; get; }
        /// <summary>
        /// 类型  1：bannner图  2：实景鉴赏 3：周边配套 交通   4：周边配套 商业教育  5 周边配套 医疗休闲  6：户型样板
        /// </summary>
        [Field]
        public int Type { set; get; }
        /// <summary>
        /// 上传时间
        /// </summary>
        [Field]
        public DateTime Time { set; get; }
        /// <summary>
        /// 上传人
        /// </summary>
        [Field]
        public string Person { set; get; }
        /// <summary>
        /// 默认为0 
        /// </summary>
        [Field]
        public int IsDel { set; get; }
    }
}
