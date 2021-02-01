using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class Employee : BaseModel
    {
        public DateTime BirthDate { get; set; }
        public string Age { get; set; }
        public virtual Department Department { get; set; }
        public int DepartmentID { get; set; }
        public virtual Job Job { get; set; }
        public int JobID { get; set; }
        public virtual ICollection<EmployeeAddress> EmployeeAddresses { get; set; }
        public virtual User User { get; set; }
    }
}
