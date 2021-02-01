using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class EmployeeConfiguration : EntityTypeConfiguration<Employee>
    {
        public EmployeeConfiguration()
        {
            ToTable("Employee");
            
            Property(i => i.Age).HasMaxLength(100).IsRequired();
            Property(i => i.BirthDate).IsRequired();
            HasRequired(i => i.Department).WithMany(i => i.Employees).
                HasForeignKey(i => i.DepartmentID);
            HasRequired(i => i.Job).WithMany(i => i.Employees).
                HasForeignKey(i => i.JobID);
            HasMany(i => i.EmployeeAddresses).WithRequired(i => i.Employee);
            HasRequired(i => i.User).
               WithMany().HasForeignKey(i => i.ID);
        }
    }
}
