using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Response
{
    public class ResponseAuditoria
    {
        [DataMember]
        public bool estSol { get; set; } //estado de la solicitud, define si hubo error o no

        //[DataMember]
        //public int codSol { get; set; } //código de solicitud

        [DataMember]
        public string msgErr { get; set; } //mensaje de error

    }
}