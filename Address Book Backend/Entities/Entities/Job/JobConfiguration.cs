using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class JobConfiguration : EntityTypeConfiguration<Job>
    {
        public JobConfiguration()
        {
            ToTable("Job");
            Property(i => i.Name).HasMaxLength(50).IsRequired();
            HasRequired(i => i.Department).WithMany(i => i.Jobs).
                HasForeignKey(i => i.DepartmentID);
            HasMany(i => i.Employees).WithRequired(i => i.Job);
        }
    }
}