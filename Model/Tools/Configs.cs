using System.Configuration;

namespace Model.Tools
{
    public class Configs
    {        
        /// <summary>
        /// 根据配置文件获取数据
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string GetValue(string name)
        {
            return ConfigurationManager.AppSettings[name].ToString().Trim();
        }
    }
}
