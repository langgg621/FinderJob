using AutoMapper;
using DoanDanentang.Domain.DbContexts;
using DoanDanentang.Dtos;
using DoanDanentang.Entities;
using DoanDanentang.Services.Interface;

namespace DoanDanentang.Services.Implement
{
	public class ApplyService : IApplyService
	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		
		public ApplyService(ApplicationDbContext context, IMapper mapper)
		{
			_mapper = mapper;
			_context = context;
		}
        public async Task<CreateApplyJob> Apply(int Employee, int job)
        {
            if (job != null)
            {
                // Check if the employee has already applied for the job
                bool hasAlreadyApplied = _context.ApplyJobs
                    .Any(a => a.RecruitmentId == job && a.EmployeeId == Employee);

                if (!hasAlreadyApplied)
                {
                    var apply = new ApplyJob();
                    apply.EmployeeId = Employee;
                    apply.RecruitmentId = job;
                    _context.ApplyJobs.Add(apply);
                    _context.SaveChanges();
                    UpdateNumberApply(apply.RecruitmentId);
                    return _mapper.Map<CreateApplyJob> (apply);
                }
                else
                {
                    throw new Exception("Employee has already applied for this job.");
                }
            }
            else
            {
                throw new Exception("Could not apply: RecruitmentId is null.");
            }
        }

        public void CancelApply(int id)
		{
			ApplyJob apply = _context.ApplyJobs.FirstOrDefault(x => x.RecruitmentId == id);
			_context.ApplyJobs.Remove(apply);
			_context.SaveChanges();
			UpdateNumberApply(apply.RecruitmentId);
			
		}
        public List<CreateApplyJob> GetApplyJobs()
        {
            var applyJobs = _context.ApplyJobs.ToList();
            return _mapper.Map<List<CreateApplyJob>>(applyJobs);
        }

        public List<CreateApplyJob> GetApplyJobByRecruitmentId(int recruitmentId)
        {
            var applyJobs = _context.ApplyJobs
                .Where(r => r.RecruitmentId == recruitmentId)
                .ToList();
            return _mapper.Map<List<CreateApplyJob>>(applyJobs);
        }

        public List<CreateApplyJob> GetApplyJobByEmployeeId(int employeeId)
        {
            var applyJobs = _context.ApplyJobs
                .Where(r => r.EmployeeId == employeeId)
                .ToList();
			
            return _mapper.Map<List<CreateApplyJob>>(applyJobs);
        }


        public void UpdateNumberApply(int recruitmentId)
		{
			var recruitment = _context.Recruitments.FirstOrDefault(x => x.Id == recruitmentId);

			if (recruitment == null)
			{
				throw new Exception("Khong tim thay ten cong ty");
			}

			recruitment.NumberApply = GetNumberApply(recruitmentId);
			_context.SaveChanges();
		}

		private int GetNumberApply(int id)
		{
			var count = (from a in _context.ApplyJobs
						 where a.RecruitmentId == id
						 select a).Count();
			return count;

		}
	}
}
