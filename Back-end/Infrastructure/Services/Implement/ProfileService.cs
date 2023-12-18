using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Profiles;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Exchange.WebServices.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services.Implement
{
    public class ProfileService : IProfileService
    {
        public IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProfileService(IConfiguration configuration, ApplicationDbContext context, IMapper mapper)
		{
			_configuration = configuration;
			_context = context;
			_mapper = mapper;		}
        public async Task<bool> RegisterCompany(CreateProfile profile)
        {
            var emp = _context.Employees.FirstOrDefault(x => x.Email ==profile.Email);
            var com = _context.Companies.FirstOrDefault(x => x.Email ==profile.Email);
            if (emp != null || com !=null)
            {
                throw new Exception("User has exist");
            }
            else
            {   
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(profile.Password);
                var newCom = new Company();
                _mapper.Map(profile, newCom);
                newCom.Password = hashedPassword;
                _context.Companies.Add(newCom);
                await _context.SaveChangesAsync();
                return true;
            }
            
        }
        public async Task<bool> RegisterEmployee(CreateProfile profile)
        {
            var emp = _context.Employees.FirstOrDefault(x => x.Email == profile.Email);
            var com = _context.Companies.FirstOrDefault(x => x.Email == profile.Email);
            if (emp != null || com != null)
            {
                throw new Exception("User has exist");
            }
            else
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(profile.Password);
                var newEmp = new Employee();
                _mapper.Map(profile, newEmp);
                newEmp.Password = hashedPassword;
                _context.Employees.Add(newEmp);
                await _context.SaveChangesAsync();
                return true; 
            }

            
        }


        public LoginResponse Login(LoginModel login)
        {
            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            var employee = _context.Employees.SingleOrDefault(x => x.Email == login.Email);
            var company = _context.Companies.SingleOrDefault(x => x.Email == login.Email);

            if (employee == null && company == null)
            {
                throw new Exception("User not found");
            }

            if (employee != null)
            {
                // Verify the entered password against the hashed password in the database
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, employee.Password);

                if (!isPasswordValid)
                {
                    throw new Exception("Password is incorrect");
                }
                var token = GetToken(employee, "Employee");
                return new LoginResponse(employee.Id, employee.Name,  employee.Email, "Employee", token);
            }

            if (company != null)
            {
                // Verify the entered password against the hashed password in the database
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, company.Password);

                if (!isPasswordValid)
                {
                    throw new Exception("Password is incorrect");
                }
                var token = GetToken(company, "Company");

                return new LoginResponse(company.Id, company.Name, company.Email, "Company", token); ;
            }

            throw new Exception("Unexpected error");
        }

        private string GetToken<T>(T profile, string role) where T : Profiles
        {

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, profile.Id.ToString()),
                new Claim(ClaimTypes.Name, profile.Name.ToString()),
                new Claim(ClaimTypes.Email, profile.Email),
                new Claim(ClaimTypes.Role, role)
                // Thêm các thông tin khác mà bạn muốn đưa vào token
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.Now.AddDays(1), // Thời gian hiệu lực của token
                            signingCredentials: creds
            );

            // Trả về mã token JWT dưới dạng chuỗi
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
