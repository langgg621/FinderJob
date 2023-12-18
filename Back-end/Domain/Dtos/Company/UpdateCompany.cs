using DoanDanentang.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Company
{
	public class UpdateCompany
	{
		public string? Name { get; set; }
		public string? CompanyOverview { get; set; }
		public string? CompanyType { get; set; }
		public string? CompanySize { get; set; }
		public string? WorkingDay { get; set; }
		public string? Address { get; set; }
        public string? ImagePath { get; set; }

    }
}
