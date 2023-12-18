using Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoanDanentang.Entities
{
	public class Recruitment
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public string Title { get; set; }
		[Required]
		public string JobDescription { get; set; }
		public string? SkillRequire {  get; set; }
		public string? CandidateRecruitment { get; set; }
		public string? Address {  get; set; }
		public string Salary {  get; set; }
		public int NumberApply { get; set; }
		public DateTime CreateAt { get; set; } = DateTime.Now;
        public string OvertimePolicy { get; set; }
        public int CompanyId { get; set; }
        public string Status { get; set; }
        [ForeignKey("CompanyId")]
        public Company Company { get; set; }
        public ICollection<ApplyJob>? ApplyJobs { get; set; }
	}
}
