using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("MenuInfo")]
    public class MenuInfo
    {
        [Field]
        public int Id { set; get; }
        [Field]
        public string Uid { set; get; }
        [Field]
        public string Name { set; get; }
        [Field]
        public string Url { set; get; }
        [Field]
        public string Pid { set; get; }
        [Field]
        public int Sort { set; get; }
        [Field]
        public int IsDel { set; get; }
    }
}
