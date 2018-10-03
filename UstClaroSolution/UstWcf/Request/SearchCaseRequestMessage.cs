using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf
{
    [DataContract]
    public class RequestMessage
    {
        [DataMember]
        public string customerId { get; set; }
        [DataMember]
        public string customerTCRMId { get; set; }
        //[DataMember]
        //public string customerType { get; set; }//observacion
        [DataMember]
        public string documentNumber { get; set; }
        [DataMember]
        public int? documentType { get; set; }
        [DataMember]
        public string referentialPhoneNumber { get; set; }
        [DataMember]
        public DateTime creationDateFrom { get; set; }
        [DataMember]
        public DateTime creationDateTo { get; set; }
        [DataMember]
        public string caseId { get; set; }
        [DataMember]
        public string osiptelCaseId { get; set; }
        [DataMember]
        public string indecopiCaseId { get; set; }

    }

    [DataContract]
    public class RequestCase
    {
        [DataMember]
        public RequestMessage request { get; set; }
    }
}
