using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Services;

namespace Services.UserManager.Controllers
{
    [Route("api/[controller]")]
  //  [EnableCors("AllowAll")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private IIdentityService _identityService;
        private IMenusService _menusServices;

        public MenusController(IIdentityService identityService, IMenusService menusService)
        {
            _identityService = identityService;
            _menusServices = menusService;
        }
        [HttpGet("getAllActive/{AplicationId}")]
        [Authorize]
        public async Task<IActionResult> getAllActive(Guid AplicationId)
        {
            var UserId = Guid.Parse(_identityService.GetUserIdentity()).ToString();
            var result = await _menusServices.getAllByUSerRole(UserId,AplicationId);
            return new JsonResult(result);

        }
        [HttpGet("getAll/{AplicationId}")]
        [Authorize(Roles = "Manager,Administrator,GddAdministrator")]
        public IActionResult getAll(Guid AplicationId)
        {

            var result = _menusServices.getAllMenus(AplicationId);
            return new JsonResult(result);

        }
        [HttpPost("save")]
        [Authorize(Roles = "Manager,Administrator,GddAdministrator")]
        public IActionResult save([FromBody] Menu menu)
        {
            try
            {
                var result = _menusServices.addMenu(menu);

                return Ok();
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [HttpPost("update")]
        // [Authorize]
        [Authorize(Roles = "Manager,Administrator,GddAdministrator")]
        public IActionResult update([FromBody] Menu menu)
        {
            try
            {

                var result = _menusServices.updateMenu(menu);
                return Ok();


            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [HttpGet("delete/{id}")]
        [Authorize(Roles = "Manager,Administrator,GddAdministrator")]
        public IActionResult delete(int id)
        {

            try
            {
                //var data = _categoriaService.getById(id);
                //if (data != null)
                //{
                //    data.Estado = 0;
                //    var result = _categoriaService.ActualizarCategoria(data);
                //    return Ok();
                //}
                return BadRequest();
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
