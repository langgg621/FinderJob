using Domain.Dtos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services.Interface
{
    public interface IFileService
    {
        Task<FileCvDto> PostFile(IFormFile file, int EmployeeId);
        Task<FileCvDto> GetCv(int empId);
    }
}
