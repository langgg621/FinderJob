using System.ComponentModel.DataAnnotations;

namespace DoanDanentang.Dtos.Profiles
{
    public class ResetPassword
    {
        public string PrePassword { get; set; }
        public string Password { get; set; }
    }
}
