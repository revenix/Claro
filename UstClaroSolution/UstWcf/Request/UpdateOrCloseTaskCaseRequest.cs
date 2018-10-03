using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Request
{
    public class UpdateOrCloseTaskCaseRequest
    {
        [DataMember]
        public string caseId { get; set; } // Guid Case

        [DataMember]
        public string taskId { get; set; } //(Guid Task) * (por validar)
        [DataMember]
        public string caseNumber { get; set; } // número del caso
        [DataMember]
        public string State { get; set; } //1: Recibido,2: En revisión,3: En supervisión,4: Resuelto,5: Rechazado
        [DataMember]
        public string description { get; set; } //(descripción / razón para el estado)




    }
}