using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public class EmployeeEditViewModel
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string MobilePhone { get; set; }
        [Required]
        public string Photo { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public string Age { get; set; }
       
        [Required]
        public int DepartmentID { get; set; }
        [Required]
        public int JobID { get; set; }
        public EmployeeAddressEditViewModel Address { get; set; }
    }
}
