using Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoanDanentang.Entities
{
	public class ApplyJob
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int RecruitmentId { get; set; }
        public Recruitment Recruitment { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
	}
}
