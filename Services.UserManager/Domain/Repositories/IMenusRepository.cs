using Services.UserManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Repositories
{
    public interface IMenusRepository
    {
        Task<List<Menu>> getAllMenus(Guid AplicationId);
        Task<List<Menu>> getAllByUSerRole(string userId, Guid AplicationId);
        Task<bool> addMenu(Menu menu);
        Task<bool> updateMenu(Menu menu);
        Task<bool> delete(int id);
    }
}
