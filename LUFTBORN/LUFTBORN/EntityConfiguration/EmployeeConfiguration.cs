using LUFTBORN.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LUFTBORN.EntityConfiguration
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Name).HasMaxLength(200).IsRequired();
            builder.Property(b => b.Address).HasMaxLength(200).IsRequired();
            builder.Property(b => b.Age).IsRequired();

            builder.Property(b => b.AddedDate).IsRequired();
            builder.Property(b => b.IsDeleted).HasDefaultValue(false).IsRequired();


        }
    }
}
