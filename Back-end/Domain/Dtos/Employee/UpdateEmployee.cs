

using DoanDanentang.Entities;
using Domain.Entities;

namespace Domain.Dtos.Employee
{
	public class UpdateEmployee
	{
		public string? Name { get ; set; }
		public string? Address { get; set; }
		public string? StudyAt {  get; set; }
		public string? PhoneNumber { get; set; }
		public string? Experience {  get; set; }
        public string? ImagePath { get; set; }

    }
}
