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
    public class EmployeeAddressController : ApiController
    {
        private readonly EmployeeAddressService EmployeeAddressService;
        public EmployeeAddressController(EmployeeAddressService _EmployeeAddressService)
        {
            EmployeeAddressService = _EmployeeAddressService;
        }


        [HttpGet]
        public ResultViewModel<PagingViewModel> Get(int pageIndex = 0, int pageSize = 3)
        {

            ResultViewModel<PagingViewModel> result
                = new ResultViewModel<PagingViewModel>();
            try
            {
                var EmployeeAddresss = EmployeeAddressService.Get(pageIndex, pageSize);
                result.Successed = true;
                result.Data = EmployeeAddresss;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;
        }


        [HttpGet]
        public ResultViewModel<EmployeeAddressViewModel> Get(int id)
        {
            ResultViewModel<EmployeeAddressViewModel> result
                = new ResultViewModel<EmployeeAddressViewModel>();
            try
            {
                var EmployeeAddresss = EmployeeAddressService.GetByID(id);
                result.Successed = true;
                result.Data = EmployeeAddresss;
            }
            catch (Exception ex)
            {
                result.Successed = false;
                result.Message = "حدث خطأ ما";
            }
            return result;

        }


        [HttpPost]
        public ResultViewModel<EmployeeAddressEditViewModel> Post(EmployeeAddressEditViewModel model)
        {
            ResultViewModel<EmployeeAddressEditViewModel> result
                = new ResultViewModel<EmployeeAddressEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {
                    EmployeeAddressEditViewModel selectedUser
                        = EmployeeAddressService.Add(model);
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
        public ResultViewModel<EmployeeAddressEditViewModel> Put(EmployeeAddressEditViewModel model)
        {
            ResultViewModel<EmployeeAddressEditViewModel> result
                = new ResultViewModel<EmployeeAddressEditViewModel>();

            try
            {
                if (!ModelState.IsValid)
                {
                    result.Message = "In Valid Model State";
                }
                else
                {

                    EmployeeAddressEditViewModel selectedUser
                        = EmployeeAddressService.Update(model);
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
        public ResultViewModel<EmployeeAddressEditViewModel> Delete(int id)
        {
            ResultViewModel<EmployeeAddressEditViewModel> result
                = new ResultViewModel<EmployeeAddressEditViewModel>();

            try
            {

                EmployeeAddressService.Remove(id);
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
