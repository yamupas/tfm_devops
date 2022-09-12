using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public interface IEncrypterSha1
    {
        string GetHash(string value);
    }
}
