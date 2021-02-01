using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class DepartmentConfiguration : EntityTypeConfiguration<Department>
    {
        public DepartmentConfiguration()
        {
            ToTable("Department");
            Property(i => i.Name).HasMaxLength(100).IsRequired();
            HasMany(i => i.Jobs).WithRequired(i => i.Department);
            HasMany(i => i.Employees).WithRequired(i => i.Department);
        }
    }
}
