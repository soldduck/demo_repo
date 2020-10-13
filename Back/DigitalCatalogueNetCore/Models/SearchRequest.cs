using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalCatalogueNetCore.Models
{
    public class SearchRequest
    {
        public string fond { get; set; }
        public List<SearchParameter> searchParameters { get; set; }

        public SearchRequest()
        {
            this.fond = "";
            this.searchParameters = new List<SearchParameter>(4);
        }

        public void Normalize()
        {
            var comp = new SearchParametersCompare();
            this.searchParameters.Sort(comp);
        }

        public override string ToString()
        {
            string result = fond;
            foreach (SearchParameter param in searchParameters)
            {
                result += param.ToString();
            }
            return result;
        }
    }

    public class SearchParametersCompare : IComparer<SearchParameter>
    {
        public int Compare(SearchParameter p1, SearchParameter p2)
        {
            if (p1.condAfter < p2.condAfter)
                return 1;
            else if (p1.condAfter > p2.condAfter)
                return -1;
            else if ((p1.condAfter == 0) & (p2.condAfter == 0))
                if (p1.word.Length <= p2.word.Length)
                    return 1;
                else
                    return -1;
            return 0;
        }
    }
}