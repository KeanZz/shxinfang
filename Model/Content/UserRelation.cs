using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    public class UserRelation
    {
        public int Id { set; get; }
        /// <summary>
        /// Fid
        /// </summary>
        public string Fid { set; get; }
        /// <summary>
        /// 父级Fid
        /// </summary>
        public string PFid { set; get; }
        public int IsDel { set; get; }
    }
}
