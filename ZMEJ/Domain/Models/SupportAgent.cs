using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Common;

namespace ZMEJ.Domain.models
{
    public class SupportAgent:Audit
    {
        public string Name { get; protected set; }
        public string Email { get; protected set; }
        public string ApplicationUserId { get; protected set; }
        public SupportAgent(string name,string email,string applicationUserId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            ApplicationUserId = applicationUserId;
            Createddate = DateTime.Now;
            Modifieddate = DateTime.Now;

        }
        public void SetCreateUserId(Guid vUserId)
        {
            Createdby = vUserId;
        }
        public void SetModifedUserId(Guid vUserId)
        {
            Modifiedby = vUserId;
        }
        public void SetOrganisation(Guid organisationId)
        {
            OrganisationId = organisationId;
        }

    }
   
}
