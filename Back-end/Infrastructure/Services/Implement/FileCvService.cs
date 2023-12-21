using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using Domain.Dtos;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

public class FileCvService : IFileService
{
    private readonly ApplicationDbContext _context;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;
    private readonly IHostingEnvironment _hostingEnvironment;
    private static readonly List<string> AcceptedContentTypes = new List<string>
    {
        "application/pdf"
    };
    public FileCvService(ApplicationDbContext context, IMapper mapper, IHostingEnvironment hostingEnvironment)
    {
        _context = context;
        _mapper = mapper;
        _hostingEnvironment = hostingEnvironment;
    }

    public async Task<FileCvDto> PostFile(IFormFile file, int employeeId)
    {
        
        string folderPath = Path.Combine(_hostingEnvironment.WebRootPath, "FileCV");

        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }

        string filePath = Path.Combine(folderPath, $"{employeeId}");

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyToAsync(stream);
        }

        var existingFile = _context.FileCVs.FirstOrDefault(f => f.EmployeeId == employeeId);

        if (existingFile == null)
        {
            existingFile = new FileCV
            {
                EmployeeId = employeeId,
                FilePath = filePath
            };

            _context.FileCVs.Add(existingFile);
        }
        else
        {
            existingFile.FilePath = filePath;
        }

        _context.SaveChanges();
        return _mapper.Map<FileCvDto>(file);
    }

    public async Task<FileCvDto> GetCv(int empId)
    {
        var file = _context.FileCVs.FirstOrDefault(x => x.EmployeeId == empId);

        if (file != null)
        {
            return _mapper.Map<FileCvDto>(file);

        }
        else
        {
            throw new Exception("Khong tim thay Recruitment");
        }
    }
}
