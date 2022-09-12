using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Services;
using Services.UserManager.Extensions;

namespace Services.UserManager.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
  //  [EnableCors("AllowAll")]
    public class AccountController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IEncrypter _encrypter;
        private IAuthService _authService;
        private IIdentityService _identityService;
        private IUserManagerService _userManagerService;
        public AccountController(IAuthService authService, IUserManagerService managerService, IIdentityService identityService, IEncrypter encrypter, IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _authService = authService;
            _identityService = identityService;
            _encrypter = encrypter;
            _userManagerService = managerService;
        }
        [HttpGet("check")]
        public IActionResult GetCheck()
        {
            //var Us = new User();
            //var Password=Us.SetPassword("123456")
           return Ok( "Hi. This is IdentityServices") ;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest user)
        {
            try
            {
               
                if (user.UserName == string.Empty || user.UserName == null)
                    user.UserName = user.Email;

                var LDAPUser = await _authService.LoginAsync(user.UserName, user.Password);

                if (LDAPUser == null)
                    return BadRequest(new { message = "Señor Usuario Ocurrio un error, Es probable que sus credenciales no sean correctas. Intentelo de nuevo" });



                if (LDAPUser.LockoutEnabled)
                {
                    return BadRequest(new { message = "Señor Usuario esta cuenta se encuentra deshabilitada, contacta al administrador" });
                }

                var token = GenerateToken(LDAPUser);
                return new JsonResult(token);
               
            }
            catch (Exception ex)
            {

                throw;
            }

            // return Ok(new { data = token });
        }


        [AllowAnonymous]
        [HttpPost("loginApp")]
        public async Task<IActionResult> LoginForApplication([FromBody] AuthRequest user)
        {
            try
            {

                if (user.UserName == string.Empty || user.UserName == null)
                    user.UserName = user.Email;

                AspNetUser LDAPUser;
                LDAPUser = await _authService.LoginAppAsync(user.UserName, user.Password, Guid.Parse(user.ApplicationId));
                //if (user.IsApplication)
                //{
                //     LDAPUser = await _authService.LoginAppAsync(user.UserName, user.Password, Guid.Parse(user.ApplicationId));
                //}
                //else
                //{
                //    //iniciar sesiòn con directorio activo..
                //     LDAPUser = await _authService.LoginADAsync(user.UserName, user.Password, Guid.Parse(user.ApplicationId));
                //}

                if (LDAPUser == null)
                    return BadRequest(new { message = "Señor Usuario Ocurrio un error, Es probable que sus credenciales no sean correctas. Intentelo de nuevo" });



                if (LDAPUser.LockoutEnabled)
                {
                    return BadRequest(new { message = "Señor Usuario esta cuenta se encuentra deshabilitada, contacta al administrador" });
                }

                //validar usuario de APP


                var token = GenerateToken(LDAPUser,user.ApplicationId);
                return new JsonResult(token);

            }
            catch (Exception ex)
            {

                throw;
            }

            // return Ok(new { data = token });
        }

        [AllowAnonymous]
        [HttpPost("refreshtokenApp")]
        public async Task<IActionResult> refreshtokenApp([FromBody] RefreshTokenRequest user)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(user.refresh_token);
                var tokenS = handler.ReadToken(user.refresh_token) as JwtSecurityToken;
                var userId = tokenS.Claims.First(claim => claim.Type == "sub").Value;
                var applicationId = tokenS.Claims.First(claim => claim.Type == "applicationId").Value;


                //  var userId = _identityService.GetUserIdentity();
                var LDAPUser = _authService.GetById(Guid.Parse(userId));
                if (LDAPUser == null)
                    return BadRequest(new { message = "Username of password incorrect" });

                if (LDAPUser.LockoutEnabled)
                {
                    return BadRequest(new { message = "This account is disable" });
                }

                if (applicationId == null)
                {
                    applicationId = string.Empty;
                }
                else
                {
                    var roles = await _authService.GetUserRoleByIdAsync(LDAPUser.Id, Guid.Parse(applicationId));
                    LDAPUser.Roles = roles.ToList();
                    //optener roles por aplicacion
                }


                var token = GenerateToken(LDAPUser, applicationId);
                return new JsonResult(token);

            }
            catch (Exception ex)
            {

                throw;
            }



            // return Ok(new { data = token });
        }


        [AllowAnonymous]
        [HttpPost("refreshtoken")]
        public async Task<IActionResult> Refreshtoken([FromBody] RefreshTokenRequest user)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(user.refresh_token);
                var tokenS = handler.ReadToken(user.refresh_token) as JwtSecurityToken;
                var userId = tokenS.Claims.First(claim => claim.Type == "sub").Value;
                var applicationId = tokenS.Claims.First(claim => claim.Type == "applicationId").Value;
               

       //  var userId = _identityService.GetUserIdentity();
            var LDAPUser =  _authService.GetById(Guid.Parse(userId));
                if (LDAPUser == null)
                    return BadRequest(new { message = "Username of password incorrect" });

                if (LDAPUser.LockoutEnabled)
                {
                    return BadRequest(new { message = "This account is disable" });
                }

                if (applicationId == null)
                {
                    applicationId = string.Empty;
                }
                else
                {
                    //optener roles por aplicacion
                }
                   

                var token = GenerateToken(LDAPUser, applicationId);
                return new JsonResult(token);
              
            }
            catch (Exception ex)
            {

                throw;
            }



            // return Ok(new { data = token });
        }

        private AccessTokenResource GenerateToken(AspNetUser LDAPUser,string applicationId="")
        {
            try
            {
                


                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.AuthKey);
                //{"sub", userId},
                // {"unique_name", userId}
                var expireTime = DateTime.UtcNow.AddDays(7);
                var claims = new List<Claim>
            {
                        new Claim(ClaimTypes.Name, LDAPUser.Id.ToString()),
                        new Claim("username", LDAPUser.UserName ),
                        new Claim("sub", LDAPUser.Id.ToString() ),
                        new Claim("applicationId", applicationId ),
                        new Claim("unique_name", LDAPUser.Id.ToString()  ),
                        new Claim("organisationid", LDAPUser.OrganisationId.ToString()),
            };
                if (LDAPUser.organisationinfo != null)
                {
                    claims.Add(new Claim("center", LDAPUser.organisationinfo.Name));
                }
                else
                {
                    claims.Add(new Claim("center", string.Empty));
                }
                claims.Add(new Claim(ClaimTypes.Role, "guest"));
                if (LDAPUser.Roles != null && LDAPUser.Roles.Count > 0)
                {
                    foreach (var role in LDAPUser.Roles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, role.Name));
                    }
                }


                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    //Subject = new ClaimsIdentity(new Claim[]
                    //{
                    //    new Claim(ClaimTypes.Name, LDAPUser.Id.ToString()),
                    //    new Claim("username", user.UserName ),
                    //    new Claim("sub", LDAPUser.Id.ToString() ),
                    //    new Claim("unique_name", LDAPUser.Id.ToString()  ),
                    //    new Claim("organisationid", LDAPUser.OrganisationId.ToString()),
                    //}),
                    Expires = expireTime,//DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var stoken = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(stoken);
                var token = new { token = tokenString };

                //expireTime
                //DateTimeOffset.UtcNow.AddMinutes(Convert.ToInt32(tokenLifetime));

                var data = new AccessTokenResource();
                data.Expiration = 24 * 60 * 7;
                data.AccessToken = tokenString;
                data.RefressToken = tokenString;

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            try
            {
                var userId = _identityService.GetUserIdentity();
                if(changePasswordRequest.NewPassword!= changePasswordRequest.NewPassword)
                {
                    return BadRequest(new { message = "la contraseña no coinciden." });
                }
                //  var userId = _identityService.GetUserIdentity();
                var user =  _authService.GetById(Guid.Parse(userId));
                if (!user.ValidatePassword(changePasswordRequest.OldPassword, _encrypter))
                {
                    return BadRequest(new { message = "la contraseña no coinciden." });
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                user.SetPassword(changePasswordRequest.NewPassword, _encrypter);
                var data = await _userManagerService.ChangePasswordAsync(user);
                if (data != null)
                {
                    return Ok();
                }
                return BadRequest(new { message = "error al cambiar la contraseña." });


                //    return user;

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
