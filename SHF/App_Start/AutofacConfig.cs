using System;
using Autofac;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using Autofac.Integration.Mvc;
using System.Web.Mvc;
using BLL;
using DAL;

namespace SHF.App_Start
{
    public class AutofacConfig
    {
        public static void Initialize()
        {
            var builder = new ContainerBuilder();
            builder.RegisterGeneric(typeof(BaseB<>));
            builder.RegisterGeneric(typeof(BaseD<>));
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).AsImplementedInterfaces();
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}