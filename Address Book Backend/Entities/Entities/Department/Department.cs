using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class Department : BaseModel
    {
        public string Name { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
