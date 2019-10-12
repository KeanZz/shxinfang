using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SHF.Filter
{
    public class LoginAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// 判断用户是否已经登录
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {

            if (Model.Tools.OperatorProvider.Provider.GetCurrent() == null)
            {
                filterContext.HttpContext.Response.Redirect("/home/login");
                return;
            }
        }
    }
}