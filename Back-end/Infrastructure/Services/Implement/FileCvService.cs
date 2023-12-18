using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using Domain.Dtos;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services.Implement
{
    public class FileCvService : IFileService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public FileCvService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FileCvDto> PostFile(IFormFile file, int EmployeeId)
        {
            var existingFile = await _context.FileCVs.FirstOrDefaultAsync(f => f.EmployeeId == EmployeeId);
            if (existingFile == null)
            {
                
                if (file == null || file.Length == 0)
                {
                    return null;
                }

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);

                    if (memoryStream == null || memoryStream.Length == 0)
                    {
                        // Xử lý khi memoryStream là null hoặc không có dữ liệu
                        return null;
                    }

                    var filecv = new FileCV
                    {
                        EmployeeId = EmployeeId,
                        FileName = file.FileName,
                        Data = memoryStream.ToArray()
                    };

                    _context.Add(filecv);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<FileCvDto>(filecv);
                }
            }
            else
            {
                _context.FileCVs.Remove(existingFile);
                if (file == null || file.Length == 0)
                {
                    return null;
                }

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);

                    if (memoryStream == null || memoryStream.Length == 0)
                    {
                        // Xử lý khi memoryStream là null hoặc không có dữ liệu
                        return null;
                    }

                    var filecv = new FileCV
                    {
                        EmployeeId = EmployeeId,
                        FileName = file.FileName,
                        Data = memoryStream.ToArray()
                    };

                    _context.Add(filecv);
                    await _context.SaveChangesAsync();
                    return _mapper.Map<FileCvDto>(filecv);
                }

            }
            
        }
        public List<FileCvDto> GetAllFileCvs()
        {
            var fileCvs = _context.FileCVs.ToList();
            return _mapper.Map<List<FileCvDto>>(fileCvs);
        }


        public async Task DownloadFileById(int Id)
        {
            try
            {
                var file = _context.FileCVs.Where(x => x.Id == Id).FirstOrDefaultAsync();
                if(file != null)
                {
                    var content = new System.IO.MemoryStream(file.Result.Data);

                    string filePath = GetUniqueFilePath(file.Result.FileName);

                    // Save the file to the specified path
                    await CopyStream(content, filePath);
                }
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string GetUniqueFilePath(string fileName)
        {
            string timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
            string uniqueFileName = $"{timestamp}_{fileName}";

            string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "FileCV");
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            string filePath = Path.Combine(directoryPath, uniqueFileName);

            return filePath;
        }

        private async Task CopyStream(Stream source, string destinationPath)
        {
            using (var destination = System.IO.File.Create(destinationPath))
            {
                await source.CopyToAsync(destination);
            }
        }
        public async Task<IActionResult> DisplayFileById(int Id)
        {
            try
            {
                var file = await _context.FileCVs
                    .Where(x => x.Id == Id)
                    .FirstOrDefaultAsync();

                if (file == null)
                {
                    throw new Exception("Not found");
                }

                var content = new System.IO.MemoryStream(file.Data);

                // Trả về file dưới dạng FileStreamResult
                return new FileStreamResult(content, "application/pdf");
            }
            catch (Exception)
            {
                throw; // Ném lại exception nếu có lỗi
            }
        }
        public async Task<List<FileCvDto>> GetFilesByEmployeeIdAsync(int employeeId)
        {
            var files = await _context.FileCVs
                .Where(f => f.EmployeeId == employeeId)
                .ToListAsync();

            return _mapper.Map<List<FileCvDto>>(files);
        }
        public void DeleteFileByIdAsync(int fileId)
        {
            var file = _context.FileCVs.FirstOrDefault(p=>p.Id == fileId);
            if (file != null)
            {
                _context.FileCVs.Remove(file);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception();
            }
        }
    }
}
