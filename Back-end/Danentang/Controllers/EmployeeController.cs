using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Employee;
using Infrastructure.Services.Implement;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DoanDanentang.Controllers
{
	[ApiController]
	[Route("api/v1/[controller]")]
	public class EmployeeController : ControllerBase
	{
		public IConfiguration _configuration;
		private readonly IEmployeeService _employeeService;
		public EmployeeController(IConfiguration configuration, IEmployeeService employeeService)
		{
			_configuration = configuration;
			_employeeService = employeeService;
		}

        [Authorize(Roles = "Employee")]

        [HttpPut("update")]
		public async Task<IActionResult> UpdateInforEmployee(int id, UpdateEmployee emp)
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                _employeeService.Update(userId, emp);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getall")]
		public async Task<IActionResult> GetAll()
		{
			try
			{
				
				return Ok(_employeeService.GetAllEmployees());
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
        [Authorize(Roles = "Employee")]
        [HttpGet("employee")]
        public IActionResult GetInforEmployee()
        {
            ClaimsPrincipal principal = HttpContext.User;
            var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
            var emp = _employeeService.GetEmployee(userId);
            return Ok(emp);

        }
        [Authorize(Roles = "Employee")]

        [HttpPut("reset-password")]
        public IActionResult ResetPassword(ResetPassword resetPassword)
        {
            try
            {
                ClaimsPrincipal principal = HttpContext.User;
                var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                _employeeService.updatePassword(resetPassword, userId);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Employee")]

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                _employeeService.deleteEmployee(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }


    }
}
