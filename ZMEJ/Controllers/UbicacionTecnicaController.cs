using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZMEJ.EventHandlers.Commands;
using ZMEJ.Queries;

namespace ZMEJ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UbicacionTecnicaController : ControllerBase
    {
        private IMediator _mediator;

        public UbicacionTecnicaController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpGet("getAll")]
        public async Task<ActionResult<string>> getAll()
        {
            try
            {
                var query = new GetAllActiveUbicacionTecnicaQuery();
                var data = await _mediator.Send(query);
                return new JsonResult(data);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        [HttpGet("getAllActive")]
        public async Task<ActionResult<string>> getAllActive()
        {
            try
            {
                var query = new GetAllActiveUbicacionTecnicaQuery();
                var data = await _mediator.Send(query);
                return new JsonResult(data);
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }

        [HttpPost("save")]
        //  [Authorize]
       // [Authorize(Roles = "ADMINMANTENIMIENTO, ADMINZMEJ")]
        //  [Authorize(Roles = "ADMINZMEJ,ADMINMANTENIMIENTO")]
        public async Task<IActionResult> save(CreateUbicacionTecnicaCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }

        [HttpPost("update")]       
       // [Authorize(Roles = "ADMINMANTENIMIENTO, ADMINZMEJ")]        
        public async Task<IActionResult> update(UpdateUbicacionTecnicaCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
    }
}
