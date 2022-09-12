
using DataManagement.Common.Exceptions;

using Services.UserManager.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Models
{
    public class User
    {
        public int Id { get; protected set; }
        public Guid Uuid { get; protected set; }
        public string Centro { get; protected set; }
        public string Usuario { get; protected set; }
        public string Nombre { get; protected set; }
        public string Rol { get; protected set; }
        public string Clave { get; protected set; }
        public Boolean AdministradorCentro { get; protected set; }
       


        protected User()
        {
        }

        public User(string usuario,string centro,string nombre,string rol,Boolean administradorCentro)
        {
            if (string.IsNullOrWhiteSpace(usuario))
            {
                throw new ActioException("empty_user_email",
                    "User Name can not be empty.");
            }
            if (string.IsNullOrWhiteSpace(centro))
            {
                throw new ActioException("empty_centro",
                    "facility can not be empty.");
            }
            if (string.IsNullOrWhiteSpace(nombre))
            {
                throw new ActioException("empty_name",
                    "name can not be empty.");
            }
            if (string.IsNullOrWhiteSpace(rol))
            {
                throw new ActioException("empty_role",
                    "the role can not be empty.");
            }
           

            Uuid = Guid.NewGuid();
            Usuario = usuario.ToLowerInvariant();
            Centro = Centro.ToLowerInvariant();
            Nombre = nombre;
            AdministradorCentro = administradorCentro;
         
           // SetNormalizedEmail();
        }

        public void SetPassword(string password, IEncrypterSha1 encrypter)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ActioException("empty_password",
                    "Password can not be empty.");
            }
           
            Clave = encrypter.GetHash(password);
        }


        public bool ValidatePassword(string password, IEncrypterSha1 encrypter)
            => Clave.Equals(encrypter.GetHash(password));
    }
}
