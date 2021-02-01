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
    public class EmployeeService
    {
        UnitOfWork unitOfWork;
        Generic<User> UserRepo;
        Generic<UserRole> UserRoleRepo;
        Generic<Employee> EmployeeRepo;
        Generic<EmployeeAddress> EmployeeAddressRepo;
        public EmployeeService(UnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            UserRepo = unitOfWork.UserRepo;
            UserRoleRepo = unitOfWork.UserRoleRepo;
            EmployeeRepo = unitOfWork.EmployeeRepo;
            EmployeeAddressRepo = unitOfWork.EmployeeAddressRepo;
        }
        public EmployeeEditViewModel Add(EmployeeEditViewModel EmployeeEditViewModel)
        {
            Employee Employee = EmployeeRepo.Add(EmployeeEditViewModel.ToModel());
            unitOfWork.commit();
            return Employee.ToEditableViewModel();
        }
        public EmployeeEditViewModel Update(EmployeeEditViewModel EmployeeEditViewModel)
        {
            Employee employee = EmployeeEditViewModel.ToModel();
            Employee _Employee = EmployeeRepo.Update(employee);
            UserRepo.Update(employee.User);
            EmployeeAddressRepo.Update(employee.EmployeeAddresses.FirstOrDefault());
            unitOfWork.commit();
            return _Employee.ToEditableViewModel();
        }
        public void Remove(int id)
        {
            var employeeAddresses = EmployeeAddressRepo.GetAll().Where(i => i.EmployeeID == id);
            foreach (var address in employeeAddresses)
                EmployeeAddressRepo.Remove(address);

            UserRole userRole = UserRoleRepo.GetAll().Where(i => i.UserID == id).FirstOrDefault();
            UserRoleRepo.Remove(new UserRole { ID = userRole.ID });

            Employee del =
            EmployeeRepo.Remove(new Employee { ID = id });
            UserRepo.Remove(new User { ID = id });
            unitOfWork.commit();
        }
        public PagingViewModel Get(int pageIndex = 0, int pageSize = 3)
        {
            var query =
                EmployeeRepo.GetAll();


            int records = query.Count();
            if (records <= pageSize || pageIndex <= 0) pageIndex = 1;
            int pages = (int)Math.Ceiling((double)records / pageSize);
            int excludedRows = (pageIndex - 1) * pageSize;

            query = query.OrderBy(i => i.ID);

            query = query.Skip(excludedRows).Take(pageSize);

            var data = query.ToList().Select(i => i.ToViewModel()).ToList();
            return new PagingViewModel()
            { PageIndex = pageIndex, PageSize = pageSize, Result = data, Records = records, Pages = pages };
        }
        public IEnumerable<EmployeeViewModel> GetAll()
        {
            return EmployeeRepo.GetAll().Select(i => i.ToViewModel()).ToList();
        }
        public EmployeeViewModel GetByID(int id)
        {
            return EmployeeRepo.GetByID(id).ToViewModel();
        }
    }
}
