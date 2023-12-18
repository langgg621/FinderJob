using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Company;
using Infrastructure.Services.Implement;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Exchange.WebServices.Data;
using System.Security.Claims;

namespace DoanDanentang.Controllers
{
	[ApiController]
	[Route("api/v1/[controller]")]
	public class CompanyController : ControllerBase
	{
		private readonly ICompanyService _companyService;
		public CompanyController(ICompanyService companyService)
		{
			_companyService = companyService;
		}
        [Authorize(Roles = "Company")]

        [HttpPut("update")]
		public async Task<IActionResult> Update(UpdateCompany company)
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var comId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                _companyService.Update(comId, company);
				return Ok();
			}
			catch (Exception ex) 
			{
				return BadRequest(ex.Message);
			}
		}
        [Authorize(Roles = "Company")]
        [HttpGet("company")]
        public IActionResult GetInforCompany()
        {
            ClaimsPrincipal principal = HttpContext.User;
            var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
            var com = _companyService.GetCompany(userId);
            return Ok(com);

        }
		[HttpGet("get/{id}")]
		public IActionResult GetCompany(int id)
		{
            var com = _companyService.GetCompany(id);
            return Ok(com);
        }
        [HttpGet("getall")]
		public async Task<IActionResult> GetAllCompanies()
		{
			try
			{
				
				return Ok(_companyService.GetAllCompanies());
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
        [Authorize(Roles = "Company")]
        [HttpPut("reset-password")]
		public IActionResult ResetPassword(ResetPassword resetPassword)
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var comId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                _companyService.UpdatePassword(resetPassword, comId);
				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}
		[Authorize(Roles ="Company")]
		[HttpDelete("delete")]
		public IActionResult Delete(int id)
		{
			try
			{
				_companyService.deleteCompany(id);
				return Ok();
			}
			catch
			{
				return BadRequest();
			}
		}

	}
}
