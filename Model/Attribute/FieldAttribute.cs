using System;

namespace Model.Attribute
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public class FieldAttribute : System.Attribute
    {

    }
}
