using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Profiles
{
    public class LoginResponse
    {


        public int UserId {  get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public LoginResponse(int userId, string userName, string email, string role, string token)
        {
            UserId = userId;
            UserName = userName;
            Email = email;
            Role = role;
            Token = token;
        }
    }
}
