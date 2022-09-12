
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
    public class OrderZMEJController : ControllerBase
    {
        private IMediator _mediator;

        public OrderZMEJController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [Authorize]
        [HttpGet("getAll")]
        public async Task<IActionResult> getAll()
        {
            var query = new GetAllOrderZMEJQuery();
            var r = await _mediator.Send(query);
            return new JsonResult(r);
        }
        [Authorize]
        [HttpGet("getAllDashboard")]
        public async Task<IActionResult> getAllDashboard()
        {
            var query = new GetAllOrderZMEJDashoardQuery();
            var r = await _mediator.Send(query);
            return new JsonResult(r);
        }
        [HttpPost("FilterOrder")]
        public async Task<IActionResult> FilterOrder(GetFilterOrderZMEJQuery command)
        {
           // var query = new GetFilterOrderZMEJQuery();
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }

        [HttpGet("getAllAssigned")]
        public async Task<IActionResult> getAllAssigned()
        {
            var query = new GetAllAssignedOrderZMEJQuery();
            var r = await _mediator.Send(query);
            return new JsonResult(r);
        }
        [HttpGet("FindbyId/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("codigo no valido");
            }
            var query = new GetOrderZMEJByIdQuery(id);
            var r = await _mediator.Send(query);
            return new JsonResult(r);
        }
        [HttpGet("OrderDetails/{id}")]
        public async Task<IActionResult> GetOrderDetails(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("codigo no valido");
            }
            var query = new GetOrderZMEJDetailsByIdQuery(id);
            var r = await _mediator.Send(query);
            return new JsonResult(r);
        }
        [HttpPost("save")]
        public async Task<IActionResult> Save(CreateOrderZMEJCommand command)
        {
            var r= await  _mediator.Send(command);
            return new JsonResult(r);
         }

        [HttpPost("update")]
      //  [Authorize]
      //   [Authorize(Roles = "ADMINMANTENIMIENTO, ADMINZMEJ")]
      //  [Authorize(Roles = "ADMINZMEJ,ADMINMANTENIMIENTO")]
        public async Task<IActionResult> update(UpdateOrderZMEJCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
        [HttpPut("UpdateOM")]
        public async Task<IActionResult> UpdateOM(UpdateMantenimeintoOrderZMEJCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
        [HttpPost("aproved")]
        public async Task<IActionResult> Aproved(AprovedOrderZMEJCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
        [HttpPost("reject")]
        public async Task<IActionResult> reject(RejectOrderZMEJCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
        [HttpPost("classification")]
        public async Task<IActionResult> classification(AsingClassificationOrderZMEJCommand command)
        {
            var r = await _mediator.Send(command);
            return new JsonResult(r);
        }
    }
}