using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using ZMEJ.Queries;
using ZMEJ.EventHandlers.Commands;

namespace ZMEJ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrupoPlanificadorController : ControllerBase
    {
        private IMediator _mediator;

        public GrupoPlanificadorController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpGet("getAll")]
        public async Task<ActionResult<string>> getAll()
        {
            var query = new GetAllGrupoPlanificadorQuery("gn10");
            var data = await _mediator.Send(query);
            return new JsonResult(data);
        }
        [HttpGet("getAllByCentro/{centro}")]
        public async Task<ActionResult<string>> getAllByCentro(string centro)
        {
            var query = new GetAllGrupoPlanificadorQuery(centro);
            var data = await _mediator.Send(query);
            return new JsonResult(data);
        }
        [HttpPost("save")]
        //  [Authorize]
        //[Authorize(Roles = "ADMINMANTENIMIENTO, ADMINZMEJ")]
        //  [Authorize(Roles = "ADMINZMEJ,ADMINMANTENIMIENTO")]
        public async Task<IActionResult> save(CreateGruposPlanificacionCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }

        [HttpPost("update")]
        //[Authorize(Roles = "ADMINMANTENIMIENTO, ADMINZMEJ")]
        public async Task<IActionResult> update(UpdateGruposPlanificacionCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
    }
}