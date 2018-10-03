using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Client;
using System.ServiceModel;
using Microsoft.Xrm.Sdk.Query;
using System.ServiceModel.Channels;
using UstClaro_Case.PSBServices;
using UstClaro_Case.Utilities;
using UstClaro_Case.DTO.AmxPeruTransaccionDisputa;

namespace UstClaro_Case
{
    /// Creador : FastCloudy
    /// Fecha: 05/07/2018
    /// Jira: 3112
    /// Function : Notify collection system to resume activities / to liberate the disput amount
    /// RN-CHQ-2-031
    /// Message  : Close
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    public class UstCloseNotifyCollectionOAC :IPlugin 
    {
        ITracingService myTrace;
        IOrganizationService service;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));


            try
            {
                if (context.InputParameters.Contains("IncidentResolution") && context.InputParameters["IncidentResolution"] is Entity)
                {
                    Entity IncidentResolution = (Entity)context.InputParameters["IncidentResolution"];

                    //foreach (var i in IncidentResolution.KeyAttributes) 
                    //{
                    //    myTrace.Trace("key: " + i.Key);
                    //    myTrace.Trace("value:" + i.Value);
                    //}

                    //throw new InvalidPluginExecutionException("detener");

                    EntityReference erIncident = ((EntityReference)IncidentResolution["incidentid"]);
                    String strLogicalName = erIncident.LogicalName.ToLower();

                    //If this plugIn doesnt trigger in "Close Incident".
                    if (strLogicalName != "incident")
                        return;

                    Entity incident = service.Retrieve("incident", erIncident.Id, new ColumnSet("amxperu_casetype", "ust_notifyoactostopcollectionactions", "ust_osiptelcomplaintid"));
                    string strCode = null;
                    string strComplaintId = null;

                    //TO DO: Change this value to FALSE
                    bool isNotified = true;

                    if (incident.Attributes.Contains("amxperu_casetype") && incident["amxperu_casetype"] != null)
                    {
                        Guid idCaseType = ((EntityReference)incident.Attributes["amxperu_casetype"]).Id;
                        Entity caseType = service.Retrieve("amxperu_casetype", idCaseType, new ColumnSet("ust_code"));

                        if (caseType != null)
                        {
                            if (caseType.Attributes.Contains("ust_code") && caseType["ust_code"] != null)
                            {
                                strCode = caseType.Attributes["ust_code"].ToString();
                            }
                        }
                    }

                    if (incident.Attributes.Contains("ust_osiptelcomplaintid") && incident["ust_osiptelcomplaintid"] != null) 
                    {
                        strComplaintId = incident["ust_osiptelcomplaintid"].ToString();
                    }

                    if (incident.Attributes.Contains("ust_notifyoactostopcollectionactions") && incident["ust_notifyoactostopcollectionactions"] != null)
                    {
                        //TO DO: Enable comments when sendEmail works.
                        //isNotified = (Boolean)incident["ust_notifyoactostopcollectionactions"];
                        
                    }

                    /* This is the only one case type which send an email:
                    * 	• Reclamo OSIPTEL   
                    */
                    if (strCode == "004" && isNotified )
                    {
                        string value = "";
                        AmxPeruCrearDisputaResponseDTO response = CallPsbServiceAmxPeruCrearDisputa(strComplaintId, value, value, value, value, value, value, value, value, value, value, value);
                        //throw new InvalidPluginExecutionException(response.Output.response.DescriptionResponse);
                    }

                    
                }

            }
            catch (ApplicationException ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
            catch (InvalidPluginExecutionException ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
            catch (EndpointNotFoundException ex)
            {
                throw new EndpointNotFoundException(ex.Message);
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message, ex);
            }
        }

        public AmxPeruCrearDisputaResponseDTO CallPsbServiceAmxPeruCrearDisputa(String _ProblemID, String _PartyAccountID, String _BillingAmountUnit,
                                                            String _BillingAmount, String _ServiceSpecTypeName, String _EntitySpecType,
                                                            String _EntitySpecID, String _IntStartDate, String _Description,
                                                            String _BusinessIntTypeName, String _ReasonCode, String _Reson)
        {
            try
            {
                string operation = "AmxPeruTransaccionDisputas";
                //TO DO: Enable comments
                //TO DO: Enable comments
                string sUri = Util.GetCrmConfiguration(service, "PsbEndpoint");
                sUri += operation;
                
                AmxPeruCrearDisputaRequestDTO request = CreateRequest(_ProblemID, _PartyAccountID, _BillingAmountUnit, _BillingAmount,_ServiceSpecTypeName, _ServiceSpecTypeName, _EntitySpecID
                                                                        , _IntStartDate, _Description, _BusinessIntTypeName, _ReasonCode, _Reson);

                //string sUri = "http://localhost:6004/api/v1/workflow/AmxPeruTransaccionDisputas";  

                myTrace.Trace("uri: " + sUri);

                // Call the member.
                IPSBServices psb = new PSBServices.PSBServices();
                return psb.CrearDisputa( service, request, sUri);

            }
            catch
            {
                throw;
            }
        }

        /*
         * Dependencias: Esto depiende de otras tasks que aún están on hold... 
            -AMXPEASIS-3182
            -AMXPEASIS-3087
            -AMXPEASIS-2926
            -AMXPEASIS-3160 
         * Mensaje de Cleyton: por ahora la idea era solamente avanzar con la llamada al servicio con datos en duro, y terminar después 
         * Fecha: 12/07 - Skype
         */
        //TO DO: Dependencies
        private bool HasAmountInDispute(IOrganizationService _service, Guid caseId)
        {
            try
            {

            }
            catch
            {
                throw;
            }

            return true;
        }

        //TO DO: Dependencies
        private bool IsSentBeforeToOAC(IOrganizationService _service, Guid caseId)
        {
            try
            {

            }
            catch
            {
                throw;
            }

            return false;
        }

        //TO DO: We can modify the vars hardcoded
        private string CreateJsonString()
        {
            string request = string.Empty;
//            var str = @"{
//                    ""msisdnWriteRequestModel"": {
//                    ""$type"": ""AmxPeruPSBActivities.Activities.MSISDN.msisdnWriteRequestModel , AmxPeruPSBActivities"",
//                    ""IsLock"": false,
//                    ""MsisdnSdpId"": ""0"",";
//            str += "\"MsisdnNumber\": " + "\"" + "" + "\"" + ",";
//            str += "\"OrderResourceGuid\": " + "\"" + "" + "\"" + "}" +
//                    "}";

            //TO DO: INICIO HARDCODE. hardcodeamos el request, url y amxperuname para fines de prueba. Debe ser BORRADO.
            var _ProblemID = "39271465"; //TO DO:
            var _PartyAccountID = "39275295"; //TO DO:
            var _BillingAmountUnit = "604"; //TO DO:
            var _BillingAmount = "100.89"; //TO DO:
            var _ServiceSpecTypeName = "MOVIL"; //TO DO:
            var _EntitySpecType = "REC"; //TO DO:
            var _EntitySpecID = "TRX-08021_002"; //TO DO:
            var _IntStartDate = "2016-01-15"; //TO DO:
            var _Description = "Reclamos"; //TO DO:
            var _BusinessIntTypeName = "E"; //TO DO:LIBERACIÓN
            var _ReasonCode = "12"; //TO DO:


            request = @"{
                            ""disputaWriteRequestModel"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruCrearDisputaRequestDTO, AmxPeruPSBActivities"",
                            ""CustomerID"":"""",";

            request += "\"ProblemID\": " + "\"" + _ProblemID + "\"" + ",";
            request += "\"PartyAccountID\":" + "\"" + _PartyAccountID + "\"" + ",";
            request += "\"BillingAmountUnit\":" + "\"" + _BillingAmountUnit + "\"" + ",";
            request += "\"BillingAmount\":" + "\"" + _BillingAmount + "\"" + ",";
            request += "\"ServiceSpecTypeName\":" + "\"" + _ServiceSpecTypeName + "\"" + ",";
            request += "\"EntitySpecType\":" + "\"" + _EntitySpecType + "\"" + ",";
            request += "\"EntitySpecID\":" + "\"" + _EntitySpecID + "\"" + ",";
            request += "\"IntStartDate\":" + "\"" + _IntStartDate + "\"" + ",";
            request += "\"Description\":" + "\"" + _Description + "\"" + ",";
            request += "\"BusinessIntTypeName\":" + "\"" + _BusinessIntTypeName + "\"" + ",";
            request += "\"ReasonCode\":" + "\"" + _ReasonCode + "\"" + ",";
            request += "\"Reson\":" + "\"" + "" + "\"" + "}" + "}";

            return request;
        }

        private AmxPeruCrearDisputaRequestDTO CreateRequest(String _ProblemID, String _PartyAccountID, String _BillingAmountUnit,
                                                            String _BillingAmount, String _ServiceSpecTypeName, String _EntitySpecType,
                                                            String _EntitySpecID, String _IntStartDate, String _Description,
                                                            String _BusinessIntTypeName, String _ReasonCode, String _Reson)
        {
            //TO DO: Cambiar los string por los parámetros del request.
            myTrace.Trace("Entro al request");

            //DEFINIDOS
            //BusinessIntTypeName
            //I=Creacion de disputa
            //U=Actualizacion
            //E=Liberacion
            //R=Reapertura
            
            //EntitySpecType
            //REC=Recibo
            //FAC=Factura
            //NC=Nota de Credito


            //Servicio a consumir tipo PSB
            AmxPeruCrearDisputaRequestDTO obj = new AmxPeruCrearDisputaRequestDTO();
            obj.request = new Request()
            {
                ProblemID = _ProblemID,
                PartyAccountID = "39275295",
                BillingAmountUnit = "604",
                BillingAmount = "100.89", 
                ServiceSpecTypeName = "MOVIL",
                EntitySpecType  = "REC",
                EntitySpecID = "TRX-08021_002",

                IntStartDate = DateTime.Today.ToString("dd-MM-yyyy"),
                Description = "Reclamos",
                BusinessIntTypeName = "E", //LIBERACION
                ReasonCode = "12",
                Reson = "",
            };

            return obj;

        }
    }
}
