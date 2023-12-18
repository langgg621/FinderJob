using Domain.Dtos.Employee;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class FileCvDto
    {
        public int EmployeeId { get; set; }
        public EmployeeDto Employee { get; set; }
        public string FileName { get; set; }

    }
}
