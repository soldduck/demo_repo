using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalCatalogueNetCore.Models
{
    public class BookInfoReg
    {
        public string BookpointId { get; set; }
        public string Bookpoint { get; set; }
        public string SiglaId { get; set; }
        public string Sigla { get; set; }
        public string IssuedCount { get; set; }
        public string OrderedCount { get; set; }
        public string TotalCount { get; set; }
        public string BookpointStatus { get; set; }
        public string AccLevel { get; set; }
        public string NewDocId { get; set; }
        public string Operation { get; set; }
        public BookInfoReg(Dictionary<string, string> dataDict)
        {
            BookpointId = dataDict["bookpoint_id"];
            Bookpoint = dataDict["bookpoint"];
            SiglaId = dataDict["sigla_id"];
            Sigla = dataDict["sigla"];
            IssuedCount = dataDict["issued_count"];
            OrderedCount = dataDict["ordered_count"];
            TotalCount = dataDict["total_count"];
            BookpointStatus = dataDict["bookpoint_status"];
            AccLevel = dataDict["acc_level"];
            NewDocId = dataDict["new_doc_id"];
            Operation = dataDict["operation"];
        }

        public BookInfoReg()
        {
        }
    }
}