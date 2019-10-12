using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Brokers
{
    [DataTable("CoreConpany")]
    public class CoreCompany
    {
        [Identity]
        public int ID { set; get; }
        /// <summary>
        /// 集团名称
        /// </summary>
        [Field]
        public string Groups { set; get; }
        /// <summary>
        /// 公司名称
        /// </summary>
        [Field]
        public string Company { set; get; }
        /// <summary>
        /// 代理商类型
        /// </summary>
        [Field]
        public string AgentType { set; get; }
        /// <summary>
        /// 销售体系
        /// </summary>
        [Field]
        public string System { set; get; }
    }
}
