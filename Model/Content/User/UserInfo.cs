using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.User
{
    [DataTable("UserInfo")]
    public  class UserInfo
    {
        [Field]
        public string Uid { set; get; }
        [Field]
        public string Name { set; get; }
        [Field]
        public string Email { set; get; }
        [Field]
        public string Hi { set; get; }
        [Field]
        public DateTime AddTime { set; get; }
        [Field]
        public int Enable { set; get; }
        [Field]
        public string EncryStr { set; get; }
        [Field]
        public string PassWord { set; get; }
        [Field]
        public int IsDel { set; get; }
        public string RoleName { set; get; }
        public string Fid { set; get; }
    }
    public class UserModel
    {
        public string Name { set; get; }
        public string Uid { set; get; }
        public string Email { set; get; }
        public string Hi { set; get; }
        public string AddTime { set; get; }
        public string RoleName { set; get; }       
    }
}
