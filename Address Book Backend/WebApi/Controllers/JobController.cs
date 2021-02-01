using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModels;

namespace WebApi.Controllers
{
    public class JobController : ApiController
    {
        private readonly JobService JobService;
        public JobController(JobService _JobService)
        {
            JobService = _JobService;
        }


        [HttpGet]
        public ResultViewModel<PagingViewModel> Get(int pageIndex = 0, int pageSize = 3)
        {

            ResultViewModel<PagingViewModel> result
                = new ResultViewModel<PagingViewModel>();
            try
            {
                var Jobs = JobService.Get(pageIndex, pageSize);
                result.Successed = true;
                result.Data = Jobs;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }
        [HttpGet]
        public ResultViewModel<IEnumerable<JobViewModel>> GetAll()
        {
            ResultViewModel<IEnumerable<JobViewModel>> result
                = new ResultViewModel<IEnumerable<JobViewModel>>();
            try
            {
                var Jobs = JobService.GetAll();
                result.Successed = true;
                result.Data = Jobs;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }
        [HttpGet]
        public ResultViewModel<JobViewModel> Get(int id)
        {
            ResultViewModel<JobViewModel> result
                = new ResultViewModel<JobViewModel>();
            try
            {
                var Jobs = JobService.GetByID(id);
                result.Successed = true;
                result.Data = Jobs;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }


        [HttpPost]
        public ResultViewModel<JobEditViewModel> Post(JobEditViewModel model)
        {
            ResultViewModel<JobEditViewModel> result
                = new ResultViewModel<JobEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {
                    JobEditViewModel selectedUser
                        = JobService.Add(model);
                    result.Successed = true;
                    result.Data = selectedUser;
                }
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }


        [HttpPut]
        public ResultViewModel<JobEditViewModel> Put(JobEditViewModel model)
        {
            ResultViewModel<JobEditViewModel> result
                = new ResultViewModel<JobEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {

                    JobEditViewModel selectedUser
                        = JobService.Update(model);
                    result.Successed = true;
                    result.Data = selectedUser;
                }
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }


        [HttpDelete]
        public ResultViewModel<JobEditViewModel> Delete(int id)
        {
            ResultViewModel<JobEditViewModel> result
                = new ResultViewModel<JobEditViewModel>();

            try
            {

                JobService.Remove(id);
                result.Successed = true;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }



    }
}
