using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Response
{
    [DataContract]
    public class UpdateNetworkIncidentResponseMessage
    {


        [DataMember]
        public int successFlag { get; set; }
        [DataMember]
        public string crmNetworkIncidentId { get; set; }

      
    }
}