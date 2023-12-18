using DoanDanentang.Dtos.Profiles;
using Domain.Dtos.Employee;
using Microsoft.AspNetCore.Http;
using static Infrastructure.Services.Implement.CompanyService;

namespace Infrastructure.Services.Interface
{
	public interface IEmployeeService
	{
		Task<EmployeeDto> Update (int EmployeeId, UpdateEmployee employee);

        Task <EmployeeDto> GetEmployee(int EmployeeId);
		void updatePassword(ResetPassword resetPassword, int Id);
		List<EmployeeDto> GetAllEmployees();
        void deleteEmployee(int EmployeeId);

    }
}
