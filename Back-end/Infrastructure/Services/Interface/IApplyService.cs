using DoanDanentang.Dtos;
using DoanDanentang.Entities;

namespace DoanDanentang.Services.Interface
{
	public interface IApplyService
	{
		Task Apply(int Employee, CreateApplyJob job);
		void CancelApply (int id);
		List<CreateApplyJob> GetApplyJobs();

    }
}
