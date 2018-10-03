using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using UstWcf.BusinessEntities;

namespace UstWcf.Request
{
    [DataContract]
    public class UpdateCaseRequestMessage
    {
        [DataMember]
        public string caseId { get; set; }
        [DataMember]
        public string caseParentId { get; set; }
        [DataMember]
        public string billingAccountId { get; set; }
        [DataMember]
        public string description { get; set; }
        [DataMember]
        public string serviceIdentifier { get; set; }
        [DataMember]
        public string productName { get; set; }
        [DataMember]
        public string complaintPhase { get; set; }
        [DataMember]
        public long status { get; set; }
        [DataMember]
        public string referentialPhoneNumber { get; set; }
        [DataMember]
        public string referentialEMail { get; set; }

        [DataMember]
        public string referentialAddress { get; set; }
        [DataMember]
        public string notificationMethod { get; set; }
        [DataMember]
        public PaymentDispute[] paymentDispute { get; set; }
        [DataMember]
        public string resolutionNumber { get; set; }
        [DataMember]
        public string resolutionDate { get; set; }
        [DataMember]
        public Indecopi indecopi { get; set; }
        [DataMember]
        public Osiptel osiptel { get; set; }
        [DataMember]
        public string resolutionNotificationDate { get; set; }
        [DataMember]
        public string AddressOfServiceFailure { get; set; }
        [DataMember]
        public string channel { get; set; }

    }
}