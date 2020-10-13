using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalCatalogueNetCore.Models
{
    public class BiblioUser
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserPatronymic { get; set; }
        public string UserStatus { get; set; }
        public string UserError { get; set; }
        public string Token { get; set; }
    }
}
