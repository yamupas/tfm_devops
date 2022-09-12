using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZMEJ.Queries;
using MediatR;
namespace Services.Ticket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusCodeController : ControllerBase
    {
        private IMediator _mediator;

        public StatusCodeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllStatusCodeQuery();
            var data = await _mediator.Send(query);
            return new JsonResult(data);
        }
        [HttpGet("getByCode/{code}")]
        public async Task<IActionResult> getByCode(int code)
        {
            return new JsonResult(null);
        }
        [HttpGet("getAllLow/{code}")]
        public async Task<IActionResult> getAllLow(int code)
        {
            var query = new GetAllLowStatusCodeQuery(code);
            var data = await _mediator.Send(query);
            return new JsonResult(data);
        }
        [HttpGet("GetUserByStatus/{code}")]
        public async Task<IActionResult> GetUserByStatus(int code)
        {
            return new JsonResult(null);
        }
    }
}