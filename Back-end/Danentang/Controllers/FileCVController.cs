using Infrastructure.Services.Implement;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DoanDanentang.Controllers
{   
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FileCVController : ControllerBase 
    {
        private readonly IFileService _fileService;
        public FileCVController(IFileService fileService)
        {
            _fileService = fileService;
        }
        [Authorize(Roles = "Employee")]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            try
            {
                ClaimsPrincipal principal = HttpContext.User;
                var empId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                var fileDto = await _fileService.PostFile(file, empId);

                return Ok(fileDto); // You may customize the response based on your needs
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize]
        [HttpPost("getcv")]
        public async Task<IActionResult> GetCv()
        {
            try
            {
                ClaimsPrincipal principal = HttpContext.User;
                var empId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                var file = await _fileService.GetCv(empId);
                return Ok(file);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
