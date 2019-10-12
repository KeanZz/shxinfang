using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content.Renewal
{
    [DataTable("Renewal_Info")]
    public class RenewalInfo
    {
        /// <summary>
        /// 
        /// </summary>
        [Identity]
        [Field]
        public int id
        {
            set;
            get;
        }
        [Field]
        public string Gid
        {
            set;get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Create_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Create_UserName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Create_uDeID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Create_uDepartment
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Create_uBigID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Create_uBigDepartments
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Create_uLittleID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Create_uLittleDepartment
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Contract_Number
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Status
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FHStatus
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
        [Field]public string Contract_Type
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Contract_Nature
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Contract_Edition
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Customer_Type
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string BmOrHt
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string CustomerName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string CorporationS
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FDAddress
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Postcode
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Emali
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Bank
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Accounts
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Website1
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Website2
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string LXAddress
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string TaxpayerSBH
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string RegisterDate
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string UserName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string IsKHHT
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public decimal? Money
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Salesman
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string SalesmanBM
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string SalesmanTelephone
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string SalesmanEmail
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Remark
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Manager_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Manager_Name
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public DateTime? Manager_Date
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Manager_Marks
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? Senior_Manager_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Senior_Manager_Name
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public DateTime? Senior_Manager_Date
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string Senior_Manager_Marks
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? ContractGroup_Manager_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string ContractGroup_Manager_Name
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public DateTime? ContractGroup_Manager_Date
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string ContractGroup_Manager_Marks
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string LXphone
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FHType
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FHRemark
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FFDate
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string FhDate
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? zj_Manager_UserID
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string zj_Manager_Name
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public DateTime? zj_Manager_Date
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string zj_Manager_Marks
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public string LXContacts
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [Field]public int? HTNumber
        {
            set;
            get;
        }
        [Field]public string RechargeDate { get; set; }
    }
}
