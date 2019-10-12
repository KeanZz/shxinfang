using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.User
{
    [DataTable("RoleMenu")]
    public class RoleMenu
    {
        [Field]
        public string FID { set; get; }
        [Field]
        public string MenuID { set; get; }
        [Identity]
        public int IsDel { set; get; }
    }
}
