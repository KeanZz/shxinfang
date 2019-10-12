using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Model.Tools
{
    public class UUAP_Common
    {
        public static string app_key = "uuapclient-1-1yOeeu7cKDxLLKzWMNlG";
        public static string serverUrl = "http://uuap.baidu.com:8086/";
        public static string loginUrl = "http://uuap.baidu.com/serviceValidate?";
        /// <summary>
        /// uuap用户信息接口url
        /// </summary>
        public static string uuap_user_url = serverUrl + "ws/UserRemoteService";
        /// <summary>
        /// uuap部门信息接口url
        /// </summary>
        public static string uuap_department_url = serverUrl + "ws/DepartmentRemoteService";


        #region 验证tickect，得到用户
        /// <summary>
        /// 验证tickect，得到用户
        /// </summary>
        /// <param name="ticket"></param>
        /// <param name="service"></param>
        /// <returns></returns>
        public static Model.Content.UuapModel GetTicketHtml(string ticket, string service)
        {
            string dataStr = string.Format("ticket={0}&service={1}", ticket, service);
            string html = GetSOAP(loginUrl + dataStr);
            if (string.IsNullOrEmpty(html))
            {
                return null;
            }
            try
            {
                XDocument xDoc = XDocument.Parse(html);
                XNamespace n = @"http://www.yale.edu/tp/cas";
                IEnumerable<string> ele = from item in xDoc.Descendants(n + "user")
                                          select item.Value;
                if (ele != null && ele.Count() > 0)
                {
                    string uname = ele.SingleOrDefault();
                    return GetModelByUserName(uname);
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        /// <summary>
        /// 根据用户名获取用户详细信息
        /// </summary>
        /// <param name="uname"></param>
        /// <returns></returns>
        public static Model.Content.UuapModel GetModelByUserName(string uname)
        {
            //uname = "niuzhanfang_bj"; //动态的改变用户名，可以模拟其他用户登陆；

            if (string.IsNullOrEmpty(uname))
            {
                return null;
            }
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://interfaces.ws.publication.uic.baidu.com/\">");
            sb.AppendLine("<soapenv:Header>");
            sb.AppendLine(string.Format("<appKey>{0}</appKey>", app_key));
            sb.AppendLine("</soapenv:Header>");
            sb.AppendLine("<soapenv:Body>");
            sb.AppendLine("<int:getSuperiorByUsername>");
            sb.AppendLine(string.Format(" <arg0>{0}</arg0>", uname));
            sb.AppendLine("</int:getSuperiorByUsername>");
            sb.AppendLine("</soapenv:Body>");
            sb.AppendLine("</soapenv:Envelope>");
            string html = PostSOAPReSource(uuap_user_url, sb.ToString());
            if (string.IsNullOrEmpty(html))
            {
                return null;
            }
            try
            {
                Model.Content.UuapModel model = new Model.Content.UuapModel();
                System.Reflection.PropertyInfo[] properties = model.GetType().GetProperties();
                if (properties.Length > 0)
                {
                    foreach (var item in properties)
                    {
                        Regex reg = new Regex(string.Format("<{0}>(.*?)</{0}>", item.Name));
                        if (reg.IsMatch(html))
                        {
                            item.SetValue(model, reg.Match(html).Groups[1].Value, null);
                        }
                    }
                    return model;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion


        #region 网络请求
        public static string GetSOAP(string url)
        {
            WebClient wc = new WebClient();
            wc.Encoding = Encoding.UTF8;
            try
            {
                return wc.DownloadString(url);
            }
            catch (Exception)
            {
                return "";
            }
        }


        /// <summary>
        /// 发送post请求
        /// </summary>
        /// <param name="url"></param>
        /// <param name="datastr"></param>
        /// <returns></returns>
        public static string PostSOAPReSource(string url, string datastr)
        {
            //发起请求
            Uri uri = new Uri(url);
            WebRequest webRequest = WebRequest.Create(uri);
            webRequest.ContentType = "text/xml; charset=utf-8";
            webRequest.Method = "POST";
            using (Stream requestStream = webRequest.GetRequestStream())
            {
                byte[] paramBytes = Encoding.UTF8.GetBytes(datastr.ToString());
                requestStream.Write(paramBytes, 0, paramBytes.Length);
            }
            //响应
            WebResponse webResponse = webRequest.GetResponse();
            using (StreamReader myStreamReader = new StreamReader(webResponse.GetResponseStream(), Encoding.UTF8))
            {
                string result = "";
                return result = myStreamReader.ReadToEnd();
            }
        }
        #endregion
    }
}
