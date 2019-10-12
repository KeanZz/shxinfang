using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Model.Content;
using Model.Content.User;
using Dapper;

namespace Model.Tools
{
    public class OperatorProvider
    {
        public static OperatorProvider Provider
        {
            get { return new OperatorProvider(); }
        }

        private string LoginUserKey = "yezhi_loginuserkey";
        public OperatorModel GetCurrent()
        {
            OperatorModel operatorModel = new OperatorModel();
            try
            {
                operatorModel = DESEncrypt.Decrypt(Cookies.GetCookie(LoginUserKey).ToString()).ToObject<OperatorModel>();
            }
            catch (Exception ee)
            {
                operatorModel = null;
            }
            return operatorModel;
        }

        public void AddCurrent(OperatorModel operatorModel)
        {

            Cookies.WriteCookie(LoginUserKey, DESEncrypt.Encrypt(operatorModel.ToJson()), 10000);
        }
        public void RemoveCurrent()
        {
            Cookies.RemoveCookie(LoginUserKey.Trim());
        }

    }
}
