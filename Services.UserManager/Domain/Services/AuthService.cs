using DataManagement.Common.Auth;
using DataManagement.Common.Exceptions;
using Microsoft.Extensions.Logging;
using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repository;
        private readonly ILdapAuthenticationService _ldapAuthenticationService;
        private readonly IEncrypter _encrypter;
        private readonly IUserApplicationRepository _userApplicationRepository;
        private readonly IOrganisationinfoRepository _organisationinfoRepository;

        //   private readonly IJwtHandler _jwtHandler;       
        private readonly ILogger<IAuthService> _logger;

       
        public AuthService(
            IUserRepository repository,
            IEncrypter encrypter,
            IUserApplicationRepository userApplicationRepository,
            //  IJwtHandler jwtHandler,           
            ILdapAuthenticationService ldapAuthenticationService,
            IOrganisationinfoRepository organisationinfoRepository,
            ILogger<AuthService> logger)
        {
            _repository = repository;
            _ldapAuthenticationService = ldapAuthenticationService;
            _encrypter = encrypter;
            _userApplicationRepository = userApplicationRepository;
            _organisationinfoRepository = organisationinfoRepository;
            //   _jwtHandler = jwtHandler;

            _logger = logger;

        }
        public async Task<AspNetUser> LoginAsync(string email, string password)
        {
            try
            {
                _logger.LogInformation("Iniciando authenticacion");
                var user = await _repository.GetAsync(email);
                if (user == null)
                {
                    return null;
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                //get Roles by User
                var roles= await _repository.GetUserRoleByIdAsync(user.Id);
                user.Roles = roles.ToList();
                //validate LDAP
                var LDAPUser = await _ldapAuthenticationService.Login(email, password);
                if (LDAPUser != null)
                {
                    LDAPUser.Id = user.Id;
                    LDAPUser.Roles = user.Roles;
                    return LDAPUser;
                }
                //validate by password
                if (!user.ValidatePassword(password, _encrypter))
                {
                    return null;
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                return user;
            }
            catch (Exception ex)
            {
                return null;
                //throw new ActioException("invalid_credentials",
                //       $"Invalid credentials.");
            }

        }


        public async Task<IdentityResult> RegisterAsync(string email, string username, string password, string name, Guid OrganisationId)
        {
            var errors = new List<string>();

            try
            {
                var _identityResult = new IdentityResult();
               
                var user = await _repository.GetAsync(username);
                if (user != null)
                {
                    errors.Add(String.Format(CultureInfo.CurrentCulture, "El nombre de usuario ya existe", "UserName"));
                    return IdentityResult.Failed(errors.ToArray());
                    //throw new ActioException("email_in_use","Email or username :  "+ username + " is already in use.");
                }
                //validate LDAP
                var LDAPUser = await _ldapAuthenticationService.Login(email, password);
                if (LDAPUser == null)
                {
                    //return _jwtHandler.Create(user.Id, user.UserName, "Users", user.OrganisationId.ToString());
                }
                user = new AspNetUser(email, username, name, OrganisationId, false, false);
                //user.SetNormalizedEmail(emailConfirmed);
                user.SetPassword(password, _encrypter);
                await _repository.AddAsync(user);
                return IdentityResult.Success;
               

            }
            catch (Exception ex)
            {
                errors.Add(String.Format(CultureInfo.CurrentCulture, "El nombre de usuario ya existe", "UserName"));
                return IdentityResult.Failed(errors.ToArray());
                throw new NotImplementedException();
                //throw new ActioException("error_to_save",
                //   $"error. " + ex.ToString());
            }
            //throw new NotImplementedException();
        }

        public Task ForgotPassword(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<AspNetUser> FindByIdAsync(Guid userId)
        {
            try
            {
                var data = await _repository.GetAsync(userId);
                return data;
            }
            catch (Exception)
            {
                return null;
               // throw;
            }
           // throw new NotImplementedException();
        } public    AspNetUser GetById(Guid userId)
        {
            try
            {
                var data =  _repository.FindByIdAsync(userId);
                return data;
            }
            catch (Exception)
            {
                return null;
                // throw;
            }
            // throw new NotImplementedException();
        }
       

        public async Task ResetPassword(string email, string Code, string password)
        {
            try
            {
              
            }
            catch (ActioException ex)
            {

                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                //await _busClient.PublishAsync(new CreateActivityRejected(command.Id,
                //    ex.Message, "error"));
            }
        }

        public async Task<AspNetUser> LoginAppAsync(string email, string password, Guid ApplicationId)
        {
            try
            {
                _logger.LogInformation("Iniciando authenticacion");
                var user = await _repository.GetAsync(email);
                if (user == null)
                {
                    return null;
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                //validar usuario por aplicacion
                var result = await _userApplicationRepository.Validate(user.Id, ApplicationId);
                if (result == null)
                    return null;



                //get Roles by User for Application
                var roles = await _repository.GetUserRoleByIdAsync(user.Id,ApplicationId);
                if(roles!=null)
                    user.Roles = roles.ToList();

                if (user.OrganisationId != Guid.Empty)
                {
                    user.organisationinfo = await _organisationinfoRepository.getById(user.OrganisationId);
                }
                ////validate LDAP
                //var LDAPUser = await _ldapAuthenticationService.Login(email, password);
                //if (LDAPUser != null)
                //{
                //    LDAPUser.Id = user.Id;
                //    LDAPUser.Roles = user.Roles;
                //    return LDAPUser;
                //}
                //validate by password
                if (!user.ValidatePassword(password, _encrypter))
                {
                    return null;
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                return user;
            }
            catch (Exception ex)
            {
                return null;
                //throw new ActioException("invalid_credentials",
                //       $"Invalid credentials.");
            }

        }
        public async Task<AspNetUser> LoginADAsync(string email, string password, Guid ApplicationId)
        {
            try
            {
                _logger.LogInformation("Iniciando authenticacion");
                var user = await _repository.GetAsync(email);
                if (user == null)
                {
                    return null;
                    //throw new ActioException("invalid_credentials",
                    //    $"Invalid credentials.");
                }
                //validar usuario por aplicacion
                var result = await _userApplicationRepository.Validate(user.Id, ApplicationId);
                if (result == null)
                    return null;



                //get Roles by User for Application
                var roles = await _repository.GetUserRoleByIdAsync(user.Id, ApplicationId);
                if (roles != null)
                    user.Roles = roles.ToList();

                if (user.OrganisationId != Guid.Empty)
                {
                    user.organisationinfo = await _organisationinfoRepository.getById(user.OrganisationId);
                }
                //validate LDAP
                var LDAPUser = await _ldapAuthenticationService.Login(email, password);
                if (LDAPUser != null)
                {
                    LDAPUser.Id = user.Id;
                    LDAPUser.Roles = user.Roles;
                    return LDAPUser;
                }

                return null;
            }
            catch (Exception ex)
            {
                return null;
                //throw new ActioException("invalid_credentials",
                //       $"Invalid credentials.");
            }
        }

        public async Task<ICollection<Roles>> GetUserRoleByIdAsync(Guid UserId, Guid ApplicationId)
        {
            var roles = await _repository.GetUserRoleByIdAsync(UserId, ApplicationId);
            return roles;
        }

        
    }


}
