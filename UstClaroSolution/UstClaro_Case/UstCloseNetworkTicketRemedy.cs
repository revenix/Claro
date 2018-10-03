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
using Microsoft.Crm.Sdk.Messages;
using UstClaro_Case.DTO.AmxPeruTransaccionDisputa;
using UstClaro_Case.DTO.AmxPeruTicketRemedy;
using Newtonsoft.Json;

namespace UstClaro_Case
{
    /// Creador : William Quiroz
    /// Fecha: 13/07/2018
    /// Jira: 3101
    /// Function : Close Network TT Related to the Complaint
    /// Trigger  : Close
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    /// 
    public class UstCloseNetworkTicketRemedy : IPlugin
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
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {
                        //Variables Locales
                        string strCode = null;
                        string strTicketId = null;
                        string strTicketDesc = null;
                        string strTicketStatus = null;
                        Entity eTarget = (Entity)context.InputParameters["Target"];
                        string stageId = null;

                        #region Prueba de servicios
                        //foreach (var i in eTarget.Attributes)
                        //{
                        //    myTrace.Trace("key: " + i.Key);
                        //    myTrace.Trace("val: " + i.Value);
                        //}

                        //AmxPeruTicketRemedyResponseDTO response = CallPsbServiceAmxPeruTicketRemedy(strTicketId, strTicketDesc, strTicketStatus);
                        //throw new InvalidPluginExecutionException("Estuvo bien el servicio " + response.Output.response.Status);

                        #endregion

                        Entity target = (Entity)context.InputParameters["Target"];

                        if (target.Attributes.Contains("ust_remedyticketid") && target["ust_remedyticketid"] != null)
                            strTicketId = target["ust_remedyticketid"].ToString();

                        if (target.Attributes.Contains("ust_remedyticketanswer") && target["ust_remedyticketanswer"] != null)
                            strTicketDesc = target["ust_remedyticketanswer"].ToString();

                        if (target.Attributes.Contains("ust_remedyticketstatus") && target["ust_remedyticketstatus"] != null)
                            strTicketStatus = target["ust_remedyticketstatus"].ToString();

                        if (target.Attributes.Contains("stageid") && target["stageid"] != null)
                        {
                            stageId = target.Attributes["stageid"].ToString();

                            myTrace.Trace(Util.GetProcessStageName(service, new Guid(stageId)));

                            Entity incident = service.Retrieve("incident", eTarget.Id, new ColumnSet("amxperu_casetype", "ust_remedyticketid", "ust_remedyticketanswer", "ust_remedyticketstatus"));

                            if (strTicketId == null) 
                            {
                                if (incident.Attributes.Contains("ust_remedyticketid") && incident["ust_remedyticketid"] != null)
                                {
                                    strTicketId = incident["ust_remedyticketid"].ToString();
                                }
                                //TO DO: Enable this part 17/07
                                //else
                                //    return; //Si no hay un incidente id entonces no debe entrar al plugIn.
                            }

                            if (strTicketDesc == null)
                            {
                                if (incident.Attributes.Contains("ust_remedyticketanswer") && incident["ust_remedyticketanswer"] != null)
                                {
                                    strTicketDesc = incident["ust_remedyticketanswer"].ToString();
                                }
                                //TO DO: Enable this part 17/07
                                //else
                                //    return; //Si no hay un desc entonces no debe entrar al plugIn.
                            }

                            if (strTicketStatus == null)
                            {
                                if (incident.Attributes.Contains("ust_remedyticketstatus") && incident["ust_remedyticketstatus"] != null)
                                {
                                    strTicketStatus = incident["ust_remedyticketid"].ToString();
                                }
                                //TO DO: Enable this part 17/07
                                //else
                                //    return; //Si no hay un incidente id entonces no debe entrar al plugIn.
                            }

                            //BUSINESS LOGIC
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
                                if (strCode == "004") //Reclamo OSIPTEL
                                {
                                    string PhaseNameEN = Util.GetCrmConfiguration(service, "NameFaseNotifyCustomerEnglish");
                                    string PhaseNameES = Util.GetCrmConfiguration(service, "NameFaseNotifyCustomerSpanish");
                                    string stageName = Util.GetProcessStageName(service,new Guid(stageId));

                                    //TO DO: Buscar el stagename by stageid
                                    if (stageName == PhaseNameEN || stageName == PhaseNameES) //Notify Customer
                                    {
                                        AmxPeruTicketRemedyResponseDTO response = CallPsbServiceAmxPeruTicketRemedy(strTicketId, strTicketDesc, strTicketStatus);
                                        target.Attributes["ust_remedyticketstatus"] = response.Output.response.Status;

                                        //if (response != null)
                                        //    if (response.Output != null)
                                        //        if (response.Output.response != null)
                                        //            if (response.Output.response.Status != 0)
                                        //                throw new Exception("Estuvo mal el servicio: " + response.Output.response.DescriptionResponse);
                                        //            else
                                        //                throw new Exception("Estuvo bien el servicio: " + response.Output.response.DescriptionResponse);
                                        
                                    }
                                }
                            }

                        }
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public AmxPeruTicketRemedyResponseDTO CallPsbServiceAmxPeruTicketRemedy(String strTicketId, String strTicketDesc, String strTicketStatus)
        {
            try
            {
                string operation = "AmxPeruTicketRemedy";
                //TO DO: Enable comments
                //TO DO: Enable comments
                string sUri = Util.GetCrmConfiguration(service, "PsbEndpoint");
                sUri += operation;

                AmxPeruTicketRemedyRequestDTO request = CreateRequest(strTicketId, strTicketDesc, strTicketStatus);
                //string Uri = "http://localhost:6004/api/v1/workflow/AmxPeruTicketRemedy";  //10.103.27.154:6004

                // Call the member.
                IPSBServices psb = new PSBServices.PSBServices();
                return psb.ModificarTicket(service, request, sUri);

            }
            catch
            {
                throw;
            }
        }

        //TO DO: We can modify the vars hardcoded
        private string CreateRequestObject(String strTicketId, String strTicketDesc, String strTicketState)
        {
            //TO DO: Cambiar los string por los parámetros del request.
            
            //Servicio a consumir tipo PSB
            AmxPeruTicketRemedyRequestDTO obj = new AmxPeruTicketRemedyRequestDTO();
            obj.request = new DTO.AmxPeruTicketRemedy.Request()
            {
                userId = "ticketsfield",
                password = "ticketsfield",
                ticketId = "INC000001077426",
                ticketDesc = "1",
                reason = "1",
                ticketState = "Assigned",
            };

            var inputPSB = new Dictionary<string, object>()
            {
                { "request",   obj }
            };

            var jsonSerializerSettings = new JsonSerializerSettings() { TypeNameHandling = TypeNameHandling.All };
            string jsonSerialize =  Newtonsoft.Json.JsonConvert.SerializeObject(inputPSB, jsonSerializerSettings);

            return jsonSerialize;

        }

        private AmxPeruTicketRemedyRequestDTO CreateRequest(String strTicketId, String strTicketDesc, String strTicketState)
        {
            //TO DO: Cambiar los string por los parámetros del request.
            myTrace.Trace("Entro al request");

            //Servicio a consumir tipo PSB
            AmxPeruTicketRemedyRequestDTO obj = new AmxPeruTicketRemedyRequestDTO();
            obj.request = new DTO.AmxPeruTicketRemedy.Request()
            {
                userId = "ticketsfield",
                password = "ticketsfield",
                ticketId = "INC000001077426", //strTicketId,
                ticketDesc = "1", //strTicketDesc
                reason = "1", // strTicketState
                ticketState = "Assigned",
            };

            return obj;

        }
    }
}
