using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class Incident
    {

        [DataMember]
        public string CaseId { get; set; }


        [DataMember]
        public string customerId { get; set; }
        [DataMember]
        public string customerTCRMId { get; set; }
        [DataMember]
        public string caseParentId { get; set; }
        [DataMember]
        public string billingAccountId { get; set; }
        [DataMember]
        public string caseType { get; set; }
        [DataMember]
        public string description { get; set; }
        [DataMember]
        public string originUser { get; set; }
        [DataMember]
        public string originPDV { get; set; }
        [DataMember]
        public string ETA { get; set; }
        [DataMember]
        public string serviceIdentifier { get; set; }
        [DataMember]
        public string productName { get; set; }
        [DataMember]
        public string complaintPhase { get; set; }
        [DataMember]
        public string caseTypeCategory1 { get; set; }
        [DataMember]
        public string caseTypeCategory2 { get; set; }
        [DataMember]
        public string caseTypeCategory3 { get; set; }
        [DataMember]
        public string caseTypeCategory4 { get; set; }
        [DataMember]
        public string caseTypeCategory5 { get; set; }
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
        public string ResolutionNumber { get; set; }
        [DataMember]
        public string resolutionDate { get; set; }
        [DataMember]
        public Indecopi[] indecopi { get; set; }
        [DataMember]
        public string resolutionNotificationDate { get; set; }
        [DataMember]
        public string AddressOfServiceFailure { get; set; }
        [DataMember]
        public Document[] documents { get; set; }
        [DataMember]
        public Osiptel[] osiptel { get; set; }
    }
}