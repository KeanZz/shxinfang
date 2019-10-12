using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Renewal
{
    [DataTable("Renewal_Accessory_Info")]
    public class RenewalUploadInfo
    {
        [Identity]
        public int id
        {
            set;
            get;
        }
        [Field]
        public string Gid
        {
            get;set;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? RenewalID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Acc_Name
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Acc_Url
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public DateTime? Create_Date
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string AiPeople
        {
            set;
            get;
        }
    }
}
