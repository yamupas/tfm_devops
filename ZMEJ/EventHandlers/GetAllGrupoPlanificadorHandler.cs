using MediatR;

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
    public class GetAllGrupoPlanificadorHandler : IRequestHandler<GetAllGrupoPlanificadorQuery, IEnumerable<GruposPlanificacion>>
    {
        private IGruposPlanificacionRespository _gruposPlanificacionRespository;

        public GetAllGrupoPlanificadorHandler(IGruposPlanificacionRespository gruposPlanificacionRespository)
        {
            _gruposPlanificacionRespository = gruposPlanificacionRespository;
        }
        public async Task<IEnumerable<GruposPlanificacion>> Handle(GetAllGrupoPlanificadorQuery request, CancellationToken cancellationToken)
        {
            var data = await _gruposPlanificacionRespository.GetAll(request.Centro);
            return data;
        }
    }
}
