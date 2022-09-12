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
    public class FindClaseDeActividadByCodeHandler : IRequestHandler<FindClaseDeActividadByCodeQuery, ClaseDeActividadDto>
    {
        private IActividadesRepository _repository;

        public FindClaseDeActividadByCodeHandler(IActividadesRepository repository)
        {
            _repository = repository;
        }
        public async Task<ClaseDeActividadDto> Handle(FindClaseDeActividadByCodeQuery request, CancellationToken cancellationToken)
        {
           
            try
            {
                var result = await _repository.GetAsync(request.Id,"");
                
               return result != null ? new ClaseDeActividadDto
                {
                    Id = result.Id,
                    Nombre = result.Nombre,
                }:null;
               
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
