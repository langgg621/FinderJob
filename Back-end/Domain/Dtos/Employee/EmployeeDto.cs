using DoanDanentang.Entities;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoanDanentang.Dtos;

namespace Domain.Dtos.Employee
{
    public class EmployeeDto
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? Experience { get; set; }
        public string? StudyAt { get; set; }
        public string? PhoneNumber { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }
        public string ImagePath { get; set; }
    }
}
