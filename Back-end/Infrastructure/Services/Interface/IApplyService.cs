using DoanDanentang.Dtos;
using DoanDanentang.Entities;

namespace DoanDanentang.Services.Interface
{
	public interface IApplyService
	{
		Task<CreateApplyJob> Apply(int Employee, int job);
		void CancelApply (int id);
		List<CreateApplyJob> GetApplyJobs();

    }
}
