using System.ComponentModel.DataAnnotations;

namespace DoanDanentang.Dtos.Profiles
{
    public class LoginModel
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get ; set; }
        public string? Password { get ; set; }
    }
}
