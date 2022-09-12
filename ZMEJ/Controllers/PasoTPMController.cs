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
    public class PasoTPMController : ControllerBase
    {
        private IMediator _mediator;

        public PasoTPMController(IMediator mediator)
        {
            _mediator = mediator;
        
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> getAll()
        {

            var result = await _mediator.Send(new GetAllPasoTPMQuery());
            return new JsonResult(result);

        }
    }
}