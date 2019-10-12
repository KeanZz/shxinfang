using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Attribute
{
    [AttributeUsage(AttributeTargets.Class)]
    public class DataTableAttribute : System.Attribute
    {
        public readonly string Name;
        public DataTableAttribute(string name)
        {
            Name = name;
        }
    }
}
