using DoanDanentang.Dtos.Profiles;
using DoanDanentang.Entities;
using Domain.Dtos.Company;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Infrastructure.Services.Implement.CompanyService;

namespace Infrastructure.Services.Interface
{
	public interface ICompanyService
	{
		Task Update(int Id, UpdateCompany company);
        Task<CompanyDto> GetCompany(int Id);
		List<CompanyDto> GetAllCompanies();
		void UpdatePassword(ResetPassword resetPassword, int companyId);

        void deleteCompany(int Id);
	}
}
