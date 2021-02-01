using Entities.Entities;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModels;

namespace Services
{
    public class DashBoardService
    {
        UnitOfWork unitOfWork;
        Generic<Job> JobRepo;
        Generic<Department> DepartmentRepo;
        Generic<Admin> AdminRepo;
        Generic<Employee> EmployeeRepo;
        

        public DashBoardService(UnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            JobRepo = unitOfWork.JobRepo;
            DepartmentRepo = unitOfWork.DepartmentRepo;
            AdminRepo = unitOfWork.AdminRepo;
            EmployeeRepo = unitOfWork.EmployeeRepo;
           
        }



        public DashboardViewModel GetStatistics()
        {
            DashboardViewModel report = new DashboardViewModel();
            report.TotalJobs = JobRepo.GetAll().Count();
            report.TotalDepartments = DepartmentRepo.GetAll().Count();
            report.TotalEmployees = EmployeeRepo.GetAll().Count();
            report.TotalAdmins = AdminRepo.GetAll().Count();
            return report;
        }
    }
}
