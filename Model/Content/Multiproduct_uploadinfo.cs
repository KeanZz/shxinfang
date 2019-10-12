using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("multiproduct_uploadinfo")]
    public class Multiproduct_uploadinfo
    {
        [Identity]
        public int ID { set; get; }
        [Field]
        public string OrderNumber { set; get; }
        [Field]
        public string Name { set; get; }
        [Field]
        public double Date { set; get; }
        [Field]
        public string Url { set; get; }
        [Field]
        public DateTime DateTime { set; get; }
        [Field]
        public string Operate { set; get; }
    }
}
