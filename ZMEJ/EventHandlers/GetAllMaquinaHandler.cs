using MediatR;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Queries;

namespace ZMEJ.EventHandlers
{
    public class GetAllMaquinaHandler : IRequestHandler<GetAllMaquinaQuery, IEnumerable<TMaquinas>>
    {
        private IMaquinasRepository _maquinaRepository;
        private ILogger<GetAllMaquinaHandler> _logger;

        public GetAllMaquinaHandler(IMaquinasRepository maquinaRepository,ILogger<GetAllMaquinaHandler> logger)
        {
            _maquinaRepository = maquinaRepository;
            _logger = logger;
        }
        public async Task<IEnumerable<TMaquinas>> Handle(GetAllMaquinaQuery request, CancellationToken cancellationToken)
        {
            try
            {
               // _logger.LogInformation("Consultado maquinas..");
                var r = await _maquinaRepository.GetAll(request.Centro);
                //if (r != null) 
                //{
                //    var maquinas = new TMaquinas();
                //    maquinas.Maquina = "";
                //    maquinas.Descripcion = "No Aplica";
                //    maquinas.CodTecnologia = "NA";
                //    r.Add(maquinas);
                //}
                return r;
            }
            catch (Exception ex)
            {
                _logger.LogError("error al consultar las maquinas..");
                return null;
            }
        }
    }
}
