using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusCodeController : ControllerBase
    {
        [HttpGet("getAll")]
        public async Task<JsonResult> getAll()
        {
            return new JsonResult("");
        }

        [HttpGet("getuserByStatusCode")]
        public async Task<JsonResult> GetUser(int code)
        {
            //optener roles de usuario por ID

            //Consultar Usuarios por Roles.
            return new JsonResult("");
        }
    }
}