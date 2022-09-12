using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiGatewayZMEJ.Models;
using ApiGatewayZMEJ.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ApiGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleStatusCodeController : ControllerBase
    {
       
        private IRolesStatusCodeService _rolesStatusCodeService;
        private IUserService _userService;
       // private readonly ILogger<RoleStatusCodeController> _logger;

        public RoleStatusCodeController(IRolesStatusCodeService  rolesStatusCodeService,IUserService userService)
        {
            _rolesStatusCodeService = rolesStatusCodeService;
            _userService = userService;
          //  _logger = logger;
        }

        [HttpGet("getByCode/{code}")]
        public async Task<ActionResult> getByCode(int code)
        {
            var data = await _rolesStatusCodeService.GetByCode(code);
            if (data == null)
            {
                return BadRequest("Codigos sin parametrizar comunicate con un administrador.");
            }
            return new JsonResult(data); ;
        }
        [HttpGet("getUserByCode/{code}/{applicationid}")]
        public async Task<ActionResult> getUserByCode(int code, Guid applicationid)
        {
            try
            {
               

                // _logger.LogInformation("RoleStatusCodeController opteniendo roles ");
                //optener roles
                //Guid applicationId = Guid.Parse("95DB6745-3DE5-46A3-910B-C1B337D5262D");
                var data = await _rolesStatusCodeService.GetByCode(code);
                if (data == null || data.Count == 0)
                {
                    return BadRequest("Codigos sin parametrizar comunicate con un administrador.");
                }
               

                // _logger.LogInformation("RoleStatusCodeController opteniendo lista de usuarios");

                var  ids= string.Join(',', data.Select(x => x.RolId));
                var parametros = new RolesAplicationViewModels();
                parametros.ApplicationId = applicationid;
                parametros.Ids = ids;

                //var catalogItems = await _userService.GetUserByRoleAsync(data.Select(x => x.RolId), applicationid);
                var catalogItems = await _userService.GetUserByRoleDataAsync(parametros);
                var data2 = data.Select(x => x.RolId);
                if ( catalogItems == null || catalogItems.Count == 0 )
                {
                    return BadRequest($"No se encontraron usuarios. ids={ids}");
                }
                //var catalogItems = await _userService.GetUserByRoleAsync(data.Items.Select(x => x.ProductId));
                return new JsonResult(catalogItems); ;
            }
            catch (Exception ex)
            {
               // _logger.LogError("RoleStatusCodeController error" + ex.ToString());
                throw;
            }
           
        }
    }
}