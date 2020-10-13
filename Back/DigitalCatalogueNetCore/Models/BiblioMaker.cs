using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;

namespace DigitalCatalogueNetCore
{
    /*
        Форматируем описание, полученное из getWebTerm по шаблону из BiblioSettings
    */
    class BiblioMaker
    {
        private const string FILE_NAME = "BiblioSettings.xml";

        private Dictionary<string, string[]> biblio;
        private Dictionary<string, CField> fields;
        private Dictionary<string, List<string>> doc;
        private string fond;

        public BiblioMaker(string fond)
        {
            setFond(fond);
        }

        public BiblioMaker(string fond, string item)
        {
            setItem(item);
            setFond(fond);
        }

        public void setFond(string fond)
        {
            this.fond = fond;
            loadBiblioSettings();
        }

        public void setItem(string item)
        {
            this.doc = parseItem(item);
        }

        public bool hasElVersion()
        {
            return doc.ContainsKey("911a") && doc["911a"].First().Contains("+Электронная версия");
        }

        public string getShortBiblio()
        {
            return makeBiblio((getAuthorsCount() > 3) ? "ShortByTitle" : "ShortByAuthor");
        }
        public string getFullBiblio()
        {
            return makeBiblio((getAuthorsCount() > 3) ? "FullByTitle" : "FullByAuthor");
        }

        private int getAuthorsCount()
        {
            return (doc.ContainsKey("100a") ? 1 : 0) + (doc.ContainsKey("700a") ? doc["700a"].Count : 0);
        }
        private string makeBiblio(string Type)
        {
            StringBuilder biblioSb = new StringBuilder();

            string[] keys = biblio[Type];

            foreach (string key in keys)
            {
                if (hasField(doc, key))
                    foreach (string item in doc[key])
                        biblioSb.Append(fields[key].Pattern.Replace("$V", item));
            }
            return biblioSb.ToString();
        }

        private void loadBiblioSettings()
        {
            var doc = new XmlDocument();
            doc.Load(FILE_NAME);
            var DBs = new Dictionary<string, object>();
            foreach (XmlNode node in doc.SelectNodes("Fonds/Fond"))
            {
                var fond = node.Attributes["login"].Value;
                if (fond != this.fond) continue;

                this.fields = loadFields(node);
                this.biblio = loadBiblio(node);
            }
        }
        private Dictionary<string, CField> loadFields(XmlNode DBNode)
        {
            var fields = new Dictionary<string, CField>();
            XmlNode node = DBNode["Fields"];
            foreach (XmlNode item in node.ChildNodes)
            {
                fields.Add(item.Attributes["id"].Value, new CField
                {
                    Name = item.Attributes["name"].Value,
                    Pattern = item.Attributes["pattern"].Value,
                    Searchable = (item.Attributes["search"].Value == "1")
                });
            }
            return fields;
        }
        private Dictionary<string, string[]> loadBiblio(XmlNode DBNode)
        {
            Dictionary<string, string[]> res = new Dictionary<string, string[]>();
            XmlNode node = DBNode.SelectSingleNode("BookByTitle/ShortBiblio");
            if (node != null)
                res.Add("ShortByTitle", node.Attributes["FieldsOrder"].Value.Split(' '));

            node = DBNode.SelectSingleNode("BookByTitle/FullBiblio");
            if (node != null)
                res.Add("FullByTitle", node.Attributes["FieldsOrder"].Value.Split(' '));

            node = DBNode.SelectSingleNode("BookByAuthor/ShortBiblio");
            if (node != null)
                res.Add("ShortByAuthor", node.Attributes["FieldsOrder"].Value.Split(' '));

            node = DBNode.SelectSingleNode("BookByAuthor/ShortBiblio");
            if (node != null)
                res.Add("FullByAuthor", node.Attributes["FieldsOrder"].Value.Split(' '));

            return res;
        }

        private bool hasField(Dictionary<string, List<string>> doc, string id)
        {
            return doc.ContainsKey(id);
        }

        private Dictionary<string, List<string>> parseItem(string item)
        {
            var res = new Dictionary<string, List<string>>();
            string[] fields = Regex.Split(item, Convert.ToString(char.ConvertFromUtf32(30)));
            foreach (var field in fields)
            {
                string[] subfields = Regex.Split(field, Convert.ToString(char.ConvertFromUtf32(31)));

                for (int i = 1; i < subfields.Length; i++)
                {
                    string fieldname = subfields[0].Substring(0, 3) + subfields[i][0];
                    if (!res.ContainsKey(fieldname))
                        res.Add(fieldname, new List<string>());

                    res[fieldname].Add(subfields[i].Substring(1));
                }
            }
            return res;
        }
    }

    class CField
    {
        public string Name { get; set; }
        public string Pattern { get; set; }
        public bool Searchable { get; set; }
    }
}

