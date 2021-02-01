using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public static class EmployeeAddressExtensions
    {
        public static EmployeeAddressEditViewModel ToEditableViewModel(this EmployeeAddress model)
        {
            return new EmployeeAddressEditViewModel
            {
                ID = model.ID,
                City = model.City,
                Governate = model.Governate,
                Region = model.Region,
                Street = model.Street,
                EmployeeID = model.Employee.ID
            };
        }
        public static EmployeeAddress ToModel(this EmployeeAddressEditViewModel model)
        {
            return new EmployeeAddress
            {
                ID = model.ID,
                City = model.City,
                Governate = model.Governate,
                Region = model.Region,
                Street = model.Street,
                EmployeeID = model.EmployeeID
            };
        }
        public static EmployeeAddressViewModel ToViewModel(this EmployeeAddress model)
        {
            return new EmployeeAddressViewModel
            {
                ID = model.ID,
                City = model.City,
                Governate = model.Governate,
                Region = model.Region,
                Street = model.Street,
                EmployeeName = model.Employee.User.Name,
                EmployeeID = model.Employee.ID
            };
        }
    }
}
