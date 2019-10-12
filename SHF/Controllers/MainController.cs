using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SHF.Controllers
{
    public class MainController : Controller
    {
        private BaseB<Main> BD;
        private BaseB<Model.Content.Builds> BDs;
        private BaseB<Model.Content.BDetails> Details;
        private BaseB<Model.Content.Customers> Cus;
        public MainController(BaseB<Main> _BD, BaseB<Model.Content.BDetails> _bdt, BaseB<Model.Content.Builds> _BDs, BaseB<Model.Content.Customers> _Cus)
        {
            BD = _BD;
            Details = _bdt;
            BDs = _BDs;
            Cus = _Cus;
        }
        /// <summary>
        /// 网站首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            string sql = " select top 4 builds.PID,builds.Name,builds.Address, bdetails.Urls from Builds left join BDetails on Builds.PID=BDetails.PID where BDetails.Type=0 and Builds.IsDel=0 ";
            List<Main> mains = BD.GetModelsByValue(sql, null);
            ViewBag.Main = mains;
            return View();
        }
        public class Main
        {
            public string PID { set; get; }
            public string Name { set; get; }
            public string Address { set; get; }
            public string Urls { set; get; }
        }
        public ActionResult Detail(string PID)
        {
            Model.Content.Builds builds = BDs.GetModelByValue("select top 1* from Builds  where isdel=0 and  pid='" + PID + "'", null);
            List<Model.Content.BDetails> bdt = Details.GetModelsByValue("SELECT * FROM BDetails where isdel=0 and pid='" + PID + "'", null);
            ViewBag.Details = bdt;
            return View(builds);
        }

        public ActionResult UserSave(string name, string phone, string Fid)
        {
            Model.Content.Customers customers = new Model.Content.Customers();
            customers.FID = Fid;
            customers.Time = DateTime.Now;
            customers.Name = name;
            customers.Phone = phone;
            bool bol = Cus.Insert(customers);
            return Json(new { status = bol });
        }
    }
}