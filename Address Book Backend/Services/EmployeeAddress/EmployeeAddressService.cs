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
    public class EmployeeAddressService
    {
        UnitOfWork unitOfWork;
        Generic<EmployeeAddress> EmployeeAddressRepo;
        public EmployeeAddressService(UnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            EmployeeAddressRepo = unitOfWork.EmployeeAddressRepo;
        }
        public EmployeeAddressEditViewModel Add(EmployeeAddressEditViewModel EmployeeAddressEditViewModel)
        {
            EmployeeAddress EmployeeAddress = EmployeeAddressRepo.Add(EmployeeAddressEditViewModel.ToModel());
            unitOfWork.commit();
            return EmployeeAddress.ToEditableViewModel();
        }
        public EmployeeAddressEditViewModel Update(EmployeeAddressEditViewModel EmployeeAddressEditViewModel)
        {
            EmployeeAddress EmployeeAddress = EmployeeAddressRepo.Update(EmployeeAddressEditViewModel.ToModel());
            unitOfWork.commit();
            return EmployeeAddress.ToEditableViewModel();
        }
        public void Remove(int id)
        {
            EmployeeAddressRepo.Remove(EmployeeAddressRepo.GetByID(id));
            unitOfWork.commit();
        }
        public PagingViewModel Get(int pageIndex = 0, int pageSize = 3)
        {
            var query =
                EmployeeAddressRepo.GetAll();


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
        public IEnumerable<EmployeeAddressViewModel> GetAll()
        {
            return EmployeeAddressRepo.GetAll().Select(i => i.ToViewModel()).ToList();
        }
        public EmployeeAddressViewModel GetByID(int id)
        {
            return EmployeeAddressRepo.GetByID(id).ToViewModel();
        }
    }
}
