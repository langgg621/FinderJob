using AutoMapper;
using DoanDanentang.Dtos;
using DoanDanentang.Dtos.Profiles;
using DoanDanentang.Dtos.Recruitment;
using DoanDanentang.Entities;
using Domain.Dtos;
using Domain.Dtos.Company;
using Domain.Dtos.Employee;
using Domain.Entities;

namespace DoanDanentang.Profiless
{
	public class Map : Profile
	{
		public Map()
		{
            CreateMap<CreateProfile, Company>().ReverseMap();
            CreateMap<CreateProfile, Employee>().ReverseMap();

            CreateMap<UpdateCompany, Company>().ReverseMap();
			CreateMap< UpdateEmployee, Employee >().ReverseMap();
			CreateMap<CreateRecruitment, Recruitment>().ReverseMap();
			CreateMap<UpdateRecruitment, Recruitment>().ReverseMap();
			CreateMap<CreateApplyJob, ApplyJob>().ReverseMap();
			CreateMap<FileCV, FileCvDto>().ReverseMap();
			CreateMap<Employee, EmployeeDto>().ReverseMap();
			CreateMap<Company,CompanyDto>().ReverseMap();

		}
	}
}
