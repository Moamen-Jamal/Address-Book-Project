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
    public class UserRoleController : ApiController
    {
        private readonly UserRoleService UserRoleService;
        public UserRoleController(UserRoleService _UserRoleService)
        {
            UserRoleService = _UserRoleService;
        }

        [HttpGet]
        public IEnumerable<UserRoleViewModel> Get()
        {

            return UserRoleService.GetAll();
        }

        [HttpGet]
        public UserRoleViewModel Get(int id)
        {
            return UserRoleService.GetByID(id);
        }

        [HttpPost]
        public void Post(ViewModels.UserRoleEditViewModel model)
        {
            UserRoleService.Add(model);
        }

        [HttpPost]
        public void Put(UserRoleEditViewModel model)
        {
            UserRoleService.Update(model);
        }

        [HttpGet]
        public void Delete(int id)
        {
            UserRoleService.Remove(id);
        }
    }
}
