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

using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Messages;
using System.Configuration;
using System.Data;
using UstClaro_Case.Utilities;

///  /// <summary>
/// Creador : William Quiroz  
/// Actualización: 8/07/2018
/// Función : update Status Code Case(Resolved and  Resolution).
/// Evento  : Post-Operation
/// Req.    : AMXPEASIS-3092
/// Entidad : case
/// </summary>
/// 

namespace UstClaro_Case
{
    public class UstNetWorkIncidents : IPlugin
    {
        ITracingService myTrace;
        int erComplaintPhase;
        int statusincident = 0;


        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            //myTrace.Trace("Inicio:");

            try
            {

                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {
                        //Variables Locales
                        string sCodCaseType = string.Empty;
                        EntityReference erTipoCaso = null;
                        EntityReference erCategory4 = null;
                        Guid erincidentId = Guid.Empty;
                        string sCodCategory4 = string.Empty;
                        bool erIsAveria = false;
                        string stageId = null;
                        bool hiddenConsumeService = false;
                        Guid nota = Guid.Empty;
                        int statuscode = 0;
                        string networkmassivefaultstatus = string.Empty;

                        Entity entity = (Entity)context.InputParameters["Target"];

                        if (entity.LogicalName != "amxperu_networkincident") return;

                        if (entity == null) return;

                        if (entity.Attributes.Contains("amxperu_status") && entity["amxperu_status"] != null)
                        {
                            Guid networkincidentId = entity.Id;
                            myTrace.Trace("networkincidentId :" + networkincidentId.ToString());

                            int status = ((OptionSetValue)entity.Attributes["amxperu_status"]).Value;

                            myTrace.Trace("status :" + status);

                            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                         "<entity name='incident'>" +
                                         "<attribute name='title' />" +
                                         "<attribute name='amxperu_casetype' />" +
                                         "<attribute name='ust_category4' />" +
                                         "<attribute name='ust_complaintphase' />" +
                                         "<attribute name='etel_isdispute' />" +
                                          "<attribute name='incidentid' />" +
                                          "<attribute name='statecode' />" +
                                          "<attribute name='statuscode' />" +
                                          "<attribute name='stageid' />" +
                                          "<attribute name='ust_hiddenconsumeservice' />" +
                                          "<attribute name='ust_networkmassivefaultstatus' />" +
                                         "<attribute name='ust_networkmassivefaultid' />" +
                                         "<order attribute='title' descending='false' />" +
                                         "<filter type='and'>" +
                                          "<condition attribute='ust_networkmassivefaultid' operator='eq' uiname='' uitype='amxperu_networkincident' value='" + entity.Id + "' />" +
                                          "<condition attribute='statuscode' operator='eq' value='864340008' />" + //Solo Pendientes
                                         "</filter>" +
                                         "</entity>" +
                                         "</fetch>";

                            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchXml));
                          
                            //myTrace.Trace("result :" + result.Entities.Count.ToString());
                            for (int j = 0; j < result.Entities.Count; j++)
                            {
                                myTrace.Trace("Ingrese :" + result.ToString());
                             
                                if (result[j].Attributes.Contains("amxperu_casetype") && result[j]["amxperu_casetype"] != null)
                                {
                                    erTipoCaso = ((EntityReference)result[j].Attributes["amxperu_casetype"]);

                                    Entity caseType = service.Retrieve("amxperu_casetype", erTipoCaso.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code"));

                                    if (caseType.Attributes.Contains("ust_code") && caseType.Attributes["ust_code"] != null)
                                    {
                                        //Get the Case Type Code
                                        sCodCaseType = caseType.Attributes["ust_code"].ToString();
                                        //myTrace.Trace("sCodCaseType :" + sCodCaseType.ToString());
                                    }

                                    if (result[j].Attributes.Contains("ust_category4") && result[j]["ust_category4"] != null)
                                    {
                                        erCategory4 = ((EntityReference)result[j].Attributes["ust_category4"]);
                                   
                                        var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                          "<entity name='amxperu_caseothercategory'>" +
                                          "<attribute name='amxperu_caseothercategoryid' />" +
                                          "<attribute name='amxperu_name' />" +
                                          "<attribute name='createdon' />" +
                                          "<attribute name='ust_isaveria' />" +
                                          "<order attribute='amxperu_name' descending='false' />" +
                                          "<filter type='and'>" +
                                             "<condition attribute='ust_isaveria' operator='eq' value='1' />" +
                                             "<condition attribute='amxperu_caseothercategoryid' value='" + erCategory4.Id + "' operator='eq' uitype='amxperu_caseothercategory' />" +
                                          "</filter>" +
                                          "</entity>" +
                                          "</fetch>";

                                        EntityCollection resultC = service.RetrieveMultiple(new FetchExpression(fetchXmlC));
                                        if (resultC.Entities.Count > 0)
                                        {                                         
                                            if (resultC[0].Attributes.Contains("ust_isaveria") && resultC[0]["ust_isaveria"] != null)
                                            {
                                                //myTrace.Trace("erIsAveria :" + resultC[0]["ust_isaveria"].ToString());
                                                erIsAveria = (bool)resultC[0].Attributes["ust_isaveria"];
                                            }
                                            else
                                            {
                                                erIsAveria = false;
                                            }

                                        }
                                        if (result[j].Attributes.Contains("ust_complaintphase") && result[j]["ust_complaintphase"] != null)
                                        {
                                            erComplaintPhase = ((OptionSetValue)result[j].Attributes["ust_complaintphase"]).Value;
                                            //myTrace.Trace("erComplaintPhase :" + erComplaintPhase);
                                        }

                                        if (result[j].Attributes.Contains("stageid") && result[j]["stageid"] != null)
                                        {
                                            stageId = result[j].Attributes["stageid"].ToString();
                                            //myTrace.Trace("stageId :" + stageId);
                                        }

                                        if (result[j].Attributes.Contains("incidentid") && result[j]["incidentid"] != null)
                                        {
                                            //myTrace.Trace("incidentid :" + result[j]["incidentid"]);
                                            erincidentId = ((Guid)result[j]["incidentid"]);
                                        }
                                        if (result[j].Attributes.Contains("statuscode") && result[j]["statuscode"] != null)
                                        {
                                            statuscode = ((OptionSetValue)result[j].Attributes["statuscode"]).Value;
                                        }
                                        if (result[j].Attributes.Contains("ust_networkmassivefaultstatus") && result[j]["ust_networkmassivefaultstatus"] != null)
                                        {
                                            networkmassivefaultstatus = result[j].Attributes["ust_networkmassivefaultstatus"].ToString();
                                        }
                                        string PhaseNameEN = Util.GetCrmConfiguration(service, "NameFaseResearchEnglish");
                                        string PhaseNameES = Util.GetCrmConfiguration(service, "NameFaseResearchSpanish");
                                        string stageName = Util.GetProcessStageName(service, new Guid(stageId));
                                        //myTrace.Trace("stageName :" + stageName);
                                        //Actualizar el campo de estado de avería masiva a “Cerrado”.
                                        //Concluir el reclamo.
                                        //myTrace.Trace("status :" + sCodCaseType + " " + erIsAveria + " " + erComplaintPhase);
                                        if (status == 250000001 && sCodCaseType == "004" && erIsAveria == true) //Closed and Tipo Caso(Reclamo OSIPTEL) and Categoria and Averia
                                        {
                                            if (erComplaintPhase == 864340000) // Es Averia
                                            {
                                                //myTrace.Trace("Ingreso aqui 1 ");
                                                //TO DO: Validar el stagename
                                                if (stageName == PhaseNameEN || stageName == PhaseNameES)
                                                {
                                                    //myTrace.Trace("Ingreso aqui 2 ");
                                                    Entity obj = new Entity("incident");
                                                    obj.Id = result[j].Id;
                                                    obj["ust_networkmassivefaultstatus"] = "Cerrado";
                                                    service.Update(obj);

                                                    Entity annotation = new Entity("annotation");
                                                    annotation.Attributes.Add("subject", "signature");

                                                    annotation["subject"] = "Reclamo en fase de avería concluido automáticamente tras el cierre de la Averia Masiva";
                                                    annotation.Attributes.Add("objectid", new EntityReference("incident", result[j].Id));
                                                    Guid annotationId = service.Create(annotation);

                                                    //Cerramos el caso
                                                    Entity resolution = new Entity("incidentresolution");
                                                    resolution["subject"] = "Closed";
                                                    resolution["incidentid"] = new EntityReference(result[j].LogicalName, result[j].Id);

                                                    //Caso Resuelto
                                                    CloseIncidentRequest closecase = new CloseIncidentRequest();

                                                    closecase.IncidentResolution = resolution;
                                                    //myTrace.Trace("statuscode :" + closecase.IncidentResolution.Id);
                                                    closecase.Status = new OptionSetValue(5);

                                                    CloseIncidentResponse closeresponse = (CloseIncidentResponse)service.Execute(closecase);

                                                }
                                                else
                                                {
                                                    //myTrace.Trace("Aqui 2 :");
                                                    //Actualizar el campo de estado de avería masiva.
                                                    Entity obj = new Entity("incident");
                                                    obj.Id = result[j].Id;

                                                    obj["ust_networkmassivefaultstatus"] = "Abierto";
                                                    service.Update(obj);

                                                    networkIncident(service, networkincidentId, result[j].Id);
                                                }
                                            }
                                            else if (erComplaintPhase == 864340001) //Es 1era Instancia
                                            {
                                                if (result[j].Attributes.Contains("ust_hiddenconsumeservice") && result[j]["ust_hiddenconsumeservice"] != null)
                                                {
                                                    hiddenConsumeService = (bool)result[j].Attributes["ust_hiddenconsumeservice"];
                                                }
                                                hiddenConsumeService = true;
                                                //myTrace.Trace("Aqui Instancia :" + hiddenConsumeService);
                                                if (hiddenConsumeService == true)
                                                {
                                                    //if (statuscode != 864340001)
                                                    //{
                                                   //myTrace.Trace("Ingrese 3:" + result.ToString());
                                                    //solamente se cambia a “Con Resolución” cuando la carta de respuesta es generada).
                                                    Entity obj = new Entity("incident");
                                                    obj.Id = result[j].Id;
                                                    obj["statuscode"] = new OptionSetValue(864340001); //Con Resolucion
                                                    obj["ust_networkmassivefaultstatus"] = "Cerrado";
                                                    service.Update(obj);

                                                    DateTime fechaActual = DateTime.Today;

                                                    Entity annotation = new Entity("annotation");
                                                    annotation.Attributes.Add("subject", "signature");

                                                    annotation["subject"] = "Avería masiva < 123 > asociada a este reclamo concluida en " + fechaActual;
                                                    annotation.Attributes.Add("objectid", new EntityReference("incident", erincidentId));
                                                    Guid annotationId = service.Create(annotation);
                                                    //myTrace.Trace("annotationId :" + annotationId.ToString());

                                                }
                                                else
                                                {
                                                    networkIncident(service, networkincidentId, result[j].Id);
                                                }

                                            }
                                            else
                                            {
                                                networkIncident(service, networkincidentId, result[j].Id);
                                            }
                                        }
                                        else {
                                            networkIncident(service, networkincidentId, result[j].Id);
                                        }

                                       // throw new InvalidPluginExecutionException("Mensaje de error. ");
                                    }
                                    else
                                    {
                                        networkIncident(service, networkincidentId, result[j].Id);
                                    }
                                }
                                //throw new InvalidPluginExecutionException("Mensaje de error. ");
                            }

                            //throw new InvalidPluginExecutionException("Mensaje de error. ");

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

        public void networkIncident(IOrganizationService service, Guid networkincidentId, Guid incidentId)
        {
            var fetchXmlIN = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                         "<entity name='amxperu_networkincident'>" +
                                         "<attribute name='amxperu_networkincidentid' />" +
                                         "<attribute name='amxperu_name' />" +
                                         "<attribute name='createdon' />" +
                                         "<attribute name='statuscode' />" +
                                          "<attribute name='modifiedon' />" +
                                          "<attribute name='amxperu_incidentid' />" +
                                           "<attribute name='amxperu_status' />" +
                                         "<order attribute='amxperu_name' descending='false' />" +
                                         "<filter type='and'>" +
                                            "<condition attribute='amxperu_networkincidentid' value='" + networkincidentId + "' operator='eq' uitype='amxperu_networkincident' />" +
                                         "</filter>" +
                                         "</entity>" +
                                         "</fetch>";
            EntityCollection resultIN = service.RetrieveMultiple(new FetchExpression(fetchXmlIN));
            if (resultIN.Entities.Count > 0)
            {
                if (resultIN[0].Attributes.Contains("amxperu_status") && resultIN[0]["amxperu_status"] != null)
                {
                    statusincident = ((OptionSetValue)resultIN[0].Attributes["amxperu_status"]).Value;
                    //myTrace.Trace("statusincident :" + statusincident);
                }
            }
            Entity objI = new Entity("incident");
            objI.Id = incidentId;
            if (statusincident == 250000000)
            {
               // myTrace.Trace("Ingreso 1 :" + statusincident);
                objI["ust_networkmassivefaultstatus"] = "Abierto";

            }
            else if (statusincident == 250000001)
            {
                //myTrace.Trace("Ingreso 2 :" + statusincident);
                objI["ust_networkmassivefaultstatus"] = "Cerrado";

            }
            myTrace.Trace("Ingreso 3 :");
            service.Update(objI);


        }
    }
}
