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
    /// Fecha: 13/07/2018
    /// Jira: 2943
    /// Function : Request Collection system to stop collection activities for financial dispute complaints
    /// Trigger  : Create To do: cuando cambia el documents stage y hay un documento financiero.
    /// RN-CHQ-2-031
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    public class UstNotifyDisclaimedAmountOAC : IPlugin
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
            //ust_amounttobereturned
            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    Entity target = (Entity)context.InputParameters["Target"];

                    if (target.LogicalName != "incident") return;

                    Entity incident = service.Retrieve("incident", target.Id, new ColumnSet("amxperu_casetype", "ust_osiptelcomplaintid", "ust_notifyoactostopcollectionactions"));

                    string strCode = null;
                    string strComplaintId = null;
                    bool IsCreatedDisput = false;

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

                    if (incident.Attributes.Contains("ust_notifyoactostopcollectionactions") && incident["ust_notifyoactostopcollectionactions"] != null)
                    {
                        IsCreatedDisput = (bool) incident["ust_notifyoactostopcollectionactions"];
                    }

                    if (incident.Attributes.Contains("ust_osiptelcomplaintid") && incident["ust_osiptelcomplaintid"] != null)
                    {
                        strComplaintId = incident["ust_osiptelcomplaintid"].ToString();
                    }

                    /* This is the only one case type which send an email:
                    * 	• Reclamo OSIPTEL   
                    */
                    if (strCode == "004" && IsAmountDisclaimed(service, target.Id) && !IsCreatedDisput)
                    {
                        //CREATE
                        string value = "";
                        AmxPeruCrearDisputaResponseDTO response = CallPsbServiceAmxPeruCrearDisputa(strComplaintId, value, value, value, value, value, value, value, value, value, value, value,false);
                        target.Attributes["ust_notifyoactostopcollectionactions"] = true;
                    }
                    else if (strCode == "004" && IsAmountDisclaimed(service, target.Id) && IsCreatedDisput)
                    {
                        //UPDATE
                        string value = "";
                        AmxPeruCrearDisputaResponseDTO response = CallPsbServiceAmxPeruCrearDisputa(strComplaintId, value, value, value, value, value, value, value, value, value, value, value,true);
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
                                                            String _BusinessIntTypeName, String _ReasonCode, String _Reson,Boolean _IsUpdate)
        {
            try
            {
                string operation = "AmxPeruTransaccionDisputas";
                //TO DO: Enable comments
                //TO DO: Enable comments
                string sUri = Util.GetCrmConfiguration(service, "PsbEndpoint");
                sUri += operation;

                AmxPeruCrearDisputaRequestDTO request = CreateRequest(_ProblemID, _PartyAccountID, _BillingAmountUnit, _BillingAmount, _ServiceSpecTypeName, _ServiceSpecTypeName, _EntitySpecID
                                                                        , _IntStartDate, _Description, _BusinessIntTypeName, _ReasonCode, _Reson, _IsUpdate);

                //string sUri = "http://localhost:6004/api/v1/workflow/AmxPeruTransaccionDisputas";  

                // Call the member.
                IPSBServices psb = new PSBServices.PSBServices();
                return psb.CrearDisputa(service, request, sUri);

            }
            catch
            {
                throw;
            }
        }

        //TO DO: Dependencies
        private bool IsAmountDisclaimed(IOrganizationService _service, Guid caseId)
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
            var _BusinessIntTypeName = "I"; //TO DO:
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
                                                            String _BusinessIntTypeName, String _ReasonCode, String _Reson,Boolean _IsUpdate)
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
                EntitySpecType = "REC",
                EntitySpecID = "TRX-08021_002",

                IntStartDate = DateTime.Today.ToString("dd-MM-yyyy"),
                Description = "Reclamos",
                BusinessIntTypeName = _IsUpdate ? "U": "I",
                ReasonCode = "12",
                Reson = "",
            };

            return obj;

        }

    }
}
