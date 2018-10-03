using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using UstWcf.BusinessEntities;
using UstWcf.Response;

namespace UstWcf.Response
{
    [DataContract]
    public class ResponseMessage
    {
        [DataMember]
        public int successFlag { get; set; }
        [DataMember]
        public Incident[] cases { get; set; }
        //[DataMember]
        //public string  Error{ get; set; }
        //[DataMember]
        //public bool CanRollback { get; set; }
        //[DataMember]
        //public DateTime RunDate { get; set; }
        //[DataMember]
        //public string InstanceId { get; set; }
        //[DataMember]
        //public string WorkflowName { get; set; }
        //[DataMember]
        //public string WorkflowVersion { get; set; }
        //public int Status { get; set; }


    }
}
[DataContract]
public class ResponseCasos:ResponseAuditoria
{
    [DataMember]
    public List<ResponseMessage> casos { get; set; } //solicitudes de caso
}

[DataContract]
public class ResponseCase
{
    [DataMember]
    public ResponseMessage response { get; set; }
}