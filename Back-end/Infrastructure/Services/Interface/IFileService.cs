using Domain.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Infrastructure.Services.Interface
{
    public interface IFileService
    {
        Task<FileCvDto> PostFile(IFormFile file, int EmployeeId);
        Task DownloadFileById(int Id);
        Task<IActionResult> DisplayFileById(int Id);
        List<FileCvDto> GetAllFileCvs();
        Task<List<FileCvDto>> GetFilesByEmployeeIdAsync(int employeeId);
        void DeleteFileByIdAsync(int fileId);
    }
}
