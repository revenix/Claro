using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruAutomatizaDocumento
{

    public class AmxPeruAutomatizaDocumentoRequestDTO
    {
        public Request_AutomatizaDocumento request { get; set; }
    }
    public class Request_AutomatizaDocumento
    {
        public string _type { get; set; }
        public string partyEnquiryId { get; set; }
        public string specificMarketingCampaignName { get; set; }
        public string specificPartyOrderId { get; set; }
        public string specificBiTypeName { get; set; }
        public string specificProductDescription { get; set; }
        public string specificProductSpecName { get; set; }
        public string specificProductSpecCharValue { get; set; }
        public string specificProductSpecTypeName { get; set; }
        public string specificMarketSegmentName { get; set; }
        public string specificPaymentAutoDebit { get; set; }
        public string specificAttrName1 { get; set; }
        public string specificAttrVal1 { get; set; }
        public string specificAttrName2 { get; set; }
        public string specificAttrVal2 { get; set; }
        public string specificAttrName3 { get; set; }
        public string specificAttrVal3 { get; set; }
        public string specificAttrName4 { get; set; }
        public string specificAttrVal4 { get; set; }
        public string specificAttrName5 { get; set; }
        public string specificAttrVal5 { get; set; }
        public string requestedAgreementExtAge { get; set; }
        public string requestedAdditionalServiceName { get; set; }
        public string requestedAdditionalServiceAttrName { get; set; }
        public string requestedAdditionalServiceAttrValue { get; set; }
        public string requestedProductName { get; set; }
        public string requestedPaymentPeriod { get; set; }
        public string requestedAttrName1 { get; set; }
        public string requestedAttrVal1 { get; set; }
        public string requestedAttrName2 { get; set; }
        public string requestedAttrVal2 { get; set; }
        public string requestedAttrName3 { get; set; }
        public string requestedAttrVal3 { get; set; }
        public string requestedAttrName4 { get; set; }
        public string requestedAttrVal4 { get; set; }
        public string generalPartyId { get; set; }
        public string generalIdentificationType { get; set; }
        public string generalPartyProfileTypeName { get; set; }
        public string generalAgreementExtAge { get; set; }
        public string generalProductSpecCharName { get; set; }
        public string generalProductCharValue { get; set; }
        public string generalPaymentAutoDebit { get; set; }
        public string generalAttrName1 { get; set; }
        public string generalAttrVal1 { get; set; }
        public string generalAttrName2 { get; set; }
        public string generalAttrVal2 { get; set; }
        public string generalAttrName3 { get; set; }
        public string generalAttrVal3 { get; set; }
        public string generalAttrName4 { get; set; }
        public string generalAttrVal4 { get; set; }
        public string generalExternalSystemCapabilityId { get; set; }
        public string generalOrganizationExtensionId { get; set; }
        public string generalShippingType { get; set; }
        public string generalDescription { get; set; }
        public string generalBiTypeName { get; set; }
        public string generalInteractionStartDate { get; set; }
        public string generalInteractionStartTime { get; set; }
    }

}
