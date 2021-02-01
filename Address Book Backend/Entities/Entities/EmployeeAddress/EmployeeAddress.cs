using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class EmployeeAddress : BaseModel
    {
        public string Governate { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Street { get; set; }
        public virtual Employee Employee { get; set; }
        public int EmployeeID { get; set; }

    }
}
