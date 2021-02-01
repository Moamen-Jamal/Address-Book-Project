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
    public class DepartmentController : ApiController
    {
        private readonly DepartmentService DepartmentService;
        public DepartmentController(DepartmentService _DepartmentService)
        {
            DepartmentService = _DepartmentService;
        }


        [HttpGet]
        public ResultViewModel<PagingViewModel> Get(int pageIndex = 0, int pageSize = 3)
        {

            ResultViewModel<PagingViewModel> result
                = new ResultViewModel<PagingViewModel>();
            try
            {
                var Departments = DepartmentService.Get(pageIndex, pageSize);
                result.Successed = true;
                result.Data = Departments;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }
        [HttpGet]
        public ResultViewModel<IEnumerable<DepartmentViewModel>> GetAll()
        {
            ResultViewModel<IEnumerable<DepartmentViewModel>> result
                = new ResultViewModel<IEnumerable<DepartmentViewModel>>();
            try
            {
                result.Data = DepartmentService.GetAll();
                result.Successed = true;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }
        [HttpGet]
        public ResultViewModel<DepartmentViewModel> Get(int id)
        {
            ResultViewModel<DepartmentViewModel> result
                = new ResultViewModel<DepartmentViewModel>();
            try
            {
                var Departments = DepartmentService.GetByID(id);
                result.Successed = true;
                result.Data = Departments;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }


        [HttpPost]
        public ResultViewModel<DepartmentEditViewModel> Post(DepartmentEditViewModel model)
        {
            ResultViewModel<DepartmentEditViewModel> result
                = new ResultViewModel<DepartmentEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {
                    DepartmentEditViewModel selectedUser
                        = DepartmentService.Add(model);
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
        public ResultViewModel<DepartmentEditViewModel> Put(DepartmentEditViewModel model)
        {
            ResultViewModel<DepartmentEditViewModel> result
                = new ResultViewModel<DepartmentEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {

                    DepartmentEditViewModel selectedUser
                        = DepartmentService.Update(model);
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
        public ResultViewModel<DepartmentEditViewModel> Delete(int id)
        {
            ResultViewModel<DepartmentEditViewModel> result
                = new ResultViewModel<DepartmentEditViewModel>();

            try
            {

                DepartmentService.Remove(id);
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
