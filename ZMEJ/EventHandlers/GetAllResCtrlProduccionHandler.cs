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
    public class GetAllResCtrlProduccionHandler : IRequestHandler<GetAllResCtrlProduccionQuery, IEnumerable<ResCtrlProduccion>>
    {
        private IResCtrlProduccionRepository _resCtrlProduccionRepository;

        public GetAllResCtrlProduccionHandler(IResCtrlProduccionRepository resCtrlProduccionRepository)
        {
            _resCtrlProduccionRepository = resCtrlProduccionRepository;
        }
        public async Task<IEnumerable<ResCtrlProduccion>> Handle(GetAllResCtrlProduccionQuery request, CancellationToken cancellationToken)
        {
            var data = await _resCtrlProduccionRepository.GetAll(request.Centro);
            return data;
        }
    }
}
