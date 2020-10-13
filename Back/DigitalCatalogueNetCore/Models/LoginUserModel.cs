using System.ComponentModel.DataAnnotations;


namespace DigitalCatalogueNetCore.Models
{
    public class LoginUserModel
    {
        [Required]
        public string Surname { get; set; }
        [Required]
        public string PassId { get; set; }
    }
}
