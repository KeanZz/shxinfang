using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("Customers")]
    public class Customers
    {
        [Identity]
        [Field]
        public int ID { set; get; }
        [Field]
        public string FID { set; get; }
        /// <summary>
        /// 姓名
        /// </summary>
        [Field]
        public string Name { set; get; }
        /// <summary>
        /// 电话
        /// </summary>
        [Field]
        public string Phone { set; get; }
        /// <summary>
        /// 留言时间
        /// </summary>
        [Field]
        public DateTime Time { set; get; }
    }
}
