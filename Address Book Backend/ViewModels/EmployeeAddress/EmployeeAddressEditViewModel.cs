using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public class EmployeeAddressEditViewModel
    {
        public int ID { get; set; }
        public string Governate { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Street { get; set; }
        public int EmployeeID { get; set; }
    }
}
