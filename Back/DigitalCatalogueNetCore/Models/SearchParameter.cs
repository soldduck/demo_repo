using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DigitalCatalogueNetCore.Models
{
    public class SearchParameter
    {
        public SearchParameter()
        {
            condAfter = 0;
            tab = "";
            word = "";
        }

        public SearchParameter(string tab, string word, int condAfter = 0)
        {
            this.tab = tab;
            this.word = "%" + word.ToLower() + "%";
            this.condAfter = condAfter;
        }

        public string tab { get; set; }
        public string word { get; set; }
        public int condAfter { get; set; }

        public override string ToString()
        {
            string result = "{ tab = " + this.tab + "}, word = {" + this.word + "}, condAfter = {" + condAfter.ToString() + "}}";
            return result;
        }
    }
}