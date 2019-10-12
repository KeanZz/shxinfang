using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("multiproduct_operate")]
    public class Multiproduct_operate
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string OrderNumber { set; get; }
        [Field]
        public int Pass { set; get; }
        [Field]
        public string RejectReason { set; get; }
        [Field]
        public int Gean { set; get; }
        [Field]
        public string Address { set; get; }
        [Field]
        public string Remark { set; get; }
        [Field]
        public DateTime DateTime { set; get; }
        [Field]
        public string Operate { set; get; }
        [Field]
        public string structs{ set;get;}
    }
}
