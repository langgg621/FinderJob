using DoanDanentang.Dtos.Recruitment;
using DoanDanentang.Entities;

namespace DoanDanentang.Services.Interface
{
	public interface IRecruitmentService
	{
		List<CreateRecruitment> GetAllRecruitment();
		List<CreateRecruitment> GetRecruitmentsByCompanyId(int companyId);

		Task<CreateRecruitment> GetRecruitmentById(int id);

		List<CreateRecruitment> GetRecruitmentsHasApllyByEmp(int empId);
        Task<CreateRecruitment> CreateRecruitment(int companyId,CreateRecruitment createRecruitmentDto);

        Task UpdateRecruitment(int id, UpdateRecruitment dto);
		void DeleteRecruitment(int id);


        List<CreateRecruitment> GetRecruitmentsNotAppliedByEmp(int empId);
		Task<List<CreateRecruitment>> SearchRecruitmentsBySalary(int start, int end);
		Task<List<CreateRecruitment>> SearchRecruitmentsBySkill(string searchQuery);
		Task<List<CreateRecruitment>> SearchRecruitmentsByAddress(string searchQuery);
		Task<List<CreateRecruitment>> SearchRecruitmentsByTitle(string searchQuery);
    }
}
