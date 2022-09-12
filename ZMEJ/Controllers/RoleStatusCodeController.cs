using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZMEJ.Queries;

namespace ZMEJ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleStatusCodeController : ControllerBase
    {
        private IMediator _mediator;

        public RoleStatusCodeController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("getByCode/{code}")]
        //[Route("getByCode/{code}")]
        public async Task<IActionResult> GetByCode(int code)
        {
            var query = new GetRoleStatusByCodeQuery(code);
            var data = await _mediator.Send(query);
            return new JsonResult(data);
        }
        //[HttpGet("getByCode/{code}")]
        //public async Task<IActionResult> GetAll(int code)
        //{
        //    var query = new GetAllRoleStatusQuery();
        //    var data = await _mediator.Send(query);
        //    return new JsonResult(data);
        //}
    }
}