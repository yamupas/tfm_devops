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
    public class UpdateMaquinaHandler : IRequestHandler<UpdateMaquinaCommand, CreateResultData>
    {
        private IMaquinasRepository _maquinasRepository;
        private IIdentityService _identityServices;

        public UpdateMaquinaHandler(IMaquinasRepository maquinasRepository ,IIdentityService identityServices)
        {
            _maquinasRepository = maquinasRepository;
            _identityServices = identityServices;
        }
        public async Task<CreateResultData> Handle(UpdateMaquinaCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var userName = _identityServices.GetUserName();
                var maquinas = new TMaquinas(request.Maquina,request.Descripcion);
                maquinas.uuid = request.uuid;

                var data = await _maquinasRepository.GetByCode(request.Centro, request.Maquina);
                if (data != null && data.uuid!=request.uuid)
                {
                    throw new ArgumentException("El codigo ya existe.", "original");
                }


              var r = _maquinasRepository.Update(maquinas);             
                return new CreateResultData
                {
                    Id= r.uuid
                };
               // return r;
            }
            catch (Exception ex)
            {

                throw new ArgumentException("ERROR al actualizar.", "original");
                // throw new NotImplementedException();
            }
            //return false;
            //throw new NotImplementedException();
        }

    }
}
