using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using Model;
using Model.Common;
using SHF.Filter;

namespace SHF.Controllers
{
    [Login]
    public class DetailController : Controller
    {
        private BaseB<Model.Content.Builds> BD;
        private BaseB<Model.Content.BDetails> Detail;
        public DetailController(BaseB<Model.Content.Builds> _BD, BaseB<Model.Content.BDetails> _bdt)
        {
            BD = _BD;
            Detail = _bdt;
        }
        /// <summary>
        /// 图片详细信息
        /// </summary>
        /// <returns></returns>
        public ActionResult Index(string PID)
        {
            ViewBag.PID = PID;
            return View();
        }

        /// <summary>
        /// 上传文件保存
        /// </summary>
        /// <returns></returns>        
        [HttpPost]
        public JsonResult UploadSave(string ID, int Type, string Stract)
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
                            bDetails.Person = uploadFile.FileName;
                            bDetails.PID = ID;
                            bDetails.Urls = "/UploadFiles/" + paths;
                            bDetails.Time = DateTime.Now;
                            bDetails.Explain = Stract;
                            bDetails.Type = Type;
                            Detail.Insert(bDetails);
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
        /// <summary>
        /// 图片删除
        /// </summary>
        /// <returns></returns>
        public ActionResult Delete()
        {
            return View();
        }
    }
}