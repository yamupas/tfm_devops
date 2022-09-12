using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using ZMEJ.EventHandlers.Commands;

namespace ZMEJ.EventHandlers
{
    public class UpdateMantenimeintoOrderZMEJHandler : IRequestHandler<UpdateMantenimeintoOrderZMEJCommand, bool>
    {
        private IOrderZMEJRepository _orderZMEJRepository;
        private IIdentityService _identityServices;

        public UpdateMantenimeintoOrderZMEJHandler(IOrderZMEJRepository orderZMEJRepository, IIdentityService identityServices)
        {
            _orderZMEJRepository = orderZMEJRepository;
            _identityServices = identityServices;
        }
        public async Task<bool> Handle(UpdateMantenimeintoOrderZMEJCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userid = Guid.Parse(_identityServices.GetUserIdentity());
                var username = _identityServices.GetUserName();
                var data = await _orderZMEJRepository.GetAsync(request.Id, "");
                //si no se encuentra cancelado.
                if (data != null && data.Estado!=7)
                {
                    data.Evidencia = request.Evidencia;
                    data.TipodeTrabajo = request.TipodeTrabajo;
                    data.OrdenMantenimiento = request.OrdenMantenimiento;
                    data.NotaMantenimiento = request.NotaMantenimiento;
                    data.SetUsuarioModificacion(username);

                    await _orderZMEJRepository.UpdateMantemientoAsync(data);
                    return true;

                }
                return false;

            }
            catch (Exception ex)
            {
                return false;
                //throw;
            }
           

            throw new NotImplementedException();
        }
    }
}
