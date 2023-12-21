using DoanDanentang.Dtos.Recruitment;
using DoanDanentang.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DoanDanentang.Controllers
{
	[ApiController]
	[Route("api/v1/[controller]")]
	public class RecruitmentController : ControllerBase
	{
		private readonly IRecruitmentService _recruitmentService;
		public RecruitmentController(IRecruitmentService recruitmentService)
		{
			_recruitmentService = recruitmentService;
		}
        [Authorize(Roles = "Company")]

        [HttpPost("create")]
		public async Task<IActionResult> Create([FromBody] CreateRecruitment createRecruitmentDto)
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                await _recruitmentService.CreateRecruitment(userId,createRecruitmentDto);
				return Ok("Create successful");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpPut("update/{id}")]
		public async Task< IActionResult> Update(int id,UpdateRecruitment update)
		{
			try
			{
				await _recruitmentService.UpdateRecruitment(id, update);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
        [HttpDelete("delete/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
            
                _recruitmentService.DeleteRecruitment(id);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
		[HttpGet("get-all")]
		public async Task<IActionResult> GetAll()
		{
			try
			{
				return Ok(_recruitmentService.GetAllRecruitment());
			}
			catch
			{
				return BadRequest();
			}
		}
		
		[HttpGet("get")]
		public async Task<IActionResult> GetById(int id)
		{
			try
			{
				var result = _recruitmentService.GetRecruitmentById(id);

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
        [Authorize(Roles = "Company")]
        [HttpGet("getbycompany")]
        public async Task<IActionResult> GetRecruitmentByCompany()
        {
            try
            {
                ClaimsPrincipal principal = HttpContext.User;
                var userId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                return Ok(_recruitmentService.GetRecruitmentsByCompanyId(userId));
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Employee")]

        [HttpGet("recruitment-has-been-applied-by-employee")]
		public async Task<IActionResult> GetRecruiHasbeenApply ()
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var empId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                return Ok(_recruitmentService.GetRecruitmentsHasApllyByEmp(empId));
			}
			catch { return BadRequest(); }
		}
        [Authorize(Roles = "Employee")]
        [HttpGet("recruitment-not-applied-by-employee")]
		public async Task<IActionResult> GetRecruiHasNotbeenApply()
		{
			try
			{
                ClaimsPrincipal principal = HttpContext.User;
                var empId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                return Ok( _recruitmentService.GetRecruitmentsNotAppliedByEmp(empId));
			}
			catch { return BadRequest(); }
		}
        [HttpGet("search/salary/{start}/{end}")]
        public async Task<IActionResult> SearchRecruitmentsBySalary(int start, int end)
        {
            try
            {
                var result = await _recruitmentService.SearchRecruitmentsBySalary(start, end);
                return Ok(result);
            }
            catch { return BadRequest(); }
        }

        [HttpGet("search/skill/{skill}")]
        public async Task<IActionResult> SearchRecruitmentsBySkill(string skill)
        {
            try
            {
                var result = await _recruitmentService.SearchRecruitmentsBySkill(skill);
                return Ok(result);
            }
            catch { return BadRequest(); }
        }

        [HttpGet("search/address/{address}")]
        public async Task<IActionResult> SearchRecruitmentsByAddress(string address)
        {
            try
            {
                var result = await _recruitmentService.SearchRecruitmentsByAddress(address);
                return Ok(result);
            }
            catch { return BadRequest(); }
        }

        [HttpGet("search/title/{title}")]
        public async Task<IActionResult> SearchRecruitmentsByTitle(string title)
        {
            try
            {
                var result = await _recruitmentService.SearchRecruitmentsByTitle(title);
                return Ok(result);
            }
            catch { return BadRequest(); }
        }
    }
}
