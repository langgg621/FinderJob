using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Profiles;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services.Interface
{
    public interface IProfileService
    {
        Task<bool> RegisterCompany(CreateProfile profile);
        Task<bool> RegisterEmployee(CreateProfile profile);
        LoginResponse Login(LoginModel login);
    }
}
