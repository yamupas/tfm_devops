using Services.UserManager.Domain.Models;
using Services.UserManager.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.UserManager.Domain.Services
{
    public class MenusService : IMenusService
    {
        private IMenusRepository _menusRepository;

        public MenusService(IMenusRepository menusRepository)
        {
            _menusRepository = menusRepository;
        }
        public async Task<bool> addMenu(Menu menu)
        {
            return await _menusRepository.addMenu(menu);
        }

        public async Task<bool> delete(int id)
        {
            return await _menusRepository.delete(id);
        }

        public async Task<List<Menu>> getAllByUSerRole(string userId, Guid AplicationId)
        {
            return await _menusRepository.getAllByUSerRole(userId, AplicationId);
        }

        public async Task<List<Menu>> getAllMenus(Guid AplicationId)
        {
            return await _menusRepository.getAllMenus(AplicationId);
        }

        public async Task<bool> updateMenu(Menu menu)
        {
            return await _menusRepository.updateMenu(menu);
        }
    }
}
