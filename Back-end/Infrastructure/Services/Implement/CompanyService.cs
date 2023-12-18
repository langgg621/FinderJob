using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos.Profiles;
using DoanDanentang.Entities;
using Domain.Dtos.Company;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services.Implement
{
	public class CompanyService : ICompanyService
	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		public CompanyService(ApplicationDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}
		
		

		
        public async Task<CompanyDto> GetCompany(int Id)
		{
			try
			{
				var com = _context.Companies.FirstOrDefault(x => x.Id == Id);
				if (com != null)
				{
					return _mapper.Map<CompanyDto>(com);
				}
				throw new Exception($"Could not find {Id} company");

			}
            catch (Exception ex)
			{
				throw new Exception(ex.Message, ex);
			}
        }

        public List<CompanyDto> GetAllCompanies()
        {
            var companies = _context.Companies.ToList();
            return _mapper.Map<List<CompanyDto>>(companies);
        }
		public async Task Update(int Id, UpdateCompany company)
		{
			Company existingCompany =  _context.Companies.FirstOrDefault(c => c.Id == Id);
			if (existingCompany != null)
			{
				_mapper.Map(company, existingCompany);
				_context.SaveChanges();
			}
            else
            {
                throw new Exception("Dữ liệu không phù hợp");
            }
        }
        public void UpdatePassword(ResetPassword resetPassword, int Id)
		{
			Company com = _context.Companies.FirstOrDefault(c => c.Id == Id);
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(resetPassword.PrePassword, com.Password);
            if (com != null && isPasswordValid ==true)
			{
				com.Password = BCrypt.Net.BCrypt.HashPassword(resetPassword.Password);
				_context.SaveChanges();				
			}
			else
			{
				throw new Exception("PrePassword is not correct");
			}
			
		}
		public void deleteCompany(int Id)
		{
			Company com = _context.Companies.FirstOrDefault(c=>c.Id ==Id);
			_context.Companies.Remove(com);
			_context.SaveChanges();
		}

    }
}
