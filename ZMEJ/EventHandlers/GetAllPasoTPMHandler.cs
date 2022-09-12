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
    public class GetAllPasoTPMHandler : IRequestHandler<GetAllPasoTPMQuery, IEnumerable<PasoTPM>>
    {
        private IPasosTPMRepository _repository;

        public GetAllPasoTPMHandler(IPasosTPMRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<PasoTPM>> Handle(GetAllPasoTPMQuery request, CancellationToken cancellationToken)
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
