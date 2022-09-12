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
    public class ClasificacionController : ControllerBase
    {
        private IMediator _mediator;

        public ClasificacionController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> getAll()
        {

            var result = await _mediator.Send(new getAllClasificacionQuery());
            return new JsonResult(result);

        }
        [HttpGet("getAllActive")]
        public async Task<IActionResult> getAllActive()
        {

            var result = await _mediator.Send(new getAllClasificacionActiveQuery());
            return new JsonResult(result);

        }
    }
}
