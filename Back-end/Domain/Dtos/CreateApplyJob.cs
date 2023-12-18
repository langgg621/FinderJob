using Domain.Dtos.Employee;

namespace DoanDanentang.Dtos
{
	public class CreateApplyJob
	{

        public int RecruitmentId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;

    }
}
