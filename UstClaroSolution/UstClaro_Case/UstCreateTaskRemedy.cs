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
using UstClaro_Case.DTO.AmxPeruGeneraIncidencia;
using UstClaro_Case.PSBServices;

namespace UstClaro_Case
{
    public class UstCreateTaskRemedy : IPlugin
    {
        ITracingService myTrace;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    //Variables Locales
                    string sCodCaseType = string.Empty;
                    string sCodCategory1 = string.Empty;
                    string sCodCategory2 = string.Empty;
                    string sCodCategory3 = string.Empty;
                    string sCodCategory4 = string.Empty;
                    int ticketRemedyValue = 0;

                    Entity target = (Entity)context.InputParameters["Target"];

                    if (target.LogicalName != "task") return;

                    if (target == null) return;

                    EntityReference erRegardingObject = null;
                    EntityReference erCategory1 = null;
                    EntityReference erCategory2 = null;
                    EntityReference erCategory3 = null;

                    //EntityReference erCategory5 = null;

                    if (target.Attributes.Contains("regardingobjectid") && target["regardingobjectid"] != null)
                    {
                        erRegardingObject = (EntityReference)target["regardingobjectid"];

                        if (erRegardingObject.LogicalName == "incident")
                        {
                            if (target.Attributes.Contains("amxperu_tasktype") && target["amxperu_tasktype"] != null)
                            {
                                ticketRemedyValue = ((OptionSetValue)target["amxperu_tasktype"]).Value;
                            }
                        }
                    }
                    else
                        throw new InvalidPluginExecutionException("Task should be realted to a case. Check [regardingobject] field. ");

                    Entity eCase = service.Retrieve("incident", erRegardingObject.Id, new ColumnSet("amxperu_casetype", "ust_category1", "ust_category2", "ust_category3", "ust_category4"));


                    if (eCase.Attributes.Contains("ust_category1") && eCase.Attributes["ust_category1"] != null)
                    {
                        erCategory1 = ((EntityReference)eCase.Attributes["ust_category1"]);
                    }

                    if (eCase.Attributes.Contains("ust_category2") && eCase.Attributes["ust_category2"] != null)
                    {
                        erCategory2 = ((EntityReference)eCase.Attributes["ust_category2"]);
                    }

                    if (eCase.Attributes.Contains("ust_category3") && eCase.Attributes["ust_category3"] != null)
                    {
                        erCategory3 = ((EntityReference)eCase.Attributes["ust_category3"]);
                    }

                    //TO DO: TAREA REMEDY
                    if (ticketRemedyValue == 1)
                    {
                        //TO DO: Este servicio aún no está operativo para consumir.
                        GeneraIncidenciaResponseDTO response = CallPsbServiceAmxPeruGeneraIncidencia(service, "1", "", "INT-CHQ 2-002_generarIncidenciatask", erCategory1 != null ? erCategory1.Name : string.Empty, erCategory2 != null ? erCategory2.Name : string.Empty, erCategory3 != null ? erCategory3.Name : string.Empty, target.Id.ToString());
                        //throw new InvalidPluginExecutionException(response.Output.response.DescriptionResponse);


                        if (response != null)
                            if (response.Output != null)
                                if (response.Output.response != null)
                                    if (response.Output.response.Status == 0)
                                    {
                                        //target.Attributes["ust_remedyticketstatus"] = response.Output.response.Status.ToString();

                                        if (response.Output.response.ProblemId != null)
                                            target.Attributes["ust_remedyticketid"] = response.Output.response.ProblemId;
                                        else
                                            return;

                                        //if (response.Output.response.DescriptionResponse != null)
                                          //  target.Attributes["ust_remedyticketanswer"] = response.Output.response.DescriptionResponse;
                                    }
                                    
                    }
                }
            }
            catch (ApplicationException ex)
            {
                throw new ApplicationException("Controlled Error: " + ex.Message, ex);
            }
            catch (InvalidPluginExecutionException ex)
            {
                throw new InvalidPluginExecutionException("PlugIn Error: " + ex.Message, ex);
            }
            catch (EndpointNotFoundException ex)
            {
                throw new EndpointNotFoundException("EndPoint Error: " + ex.Message, ex);
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException("Crm Service error: " + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Uncontrolled error: " + ex.Message, ex); ;
            }

        }


        public GeneraIncidenciaResponseDTO CallPsbServiceAmxPeruGeneraIncidencia(IOrganizationService service, String _strUrgency, String _strServiceCI, String _strDescription, String _strCategory1
                                                            , String _strCategory2, String _strCategory3, String _strTaskId)
        {
            try
            {
                string operation = "AmxPeruGeneraIncidenciaExternal";
                //TO DO: Enable comments
                string sUri = Utilities.Util.GetCrmConfiguration(service, "PsbEndpoint");
                sUri += operation;

                GeneraIncidenciaRequestDTO request = CreateRequest(service, _strUrgency, _strServiceCI, _strDescription, _strCategory1, _strCategory2, _strCategory3
                                                                        , _strTaskId);

                // Call the member.
                IPSBServices psb = new PSBServices.PSBServices();
                return psb.GeneraIncidencia(service, request, sUri);

            }
            catch
            {
                throw;
            }
        }


        private GeneraIncidenciaRequestDTO CreateRequest(IOrganizationService _service, String _strUrgency, String _strServiceCI, String _strDescription, String _strCategory1
                                                            , String _strCategory2, String _strCategory3, String _strTaskId)
        {
            //TO DO: Cambiar los string por los parámetros del request.

            var user = Utilities.Util.GetCrmConfiguration(_service, "PsbServiceRemedyUserName");
            var clave = Utilities.Util.GetCrmConfiguration(_service, "PsbServiceRemedyUserPassword");

            //Impact
            //1-Extensive/Widespread      1000
            //2-Significant/Large         2000
            //3-Moderate/Limited          3000
            //4-Minor/Localized           4000
            
            //Urgency
            //1-Critical                  1000
            // 2-High                      2000
            // 3-Medium                    3000
            // 4-Low                       4000
            

            //Servicio a consumir tipo PSB
            GeneraIncidenciaRequestDTO obj = new GeneraIncidenciaRequestDTO();
            obj.request = new Request()
            {
                Password = user,
                UserName = clave,
                Urgency = _strUrgency, //strUrgency (1)
                ServiceCI = "", //strServiceCI
                Impact = "1-Extensive/Widespread", //DEFAULT
                Action = "CREATE", //DEFAULT
                Description = _strDescription, //strDescription
                CategorizationTier1 = _strCategory1,//strCategory1
                CategorizationTier2 = _strCategory2,//strCategory2
                CategorizationTier3 = _strCategory3,//strCategory3
                RecordType = "TASK", //DEFAULT
                RecordID = _strTaskId //strCaseId
            };

            return obj;

        }
    }
}
