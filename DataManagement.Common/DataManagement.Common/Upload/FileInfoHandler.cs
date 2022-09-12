using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DataManagement.Common.Upload
{
    public class FileInfoHandler : IFileInfoHandler
    {
        private readonly IHostingEnvironment _appEnvironment;

        public FileInfoHandler(IHostingEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }
        public Stream GetFileStream(string filePath, FileMode mode)
        {
            return new FileStream(filePath, mode);
        }

        public bool Exists(string filePath)
        {
            return File.Exists(filePath);
        }

        public void Delete(string path)
        {
            File.Delete(path);
        }

        public string GetFilePathWithWebRoot(string folderPath, string fileName)
        {
            var folder = _appEnvironment.WebRootPath + folderPath;
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            return folder + fileName;
        }

        public string GetUniqName()
        {
            return $"{DateTime.Now:dd_mm_yyyy_H_mm_ss}_{Guid.NewGuid()}";
        }
    }
}
