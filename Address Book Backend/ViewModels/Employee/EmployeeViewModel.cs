using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public class EmployeeViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Photo { get; set; }
        public DateTime BirthDate { get; set; }
        public string Age { get; set; }
        public int DepartmentID { get; set; }
        public int JobID { get; set; }
        public EmployeeAddressViewModel Address { get; set; }
    }
}
