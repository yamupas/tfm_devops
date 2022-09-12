using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataManagement.Common.Upload
{
    public interface IFileUploadManager
    {
        Task<string> Upload(IFormFile file);

        void Remove(string fileName);

        bool HasFile(string fileName);
    }
}
