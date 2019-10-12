using System.Collections.Generic;

namespace Model.Common
{
    public class QueryM
    {
        public int PageNum { get; set; }
        public int PageSize { get; set; }
        public string OrderBy { get; set; }
        public string Where { get; set; }
        public Dictionary<string, object> Params { set; get; }  
    }
}
