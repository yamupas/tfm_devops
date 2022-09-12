using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface IEncrypter
    {
        string PaswordGenerate();
        string GetSalt();
        string GetHash(string value, string salt);
    }
}
