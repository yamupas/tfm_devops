using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Controllers
{
    [Route("/")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        public DefaultController()
        {
                
        }
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Running..";
        }
    }
}
