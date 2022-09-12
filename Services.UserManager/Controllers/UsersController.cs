using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.UserManager.Domain.Dtos;
using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Services;
using Services.UserManager.ViewModels;

namespace Services.UserManager.Controllers
{
    [Route("api/[controller]")]
   // [EnableCors("AllowAll")]

    public class UsersController : ControllerBase
    {
        private IAuthService _authService;
        private IUserManagerService _userManagerService;
        private IUserApplicationService _userApplicationService;
        private IUserRoleApplicationService _userRoleApplicationService;
        private IApplicationRoleService _applicationRoleService;
        private IEncrypter _encrypter;

        public UsersController(IUserManagerService userManagerService, IEncrypter encrypter, IUserApplicationService userApplicationService, IUserRoleApplicationService userRoleApplicationService, IApplicationRoleService applicationRoleService)
        {
            _userManagerService = userManagerService;
            _userApplicationService = userApplicationService;
            _userRoleApplicationService = userRoleApplicationService;
            _applicationRoleService = applicationRoleService;
            _encrypter = encrypter;
        }
        [HttpGet("byroles")]
        public async Task<IActionResult> GetUserByRolesAsync(string ids = null)
        {
            if (!string.IsNullOrEmpty(ids))
            {
                var items = await GetItemsByIdsAsync(ids,Guid.Empty);

                if (!items.Any())
                {
                    return BadRequest("ids value invalid. Must be comma-separated list of numbers");
                }

                return Ok(items);
            }
            return BadRequest("");


        }
        //GetUserZMEJByStatus
        [HttpPost("GetUserZMEJByStatus")]
        public async Task<IActionResult> GetUserZMEJByStatusAsync([FromBody] RolesAplicationViewModels model)
        {
            if (!string.IsNullOrEmpty(model.Ids))
            {
                var items = await GetItemsByIdsAsync(model.Ids, model.ApplicationId);

                if (!items.Any())
                {
                    return BadRequest("ids value invalid. Must be comma-separated list of numbers");
                }

                return Ok(items);
            }
            return BadRequest("Roles no proporcionados");


        }

        [HttpGet("byapplicationAndroles/{applicationid}/{ids}")]
        public async Task<IActionResult> GetUserByRolesAsync(Guid applicationid, string ids = null)
        {
            if (!string.IsNullOrEmpty(ids))
            {
                var items = await GetItemsByIdsAsync(ids, applicationid);

                if (!items.Any())
                {
                    return BadRequest("ids value invalid. Must be comma-separated list of numbers");
                }

                return Ok(items);
            }
            return BadRequest("");


        }
        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserByIdAsync(Guid id)
        {
            if (Guid.Empty != id)
            {
                var items = await _userManagerService.GetAsync(id);

                if (items == null)
                {
                    return BadRequest("codigo invalido");
                }

                return new JsonResult(items);
            }
            return BadRequest("No se encontro al usuario");

        }
        [HttpGet("GetUserNotificationZMEJ")]
        public async Task<IActionResult> GetUserNotificationZMEJ(Guid id)
        {
            if (Guid.Empty != id)
            {
                var items = await _userManagerService.GetUserNotificationZMEJ();

                if (items == null)
                {
                    return BadRequest("codigo invalido");
                }

                return new JsonResult(items);
            }
            return BadRequest("No se encontro al usuario");

        }

        [HttpGet("GetAllByApplication/{id}")]
        public async Task<IActionResult> GetAllByApplication(Guid id)
        {
            if (Guid.Empty != id)
            {
                var items = await _applicationRoleService.GetRoles(id);

                if (items == null)
                {
                    return BadRequest("codigo invalido");
                }

                return new JsonResult(items);
            }
            return BadRequest("No se encontraron datos");

        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {

            var items = await _userManagerService.getUserAllUser();

            if (items == null)
            {
                return BadRequest("codigo invalido");
            }

            return new JsonResult(items);

        }
        [HttpGet("GetAll/{applicationid}")]
        public async Task<IActionResult> GetAll(Guid applicationid)
        {

            var items = await _userManagerService.GetAllByApplicationIdAsync(applicationid);

            if (items == null)
            {
                return BadRequest("codigo invalido");
            }

            return new JsonResult(items);



        }
        private async Task<ICollection<UserDto>> GetItemsByIdsAsync(string ids,Guid applicationid)
        {
         

            var items = await _userManagerService.getUserAllUserByOrganisationId(ids, applicationid);
           
            return items;
           
        }
        //registrar usuario

        [HttpPost("save")]
       // [Authorize(Roles = "Manager,Administrator,BasicAdministrator")]
        public async Task<IActionResult> save([FromBody] RegisterUserViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Datos no valido");
                }
                // validar que el usuario no este registrado.
                var user = await _userManagerService.GetAsync(model.UserName);
                if (user == null)
                {
                    
                    user = new AspNetUser(model.Email, model.UserName, model.FullName, model.OrganisationId, false, false);
                    if (string.IsNullOrWhiteSpace(model.Password))
                    {
                        model.Password = _encrypter.PaswordGenerate();
                    }
                    //var password = model.UserName;
                    user.SetSalt(_encrypter.GetSalt());
                    user.SetPassword(model.Password, _encrypter);
                   // user.Salt = "";
                    user = await _userManagerService.AddAsync(user);
                    //   return BadRequest("el usuario ya existe");
                }
                //añadir usuario a la aplicacion
                var userApp = await _userApplicationService.Validate(user.Id, model.ApplicationId);
                if (userApp == null)
                {
                    userApp = new AspNetUserApplication();
                    userApp.UserId = user.Id;
                    userApp.ApplicationId = model.ApplicationId;
                    await _userApplicationService.Add(userApp);
                    // añadimos el usuario a la aplicacion
                }
                //else
                //{
                //    return BadRequest("El usuario ya existe");
                //}
                /*
                 Eliminar roles de usuarios por aplicacion si existe.
                 */
               await _userRoleApplicationService.DeleteRoleForUser(user.Id, model.ApplicationId);
                var userApplicationRole = new UserRoleApplication();
                if (model.Roles!=null && model.Roles.Count > 0)
                {
                    foreach (var item in model.Roles)
                    {
                        try
                        {
                            userApplicationRole.ApplicationId = model.ApplicationId;
                            userApplicationRole.UserId = user.Id;
                            userApplicationRole.RoleId = Guid.Parse(item);

                            await _userRoleApplicationService.AddRoleForUser(userApplicationRole);
                        }
                        catch (Exception ex)
                        {

                        }

                    }
                }
                // asisgnar roles.

                //
                //var result = _categoriaService.InsertCategoria(categorias);

                return Ok();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("update")]
        [Authorize(Roles = "Manager,Administrator,BasicAdministrator")]
        public async Task<IActionResult> update([FromBody] RegisterUserViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Datos no valido");
                }
                // validar que el usuario no este registrado.
                var user = await _userManagerService.GetAsync(model.UserName);
                if (user == null)
                {

                    return BadRequest("El usuario no existe");
                    //   return BadRequest("el usuario ya existe");
                }

                //
                user.FullName = model.FullName;
                user.Email = model.Email;
              

                //añadir usuario a la aplicacion
                var userApp = await _userApplicationService.Validate(user.Id, model.ApplicationId);
                if (userApp == null)
                {
                    userApp = new AspNetUserApplication();
                    userApp.UserId = user.Id;
                    userApp.ApplicationId = model.ApplicationId;
                    await _userApplicationService.Add(userApp);
                    // añadimos el usuario a la aplicacion
                }
               
                /*
                 Eliminar roles de usuarios por aplicacion si existe.
                 */
                await _userRoleApplicationService.DeleteRoleForUser(user.Id, model.ApplicationId);
                var userApplicationRole = new UserRoleApplication();
                if (model.Roles.Count > 0)
                {
                    foreach (var item in model.Roles)
                    {
                        try
                        {
                            userApplicationRole.ApplicationId = model.ApplicationId;
                            userApplicationRole.UserId = user.Id;
                            userApplicationRole.RoleId = Guid.Parse(item);


                            await _userRoleApplicationService.AddRoleForUser(userApplicationRole);
                        }
                        catch (Exception ex)
                        {

                        }

                    }
                }
                // actualizar campos de usuario
                await _userManagerService.UpdateAsync(user);
                // asisgnar roles.

                //
                //var result = _categoriaService.InsertCategoria(categorias);

                return Ok();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost("change_password")]
        [Authorize(Roles = "Manager,Administrator,BasicAdministrator")]
        public async Task<IActionResult> change_password([FromBody] ChangeAdminPasswordRequest model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Datos no valido");
                }
                // validar que el usuario no este registrado.
                var user = _authService.GetById(model.UserId);
               // var user = await _userManagerService.GetAsync(model.UserId);
                if (user == null)
                {

                    return BadRequest("El usuario no existe");
                    //   return BadRequest("el usuario ya existe");
                }
                user.SetPassword(model.NewPassword, _encrypter);
                var data = await _userManagerService.ChangePasswordAsync(user);
                if (data != null)
                {
                    return Ok();
                }
                return BadRequest(new { message = "error al cambiar la contraseña." });
            }
            catch (Exception ex)
            {

                throw;
            }
        }



    }
}
