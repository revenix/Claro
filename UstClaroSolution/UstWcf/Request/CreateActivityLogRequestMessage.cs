using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Request
{
    [DataContract]
    public class CreateActivityLogRequestMessage
    {
        [DataMember]
        public int activityStatus { get; set; }
        [DataMember]
        public string customerChannel { get; set; }
        [DataMember]
        public int deliveryPriority { get; set; }
        [DataMember]
        public string description { get; set; }
        [DataMember]
        public string descriptionMemo { get; set; }
        [DataMember]
        public string externalId { get; set; }
        [DataMember]
        public string documentType { get; set; }
        [DataMember]
        public string documentNumber { get; set; }
        [DataMember]
        public string note { get; set; }
        [DataMember]
        public int priority { get; set; }
        [DataMember]
        public int statusReason { get; set; }
        [DataMember]
        public string subject { get; set; }
        [DataMember]
        public string documentId { get; set; }




















    }
}













