using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public static class JobExtensions
    {
        public static JobEditViewModel ToEditableViewModel(this Job model)
        {
            return new JobEditViewModel
            {
                ID = model.ID,
                Name = model.Name,
                DepartmentID = model.Department.ID
            };
        }
        public static Job ToModel(this JobEditViewModel model)
        {
            return new Job
            {
                ID = model.ID,
                Name = model.Name,
                DepartmentID = model.DepartmentID,
                
            };
        }
        public static JobViewModel ToViewModel(this Job model)
        {
            return new JobViewModel
            {
                ID = model.ID,
                Name = model.Name,
                DepartmentID = model.Department.ID,
                DepartmentName = model.Department.Name

            };
        }
    }
}
