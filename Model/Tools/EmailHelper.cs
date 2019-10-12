using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Model.Tools
{
     public class EmailHelper
    {
        #region 发送邮件
        /// <summary>
        /// 发送邮件（无附件）
        /// </summary>
        /// <param name="subject">标题</param>
        /// <param name="content">内容</param>
        /// <param name="showEmail">显示的发件人邮箱</param>
        /// <param name="showName">显示的发件人名称</param>
        /// <param name="receiveEmails">收件人邮箱列表（多个邮箱“英文分号”分隔）</param>
        /// <param name="ccEmails">抄送人邮箱列表（多个邮箱“英文分号”分隔）</param>
        /// <param name="notification">邮件通知类型（DeliveryNotificationOptions.None）</param>
        /// <param name="true_name">发件人账号（不用写@符号后面的）MyEncrypt.MyEncrypt.Decrypt("dmsxdm9zd3MxcUBsdC5sa3NuOC5tMnc=")</param>
        /// <param name="true_pwd">发件人密码MyEncrypt.MyEncrypt.Decrypt("dnZ3QGFiY2RlZg==")</param>
        public static void SendEmail_noFile(string subject, string content, string showEmail, string showName, string receiveEmails, string ccEmails, DeliveryNotificationOptions notification, string true_name, string true_pwd)
        {
            if (string.IsNullOrEmpty(receiveEmails) || !receiveEmails.Contains('@'))
            {
                return;
            }
            MailAddress from = new MailAddress(showEmail, showName); //邮件的发件人
            MailMessage mail = new MailMessage();

            //设置邮件的标题
            mail.Subject = subject;

            //设置邮件的发件人
            //Pass:如果不想显示自己的邮箱地址，这里可以填符合mail格式的任意名称，真正发mail的用户不在这里设定，这个仅仅只做显示用
            mail.From = from;

            //设置邮件的收件人
            string address = receiveEmails;
            string displayName = "";
            /*  这里这样写是因为可能发给多个联系人，每个地址用 ; 号隔开
              一般从地址簿中直接选择联系人的时候格式都会是 ：用户名1 < mail1 >; 用户名2 < mail 2>; 
              因此就有了下面一段逻辑不太好的代码
              如果永远都只需要发给一个收件人那么就简单了 mail.To.Add("收件人mail");
            */
            string[] mailNames = address.Split(';');
            foreach (string name in mailNames)
            {
                if (name != string.Empty)
                {
                    if (name.IndexOf('<') > 0)
                    {
                        displayName = name.Substring(0, name.IndexOf('<'));
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    else
                    {
                        displayName = string.Empty;
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    mail.To.Add(new MailAddress(address, displayName));
                }
            }

            //设置邮件的抄送收件人           
            string[] ccStrs = ccEmails.Split(';');
            foreach (string name in ccStrs)
            {
                if (name != string.Empty)
                {
                    if (name.IndexOf('<') > 0)
                    {
                        displayName = name.Substring(0, name.IndexOf('<'));
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    else
                    {
                        displayName = string.Empty;
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    mail.CC.Add(new MailAddress(address, displayName));
                }
            }
            //设置邮件的内容
            mail.Body = content;
            //设置邮件的格式
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            //设置邮件的发送级别
            mail.Priority = MailPriority.Normal;

            //设置邮件的附件，将在客户端选择的附件先上传到服务器保存一个，然后加入到mail中
            //string fileName = "";
            //fileName = "D:/UpFile/" + fileName.Substring(fileName.LastIndexOf("/") + 1);
            //mail.Attachments.Add(new Attachment(fileName));

            mail.DeliveryNotificationOptions = notification;

            SmtpClient client = new SmtpClient();
            //设置用于 SMTP 事务的主机的名称，填IP地址也可以了
            client.Host = "mail1-in.baidu.com";
            //设置用于 SMTP 事务的端口，默认的是 25
            client.UseDefaultCredentials = false;
            //这里才是真正的邮箱登陆名和密码，比如我的邮箱地址是 hbgx@hotmail， 我的用户名为 hbgx ，我的密码是 xgbh
            client.Credentials = new System.Net.NetworkCredential(true_name, true_pwd);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //都定义完了，正式发送了，很是简单吧！
            client.Send(mail);

        }

        /// <summary>
        /// 发送邮件（有附件）
        /// </summary>
        /// <param name="subject">标题</param>
        /// <param name="content">内容</param>
        /// <param name="showEmail">显示的发件人邮箱</param>
        /// <param name="showName">显示的发件人名称</param>
        /// <param name="receiveEmails">收件人邮箱列表（多个邮箱“英文分号”分隔）</param>
        /// <param name="ccEmails">抄送人邮箱列表（多个邮箱“英文分号”分隔）</param>
        /// <param name="notification">邮件通知类型</param>
        /// <param name="true_name">发件人账号（不用写@符号后面的）</param>
        /// <param name="true_pwd">发件人密码</param>
        public static void SendEmail_hasFile(string subject, string content, string showEmail, string showName, string receiveEmails, string ccEmails, DeliveryNotificationOptions notification, string true_name, string true_pwd, List<string> fileNames)
        {
            MailAddress from = new MailAddress(showEmail, showName); //邮件的发件人
            MailMessage mail = new MailMessage();

            //设置邮件的标题
            mail.Subject = subject;

            //设置邮件的发件人
            //Pass:如果不想显示自己的邮箱地址，这里可以填符合mail格式的任意名称，真正发mail的用户不在这里设定，这个仅仅只做显示用
            mail.From = from;

            //设置邮件的收件人
            string address = receiveEmails;
            string displayName = "";
            /*  这里这样写是因为可能发给多个联系人，每个地址用 ; 号隔开
              一般从地址簿中直接选择联系人的时候格式都会是 ：用户名1 < mail1 >; 用户名2 < mail 2>; 
              因此就有了下面一段逻辑不太好的代码
              如果永远都只需要发给一个收件人那么就简单了 mail.To.Add("收件人mail");
            */
            string[] mailNames = address.Split(';');
            foreach (string name in mailNames)
            {
                if (name != string.Empty)
                {
                    if (name.IndexOf('<') > 0)
                    {
                        displayName = name.Substring(0, name.IndexOf('<'));
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    else
                    {
                        displayName = string.Empty;
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    mail.To.Add(new MailAddress(address, displayName));
                }
            }

            //设置邮件的抄送收件人           
            string[] ccStrs = ccEmails.Split(';');
            foreach (string name in ccStrs)
            {
                if (name != string.Empty)
                {
                    if (name.IndexOf('<') > 0)
                    {
                        displayName = name.Substring(0, name.IndexOf('<'));
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    else
                    {
                        displayName = string.Empty;
                        address = name.Substring(name.IndexOf('<') + 1).Replace('>', ' ');
                    }
                    mail.CC.Add(new MailAddress(address, displayName));
                }
            }
            //设置邮件的内容
            mail.Body = content;
            //设置邮件的格式
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            //设置邮件的发送级别
            mail.Priority = MailPriority.Normal;

            //设置邮件的附件，将在客户端选择的附件先上传到服务器保存一个，然后加入到mail中
            if (fileNames != null && fileNames.Count > 0)
            {
                for (int i = 0; i < fileNames.Count; i++)
                {
                    mail.Attachments.Add(new Attachment(fileNames[i]));
                }
            }

            mail.DeliveryNotificationOptions = notification;

            SmtpClient client = new SmtpClient();
            //设置用于 SMTP 事务的主机的名称，填IP地址也可以了
            client.Host = "mail1-in.baidu.com";
            //设置用于 SMTP 事务的端口，默认的是 25
            client.UseDefaultCredentials = false;
            //这里才是真正的邮箱登陆名和密码，比如我的邮箱地址是 hbgx@hotmail， 我的用户名为 hbgx ，我的密码是 xgbh
            client.Credentials = new System.Net.NetworkCredential(true_name, true_pwd);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //都定义完了，正式发送了，很是简单吧！
            client.Send(mail);

        }

        #endregion
    }
}
