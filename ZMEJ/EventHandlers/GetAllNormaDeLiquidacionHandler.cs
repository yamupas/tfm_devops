using MediatR;
using ZMEJ.EventHandlers.Commands;
using ZMEJ.Domain.models;
using ZMEJ.Domain.Repositories;
using ZMEJ.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ZMEJ.Queries;
using ZMEJ.Dtos;

namespace ZMEJ.EventHandlers
{
    public class GetAllNormaDeLiquidacionHandler : IRequestHandler<GetAllNormaDeLiquidacionQuery, IEnumerable<NormaDeLiquidacionDto>>
    {
        private INormaDeLiquidacionRepository _repository;

        public GetAllNormaDeLiquidacionHandler(INormaDeLiquidacionRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<NormaDeLiquidacionDto>> Handle(GetAllNormaDeLiquidacionQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _repository.GetAllAsync("");
                var r = result.Select(p => new NormaDeLiquidacionDto
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                }).ToList();
                return r;
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
               
            }
          
            //throw new NotImplementedException();
        }
    }
}
