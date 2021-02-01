using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Entities
{
    public class EmployeeAddressConfiguration : EntityTypeConfiguration<EmployeeAddress>
    {
        public EmployeeAddressConfiguration()
        {
            ToTable("EmployeeAddress");
            Property(i => i.Governate).HasMaxLength(50).IsRequired();
            Property(i => i.City).HasMaxLength(50).IsRequired();
            Property(i => i.Region).HasMaxLength(50).IsRequired();
            Property(i => i.Street).HasMaxLength(50).IsRequired();
            HasRequired(i => i.Employee).WithMany(i => i.EmployeeAddresses).
                HasForeignKey(i => i.EmployeeID);
        }
    }
}
