using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class UnitOfWork
    {
        private EntitiesContext context;
        public Generic<Admin> AdminRepo { get; set; }
        public Generic<Job> JobRepo { get; set; }
        public Generic<Department> DepartmentRepo { get; set; }
        public Generic<Employee> EmployeeRepo { get; set; }
        public Generic<EmployeeAddress> EmployeeAddressRepo { get; set; }

        public Generic<Role> RoleRepo { get; set; }
        public Generic<User> UserRepo { get; set; }
        public Generic<UserRole> UserRoleRepo { get; set; }

        ////////////////////////////////

        public UnitOfWork(
            EntitiesContext _context,

            Generic<Admin> adminRepo,
            Generic<Job> jobRepo,
            Generic<Department> departmentRepo,
            Generic<Employee> employeeRepo,
            Generic<EmployeeAddress> employeeAddressRepo,
            Generic<Role> roleRepo,
            Generic<User> userRepo,
            Generic<UserRole> userRoleRepo

            )
        {
            context = _context;

            AdminRepo = adminRepo;
            AdminRepo.Context = context;

            JobRepo = jobRepo;
            JobRepo.Context = context;

            DepartmentRepo = departmentRepo;
            DepartmentRepo.Context = context;

            EmployeeRepo = employeeRepo;
            EmployeeRepo.Context = context;

            EmployeeAddressRepo = employeeAddressRepo;
            EmployeeAddressRepo.Context = context;

            UserRepo = userRepo;
            UserRepo.Context = context;

            RoleRepo = roleRepo;
            RoleRepo.Context = context;

            UserRoleRepo = userRoleRepo;
            UserRoleRepo.Context = context;


        }

        public int commit()
        {
            return context.SaveChanges();
        }

    }
}
