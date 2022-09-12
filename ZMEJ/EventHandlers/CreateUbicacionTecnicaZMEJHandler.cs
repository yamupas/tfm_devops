using MediatR;
using ZMEJ.EventHandlers.Commands;

using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers
{
    public class CreateUbicacionTecnicaZMEJHandler : IRequestHandler<CreateUbicacionTecnicaCommand, CreateResultData>
    {
        private IUbicacionTecnicaRepository _ubicacionTecnicaRepository;
        private IIdentityService _identityServices;

        public CreateUbicacionTecnicaZMEJHandler(IUbicacionTecnicaRepository ubicacionTecnicaRepository ,IIdentityService identityServices)
        {
            _ubicacionTecnicaRepository = ubicacionTecnicaRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateResultData> Handle(CreateUbicacionTecnicaCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var vResCtrlProduccion = new UbicacionTecnica(request.Ubicacion,request.Descripcion,request.Centro,true);
                  
                var r = await _ubicacionTecnicaRepository.Save(vResCtrlProduccion);             
                return new CreateResultData
                {
                    Id= vResCtrlProduccion.uuid
                };
               // return r;
            }
            catch (Exception ex)
            {

                throw new NotImplementedException();
            }
            //return false;
            //throw new NotImplementedException();
        }

    }
}
