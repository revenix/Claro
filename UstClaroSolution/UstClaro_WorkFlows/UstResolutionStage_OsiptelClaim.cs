using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Microsoft.Crm.Sdk.Messages;

namespace UstClaro_WorkFlows
{
    ///  /// <summary>
    /// Creador : William Quiroz  
    /// Actualización: 10/07/2018
    /// Función : Resolution Satege in Type Caso Osiptel Claim.
    /// Evento  : 
    /// Req.    : AMXPEASIS-3111
    /// Entidad : case
    /// </summary>
    ///

    public sealed class UstResolutionStage_OsiptelClaim : CodeActivity
    {
        //ITracingService myTrace;
        #region Input parameters
        [Input("Put Case Type")]
        [ReferenceTarget("amxperu_casetype")]
        public InArgument<EntityReference> CaseType { get; set; }

        [Input("Put Status Code")]
        [AttributeTarget("incident", "statuscode")]
        public InArgument<OptionSetValue> StatusCode { get; set; } //Notificado


        #endregion

        protected override void Execute(CodeActivityContext executionContext)
        {
            //Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            //Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);


            try
            {

                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    EntityReference usCaseType = CaseType.Get<EntityReference>(executionContext);
                    OptionSetValue usEstado = StatusCode.Get<OptionSetValue>(executionContext);

                    //tracingService.Trace("usCaseType " + CaseType.ToString());
                    //tracingService.Trace("usEstado " + usEstado.Value);

                    //Local Variables
                    int estado = usEstado.Value;
                    string typeCase = "";
                    DateTime modifiedOn = DateTime.Now;
                    int estadoC = 0;

                    Entity entity = (Entity)context.InputParameters["Target"];
                    if (entity.LogicalName != "incident") return;
                    if (entity == null) return;

                    Entity dataCase = service.Retrieve("incident", entity.Id, new ColumnSet("statuscode", "ust_dateofnotification"));

                    //tracingService.Trace("dataCase " + dataCase.Id);

                    if (dataCase.Attributes.Contains("ust_dateofnotification") && dataCase.Attributes["ust_dateofnotification"] != null)
                        modifiedOn = (DateTime)dataCase.Attributes["ust_dateofnotification"];

                    DateTime fechatemp = modifiedOn;
                    int diaT = fechatemp.Day;
                    int mesT = fechatemp.Month;
                    int anioT = fechatemp.Year;

                    Entity caseType = service.Retrieve("amxperu_casetype", usCaseType.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code"));

                    if (caseType.Attributes.Contains("ust_code") && caseType.Attributes["ust_code"] != null)
                    {
                        tracingService.Trace("ust_code " + caseType.Attributes.Contains("ust_code").ToString());
                        //Get the Case Type Code
                        typeCase = caseType.Attributes["ust_code"].ToString(); //004  Reclamo OSIPTEL
                    }

                    //myTrace.Trace("typeCase :" + typeCase.ToString());
                    tracingService.Trace("estado " + estado.ToString());

                    if (typeCase == "004" && estado == 864340003) //Tipo reclamo OSIPTEL and Estado(Notificado)
                    {

                        //Buscar si hay hijo del reclamo Abierto 
                        string codeQueja = "005";

                        var fetchQueja = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                  "<entity name='amxperu_casetype'>" +
                                  "<attribute name='amxperu_casetypeid' />" +
                                  "<attribute name='amxperu_name' />" +
                                  "<attribute name='createdon' />" +
                                  "<order attribute='amxperu_name' descending='false' />" +
                                  "<filter type='and'>" +
                                  "<condition attribute='ust_code' value ='" + codeQueja + "' operator= 'eq' />" +
                                  "</filter>" +
                                  "</entity>" +
                                  "</fetch>";

                        EntityCollection resultQ = service.RetrieveMultiple(new FetchExpression(fetchQueja));
                        foreach (var c in resultQ.Entities)
                        {

                            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                         "<entity name='incident'>" +
                                         "<attribute name='title' />" +
                                         "<attribute name='ticketnumber' />" +
                                         "<attribute name='createdon' />" +
                                         "<attribute name='caseorigincode' />" +
                                         "<attribute name='etel_isdispute' />" +
                                          "<attribute name='incidentid' />" +
                                          "<attribute name='statuscode' />" +
                                          "<attribute name='statecode' />" +
                                         "<order attribute='title' descending='false' />" +
                                         "<filter type='and'>" +
                                         "<condition attribute='amxperu_casetype' operator='eq' uiname='' uitype='amxperu_casetype' value='" + c.Id + "' />" +
                                         "<condition attribute='statecode' value='0' operator='eq' /> " +
                                         "<condition attribute='parentcaseid' value='" + entity.Id + "' uitype='incident' operator='eq' /> " +
                                         "</filter>" +
                                         "</entity>" +
                                         "</fetch>";

                            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchXml));
                            foreach (var d in result.Entities)
                            {
                                var fetchXmlCon = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                   "<entity name='etel_crmconfiguration'>" +
                                   "<attribute name='etel_crmconfigurationid' />" +
                                   "<attribute name='etel_name' />" +
                                   "<attribute name='createdon' />" +
                                   "<attribute name='etel_value' />" +
                                    "<attribute name='statecode' />" +
                                   "<order attribute='etel_name' descending='false' />" +
                                   "<filter type='and'>" +
                                   "<condition attribute='etel_name' operator='eq' uiname='' value='ResolveOSIPTELClaim' />" +
                                   "</filter>" +
                                   "</entity>" +
                                   "</fetch>";

                                EntityCollection resultCon = service.RetrieveMultiple(new FetchExpression(fetchXmlCon));

                                if (resultCon[0].Attributes["etel_value"].ToString() != null)
                                {
                                    double plazo = Convert.ToUInt32(resultCon[0].Attributes["etel_value"]);

                                    for (int i = 0; i < plazo; i++)
                                    {
                                        if (modifiedOn.DayOfWeek == DayOfWeek.Sunday || modifiedOn.DayOfWeek == DayOfWeek.Saturday) plazo = plazo + 1;
                                        modifiedOn = modifiedOn.AddDays(1);
                                    }
                                    DateTime fechaUtil = modifiedOn.AddDays(1);

                                    DateTime fechaActual = DateTime.Now;

                                    if (fechaUtil < fechaActual)
                                    {

                                        if (d.Attributes.Contains("statecode") && d["statecode"] != null)
                                        {
                                            estadoC = ((OptionSetValue)dataCase.Attributes["statecode"]).Value;
                                            if (estadoC != 0)
                                            {
                                                Entity resolution = new Entity("incidentresolution");
                                                resolution["subject"] = "Closed";
                                                resolution["incidentid"] = new EntityReference(dataCase.LogicalName, dataCase.Id);

                                                CloseIncidentRequest closecase = new CloseIncidentRequest();

                                                closecase.IncidentResolution = resolution;
                                                closecase.Status = new OptionSetValue(5);

                                                CloseIncidentResponse closeresponse = (CloseIncidentResponse)service.Execute(closecase);
                                            }
                                        }
                                        else
                                        {

                                            Entity resolution = new Entity("incidentresolution");
                                            resolution["subject"] = "Closed";
                                            resolution["incidentid"] = new EntityReference(dataCase.LogicalName, dataCase.Id);

                                            CloseIncidentRequest closecase = new CloseIncidentRequest();

                                            closecase.IncidentResolution = resolution;
                                            closecase.Status = new OptionSetValue(5);

                                            CloseIncidentResponse closeresponse = (CloseIncidentResponse)service.Execute(closecase);

                                        }
                                    }
                                }
                            }
                        }
                    }

                    //throw new InvalidPluginExecutionException("Mensaje de error. ");
                }
            }
            catch (global::System.Exception)
            {

                throw;
            }
        }

    }
}
