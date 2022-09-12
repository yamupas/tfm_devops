using System;
using System.Collections.Generic;
using System.Text;

namespace DataManagement.Common.Caching
{
    public class CacheRequest
    {
        public string key { get; set; }
        public string Type { get; set; }
        public string value { get; set; }
    }
}
