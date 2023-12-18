using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
using SHA256Managed = System.Security.Cryptography.SHA256Managed;

namespace DoanDanentang.Dtos.Profiles
{
    public class CreateProfile
    {
        private string _Name;
        [Required]
        public string Name { get => _Name; set =>_Name = value.Trim(); }
        [DataType(DataType.EmailAddress)]
        public string Email { get ; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; }


    }
}
