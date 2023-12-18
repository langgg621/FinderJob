using DoanDanentang.Dtos;
using DoanDanentang.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DoanDanentang.Controllers
{
	
	[ApiController]
	[Microsoft.AspNetCore.Mvc.Route("api/v1/[controller]")]
	[Authorize(Roles ="Employee")]
	public class ApplyJobController : ControllerBase
	{
		private readonly IApplyService _applyService;
		public ApplyJobController(IApplyService applyService)
		{
			_applyService = applyService;
		}
		[Authorize(Roles ="Employee")]
		[HttpPost("apply")]
		public async Task<IActionResult> Apply(CreateApplyJob applyJob)
		{
            ClaimsPrincipal principal = HttpContext.User;
            var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
            await _applyService.Apply(userId,applyJob);
			return Ok("Bạn đã apply job thành công");
		}
        [HttpDelete("cancelApply")]
		public IActionResult CancelApply(int id)
		{
			try
			{
				_applyService.CancelApply(id);
				return Ok();
			}catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			
		}
        
        [HttpGet("get-all")]
		public IActionResult GetApplyJob()
		{
			try
			{

				return Ok(_applyService.GetApplyJobs());
			}
			catch(Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
