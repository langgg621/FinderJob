using DoanDanentang.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
	public class Employee : Profiles
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string? Address { get; set; }
		public string? Experience { get; set; }
		public string? StudyAt { get; set; }
		public string? PhoneNumber { get; set; }
		[Required(ErrorMessage ="Email must not null")]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }
		[DataType(DataType.Password)]
		[Required(ErrorMessage ="Password must not null")]
		[MinLength(6, ErrorMessage ="Password must min 8 chart")]
        public string Password { get; set; }
	
        [ForeignKey("FileCVId")]
        public int FileCVId { get; set; }
        public FileCV FileCV { get; set; }
        [ForeignKey("EmployeeId")]

        public ICollection<ApplyJob>? ApplyJobs { get; set; }
		public string? ImagePath { get; set; }

    }
}