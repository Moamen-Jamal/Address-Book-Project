using Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels
{
    public static class EmployeeExtensions
    {
        public static EmployeeEditViewModel ToEditableViewModel(this Employee model)
        {
            return new EmployeeEditViewModel()
            {
                ID = model.ID,
                Name = model.User.Name,
                UserName = model.User.UserName,
                Password = model.User.Password,
                Email = model.User.Email,
                MobilePhone = model.User.Phone,
                Photo = model.User.Photo,
                BirthDate = model.BirthDate,
                Age = model.Age,
                DepartmentID = model.DepartmentID,
                JobID = model.JobID,
                
               
            };
        }
        public static Employee ToModel(this EmployeeEditViewModel model)
        {
            return new Employee()
            {
                ID = model.ID,
                User = new User
                {
                    ID = model.ID,
                    Name = model.Name,
                    UserName = model.UserName,
                    Password = model.Password,
                    Email = model.Email,
                    Phone = model.MobilePhone,
                    Photo = model.Photo,
                    UserRoles = new List<UserRole>()
                    {
                        new UserRole()
                        {
                           ID = 0 ,
                           RoleID = 2 ,
                           UserID = model.ID
                        }
                    }
                },
                BirthDate = model.BirthDate,
                Age = model.Age,
                DepartmentID = model.DepartmentID,
                JobID = model.JobID,
                EmployeeAddresses = new List<EmployeeAddress>()
                {
                    new EmployeeAddress()
                    {
                        ID= model.Address.ID,
                        City = model.Address.City,
                        Governate = model.Address.Governate,
                        Region = model.Address.Region,
                        Street = model.Address.Street,
                        EmployeeID = model.ID
                    }
                }
            };
        }
        public static EmployeeViewModel ToViewModel(this Employee model)
        {
            return new EmployeeViewModel()
            {
                ID = model.ID,
                Name = model.User.Name,
                UserName = model.User.UserName,
                Password = model.User.Password,
                Email = model.User.Email,
                MobilePhone = model.User.Phone,
                Photo = model.User.Photo,
                BirthDate = model.BirthDate,
                Age = model.Age,
                DepartmentID = model.DepartmentID,
                JobID = model.JobID,
                Address = model.EmployeeAddresses?.FirstOrDefault()?.ToViewModel(),
            };
        }
    }
}
