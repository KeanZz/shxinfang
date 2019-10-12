using IBLL;
using IDAL;
using Model.Content;
using Model.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class MenuInfoB<T> : IMenuInfoB<T> where T : class
    {
        private readonly IBaseD<T> _menu;
        public MenuInfoB(IBaseD<T> menu)
        {
            _menu = menu;
        }
        public List<MenuInfo> GetMeunList()
        {
            //不同角色各缓存一次  然后组合起来
            var operatormodel = OperatorProvider.Provider.GetCurrent();
            List<MenuInfo> menuInfos = new List<MenuInfo>();
            operatormodel.ForEach(item=> {
                var mlist = Cache.Caches.GetCache<List<MenuInfo>>("MenuList_" + item.RoleId);
                if(mlist==null)
                {
                    string sql = string.Format(@"select distinct menuinfo.id,menuinfo.[uid],menuinfo.name,menuinfo.url,menuinfo.pid,menuinfo.sort,menuinfo.isdel 
                         from menuinfo left join rolemenu on 
                         menuinfo.[uid] = rolemenu.Menuid
                         where rolemenu.fid ={0}", item.RoleId);
                    object param = new { };
                    List<MenuInfo> menuInfo = _menu.GetModelsByValue(sql, param) as List<MenuInfo>;
                    Cache.Caches.WriteCache<List<MenuInfo>>(menuInfo, "MenuList_" + item.RoleId);
                    menuInfos.AddRange(menuInfo);
                }
                else
                {
                    menuInfos.AddRange(Cache.Caches.GetCache<List<MenuInfo>>("MenuList_" + item.RoleId));
                }
            });
            menuInfos=menuInfos.Distinct(new Compare()).ToList<MenuInfo>();           
            return menuInfos;
            // var Menulist = Cache.Caches.GetCache<List<MenuInfo>>("MenuList_" + operatormodel[0].Fid);
            //if (Menulist == null)
            //{
            //    //获取当前所有角色的菜单 
            //    List<string> RoleIDs = new List<string>();
            //    operatormodel.ForEach(item =>
            //    {
            //        RoleIDs.Add("'" + item.RoleId + "'");
            //    });
            //    string sql = string.Format(@"select distinct menuinfo.id,menuinfo.[uid],menuinfo.name,menuinfo.url,menuinfo.pid,menuinfo.sort,menuinfo.isdel 
            //             from menuinfo left join rolemenu on 
            //             menuinfo.[uid] = rolemenu.Menuid
            //             where rolemenu.fid in ({0})", string.Join(",", RoleIDs.ToArray()));
            //    object param = new { };
            //    Menulist = _menu.GetModelsByValue(sql, param) as List<MenuInfo>;
            //    Cache.Caches.WriteCache<List<MenuInfo>>(Menulist, "MenuList_" + operatormodel[0].Fid);
            //}                    
            //return Menulist;
        }
        public class Compare : IEqualityComparer<MenuInfo>
        {
            public bool Equals(MenuInfo x, MenuInfo y)
            {
                return x.Uid == y.Uid;
            }
            public int GetHashCode(MenuInfo obj)
            {
                return obj.Uid.GetHashCode();
            }
        }
    }
}
