using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class EncrypterSha1 : IEncrypterSha1
    {
        public string GetHash(string value)
        {
            SHA1 sha1 = SHA1CryptoServiceProvider.Create();
            Byte[] textOriginal = ASCIIEncoding.Default.GetBytes(value);
            Byte[] hash = sha1.ComputeHash(textOriginal);
            StringBuilder cadena = new StringBuilder();
            foreach (byte i in hash)
            {
                cadena.AppendFormat("{0:x2}", i);
            }

            var pass = cadena.ToString().ToUpper();
            //pass = pass.Substring(2, pass.Length);

            return pass.ToUpper();

        }
    }
}
