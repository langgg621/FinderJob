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
                var employeeId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                var result = await _fileService.PostFile(file, employeeId);
                if (result == null)
                {
                    return BadRequest("Invalid file");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            try
            {
                await _fileService.DownloadFileById(id);
                return Ok("File downloaded successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("display/{id}")]
        public async Task<IActionResult> DisplayFile(int id)
        {
            try
            {
                return await _fileService.DisplayFileById(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("delete{fileId}")]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            try
            {
                _fileService.DeleteFileByIdAsync(fileId);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                return StatusCode(500, new { Message = "Internal server error." });
            }
        }
        [Authorize(Roles = "Employee")]
        [HttpGet("get-all-by-employeeId")]
        public async Task<IActionResult> GetFileByEmployeeId()
        {
            try
            {
                ClaimsPrincipal principal = HttpContext.User;
                var employeeId = Convert.ToInt32(principal.FindFirstValue(ClaimTypes.NameIdentifier));
                var files = await _fileService.GetFilesByEmployeeIdAsync(employeeId);

                if (files.Count > 0)
                {
                    return Ok(files);
                }
                else
                {
                    return NotFound(new { Message = "No files found for the specified employee." });
                }
            }
            catch (Exception ex)
            {
                // Log the exception and return an error response
                return StatusCode(500, new { Message = "Internal server error." });
            }

        }
    }
}
