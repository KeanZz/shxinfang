using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("Customers")]
    class Users
    {
        [Field] public int ID { set; get; }
        [Field] public string Name { set; get; }
        [Field] public string Account { set; get; }
        [Field] public string Password { set; get; }
        [Field] public int IsDel { set; get; }
        [Field] public DateTime Time { set; get; }
    }
}
