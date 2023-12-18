using System.ComponentModel.DataAnnotations;

namespace DoanDanentang.Dtos.Recruitment
{
	public class UpdateRecruitment
	{
        public int Id { get; set; }
		[Required]
        public string Title { get; set; }
        [Required]
        public string? JobDescription { get; set; }
        public string? SkillRequire { get; set; }
        public string? CandidateRecruitment { get; set; }

        public string? Address { get; set; }
        public string? Salary { get; set; }
        public int NumberApply { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public string? OvertimePolicy { get; set; }
        public string Status { get; set; }
    }
}
