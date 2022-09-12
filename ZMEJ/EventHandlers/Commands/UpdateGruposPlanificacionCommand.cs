using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZMEJ.Domain.Models;

namespace ZMEJ.EventHandlers.Commands
{
    public class UpdateGruposPlanificacionCommand : IRequest<CreateOrderResult>
    {
        public Guid Id { get; set; }
        public string Centro { get; set; }
        public Guid ResControlProdId { get; set; }
        public string GrupoPlanificador { get; set; }
        public string Descripcion { get; set; }       
        public Boolean Estado { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime FechaModificacion { get; set; }
        public string UltimoUsuarioModificacion { get; set; }
      
        

        //public UpdateGruposPlanificacionCommand(Guid vId,Guid vResControlProdId,string vGrupoPlanificador,string vDescripcion,Boolean vEstado,string vUsuarioCreacion="",string vUltimoUsuarioModificacion="")
        //{
        //    try
        //    {
        //        Id = vId;
        //        ResControlProdId = vResControlProdId;
        //        GrupoPlanificador = vGrupoPlanificador;
        //        Descripcion = vDescripcion;
        //        Estado = vEstado;
        //        FechaCreacion = DateTime.Now;
        //        FechaModificacion = DateTime.Now;
        //        UsuarioCreacion = vUsuarioCreacion;
        //        UltimoUsuarioModificacion = vUltimoUsuarioModificacion;

        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}
    }
}
