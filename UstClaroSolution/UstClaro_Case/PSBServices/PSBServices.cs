using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using UstClaro_Case.Utilities;
using UstClaro_Case.DTO.AmxPeruTransaccionDisputa;
using UstClaro_Case.DTO.AmxPeruAutomatizaDocumento;
using UstClaro_Case.DTO.AmxPeruConsultaDocumentoOnBase;
using UstClaro_Case.DTO.AmxPeruGeneraIncidencia;
using UstClaro_Case.DTO.AmxPeruImprimirCase;
using UstClaro_Case.DTO.AmxPeruInformEquipmentSaleBillingDoc;
using UstClaro_Case.DTO.AmxPeruTicketRemedy;

namespace UstClaro_Case.PSBServices
{
    public class PSBServices : IPSBServices
    {
        //INT-CHQ 1-0061
        public AmxPeruAutomatizaDocumentoResponseDTO AutomatizaDocumento(IOrganizationService _service, AmxPeruAutomatizaDocumentoRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);

            Util util = new Util();
            AmxPeruAutomatizaDocumentoResponseDTO response = new AmxPeruAutomatizaDocumentoResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruAutomatizaDocumentoRequestDTO, AmxPeruPSBActivities""" + ",";
                request += "\"partyEnquiryId\": " + "\"" + requestDTO.request.partyEnquiryId + "\"" + ",";
                request += "\"specificMarketingCampaignName\": " + "\"" + requestDTO.request.specificMarketingCampaignName + "\"" + ",";
                request += "\"specificPartyOrderId\": " + "\"" + requestDTO.request.specificPartyOrderId + "\"" + ",";
                request += "\"specificBiTypeName\": " + "\"" + requestDTO.request.specificBiTypeName + "\"" + ",";
                request += "\"specificProductDescription\": " + "\"" + requestDTO.request.specificProductDescription + "\"" + ",";
                request += "\"specificProductSpecName\": " + "\"" + requestDTO.request.specificProductSpecName + "\"" + ",";
                request += "\"specificProductSpecCharValue\": " + "\"" + requestDTO.request.specificProductSpecCharValue + "\"" + ",";
                request += "\"specificProductSpecTypeName\": " + "\"" + requestDTO.request.specificProductSpecTypeName + "\"" + ",";
                request += "\"specificMarketSegmentName\": " + "\"" + requestDTO.request.specificMarketSegmentName + "\"" + ",";
                request += "\"specificPaymentAutoDebit\": " + "\"" + requestDTO.request.specificPaymentAutoDebit + "\"" + ",";
                request += "\"specificAttrName1\": " + "\"" + requestDTO.request.specificAttrName1 + "\"" + ",";
                request += "\"specificAttrVal1\": " + "\"" + requestDTO.request.specificAttrVal1 + "\"" + ",";
                request += "\"specificAttrName2\": " + "\"" + requestDTO.request.specificAttrName2 + "\"" + ",";
                request += "\"specificAttrVal2\": " + "\"" + requestDTO.request.specificAttrVal2 + "\"" + ",";
                request += "\"specificAttrName3\": " + "\"" + requestDTO.request.specificAttrName3 + "\"" + ",";
                request += "\"specificAttrVal3\": " + "\"" + requestDTO.request.specificAttrVal3 + "\"" + ",";
                request += "\"specificAttrName4\": " + "\"" + requestDTO.request.specificAttrName4 + "\"" + ",";
                request += "\"specificAttrVal4\": " + "\"" + requestDTO.request.specificAttrVal4 + "\"" + ",";
                request += "\"specificAttrName5\": " + "\"" + requestDTO.request.specificAttrName5 + "\"" + ",";
                request += "\"specificAttrVal5\": " + "\"" + requestDTO.request.specificAttrVal5 + "\"" + ",";
                request += "\"requestedAgreementExtAge\": " + "\"" + requestDTO.request.requestedAgreementExtAge + "\"" + ",";
                request += "\"requestedAdditionalServiceName\": " + "\"" + requestDTO.request.requestedAdditionalServiceName + "\"" + ",";
                request += "\"requestedAdditionalServiceAttrName\": " + "\"" + requestDTO.request.requestedAdditionalServiceAttrName + "\"" + ",";
                request += "\"requestedAdditionalServiceAttrValue\": " + "\"" + requestDTO.request.requestedAdditionalServiceAttrValue + "\"" + ",";
                request += "\"requestedProductName\": " + "\"" + requestDTO.request.requestedProductName + "\"" + ",";
                request += "\"requestedPaymentPeriod\": " + "\"" + requestDTO.request.requestedPaymentPeriod + "\"" + ",";
                request += "\"requestedAttrName1\": " + "\"" + requestDTO.request.requestedAttrName1 + "\"" + ",";
                request += "\"requestedAttrVal1\": " + "\"" + requestDTO.request.requestedAttrVal1 + "\"" + ",";
                request += "\"requestedAttrName2\": " + "\"" + requestDTO.request.requestedAttrName2 + "\"" + ",";
                request += "\"requestedAttrVal2\": " + "\"" + requestDTO.request.requestedAttrVal2 + "\"" + ",";
                request += "\"requestedAttrName3\": " + "\"" + requestDTO.request.requestedAttrName3 + "\"" + ",";
                request += "\"requestedAttrVal3\": " + "\"" + requestDTO.request.requestedAttrVal3 + "\"" + ",";
                request += "\"requestedAttrName4\": " + "\"" + requestDTO.request.requestedAttrName4 + "\"" + ",";
                request += "\"requestedAttrVal4\": " + "\"" + requestDTO.request.requestedAttrVal4 + "\"" + ",";
                request += "\"generalPartyId\": " + "\"" + requestDTO.request.generalPartyId + "\"" + ",";
                request += "\"generalIdentificationType\": " + "\"" + requestDTO.request.generalIdentificationType + "\"" + ",";
                request += "\"generalPartyProfileTypeName\": " + "\"" + requestDTO.request.generalPartyProfileTypeName + "\"" + ",";
                request += "\"generalAgreementExtAge\": " + "\"" + requestDTO.request.generalAgreementExtAge + "\"" + ",";
                request += "\"generalProductSpecCharName\": " + "\"" + requestDTO.request.generalProductSpecCharName + "\"" + ",";
                request += "\"generalProductCharValue\": " + "\"" + requestDTO.request.generalProductCharValue + "\"" + ",";
                request += "\"generalPaymentAutoDebit\": " + "\"" + requestDTO.request.generalPaymentAutoDebit + "\"" + ",";
                request += "\"generalAttrName1\": " + "\"" + requestDTO.request.generalAttrName1 + "\"" + ",";
                request += "\"generalAttrVal1\": " + "\"" + requestDTO.request.generalAttrVal1 + "\"" + ",";
                request += "\"generalAttrName2\": " + "\"" + requestDTO.request.generalAttrName2 + "\"" + ",";
                request += "\"generalAttrVal2\": " + "\"" + requestDTO.request.generalAttrVal2 + "\"" + ",";
                request += "\"generalAttrName3\": " + "\"" + requestDTO.request.generalAttrName3 + "\"" + ",";
                request += "\"generalAttrVal3\": " + "\"" + requestDTO.request.generalAttrVal3 + "\"" + ",";
                request += "\"generalAttrName4\": " + "\"" + requestDTO.request.generalAttrName4 + "\"" + ",";
                request += "\"generalAttrVal4\": " + "\"" + requestDTO.request.generalAttrVal4 + "\"" + ",";
                request += "\"generalExternalSystemCapabilityId\": " + "\"" + requestDTO.request.generalExternalSystemCapabilityId + "\"" + ",";
                request += "\"generalOrganizationExtensionId\": " + "\"" + requestDTO.request.generalOrganizationExtensionId + "\"" + ",";
                request += "\"generalShippingType\": " + "\"" + requestDTO.request.generalShippingType + "\"" + ",";
                request += "\"generalDescription\": " + "\"" + requestDTO.request.generalDescription + "\"" + ",";
                request += "\"generalBiTypeName\": " + "\"" + requestDTO.request.generalBiTypeName + "\"" + ",";
                request += "\"generalInteractionStartDate\":" + "\"" + requestDTO.request.generalInteractionStartDate + "\"" + "}" + "}";
                response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruAutomatizaDocumentoResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 01_HardCore
                //response.CurrentBookmark = null;
                //response.Output.response.partyOrderId = "1";

                //List<GeneralDocList> _gdList = new List<GeneralDocList>();
                //_gdList.Add(new GeneralDocList() { docName = "CLAUSULA_DE_DATOS_PERSONALES_MASIVO", attrName = "aplicaFirmaDigital", attrVal= "No" });
                //response.Output.response.generalDocList = _gdList;

                //List<SpecificDocList> _sdList = new List<SpecificDocList>();
                //_sdList.Add(new SpecificDocList() { docName = "ACUERDO_PCS_MASIVO_CLARO_MAX_UNIFICADO", attrName = "aplicaFirmaDigital", attrVal = "No" });
                //_sdList.Add(new SpecificDocList() { docName = "ACUERDO_PROTECCION_MOVIL", attrName = "aplicaFirmaDigital", attrVal = "No" });
                //_sdList.Add(new SpecificDocList() { docName = "RENTA_ADELANTADA_MOVIL_MODEM_B2E", attrName = "aplicaFirmaDigital", attrVal = "No" });
                //response.Output.response.specificDocList = _sdList;

                //response.Output.response.Status = 0;
                //response.Output.response.CodeResponse = "0";
                //response.Output.response.DescriptionResponse = "OK";
                //response.Output.response.ErrorLocation = null;
                //response.CanRollback = false;
                //response.RunDate = Convert.ToDateTime("2018-04-27T13:36:21.6327536Z");
                //response.InstanceId = "87216f12-1905-427f-8fab-24d56771046a";
                //response.WorkflowName = "AmxPeruAutomatizaDocumento";
                //response.WorkflowVersion = "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-CHQ 3-007
        public ConsultaDocumentoOnBaseResponseDTO ConsultaDocumentoOnBase(IOrganizationService _service, ConsultaDocumentoOnBaseRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);
            Util util = new Util();
            ConsultaDocumentoOnBaseResponseDTO response = new ConsultaDocumentoOnBaseResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""documentId"":""" + requestDTO.request.documentId + "";
                request += "}" + "}";
                response = Newtonsoft.Json.JsonConvert.DeserializeObject<ConsultaDocumentoOnBaseResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 02_HardCore
                //response.CurrentBookmark = null;
                
                //response.Output.response.responseCode = null;
                //response.Output.response.responseDescription = null;
                //response.CanRollback = false;
                //response.RunDate = Convert.ToDateTime("2018-03-16T15:55:26.6478065Z");
                //response.InstanceId = "5ae47da3-8114-4e6d-a012-185c4ee4e27c";
                //response.WorkflowName = "AmxPeruConsultaDocumentoOnBase";
                //response.WorkflowVersion = "1.0.0.0";
                //response.Status = 4;
                #endregion


                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-CHQ-2-010
        public AmxPeruCrearDisputaResponseDTO CrearDisputa(IOrganizationService _service, AmxPeruCrearDisputaRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);

            Util util = new Util();
            AmxPeruCrearDisputaResponseDTO response = new AmxPeruCrearDisputaResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruCrearDisputaRequestDTO, AmxPeruPSBActivities""" + ",";
                request += "\"CustomerID\": " + "\"" + requestDTO.request.CustomerID + "\"" + ",";
                request += "\"ProblemID\": " + "\"" + requestDTO.request.ProblemID + "\"" + ",";
                request += "\"PartyAccountID\": " + "\"" + requestDTO.request.PartyAccountID + "\"" + ",";
                request += "\"BillingAmountUnit\": " + "\"" + requestDTO.request.BillingAmountUnit + "\"" + ",";
                request += "\"BillingAmount\": " + "\"" + requestDTO.request.BillingAmount + "\"" + ",";
                request += "\"ServiceSpecTypeName\": " + "\"" + requestDTO.request.ServiceSpecTypeName + "\"" + ",";
                request += "\"EntitySpecType\": " + "\"" + requestDTO.request.EntitySpecType + "\"" + ",";
                request += "\"EntitySpecID\": " + "\"" + requestDTO.request.EntitySpecID + "\"" + ",";
                request += "\"IntStartDate\": " + "\"" + requestDTO.request.IntStartDate + "\"" + ",";
                request += "\"Description\": " + "\"" + requestDTO.request.Description + "\"" + ",";
                request += "\"BusinessIntTypeName\": " + "\"" + requestDTO.request.BusinessIntTypeName + "\"" + ",";
                request += "\"ReasonCode\": " + "\"" + requestDTO.request.ReasonCode + "\"" + ",";
                request += "\"Reson\":" + "\"" + requestDTO.request.Reson + "\"" + "}" + "}";


                response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruCrearDisputaResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 03_HardCode
                //response.CurrentBookmark = false;
                //response.Output.response.Status = 0;
                //response.Output.response.CodeResponse = "0";
                //response.Output.response.DescriptionResponse = "Transaccion OK";
                //response.Output.response.ErrorLocation = "";
                //response.CanRollback = false;
                //response.RunDate = "2018-05-21T09:36:32.3418282Z";
                //response.InstanceId = "8819c4a2-ed9d-4d2c-979a-91e45917f9e7";
                //response.WorkflowName = "AmxPeruTransaccionDisputas";
                //response.WorkflowVersion = "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-CHQ 2-002
        public GeneraIncidenciaResponseDTO GeneraIncidencia(IOrganizationService _service, GeneraIncidenciaRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);
            Util util = new Util();
            GeneraIncidenciaResponseDTO response = new GeneraIncidenciaResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.GeneraIncidenciaRequestDTO, AmxPeruPSBActivities""" + ",";

                request += "\"Password\": " + "\"" + requestDTO.request.Password + "\"" + ",";
                request += "\"UserName\": " + "\"" + requestDTO.request.UserName + "\"" + ",";
                request += "\"Urgency\": " + "\"" + requestDTO.request.Urgency + "\"" + ",";
                request += "\"ServiceCI\": " + "\"" + requestDTO.request.ServiceCI + "\"" + ",";
                request += "\"Impact\": " + "\"" + requestDTO.request.Impact + "\"" + ",";
                request += "\"Action\": " + "\"" + requestDTO.request.Action + "\"" + ",";
                request += "\"Description\": " + "\"" + requestDTO.request.Description + "\"" + ",";
                request += "\"CategorizationTier1\": " + "\"" + requestDTO.request.CategorizationTier1 + "\"" + ",";
                request += "\"CategorizationTier2\": " + "\"" + requestDTO.request.CategorizationTier2 + "\"" + ",";
                request += "\"CategorizationTier3\": " + "\"" + requestDTO.request.CategorizationTier3 + "\"" + ",";
                request += "\"RecordType\": " + "\"" + requestDTO.request.RecordType + "\"" + ",";
                request += "\"RecordID\":" + "\"" + requestDTO.request.RecordID + "\"" + "}" + "}";

                response = Newtonsoft.Json.JsonConvert.DeserializeObject<GeneraIncidenciaResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 04_HardCode
                //response.CurrentBookmark = null;
                //response.Output.response.ProblemId = "INC000001227281";
                //response.Output.response.Status = 0;
                //response.Output.response.CodeResponse = "0";
                //response.Output.response.DescriptionResponse = "Transaccion OK";
                //response.Output.response.ErrorLocation = "";
                //response.CanRollback = false;
                //response.RunDate = Convert.ToDateTime("2018-06-27T12:07:08.453821Z");
                //response.WorkflowName = "AmxPeruGeneraIncidenciaExternal";
                //response.WorkflowVersion = "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-DOC-008
        public AmxPeruImprimirCaseResponseDTO ImprimirCase(IOrganizationService _service, AmxPeruImprimirCaseRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);
            Util util = new Util();
            AmxPeruImprimirCaseResponseDTO response = new AmxPeruImprimirCaseResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                                ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruImprimirCaseRequestDTO, AmxPeruPSBActivities""" + ",";
                    request += "\"ListadoDocumentos\": {" +
                                    "\"$type\": " + "\"" + "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities]], mscorlib" + "\"" + "," +
                                    "\"$values\": [";
                                        foreach (var item in requestDTO.request.ListadoDocumentos._values)
                                        {
                        request +=          "{" +
                                                "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                                "\"DocumentIDTCRM\": " + "\"" + item.DocumentIDTCRM + "\"" + "," +
                                                "\"Nombre\": " + "\"" + item.Nombre + "\"" + "," +
                                                "\"FlagFirmaDigital\": " + "\"" + item.FlagFirmaDigital + "\"" + "," +
                                            "},";
                                        }
                        request += "]";
                    request += "},";
                    request += "\"Huella\": {" +
                                    "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.HuellaTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                    "\"IdHuella\": " + "\"" + requestDTO.request.Huella.IdHuella + "\"" + "," +
                                    "\"HuellaImagen\": " + "\"" + requestDTO.request.Huella.HuellaImagen + "\"" + "," +
                                    "\"HuellaMinucia\": " + "\"" + requestDTO.request.Huella.HuellaMinucia + "\"" + ",";
                    request += "},";
                    request += "\"Case\": {" +
                                    "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.CaseTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                    "\"CaseId\": " + "\"" + requestDTO.request.Case.CaseId + "\"" + "," +
                                    "\"ParentCaseId\": " + "\"" + requestDTO.request.Case.ParentCaseId + "\"" + "," +
                                    "\"CaseCreationDate\": " + "\"" + requestDTO.request.Case.CaseCreationDate + "\"" + "," +
                                    "\"PowerOfAttorneyFlag\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyFlag + "\"" + "," +
                                    "\"PowerOfAttorneyContact\": {" +
                                        "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.PowerOfAttorneyContactTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                        "\"FirstName\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.FirstName + "\"" + "," +
                                        "\"FirstLastName\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.FirstLastName + "\"" + "," +
                                        "\"SecondLastName\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.SecondLastName + "\"" + "," +
                                        "\"DocumentType\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.DocumentType + "\"" + "," +
                                        "\"DocumentNumber\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.DocumentNumber + "\"" + "," +
                                        "\"MainPhone\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.MainPhone + "\"" + "," +
                                        "\"EMail\": " + "\"" + requestDTO.request.Case.PowerOfAttorneyContact.EMail + "\"" + "," +
                                    "}," +
                                    "\"CaseType\": " + "\"" + requestDTO.request.Case.CaseType + "\"" + "," +
                                    "\"Category1\": " + "\"" + requestDTO.request.Case.Category1 + "\"" + "," +
                                    "\"Category2\": " + "\"" + requestDTO.request.Case.Category2 + "\"" + "," +
                                    "\"Category3\": " + "\"" + requestDTO.request.Case.Category3 + "\"" + "," +
                                    "\"Category4\": " + "\"" + requestDTO.request.Case.Category4 + "\"" + "," +
                                    "\"Category5\": " + "\"" + requestDTO.request.Case.Category5 + "\"" + "," +
                                    "\"IndividualContact\": {" +
                                        "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.IndividualContactTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                        "\"CustomerId\": " + "\"" + requestDTO.request.Case.IndividualContact.CustomerId + "\"" + "," +
                                        "\"ContactId\": " + "\"" + requestDTO.request.Case.IndividualContact.ContactId + "\"" + "," +
                                        "\"FirstName\": " + "\"" + requestDTO.request.Case.IndividualContact.FirstName + "\"" + "," +
                                        "\"FirstLastName\": " + "\"" + requestDTO.request.Case.IndividualContact.FirstLastName + "\"" + "," +
                                        "\"SecondLastName\": " + "\"" + requestDTO.request.Case.IndividualContact.SecondLastName + "\"" + "," +
                                        "\"PrincipalAddress\": {" +
                                            "\"CustomerId\": " + "\"" + "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                            "\"AddressId\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.AddressId + "\"" + "," +
                                            "\"AddressType\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.AddressType + "\"" + "," +
                                            "\"CityName\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.CityName + "\"" + "," +
                                            "\"DepartmentName\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.DepartmentName + "\"" + "," +
                                            "\"DistrictName\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.DistrictName + "\"" + "," +
                                            "\"ProvinceName\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.ProvinceName + "\"" + "," +
                                            "\"StandardAddress\": " + "\"" + requestDTO.request.Case.IndividualContact.PrincipalAddress.StandardAddress + "\"" + "," +
                                        "}," +
                                        "\"DocumentType\": " + "\"" + requestDTO.request.Case.IndividualContact.DocumentType + "\"" + "," +
                                        "\"DocumentNumber\": " + "\"" + requestDTO.request.Case.IndividualContact.DocumentNumber + "\"" + "," +
                                        "\"MainPhone\": " + "\"" + requestDTO.request.Case.IndividualContact.MainPhone + "\"" + "," +
                                        "\"EMail\": " + "\"" + requestDTO.request.Case.IndividualContact.EMail + "\"" + "," +
                                    "}," +
                                    "\"CorporateAccount\": {" +
                                        "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.CorporateAccountTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                        "\"CurrentCorporateContact\": {" +
                                            "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.CorporateContactTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                            "\"FirstName\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.FirstName + "\"" + "," +
                                            "\"FirstLastName\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.FirstLastName + "\"" + "," +
                                            "\"SecondLastName\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.SecondLastName + "\"" + "," +
                                            "\"DocumentType\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.DocumentType + "\"" + "," +
                                            "\"DocumentNumber\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.DocumentNumber + "\"" + "," +
                                            "\"MainPhone\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.MainPhone + "\"" + "," +
                                            "\"EMail\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.EMail + "\"" + "," +
                                            "\"ConnectionName\": " + "\"" + requestDTO.request.Case.CorporateAccount.CurrentCorporateContact.ConnectionName + "\"" + "," +
                                        "}," +
                                        "\"PrincipalLegalRepresentative\": {" +
                                            "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.PrincipalLegalRepresentativeTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                            "\"FirstName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.FirstName + "\"" + "," +
                                            "\"FirstLastName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.FirstLastName + "\"" + "," +
                                            "\"SecondLastName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.SecondLastName + "\"" + "," +
                                            "\"DocumentType\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.DocumentType + "\"" + "," +
                                            "\"DocumentNumber\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.DocumentNumber + "\"" + "," +
                                            "\"MainPhone\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.MainPhone + "\"" + "," +
                                            "\"EMail\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalLegalRepresentative.EMail + "\"" + "," +
                                        "}," +
                                        "\"AccountId\": " + "\"" + requestDTO.request.Case.CorporateAccount.AccountId + "\"" + "," +
                                        "\"CustomerId\": " + "\"" + requestDTO.request.Case.CorporateAccount.CustomerId + "\"" + "," +
                                        "\"CompayName\": " + "\"" + requestDTO.request.Case.CorporateAccount.CompayName + "\"" + "," +
                                        "\"DocumentType\": " + "\"" + requestDTO.request.Case.CorporateAccount.DocumentType + "\"" + "," +
                                        "\"DocumentNumber\": " + "\"" + requestDTO.request.Case.CorporateAccount.DocumentNumber + "\"" + "," +
                                        "\"MainPhone\": " + "\"" + requestDTO.request.Case.CorporateAccount.MainPhone + "\"" + "," +
                                        "\"PrincipalAddress\": {" +
                                            "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                            "\"AddressId\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.AddressId + "\"" + "," +
                                            "\"AddressType\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.AddressType + "\"" + "," +
                                            "\"CityName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.CityName + "\"" + "," +
                                            "\"DepartmentName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.DepartmentName + "\"" + "," +
                                            "\"DistrictName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.DistrictName + "\"" + "," +
                                            "\"ProvinceName\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.ProvinceName + "\"" + "," +
                                            "\"StandardAddress\": " + "\"" + requestDTO.request.Case.CorporateAccount.PrincipalAddress.StandardAddress + "\"" + "," +
                                        "}," +
                                        "\"EMail\": " + "\"" + requestDTO.request.Case.CorporateAccount.EMail + "\"" + "," +
                                        "\"CustomerSegmentation\": " + "\"" + requestDTO.request.Case.CorporateAccount.CustomerSegmentation + "\"" + "," +
                                    "}," +
                                    "\"SalesOrganization\": {" +
                                        "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.SalesOrganizationTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                        "\"SalesOrganizationId\": " + "\"" + requestDTO.request.Case.SalesOrganization.SalesOrganizationId + "\"" + "," +
                                        "\"SalesOrganizationAddress\": " + "\"" + requestDTO.request.Case.SalesOrganization.SalesOrganizationAddress + "\"" + "," +
                                        "\"SalesOrganizationName\": " + "\"" + requestDTO.request.Case.SalesOrganization.SalesOrganizationName + "\"" + "," +
                                        "\"SalesOrganizationZoneName\": " + "\"" + requestDTO.request.Case.SalesOrganization.SalesOrganizationZoneName + "\"" + "," +
                                        "\"SalesOrganizationChannelName\": " + "\"" + requestDTO.request.Case.SalesOrganization.SalesOrganizationChannelName + "\"" + "," +
                                    "}," +
                                    "\"TCRMUser\": {" +
                                        "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.TCRMUserTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                        "\"Username\": " + "\"" + requestDTO.request.Case.TCRMUser.Username + "\"" + "," +
                                        "\"FirstName\": " + "\"" + requestDTO.request.Case.TCRMUser.FirstName + "\"" + "," +
                                        "\"FirstLastName\": " + "\"" + requestDTO.request.Case.TCRMUser.FirstLastName + "\"" + "," +
                                        "\"SecondLastName\": " + "\"" + requestDTO.request.Case.TCRMUser.SecondLastName + "\"" + "," +
                                        "\"EMail\": " + "\"" + requestDTO.request.Case.TCRMUser.EMail + "\"" + "," +
                                        "\"Phone\": " + "\"" + requestDTO.request.Case.TCRMUser.Phone + "\"" + "," +
                                        "\"PositionName\": " + "\"" + requestDTO.request.Case.TCRMUser.PositionName + "\"" + "," +
                                    "}," +
                                    "\"NotificationEmail\": " + "\"" + requestDTO.request.Case.NotificationEmail + "\"" + "," +
                                    "\"SubscriptionCode\": " + "\"" + requestDTO.request.Case.SubscriptionCode + "\"" + "," +
                                    "\"RelatedDirectoryNumber\": " + "\"" + requestDTO.request.Case.RelatedDirectoryNumber + "\"" + "," +
                                    "\"ResolutionCode\": " + "\"" + requestDTO.request.Case.ResolutionCode + "\"" + "," +
                                    "\"ResolutionDate\": " + "\"" + requestDTO.request.Case.ResolutionDate + "\"" + "," +
                                    "\"NotificationDate\": " + "\"" + requestDTO.request.Case.NotificationDate + "\"" + "," +
                                    "\"AppealDescription\": " + "\"" + requestDTO.request.Case.AppealDescription + "\"" + "," +
                                    "\"AttachedDocumentsDTO\": {" +
                                        "\"$type\": " + "\"" + "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib" + "\"" + "," +
                                        "\"$values\": [";
                                        foreach (var item in requestDTO.request.Case.AttachedDocumentsDTO._values)
                                        {
                                request +=  "{" +   
                                                "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                                "\"AttachedDocumentName\": " + "\"" + item.AttachedDocumentName + "\"" + "," +
                                            "},";
                                        }
                            request += "]";
                         request += "}," +
                                    "\"FinancialDocumentsDTO\": {" +
                                        "\"$type\": " + "\"" + "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib" + "\"" + "," +
                                        "\"$values\": [";
                                        foreach (var item in requestDTO.request.Case.FinancialDocumentsDTO._values)
                                        {
                                request +=  "{" +   
                                                "\"$type\": " + "\"" + "AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities" + "\"" + "," +
                                                "\"FinancialDocumentNumber\": " + "\"" + item.FinancialDocumentNumber + "\"" + "," +
                                                "\"FinancialDocumentEmissionDate\": " + "\"" + item.FinancialDocumentEmissionDate + "\"" + "," +
                                                "\"FinancialDocumentDueDate\": " + "\"" + item.FinancialDocumentDueDate + "\"" + "," +
                                            "},";
                                        }
                            request += "]" +
                                    "}," +
                                    "\"BilledConcept\": " + "\"" + requestDTO.request.Case.BilledConcept + "\"" + "," +
                                    "\"ProductOrServiceName\": " + "\"" + requestDTO.request.Case.ProductOrServiceName + "\"" + "," +
                                    "\"ClaimedAmount\": " + "\"" + requestDTO.request.Case.ClaimedAmount + "\"" + "," +
                                    "\"ReferencePhoneNumber\": " + "\"" + requestDTO.request.Case.ReferencePhoneNumber + "\"" + "," +
                                    "\"ClaimDescription\": " + "\"" + requestDTO.request.Case.ClaimDescription + "\"" + "," +
                                    "\"CustomerPetition\": " + "\"" + requestDTO.request.Case.CustomerPetition + "\"" + "," +
                                    "\"OsiptelComplaintId\": " + "\"" + requestDTO.request.Case.OsiptelComplaintId + "\"" + "," +
                                    "\"IndecopiComplaintId\": " + "\"" + requestDTO.request.Case.IndecopiComplaintId + "\"" + "," +
                                    "\"OsiptelGrievanceId\": " + "\"" + requestDTO.request.Case.OsiptelGrievanceId + "\"" + "," +
                                    "\"ResponseText\": " + "\"" + requestDTO.request.Case.ResponseText + "\"" + "," +
                                    "\"BossName\": " + "\"" + requestDTO.request.Case.BossName + "\"" + "," +
                                    "\"SarOffer\": " + "\"" + requestDTO.request.Case.SarOffer + "\"" + "," +
                                    "\"SarAnswer\": " + "\"" + requestDTO.request.Case.SarAnswer + "\"" + "," +
                                    "\"SarId\": " + "\"" + requestDTO.request.Case.SarId + "\"" + "," +
                                    "\"TypeOfCopyRequested\": " + "\"" + requestDTO.request.Case.TypeOfCopyRequested + "\"" + ",";
                    request += "},";
                request += "}";
            request += "}";

            response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruImprimirCaseResponseDTO>(util.SendRestRequest(_service, request, url));
                
                #region 05_HardCode
                //response.CurrentBookmark = null;
                //List<ListadoDocumento> ld = new List<ListadoDocumento>();
                //ld.Add(new ListadoDocumento(){ documentIDTCRM = "DTCRM00005", UrlFTP= "/home/usrhpxstrqa/exstream/hpeews/output/exstream/CASCAS-00200-H2K5F920180705002129_0.pdf", Extension = "pdf", TotalPaginas = "2"});
                //ld.Add(new ListadoDocumento() { documentIDTCRM = "DTCRM00003", UrlFTP = "/home/usrhpxstrqa/exstream/hpeews/output/exstream/CASCAS-00200-H2K5F920180705002129_1.pdf", Extension = "pdf", TotalPaginas = "2" });
                //ld.Add(new ListadoDocumento() { documentIDTCRM = "DTCRM00002", UrlFTP = "/home/usrhpxstrqa/exstream/hpeews/output/exstream/CASCAS-00200-H2K5F920180705002129_2.pdf", Extension = "pdf", TotalPaginas = "2" });
                //ld.Add(new ListadoDocumento() { documentIDTCRM = "DTCRM00001", UrlFTP = "/home/usrhpxstrqa/exstream/hpeews/output/exstream/CASCAS-00200-H2K5F920180705002129_3.pdf", Extension = "pdf", TotalPaginas = "3" });
                //response.Output.response.listadoDocumentos = ld;

                //response.Output.response.Status = 0;
                //response.Output.response.CodeResponse = "0";
                //response.Output.response.DescriptionResponse = "Transaccion OK";
                //response.Output.response.ErrorLocation = "";
                //response.CanRollback= false;
                //response.RunDate= Convert.ToDateTime("2018-07-05T05:21:30.1318811Z");
                //response.InstanceId= "155190e8-c763-4668-b823-94828feae709";
                //response.WorkflowName= "AmxPeruImprimirCase";
                //response.WorkflowVersion= "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-CHQ-2-058
        public AmxPeruInformEquipmentSaleBillingDocResponseDTO InformEquipmentSaleBillingDoc(IOrganizationService _service, AmxPeruInformEquipmentSaleBillingDocRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);
            Util util = new Util();
            AmxPeruInformEquipmentSaleBillingDocResponseDTO response = new AmxPeruInformEquipmentSaleBillingDocResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruInformEquipmentSaleBillingDocRequestDTO, AmxPeruPSBActivities""" + ",";
                request += "\"PartyOrderId\": " + "\"" + requestDTO.request.PartyOrderId + "\"" + ",";
                request += "\"CustomerName\": " + "\"" + requestDTO.request.CustomerName + "\"" + ",";
                request += "\"TelephoneNumber\": " + "\"" + requestDTO.request.TelephoneNumber + "\"" + ",";
                request += "\"CustomerId\": " + "\"" + requestDTO.request.CustomerId + "\"" + ",";
                request += "\"FullAddress\": " + "\"" + requestDTO.request.FullAddress + "\"" + ",";
                request += "\"AbsoluteLocalLocationX\": " + "\"" + requestDTO.request.AbsoluteLocalLocationX + "\"" + ",";
                request += "\"AbsoluteLocalLocationY\": " + "\"" + requestDTO.request.AbsoluteLocalLocationY + "\"" + ",";
                request += "\"PlaceId\": " + "\"" + requestDTO.request.PlaceId + "\"" + ",";
                request += "\"BusinessInteractionTypeName\": " + "\"" + requestDTO.request.BusinessInteractionTypeName + "\"" + ",";
                request += "\"BusinessInteractionTypeName2\": " + "\"" + requestDTO.request.BusinessInteractionTypeName2 + "\"" + ",";
                request += "\"StartDateTime\": " + "\"" + requestDTO.request.StartDateTime + "\"" + ",";
                request += "\"ScheduleHoursRange\": " + "\"" + requestDTO.request.ScheduleHoursRange + "\"" + ",";
                request += "\"ProductSpecName\": " + "\"" + requestDTO.request.ProductSpecName + "\"" + ",";
                request += "\"ProductSpecDesc\": " + "\"" + requestDTO.request.ProductSpecDesc + "\"" + ",";
                request += "\"BaseDurationAmount\": " + "\"" + requestDTO.request.BaseDurationAmount + "\"" + ",";
                request += "\"QuantityAmount\": " + "\"" + requestDTO.request.QuantityAmount + "\"" + ",";
                request += "\"AppliedAmount\":" + "\"" + requestDTO.request.AppliedAmount + "\"" + "}" + "}";

                response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruInformEquipmentSaleBillingDocResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 06_HardCode
                //response.CurrentBookmark = null;
                //response.Output.response.InquiryResponseId = "Codigo Unico";
                //response.Output.response.Status = 99;
                //response.Output.response.CodeResponse = "MOCK Response";
                //response.Output.response.DescriptionResponse = "This is MOCK Response from Test Server, If you want to integrate real service, please change endpoint parameter in Claro External Api Configuration Entity";
                //response.Output.response.ErrorLocation = "This is MOCK Response from Test Server, If you want to integrate real service, please change endpoint parameter in Claro External Api Configuration Entity";
                //response.CanRollback = false;
                //response.RunDate = Convert.ToDateTime("2018-04-17T12:05:44.5558846Z");
                //response.InstanceId = "9f97f971-28ca-42a0-9d06-2e75814afb02";
                //response.WorkflowName = "AmxPeruInformEquipmentSaleBillingDoc";
                //response.WorkflowVersion = "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }

        //INT-CHQ-2-013
        public AmxPeruTicketRemedyResponseDTO ModificarTicket(IOrganizationService _service, AmxPeruTicketRemedyRequestDTO requestDTO, string url)
        {
            //string requestToJson = Newtonsoft.Json.JsonConvert.SerializeObject(requestDTO);
            Util util = new Util();
            AmxPeruTicketRemedyResponseDTO response = new AmxPeruTicketRemedyResponseDTO();
            try
            {
                string request;
                request = @"{
                            ""request"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruTicketRemedyRequestDTO, AmxPeruPSBActivities""" + ",";
                request += "\"userId\": " + "\"" + requestDTO.request.userId + "\"" + ",";
                request += "\"password\": " + "\"" + requestDTO.request.password + "\"" + ",";
                request += "\"ticketId\": " + "\"" + requestDTO.request.ticketId + "\"" + ",";
                request += "\"ticketDesc\": " + "\"" + requestDTO.request.ticketDesc + "\"" + ",";
                request += "\"reason\": " + "\"" + requestDTO.request.reason + "\"" + ",";
                request += "\"ticketState\":" + "\"" + requestDTO.request.ticketState + "\"" + "}" + "}";

                response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruTicketRemedyResponseDTO>(util.SendRestRequest(_service, request, url));

                #region 07_HardCode
                //response.CurrentBookmark = false;
                //response.Output.response.troubleTicketId = "INC000001077426";
                //response.Output.response.Status = 0;
                //response.Output.response.CodeResponse = "0";
                //response.Output.response.DescriptionResponse = "Transaccion OK";
                //response.Output.response.ErrorLocation = "";
                //response.CanRollback = false;
                //response.RunDate= Convert.ToDateTime("2018-04-18T07:56:54.6699868Z");
                //response.InstanceId= "548d7e62-fac8-4345-893f-05881a833af1";
                //response.WorkflowName= "AmxPeruTicketRemedy";
                //response.WorkflowVersion= "1.0.0.0";
                //response.Status = 4;
                #endregion

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }
        }
    }
}
