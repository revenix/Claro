using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using UstWcf.BusinessEntities;

namespace UstWcf.Request
{
    [DataContract]
    public class UpdateNetworkIncidentRequestMessage
    {
        [DataMember]
        public string networkIncidentTicketId { get; set; }
        [DataMember]
        public string networkIncidentTitle { get; set; }
        [DataMember]
        public string networkIncidentDescription { get; set; }
        [DataMember]
        public string networkIncidentType { get; set; }
        [DataMember]
        public networkElementsImpacted[] networkElementsImpacted { get; set; }
        [DataMember]
        public string zoneImpacted { get; set; }
        [DataMember]
        public string serviceImpacted { get; set; }
        [DataMember]
        public long priority { get; set; }
        [DataMember]
        public long severity { get; set; }
        [DataMember]
        public long status { get; set; }
        [DataMember]
        public activities[] activities { get; set; }
        [DataMember]
        public int estimatedResolutionTime { get; set; }
        [DataMember]
        public string solutionDescription { get; set; }
        [DataMember]
        public DateTime estimatedSolutionDate { get; set; }


    }
}

















