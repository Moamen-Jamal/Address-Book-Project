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
    public class RoleController : ApiController
    {
        private readonly RoleService RoleService;
        public RoleController(RoleService _RoleService)
        {
            RoleService = _RoleService;
        }

        [HttpGet]
        public IEnumerable<RoleViewModel> Get()
        {

            return RoleService.GetAll();
        }

        [HttpGet]
        public RoleViewModel Get(int id)
        {
            return RoleService.GetByID(id);
        }

        [HttpPost]
        public void Post(ViewModels.RoleEditViewModel model)
        {
            RoleService.Add(model);
        }

        [HttpPut]
        public void Put(RoleEditViewModel model)
        {
            RoleService.Update(model);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            RoleService.Remove(id);
        }
    }
}
