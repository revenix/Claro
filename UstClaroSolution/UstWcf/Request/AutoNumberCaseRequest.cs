using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf
{
    [DataContract]
    public class AutoNumberCaseRequest
    {
        [DataMember]
        public string customerId { get; set; }
        [DataMember]
        public string customerTCRMId { get; set; }
        [DataMember]
        public string documentNumber { get; set; }
        [DataMember]
        public int? documentType { get; set; }
    }
}