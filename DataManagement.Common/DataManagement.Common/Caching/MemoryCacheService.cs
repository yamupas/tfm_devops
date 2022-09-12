/*
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataManagement.Common.Caching
{
    public class MemoryCacheService : IMemoryCacheService
    {
        private readonly IMemoryCache _memoryCache;
        public MemoryCacheService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;


        }
        public void DeleteCache(string key)
        {
            try
            {
                
                _memoryCache.Remove(key);
               
            }
            catch (Exception ex)
            {
                

            }
        }

        public string GetCache(string key)
        {
            try
            {
                string value = string.Empty;
                _memoryCache.TryGetValue(key, out value);
                return value;
            }
            catch (Exception ex)
            {
                return string.Empty;
               
            }
        }

        public void SetCache(CacheRequest data, MemoryCacheEntryOptions cacheExpiryOptions )
        {
            try
            {
                //var cacheExpiryOptions = new MemoryCacheEntryOptions
                //{
                //    AbsoluteExpiration = DateTime.Now.AddDays(1),
                //    Priority = CacheItemPriority.Low,
                //    SlidingExpiration = TimeSpan.FromMinutes(2),
                //    Size = 1024,
                //};
                _memoryCache.Set(data.key, data.value, cacheExpiryOptions);
            }
            catch (Exception ex)
            {

                
            }
        }
    }
}
*/