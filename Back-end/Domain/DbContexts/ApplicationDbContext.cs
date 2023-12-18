using DoanDanentang.Entities;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DoanDanentang.Domain.DbContexts
{
	public class ApplicationDbContext : DbContext
	{
		public DbSet<Company> Companies { get; set; }
		public DbSet<Employee> Employees { get; set; }
		public DbSet<Recruitment> Recruitments { get; set; }
		public DbSet<ApplyJob> ApplyJobs { get; set; }	
		public DbSet<FileCV> FileCVs { get; set; }
		public ApplicationDbContext(DbContextOptions dbContextOptions): base(dbContextOptions) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
            .HasOne(e => e.FileCV)
            .WithOne(cv => cv.Employee)
            .HasForeignKey<FileCV>(cv => cv.EmployeeId);
            modelBuilder.Entity<Company>()
            .Property(c => c.ImagePath)
            .HasDefaultValue("default_image_path");
            modelBuilder.Entity<Employee>()
            .Property(c => c.ImagePath)
            .HasDefaultValue("default_image_path");

        }

    }
}