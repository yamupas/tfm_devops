using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DataManagement.Common.Upload
{
    public interface IFileInfoHandler
    {
        Stream GetFileStream(string filePath, FileMode mode);

        bool Exists(string filePath);

        void Delete(string path);

        string GetFilePathWithWebRoot(string folderPath, string fileName);

        string GetUniqName();
    }
}
