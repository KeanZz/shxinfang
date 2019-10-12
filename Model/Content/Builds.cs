using Model.Attribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Content
{
    [DataTable("Builds")]
    public class Builds
    {
        public int rank { set; get; }
        [Identity][Field] public int ID { set; get; }
        [Field] public string PID { set; get; }
        /// <summary>
        /// 楼盘名称
        /// </summary>
        [Field] public string Name { set; get; }
        /// <summary>
        /// 地址
        /// </summary>
        [Field] public string Address { set; get; }
        /// <summary>
        /// 平均价格
        /// </summary>
        [Field] public decimal AveragePrice { set; get; }
        /// <summary>
        /// 商业
        /// </summary>
        [Field] public string Business { set; get; }
        /// <summary>
        /// 学校
        /// </summary>
        [Field] public string School { set; get; }
        /// <summary>
        /// 医疗
        /// </summary>
        [Field] public string Hospital { set; get; }
        /// <summary>
        /// 休闲娱乐
        /// </summary>
        [Field] public string Enjoy { set; get; }
        /// <summary>
        /// 交房时间
        /// </summary>
        [Field] public string DeadLine { set; get; }
        /// <summary>
        /// 总面积
        /// </summary>
        [Field] public decimal Areas { set; get; }
        /// <summary>
        /// 绿化率
        /// </summary>
        [Field] public decimal Green { set; get; }
        /// <summary>
        /// 房屋年限
        /// </summary>
        [Field] public int Years { set; get; }
        /// <summary>
        /// 物业
        /// </summary>
        [Field] public string Property { set; get; }
        /// <summary>
        /// 开发商
        /// </summary>
        [Field]
        public string Developers { set; get; }
       
        /// <summary>
        /// 添加时间
        /// </summary>
        [Field] public DateTime Time { set; get; }
        /// <summary>
        /// 添加人
        /// </summary>
        [Field] public string Person { set; get; }
        /// <summary>
        /// 默认为0 
        /// </summary>
        [Field]
        public int IsDel { set; get; }

        /// <summary>
        /// 预售许可证
        /// </summary>
        [Field]
        public string Certificate { set; get; }
    }
}
