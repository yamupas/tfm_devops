using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiGatewayZMEJ.Config;
using ApiGatewayZMEJ.Models;
using ApiGatewayZMEJ.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ApiGatewayZMEJ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderZMEJController : ControllerBase
    {
        private IOrderZMEJService _orderZMEJService;
        private IUserService _userService;
        private INotificationService _notificationService;
        private UrlsConfig _urls;

        public OrderZMEJController(IOrderZMEJService  orderZMEJService, IUserService userService, INotificationService notificationService, IOptions<UrlsConfig> config)
        {
            _orderZMEJService = orderZMEJService;
            _userService = userService;
            _notificationService = notificationService;
            _urls = config.Value;
        }

        [HttpGet("FindbyId/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("codigo no valido");
            }
            var orderZMEJ = await _orderZMEJService.GetById(id);
            if (orderZMEJ != null)
            {
                //consultar Usuario asignado y propoponente
                var userData = await _userService.GetUserByIdyAsync(orderZMEJ.AsignadoA);
                var userProponenteData = await _userService.GetUserByIdyAsync(orderZMEJ.Proponente);

                orderZMEJ.NombreProponente = userProponenteData != null ? userProponenteData.FullName : null;
                orderZMEJ.NombreAsignado = userData != null ? userData.FullName : null;
            }
           // var query = new GetOrderZMEJByIdQuery(id);
            //var r = await _mediator.Send(query);
            return new JsonResult(orderZMEJ);
        }
        [HttpGet("OrderDetails/{id}")]
        public async Task<IActionResult> GetOrderDetails(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("codigo no valido");
            }
            var orderZMEJ = await _orderZMEJService.GetOrderDatails(id);
            if (orderZMEJ != null)
            {
                //consultar Usuario asignado y propoponente
                var userData = await _userService.GetUserByIdyAsync(orderZMEJ.AsignadoA);
                var userProponenteData = await _userService.GetUserByIdyAsync(orderZMEJ.Proponente);

                orderZMEJ.NombreProponente = userProponenteData != null ? userProponenteData.FullName : null;
                orderZMEJ.NombreAsignado = userData != null ? userData.FullName : null;
            }
            // var query = new GetOrderZMEJByIdQuery(id);
            //var r = await _mediator.Send(query);
            return new JsonResult(orderZMEJ);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveOrder([FromBody] OrderZMEJ orderZMEJ)
        {

            //paso 1 crear Orden
            var r = await _orderZMEJService.save(orderZMEJ);
            //paso 2 Buscar buscar al usuario asignado
            if (r!=Guid.Empty)
            {
                orderZMEJ.Id = r;
                if (orderZMEJ.AsignadoA != Guid.Empty && orderZMEJ.enviarCorreo)
                {
                    var userData = await _userService.GetUserByIdyAsync(orderZMEJ.AsignadoA);
                    var userProponenteData = await _userService.GetUserByIdyAsync(orderZMEJ.Proponente);
                    if (userData != null )
                    {
                         var url = _urls.Frontendurl + UrlsConfig.FrontendOperations.OrderDetails(r);
                        // enviar notificaciòn
                        SendEmail sendEmail = new SendEmail();

                        var proponente = userProponenteData != null ? userProponenteData.FullName : null;
                        sendEmail.body = "<b>Nombre de La orden</b>: <a href='" + url + "'> " + orderZMEJ.Nombre + " </a>  <br>" +
                        "<b>Descripción</b>: " + orderZMEJ.Descripcion + " <br>" +
                        "<b>Pet</b>: " + orderZMEJ.NombreDelPet + "<br>" +
                        "<b>Proponente</b>: " + proponente  + "<br>" +
                        "<b>PasoTPM</b>: " + orderZMEJ.PasoTPM + "<br>" +
                        "<b>Responsable del puesto de trabajo</b>: " + orderZMEJ.ResponsableDelPuestoDetrabajo + "<br>" +
                        "<b>Responsable Ejecutor</b>: " + orderZMEJ.ResponsableEjecutor + "<br>" +
                        "<b>Descripciòn Del Equipo</b>: " + orderZMEJ.DescripcionDelEquipo + "<br>" +
                        "<b>Codigo Del Equipo</b>: " + orderZMEJ.CodigoDelEquipo + "<br>" +
                        "<b>Norma de liquidaciòn</b>: " + orderZMEJ.CodigoNormaDeLiquidacion + "<br>" +
                        "<b>Costo Planeado</b>: " + orderZMEJ.CostoPlaneado + "<br>";

                        sendEmail.subject = "ORDEN-ZMEJ:  Se creo una Orden ZMEJ";
                        EmailRecipient emailRecipients = new EmailRecipient();
                        emailRecipients.Name = userData.FullName;
                        emailRecipients.Email = userData.Email;//"yamurillo@newsoft.com.co";
                        //emailRecipients.Email = userData.Email;
                        sendEmail.emailRecipients.Add(emailRecipients);
                        // añadir a monica y Carlos Martinees 
                        // nota cambiar esto por un envio dinamico
                            emailRecipients.Email = "mmgiraldo@noel.com.co";
                        sendEmail.emailRecipients.Add(emailRecipients);
                            emailRecipients.Email = "cmartine@noel.com.co";
                        sendEmail.emailRecipients.Add(emailRecipients);

                        _notificationService.SendEmail(sendEmail);
                    }
                }
                //cosultar usuario por ids
               // var userId = await _userService.GetUserByIdyAsync(2);
            }
            //paso 3 enviar correo electronico a los usuarios  que se encuentran en el paso 2
            // return new JsonResult(r);

            var data = await _orderZMEJService.GetUserByIdStatus(2);
          //  var r = data.ToString();
            return new JsonResult(data);
        }

        //[Authorize(Roles = "HRManager,Finance")]
        
        [HttpPost("update")]
       // [Authorize(Roles = "ADMIN,ADMINZMEJ,ADMINMANTENIMIENTO")]
        // [Authorize]

        public async Task<IActionResult> UpdateOrder([FromBody] OrderZMEJ orderZMEJ)
        {

            //paso 1 crear Orden
            var r = await _orderZMEJService.Update(orderZMEJ);
            //paso 2 Buscar buscar al usuario asignado
            if (r.OrderId != Guid.Empty )
            {
                orderZMEJ.Id = r.OrderId;
                if (orderZMEJ.AsignadoA != Guid.Empty && orderZMEJ.enviarCorreo)
                {
                    var userData = await _userService.GetUserByIdyAsync(orderZMEJ.AsignadoA);
                    var userProponenteData = await _userService.GetUserByIdyAsync(orderZMEJ.Proponente);
                    if (userData != null)
                    {
                        var url = _urls.Frontendurl + UrlsConfig.FrontendOperations.OrderDetails(r.OrderId);
                        // enviar notificaciòn
                        SendEmail sendEmail = new SendEmail();

                        var proponente = userProponenteData != null ? userProponenteData.FullName : null;
                        sendEmail.body = "<b>Nombre de La orden</b>: <a href='" + url + "'> " + orderZMEJ.Nombre + " </a>  <br>" +
                        "<b>Descripción</b>: " + orderZMEJ.Descripcion + " <br>" +
                        "<b>Pet</b>: " + orderZMEJ.NombreDelPet + "<br>" +
                        "<b>Proponente</b>: " + proponente + "<br>" +
                        "<b>PasoTPM</b>: " + orderZMEJ.PasoTPM + "<br>" +
                        "<b>Responsable del puesto de trabajo</b>: " + orderZMEJ.ResponsableDelPuestoDetrabajo + "<br>" +
                        "<b>Responsable Ejecutor</b>: " + orderZMEJ.ResponsableEjecutor + "<br>" +
                        "<b>Descripciòn Del Equipo</b>: " + orderZMEJ.DescripcionDelEquipo + "<br>" +
                        "<b>Codigo Del Equipo</b>: " + orderZMEJ.CodigoDelEquipo + "<br>" +
                        "<b>Norma de liquidaciòn</b>: " + orderZMEJ.CodigoNormaDeLiquidacion + "<br>" +
                        "<b>Costo Planeado</b>: " + orderZMEJ.CostoPlaneado + "<br>";

                        sendEmail.subject = "ORDEN-ZMEJ:  Se creo una Orden ZMEJ";
                        EmailRecipient emailRecipients = new EmailRecipient();
                        emailRecipients.Name = userData.FullName;
                        emailRecipients.Email = userData.Email;//"yamurillo@newsoft.com.co";
                        //emailRecipients.Email = userData.Email;
                        sendEmail.emailRecipients.Add(emailRecipients);
                        _notificationService.SendEmail(sendEmail);
                    }
                }
              
                //cosultar usuario por ids
                // var userId = await _userService.GetUserByIdyAsync(2);
            }
            else
            {
                if (r.StatusCode == "403")
                {
                    return StatusCode(403);
                }

                return BadRequest("error al actualizar");
            }
            //paso 3 enviar correo electronico a los usuarios  que se encuentran en el paso 2
            // return new JsonResult(r);

            var data = await _orderZMEJService.GetUserByIdStatus(2);
            //  var r = data.ToString();
            return new JsonResult(data);
        }

        [HttpPost("aproved")]
        public async Task<IActionResult> Aproved([FromBody] AprovedOrderZMEJ aprovedOrderZMEJ)
        {

            // consultar order por ID
            var orderZMEJ = await _orderZMEJService.GetById(aprovedOrderZMEJ.Id);
            if (orderZMEJ!=null){
                //paso 2 crear Orden
                var r = await _orderZMEJService.Approved(aprovedOrderZMEJ);
                //paso 2 Buscar buscar al usuario asignado
                if (r)
                {
                    if (aprovedOrderZMEJ.AsignadoA != Guid.Empty)
                    {
                        var userData = await _userService.GetUserByIdyAsync(aprovedOrderZMEJ.AsignadoA);
                        if (userData != null)
                        {
                            // enviar notificaciòn
                            var url = _urls.Frontendurl+ UrlsConfig.FrontendOperations.OrderDetails(aprovedOrderZMEJ.Id);
                            SendEmail sendEmail = new SendEmail();
                            sendEmail.body = "<b>La orden </b>: <a href='"+url+ "'> " + orderZMEJ.Nombre + " </a>fue aprobada  <br>" +
                            "<b>Descripciòn</b>: " + orderZMEJ.Descripcion + " <br>" +
                                "<b>Pet</b>: " + orderZMEJ.NombreDelPet + "<br>" +
                                "<b>Proponente</b>: " + orderZMEJ.Proponente + "<br>" +
                                "<b>PasoTPM</b>: " + orderZMEJ.PasoTPM + "<br>" +
                                "<b>Responsable del puesto de trabajo</b>: " + orderZMEJ.ResponsableDelPuestoDetrabajo + "<br>" +
                                "<b>Responsable Ejecutor</b>: " + orderZMEJ.ResponsableEjecutor + "<br>" +
                                "<b>Descripciòn Del Equipo</b>: " + orderZMEJ.DescripcionDelEquipo + "<br>" +
                                "<b>Codigo Del Equipo</b>: " + orderZMEJ.CodigoDelEquipo + "<br>" +
                                "<b>Norma de liquidaciòn</b>: " + orderZMEJ.CodigoNormaDeLiquidacion + "<br>" +
                                "<b>Costo Planeado</b>: " + orderZMEJ.CostoPlaneado + "<br>";

                            sendEmail.subject = "ORDEN-ZMEJ: Orden Aprobada ZMEJ: "+ orderZMEJ.Nombre;
                            EmailRecipient emailRecipients = new EmailRecipient();
                            emailRecipients.Name = userData.FullName;
                            emailRecipients.Email = userData.Email;
                            //emailRecipients.Email = userData.Email;
                            sendEmail.emailRecipients.Add(emailRecipients);
                            _notificationService.SendEmail(sendEmail);
                        }
                    }
                    //cosultar usuario por ids
                    // var userId = await _userService.GetUserByIdyAsync(2);
                }
                //paso 3 enviar correo electronico a los usuarios  que se encuentran en el paso 2
                // return new JsonResult(r);

                var data = await _orderZMEJService.GetUserByIdStatus(2);
                //  var r = data.ToString();
                return Ok();
            }
            else
            {
                return BadRequest("No se encontro la orden");
            }
          
        }
        [HttpPost("reject")]
        public async Task<IActionResult> reject([FromBody] AprovedOrderZMEJ aprovedOrderZMEJ)
        {

            // consultar order por ID
            var orderZMEJ = await _orderZMEJService.GetById(aprovedOrderZMEJ.Id);
            if (orderZMEJ != null)
            {
                //paso 2 crear Orden
                var r = await _orderZMEJService.Reject(aprovedOrderZMEJ);
                //paso 2 Buscar buscar al usuario asignado
                if (r)
                {
                    if (aprovedOrderZMEJ.AsignadoA != Guid.Empty)
                    {
                        var userData = await _userService.GetUserByIdyAsync(aprovedOrderZMEJ.AsignadoA);
                        // var userData = await _userService.GetUserByIdyAsync(orderZMEJ.RemitidoPor);
                        if (userData != null)
                        {
                            var url = _urls.Frontendurl + UrlsConfig.FrontendOperations.OrderDetails(aprovedOrderZMEJ.Id);
                            // enviar notificaciòn
                            SendEmail sendEmail = new SendEmail();
                            sendEmail.body = "<b>Se rechazo la orden </b>: <a href='" + url + "'> " + orderZMEJ.Nombre + " </a> <br>" +
                                "<b>Descripciòn</b>: " + orderZMEJ.Descripcion + " <br>" +
                                "<b>Pet</b>: " + orderZMEJ.NombreDelPet + "<br>" +
                                "<b>Proponente</b>: " + orderZMEJ.Proponente + "<br>" +
                                "<b>PasoTPM</b>: " + orderZMEJ.PasoTPM + "<br>" +
                                "<b>Responsable del puesto de trabajo</b>: " + orderZMEJ.ResponsableDelPuestoDetrabajo + "<br>" +
                                "<b>Responsable Ejecutor</b>: " + orderZMEJ.ResponsableEjecutor + "<br>" +
                                "<b>Descripciòn Del Equipo</b>: " + orderZMEJ.DescripcionDelEquipo + "<br>" +
                                "<b>Codigo Del Equipo</b>: " + orderZMEJ.CodigoDelEquipo + "<br>" +
                                "<b>Norma de liquidaciòn</b>: " + orderZMEJ.CodigoNormaDeLiquidacion + "<br>" +
                                "<b>Costo Planeado</b>: " + orderZMEJ.CostoPlaneado + "<br>";

                            sendEmail.subject = "ORDEN-ZMEJ:  Orden Rechazada ZMEJ: "+ orderZMEJ.Nombre;
                            EmailRecipient emailRecipients = new EmailRecipient();
                            emailRecipients.Name = userData.FullName;
                            emailRecipients.Email = userData.Email;
                            //emailRecipients.Email = userData.Email;
                            sendEmail.emailRecipients.Add(emailRecipients);
                            _notificationService.SendEmail(sendEmail);
                        }
                    }
                    //cosultar usuario por ids
                    // var userId = await _userService.GetUserByIdyAsync(2);
                }
                //paso 3 enviar correo electronico a los usuarios  que se encuentran en el paso 2
                // return new JsonResult(r);

                var data = await _orderZMEJService.GetUserByIdStatus(2);
                //  var r = data.ToString();
                return Ok();
            }
            else
            {
                return BadRequest("No se encontro la orden");
            }

        }


        public async Task<ActionResult<string>> getById()
        {



            return new JsonResult("");
        } 
    }
}