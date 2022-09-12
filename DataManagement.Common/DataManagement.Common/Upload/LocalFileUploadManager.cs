using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.IO;
using System.Threading.Tasks;


namespace DataManagement.Common.Upload
{
    public class LocalFileUploadManager : IFileUploadManager
    {
        private readonly IFileInfoHandler _fileInfoHandler;
        private readonly Folders folders;
        private IConfiguration _configuration;

        public LocalFileUploadManager(IFileInfoHandler fileInfoHandler, IOptions<Folders> options)
        {
            _fileInfoHandler = fileInfoHandler;
            folders = options.Value;
            
        }

        public async Task<string> Upload(IFormFile file)
        {
            //var uploadPath = _configuration.GetConnectionString("uploadFile");

            var uploadedFileName = $"{_fileInfoHandler.GetUniqName()}_{file.FileName}";
            var filePath = _fileInfoHandler.GetFilePathWithWebRoot(folders.UploadFilesPath, uploadedFileName);
            //var filePath = _fileInfoHandler.GetFilePathWithWebRoot(Folders.UploadFilesPath, uploadedFileName);
            using (var fileStream = _fileInfoHandler.GetFileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return uploadedFileName;
        }

        public void Remove(string fileName)
        {
            if (_fileInfoHandler.Exists(fileName))
                _fileInfoHandler.Delete(fileName);
        }

        public bool HasFile(string fileName)
        {
            return _fileInfoHandler.Exists(fileName);
        }
    }
}
