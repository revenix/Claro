using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Response
{
    public class UpdateOrCloseTaskCaseResponse
    {
        [DataMember]
        public string estSol { get; set; } //Estado de la solicitud(1: Actualizado correctamente - 2: Error en el servicio)
        [DataMember]
        public string codSol { get; set; } // código de error de la solicitud (1: Error en el servicio de CRM, 2: Error no controlado, 3: La tarea ya se encuentra cerrada, 4: El id de la tarea es obligatorio, 5: El id del caso es obligatorio(por validar)
        [DataMember]
        public string msgErr { get; set; } // mensaje de error, del código arriba
    }
}