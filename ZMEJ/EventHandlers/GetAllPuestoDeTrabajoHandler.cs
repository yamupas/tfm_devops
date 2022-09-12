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
    public class GetAllPuestoDeTrabajoHandler : IRequestHandler<GetAllPuestoDeTrabajoQuery, IEnumerable<PuestoDeTrabajo>>
    {
        private IPuestoDeTrabajoRepository _repository;

        public GetAllPuestoDeTrabajoHandler(IPuestoDeTrabajoRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<PuestoDeTrabajo>> Handle(GetAllPuestoDeTrabajoQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var data = await _repository.GetAll();
                return data;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
