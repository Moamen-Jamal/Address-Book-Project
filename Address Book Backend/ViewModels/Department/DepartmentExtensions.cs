using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public static class DepartmentExtensions
    {
        public static DepartmentEditViewModel ToEditableViewModel(this Department model)
        {
            return new DepartmentEditViewModel
            {
                ID = model.ID,
                Name = model.Name
            };
        }
        public static Department ToModel(this DepartmentEditViewModel model)
        {
            return new Department
            {
                ID = model.ID,
                Name = model.Name
            };
        }
        public static DepartmentViewModel ToViewModel(this Department model)
        {
            return new DepartmentViewModel
            {
                ID = model.ID,
                Name = model.Name
            };
        }
    }
}
