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
    public class DepartmentService
    {
        UnitOfWork unitOfWork;
        Generic<Department> DepartmentRepo;
        Generic<Job> JobRepo;
        public DepartmentService(UnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            DepartmentRepo = unitOfWork.DepartmentRepo;
            JobRepo = unitOfWork.JobRepo;
        }
        public DepartmentEditViewModel Add(DepartmentEditViewModel DepartmentEditViewModel)
        {
            Department Department = DepartmentRepo.Add(DepartmentEditViewModel.ToModel());
            unitOfWork.commit();
            return Department.ToEditableViewModel();
        }
        public DepartmentEditViewModel Update(DepartmentEditViewModel DepartmentEditViewModel)
        {
            Department department = DepartmentEditViewModel.ToModel();
            Department _Department = DepartmentRepo.Update(department);
            unitOfWork.commit();
            return _Department.ToEditableViewModel();
        }
        public void Remove(int id)
        {
            var jobs = JobRepo.GetAll().Where(i => i.DepartmentID == id);
            foreach (var job in jobs)
                JobRepo.Remove(job);
            DepartmentRepo.Remove(DepartmentRepo.GetByID(id));
            unitOfWork.commit();
        }
        public PagingViewModel Get(int pageIndex = 0, int pageSize = 3)
        {
            var query =
                DepartmentRepo.GetAll();


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
        public IEnumerable<DepartmentViewModel> GetAll()
        {
            return DepartmentRepo.GetAll().ToList().Select(i => i.ToViewModel());
        }
        public DepartmentViewModel GetByID(int id)
        {
            return DepartmentRepo.GetByID(id).ToViewModel();
        }
    }
}
