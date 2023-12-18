using DoanDanentang.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
	public class Company : Profiles
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string? CompanyOverview { get; set; }
		public string? CompanyType {  get; set; }
		public string? CompanySize {  get; set; }
		public string? WorkingDay {  get; set; }
		public string? Address {  get; set; }
        [Required(ErrorMessage = "Email must not null")]
        [DataType(DataType.EmailAddress)]
		public string Email {  get; set; }
		[DataType(DataType.Password)]
        [Required(ErrorMessage = "Password must not null")]
        [MinLength(6, ErrorMessage = "Password must min 8 chart")]
        public string Password {  get; set; }
		public ICollection<Recruitment>? Recruitments { get; set; }
        public string ImagePath { get; set; } 



    }
}
