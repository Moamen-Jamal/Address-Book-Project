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
    public class EmployeeController : ApiController
    {
        private readonly EmployeeService EmployeeService;
        public EmployeeController(EmployeeService _EmployeeService)
        {
            EmployeeService = _EmployeeService;
        }


        [HttpGet]
        public ResultViewModel<PagingViewModel> Get(int pageIndex = 0, int pageSize = 3)
        {

            ResultViewModel<PagingViewModel> result
                = new ResultViewModel<PagingViewModel>();
            try
            {
                var Employees = EmployeeService.Get(pageIndex, pageSize);
                result.Successed = true;
                result.Data = Employees;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }


        [HttpGet]
        public ResultViewModel<EmployeeViewModel> Get(int id)
        {
            ResultViewModel<EmployeeViewModel> result
                = new ResultViewModel<EmployeeViewModel>();
            try
            {
                var Employees = EmployeeService.GetByID(id);
                result.Successed = true;
                result.Data = Employees;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }


        [HttpPost]
        public ResultViewModel<EmployeeEditViewModel> Post(EmployeeEditViewModel model)
        {
            ResultViewModel<EmployeeEditViewModel> result
                = new ResultViewModel<EmployeeEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {
                    EmployeeEditViewModel selectedUser
                        = EmployeeService.Add(model);
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
        public ResultViewModel<EmployeeEditViewModel> Put(EmployeeEditViewModel model)
        {
            ResultViewModel<EmployeeEditViewModel> result
                = new ResultViewModel<EmployeeEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {

                    EmployeeEditViewModel selectedUser
                        = EmployeeService.Update(model);
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
        public ResultViewModel<EmployeeEditViewModel> Delete(int id)
        {
            ResultViewModel<EmployeeEditViewModel> result
                = new ResultViewModel<EmployeeEditViewModel>();

            try
            {

                EmployeeService.Remove(id);
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
