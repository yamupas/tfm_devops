
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

namespace ZMEJ.EventHandlers
{
    public class GetRoleStatusByCodeHandler : IRequestHandler<GetRoleStatusByCodeQuery, IEnumerable<RoleStatusCode>>
    {
        private IRoleStatusCodeRepository _repository;

        public GetRoleStatusByCodeHandler(IRoleStatusCodeRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<RoleStatusCode>> Handle(GetRoleStatusByCodeQuery request, CancellationToken cancellationToken)
        {
            try
            {
              var  data= await _repository.GetAllByCodeAsync(request.Code);
              return data;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

    }
}
