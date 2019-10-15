using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using Model;
using Model.Common;
using Model.Content;
using Model.Tools;
using SHF.Filter;

namespace SHF.Controllers
{

    public class HomeController : Controller
    {
        private BaseB<Model.Content.Builds> BD;
        private BaseB<Model.Content.BDetails> Details;
        private BaseB<Customeres> CT;
        public HomeController(BaseB<Model.Content.Builds> _BD, BaseB<Model.Content.BDetails> _bdt, BaseB<Customeres> _CT)
        {
            BD = _BD;
            Details = _bdt;
            CT = _CT;
        }
        /// <summary>
        /// 添加信息
        /// </summary>
        /// <returns></returns>
        [Login]
        public ActionResult Add()
        {
            return View();
        }
        [Login]
        public ActionResult AddSave(string Name, string Address, decimal AveragePrice, string Business, string School, string Hospital,
            string Enjoy, string DeadLine, decimal Areas, decimal Green, int Years, string Property, string Develops, string Certificate)
        {
            Model.Content.Builds builds = new Model.Content.Builds();
            builds.Name = Name;
            builds.Address = Address;
            builds.AveragePrice = AveragePrice;
            builds.Business = Business;
            builds.School = School;
            builds.Hospital = Hospital;
            builds.Enjoy = Enjoy;
            builds.DeadLine = DeadLine;
            builds.Areas = Areas;
            builds.Green = Green;
            builds.Years = Years;
            builds.Property = Property;
            builds.Developers = Develops;
            builds.Certificate = Certificate;
            builds.Person = "admin";
            builds.Time = DateTime.Now;
            builds.PID = Guid.NewGuid().ToString();
            bool ret = BD.Insert(builds);
            return Json(new { Code = ret });
        }
        /// <summary>
        /// 列表
        /// </summary>
        /// <returns></returns>
        [Login]
        public ActionResult List()
        {
            return View();
        }
        [Login]
        public ActionResult GetList()
        {
            int pageindex = int.Parse(Request["PageIndex"]);
            int pagesize = int.Parse(Request["PageSize"]);
            string sqlcount = "select id from builds ";
            // = _baseExtensionB.GetModelsByValue(sqlstr, param);
            //多产品操作信息
            QueryM queryM = new QueryM()
            {
                PageNum = pageindex,
                PageSize = pagesize,
                Where = "",
                Params = null
            };
            List<Model.Content.Builds> builds = BD.GetListAsync(queryM);
            var totalCount = BD.GetModelsByValue(sqlcount, null);
            return Json(new { list = builds, RowCount = totalCount.Count(), PageIndex = pageindex, PageCount = (int)Math.Ceiling(totalCount.Count() * 1.0 / 10) }, JsonRequestBehavior.DenyGet);
        }
        [Login]
        public ActionResult Customer()
        {
            return View();
        }
        [Login]
        public ActionResult GetCustomer()
        {
            int pageindex = int.Parse(Request["PageIndex"]);
            int pagesize = int.Parse(Request["PageSize"]);
            string sqlcount = "select id from Customers ";
            List<Customeres> builds = CT.GetModelsByValue("select ROW_NUMBER() OVER(ORDER BY Customers.ID DESC) AS rank,Customers.Name,Customers.Phone,Customers.Time,Builds.Name as xiaoqu from Customers left join Builds on Customers.FID=Builds.PID ", "");
            var totalCount = CT.GetModelsByValue(sqlcount, null);
            return Json(new { list = builds, RowCount = totalCount.Count(), PageIndex = pageindex, PageCount = (int)Math.Ceiling(totalCount.Count() * 1.0 / 10) }, JsonRequestBehavior.DenyGet);
        }
        public class Customeres
        {
            public int rank { set; get; }
            public string xiaoqu { set; get; }
            public string Name { set; get; }
            public string Phone { set; get; }
            public DateTime Time { set; get; }
        }
        /// <summary>
        /// 编辑
        /// </summary>
        /// <returns></returns>
        [Login]
        public ActionResult Edit(string PID)
        {
            Model.Content.Builds builds = BD.GetModelById("PID", PID);
            List<Model.Content.BDetails> bdt = Details.GetModelsByValue("SELECT * FROM BDetails where isdel=0 and pid='" + PID + "'", null);
            ViewBag.Details = bdt;
            return View(builds);
        }
        [Login]
        public ActionResult EditSave(string Name, string Address, decimal AveragePrice, string Business, string School, string Hospital,
            string Enjoy, string DeadLine, decimal Areas, decimal Green, int Years, string Property, string Develops, string Certificate, string PID)
        {
            Model.Content.Builds builds = BD.GetModelByValue("select top 1* from Builds  where isdel=0 and  pid='" + PID + "'", null);
            builds.Name = Name;
            builds.Address = Address;
            builds.AveragePrice = AveragePrice;
            builds.Business = Business;
            builds.School = School;
            builds.Hospital = Hospital;
            builds.Enjoy = Enjoy;
            builds.DeadLine = DeadLine;
            builds.Areas = Areas;
            builds.Green = Green;
            builds.Years = Years;
            builds.Property = Property;
            builds.Developers = Develops;
            builds.Certificate = Certificate;
            bool ret = BD.Update(builds);
            return Json(new { Code = ret });
        }
        /// <summary>
        /// 删除图片
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Delete(int value)
        {
            Model.Content.BDetails bDetails = Details.GetModelByValue("SELECT top 1 * FROM BDetails where isdel=0 and id=" + value, null);
            bDetails.IsDel = 1;
            bDetails.Time = DateTime.Now;
            bool bol = Details.Update(bDetails);
            return Json(new { Code = bol, Message = "" }, JsonRequestBehavior.DenyGet);
        }
        /// <summary>
        /// 删除楼盘
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Deletes(string  value)
        {
            Model.Content.Builds builds  = BD.GetModelById("PID", value);
            builds.IsDel = 1;
            builds.Time = DateTime.Now;
            bool bol = BD.Update(builds);
            return Json(new { Code = bol, Message = "" }, JsonRequestBehavior.DenyGet);
        }
        [Login]
        public ActionResult Detail(string PID)
        {
            Model.Content.Builds builds = BD.GetModelById("PID", PID);
            ViewBag.Build = builds;
            List<Model.Content.BDetails> bdt = Details.GetModelsByValue("SELECT * FROM BDetails where isdel=0 and pid='" + PID + "'", null);
            ViewBag.Details = bdt;
            return View();
        }
        [HttpPost]
        public ActionResult LoginIn(string Name, string Password)
        {
            if (Name == "admin888" && Password == "shxinfang888")
            {
                OperatorModel opm = new OperatorModel();
                opm.Name = "999999";
                OperatorProvider.Provider.AddCurrent(opm);
                return Json(new { Code = true });
            }
            else
            {
                return Json(new { Code = false });
            }
        }
        public ActionResult Login()
        { return View(); }

        public ActionResult Comment(string PID)
        {
            ViewBag.PID = PID;
            return View();
        }
        /// <summary>
        /// 上传文件保存
        /// </summary>
        /// <returns></returns>        
        [HttpPost]
        public JsonResult UploadSave(string ID, string username, string comment)
        {
            string pathForSaving = Server.MapPath("~/");
            string sqlcount = "select top 1* from builds where isdel=0 and  PID='" + ID + "'";
            Model.Content.Builds builds = BD.GetModelByValue(sqlcount, null);
            try
            {
                foreach (string strfile in Request.Files)
                {
                    try
                    {
                        HttpPostedFileBase uploadFile = Request.Files[strfile] as HttpPostedFileBase;
                        if (uploadFile != null && uploadFile.ContentLength > 0)
                        {
                            var paths = DateTime.Now.ToString("yyMMdd_hhmmss") + "_" + uploadFile.FileName;
                            uploadFile.SaveAs(Server.MapPath("/UploadFiles/") + paths);
                            //添加附件信息
                            Model.Content.BDetails bDetails = new Model.Content.BDetails();
                            bDetails.Person = username;
                            bDetails.PID = ID;
                            bDetails.Urls = "/UploadFiles/" + paths;
                            bDetails.Time = DateTime.Now;
                            bDetails.Explain = comment;
                            bDetails.Type = 7;//7为评论图片                          
                            Details.Insert(bDetails);
                        }
                    }
                    catch (Exception ee)
                    {
                        //邮件通知
                    }
                }
            }
            catch (Exception ee)
            {
                return Json(new { code = 1 }, JsonRequestBehavior.DenyGet);
            }
            return Json(new { code = 0 }, JsonRequestBehavior.DenyGet);
        }
    }
}