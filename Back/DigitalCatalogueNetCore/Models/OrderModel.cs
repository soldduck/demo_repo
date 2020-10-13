using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalCatalogueNetCore.Models
{
    public class OrderModel
    {
        public string UserId { get; set; }
        public string DocId { get; set; }
        public string BookpointId { get; set; }

        public OrderModel(string userId = "", string docId = "", string bookpointId = "")
        {
            UserId = userId;
            DocId = docId;
            BookpointId = bookpointId;
        }
    }

}