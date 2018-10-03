using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class PaymentDispute
    {
        [DataMember]
        public string paymentDisputeId { get; set; }

        [DataMember]
        public string paymentDocumentType { get; set; }

        [DataMember]
        public string paymentDocumentNumber { get; set; }

        [DataMember]
        public string paymentDocumentStatus { get; set; }

        [DataMember]
        public string emisionDate { get; set; }

        [DataMember]
        public string paymentConcept { get; set; }

        [DataMember]
        public string totalAmount { get; set; }

        [DataMember]
        public string ClaimedAmount { get; set; }

    }
}