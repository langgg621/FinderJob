using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class UserDetail 
    {
        public long Id { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public IEnumerable<Claim> Claims { get; private set; }

        public UserDetail(long id, string username, string password, IEnumerable<Claim> claims)
        {
            Id = id;
            Username = username;
            Password = password;
            Claims = claims;
        }

        public IEnumerable<Claim> GetClaims()
        {
            return Claims;
        }

    }
}
