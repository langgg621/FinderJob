using DoanDanentang.Dtos.Recruitment;
using DoanDanentang.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Company
{
    public class CompanyDto
    {
		public int Id { get; set; }
        public string Name { get; set; }
        public string? CompanyOverview { get; set; }
        public string? CompanyType { get; set; }
        public string? CompanySize { get; set; }
        public string? WorkingDay { get; set; }
        public string? Address { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string ImagePath { get; set; }
    }
}
