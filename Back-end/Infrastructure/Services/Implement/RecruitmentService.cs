using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos.Recruitment;
using DoanDanentang.Entities;
using DoanDanentang.Services.Interface;
using Domain.Entities;
using Infrastructure.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace DoanDanentang.Services.Implement
{
	public class RecruitmentService : IRecruitmentService
	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
        private readonly ICompanyService _companyService;
		public RecruitmentService(ApplicationDbContext context, IMapper mapper, ICompanyService companyService)
		{
            _companyService = companyService;
			_context = context;
			_mapper = mapper;
		}
        public async Task<CreateRecruitment> CreateRecruitment(int companyId, CreateRecruitment createRecruitmentDto)
        {
            var recruitment = _mapper.Map<Recruitment>(createRecruitmentDto);
            recruitment.CompanyId = companyId;
            recruitment.NumberApply = 0;
			_context.Recruitments.Add(recruitment);
			await _context.SaveChangesAsync();
			return _mapper.Map<CreateRecruitment>(recruitment);
			
        }
        public async Task UpdateRecruitment(int id,UpdateRecruitment dto)
		{
            var recruitment = _context.Recruitments.FirstOrDefault(p=> p.Id ==id);
            if (recruitment == null)
			{
				throw new Exception("Khong tim thay Recruitment");

			}
			_mapper.Map(dto, recruitment);
			await _context.SaveChangesAsync();
		}
		public void DeleteRecruitment(int id)
		{

			Recruitment recruit = _context.Recruitments.FirstOrDefault(p => p.Id == id);
            
            _context.Recruitments.Remove(recruit);
			_context.SaveChanges();
            
			
		}
        public List<CreateRecruitment> GetAllRecruitment()
        {
            var recruits = _context.Recruitments.OrderByDescending(p => p.CreateAt).ToList();
			return _mapper.Map<List<CreateRecruitment>>(recruits);
        }

        public async Task<CreateRecruitment> GetRecruitmentById(int id)
        {
            var recr = _context.Recruitments.FirstOrDefault(x => x.Id == id);

            if (recr != null)
            {
                return _mapper.Map<CreateRecruitment>(recr);
                
            }
            else
            {
                throw new Exception("Khong tim thay Recruitment");
            }
            
        }
        public async Task<List<CreateRecruitment>> SearchRecruitmentsByTitle(string searchQuery)
        {
            // Customize the search logic based on your requirements
            var recruitments =  _context.Recruitments
                .Where(x => x.Title.Contains(searchQuery))
                .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitments);
        }       
        public async Task<List<CreateRecruitment>> SearchRecruitmentsByAddress(string searchQuery)
        {
            // Customize the search logic based on your requirements
            var recruitments =  _context.Recruitments
                .Where(x => x.Address.Contains(searchQuery))
                .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitments);
        }       
        public async Task<List<CreateRecruitment>> SearchRecruitmentsBySkill(string searchQuery)
        {
            // Customize the search logic based on your requirements
            var recruitments =  _context.Recruitments
                .Where(x => x.SkillRequire.Contains(searchQuery))
                .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitments);
        }
        public async Task<List<CreateRecruitment>> SearchRecruitmentsBySalary(int start, int end)
        {
            // Customize the search logic based on your requirements
            var recruitments = _context.Recruitments
                .Where(x => int.Parse(x.Salary) >= start && int.Parse(x.Salary) <= end)
                .OrderByDescending(x => int.Parse(x.Salary))
                .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitments);
        }

        public List<CreateRecruitment> GetRecruitmentsByCompanyId(int companyId)
        {
            var recr =  _context.Recruitments.Where(x => x.CompanyId == companyId).ToList();
			return _mapper.Map<List<CreateRecruitment>>(recr);
        }

        public List<CreateRecruitment> GetRecruitmentsHasApllyByEmp(int empId)
        {
            var recruitments = (from a in _context.ApplyJobs
							   where a.EmployeeId == empId
							   join r in _context.Recruitments on a.RecruitmentId equals r.Id
							   select r)
                               .OrderByDescending(a=> a.CreateAt)
                               .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitments);
        }
        public List<CreateRecruitment> GetRecruitmentsNotAppliedByEmp(int empId)
        {
            var appliedRecruitmentIds = _context.ApplyJobs
                .Where(a => a.EmployeeId == empId)
                .Select(a => a.RecruitmentId)
                .ToList();

            var recruitmentsNotApplied = _context.Recruitments
                .Where(r => !appliedRecruitmentIds.Contains(r.Id))
                .OrderByDescending(r => r.CreateAt)
                .ToList();

            return _mapper.Map<List<CreateRecruitment>>(recruitmentsNotApplied);
        }
    }
}
