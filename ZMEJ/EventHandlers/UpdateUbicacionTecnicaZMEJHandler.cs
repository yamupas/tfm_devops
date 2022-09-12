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
    public class UpdateUbicacionTecnicaZMEJHandler : IRequestHandler<UpdateUbicacionTecnicaCommand, CreateResultData>
    {
        private IUbicacionTecnicaRepository _ubicacionTecnicaRepository;
        private IIdentityService _identityServices;

        public UpdateUbicacionTecnicaZMEJHandler(IUbicacionTecnicaRepository ubicacionTecnicaRepository ,IIdentityService identityServices)
        {
            _ubicacionTecnicaRepository = ubicacionTecnicaRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateResultData> Handle(UpdateUbicacionTecnicaCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();

                var ubicacionTecnica = await _ubicacionTecnicaRepository.GetById(request.uuid);
                if (ubicacionTecnica == null)
                {
                    throw new NotImplementedException();
                }
                ubicacionTecnica.Descripcion = request.Descripcion;
                ubicacionTecnica.Ubicacion = request.Ubicacion;
                ubicacionTecnica.Estado = request.Estado;


                var r = await _ubicacionTecnicaRepository.Update(ubicacionTecnica);             
                return new CreateResultData
                {
                    Id= ubicacionTecnica.uuid
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
