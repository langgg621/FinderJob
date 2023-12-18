using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos.Profiles;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.SecurityTokenService;

namespace DoanDanentang.Controllers
{
    [ApiController]
	[Route("api/v1/[controller]")]
	public class ProfileController : ControllerBase
	{
		public IProfileService _profileService;
        public IEmployeeService _employeeService;
        public ICompanyService _companyService;
		private readonly ApplicationDbContext _context;
		
		public ProfileController(ApplicationDbContext context, IProfileService profileService, ICompanyService companyService, IEmployeeService employeeService )
		{
			_context = context;
			_profileService = profileService;
            _employeeService = employeeService;
            _companyService = companyService;
		}
        [HttpPost("register-company")]
        public async Task<IActionResult> Register(CreateProfile profile)
        {
            try
            {
                await _profileService.RegisterCompany(profile);
                return Ok("Create sucessfull");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("register-employee")]
        public async Task<IActionResult> RegisterEmployee(CreateProfile profile)
        {
            try
            {
                await _profileService.RegisterEmployee(profile);
                return Ok("Create sucessfull");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public IActionResult Login(LoginModel user)
        {
            try
            {
                return Ok(_profileService.Login(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
