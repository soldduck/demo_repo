using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalCatalogueNetCore.Models
{
    public class BookInfo
    {
        public string Author { get; set; }
        public string Biblio { get; set; }
        public string BookPointDB { get; set; }
        public string DateReturn { get; set; }
        public string DateTake { get; set; }
        public string StatusOrder { get; set; }
    }
}