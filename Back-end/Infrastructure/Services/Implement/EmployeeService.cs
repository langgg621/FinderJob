using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Employee;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static Infrastructure.Services.Implement.CompanyService;

namespace Infrastructure.Services.Implement
{
    public class EmployeeService : IEmployeeService
    {
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		private readonly IConfiguration _configuration;
		public EmployeeService(ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
		{
			_context = context;
			_mapper = mapper;
			_configuration = configuration;
		}
		
		public async Task<EmployeeDto> Update(int EmployeeId, UpdateEmployee employee)
		{
			
			var emp = _context.Employees.FirstOrDefault(c => c.Id == EmployeeId);
			if(emp == null)
			{
				throw new Exception("Khong tim thay emp");
			}
			_mapper.Map(employee, emp);
            _context.SaveChanges();
			return _mapper.Map<EmployeeDto>(emp);
		}
        public async Task<EmployeeDto> GetEmployee(int EmployeeId)
        {
            var emp = _context.Employees
                .FirstOrDefault(x => x.Id == EmployeeId);

            if (emp == null)
            {
                throw new Exception("Khong tim thay Employee");
            }

            return _mapper.Map<EmployeeDto>(emp);
        }
		
        public List<EmployeeDto> GetAllEmployees()
        {
            var employees = _context.Employees.ToList();
            return _mapper.Map<List<EmployeeDto>>(employees);
        }
        public void updatePassword(ResetPassword resetPassword, int Id)
        {
            Employee emp = _context.Employees.FirstOrDefault(c => c.Id == Id);
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(resetPassword.PrePassword, emp.Password);
            if (emp != null && isPasswordValid == true)
            {
                emp.Password = BCrypt.Net.BCrypt.HashPassword(resetPassword.Password);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("PrePassword is not correct");
            }
            
        }
        public void deleteEmployee(int EmployeeId)
		{
			Employee emp = _context.Employees.FirstOrDefault(x => x.Id == EmployeeId);
			_context.Employees.Remove(emp);
			_context.SaveChanges();
		}
        

    }
}
