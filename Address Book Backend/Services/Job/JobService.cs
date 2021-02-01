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
    public class JobService
    {
        UnitOfWork unitOfWork;
        Generic<Job> JobRepo;
        public JobService(UnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            JobRepo = unitOfWork.JobRepo;
        }
        public JobEditViewModel Add(JobEditViewModel JobEditViewModel)
        {
            Job Job = JobRepo.Add(JobEditViewModel.ToModel());
            unitOfWork.commit();
            return Job.ToEditableViewModel();
        }
        public JobEditViewModel Update(JobEditViewModel JobEditViewModel)
        {
            Job Job = JobRepo.Update(JobEditViewModel.ToModel());
            unitOfWork.commit();
            return Job.ToEditableViewModel();
        }
        public void Remove(int id)
        {
            JobRepo.Remove(JobRepo.GetByID(id));
            unitOfWork.commit();
        }
        public PagingViewModel Get(int pageIndex = 0, int pageSize = 3)
        {
            var query =
                JobRepo.GetAll();


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
        public IEnumerable<JobViewModel> GetAll()
        {
            return JobRepo.GetAll().ToList().Select(i => i.ToViewModel());
        }
        public JobViewModel GetByID(int id)
        {
            return JobRepo.GetByID(id).ToViewModel();
        }
    }
}
