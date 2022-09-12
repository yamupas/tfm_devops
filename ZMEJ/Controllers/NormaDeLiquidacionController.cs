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
    public class NormaDeLiquidacionController : ControllerBase
    {
        private IMediator _mediator;

        public NormaDeLiquidacionController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> getAll()
        {
            
            var result = await _mediator.Send(new GetAllNormaDeLiquidacionQuery());
            return new JsonResult(result);

        }
        [HttpGet("FindByCode/{code}")]
        public async Task<IActionResult> FindByCode(int code)
        {
            var query = new FindClaseDeActividadByCodeQuery(code);
            var result = await _mediator.Send(query);
            return new JsonResult(result);

        }
    }
}