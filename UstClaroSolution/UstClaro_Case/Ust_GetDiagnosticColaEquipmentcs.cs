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
/// Actualización: 22/08/2018
/// Función : Envio de la OST a la Cola del Team
/// Evento  : Post-Operation
/// Req.    : AMXPEASIS-3250
/// Entidad : case
/// </summary>
/// 

namespace UstClaro_Case
{
    public class Ust_GetDiagnosticColaEquipmentcs : IPlugin
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
            //myTrace.Trace("Inicio:");

            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {
                        //Variables Locales                      
                        string stageId = null;
                        string value = string.Empty;
                        string teamid = string.Empty;
                        Guid colaid = Guid.Empty;

                        Entity target = (Entity)context.InputParameters["Target"];

                        if (target.Attributes.Contains("ust_flagrunplugin") && target["ust_flagrunplugin"] != null)
                        {
                            //flagrunplugin = (bool)target.Attributes["ust_flagrunplugin"];                            

                            if (target.Attributes.Contains("stageid") && target["stageid"] != null)
                            {
                                stageId = target.Attributes["stageid"].ToString();
                                string PhaseNameEN = Util.GetCrmTranslation(service, "Validate quotation");
                                string stageName = Util.GetProcessStageNameOST(service, new Guid(stageId));

                                if (stageName == PhaseNameEN || stageName == PhaseNameEN)
                                {
                                    //-------------Register CRM Configuration-----------                          
                                    var fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                        "<entity name='etel_crmconfiguration'>" +
                                        "<attribute name='etel_crmconfigurationid' />" +
                                        "<attribute name='etel_name' />" +
                                        "<attribute name='createdon' />" +
                                        "<attribute name='etel_value' />" +
                                        "<attribute name='statuscode' />" +
                                        "<attribute name='statecode' />" +
                                        "<attribute name='overriddencreatedon' />" +
                                        "<order attribute='etel_name' descending='false' />" +
                                        "<filter type='and'>" +
                                            "<condition attribute='etel_name' operator='eq' value='EquipoDeValidacióndeCotizaciónOST' />" +
                                        "</filter>" +
                                        "</entity>" +
                                        "</fetch>";

                                    EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchXML));

                                    if (result[0].Attributes.Contains("etel_value") && result[0]["etel_value"] != null)
                                    {
                                        value = result[0].Attributes["etel_value"].ToString();
                                       // myTrace.Trace("value :" + value);

                                        var fetchTeam = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                        "<entity name='team'>" +
                                                        "<attribute name='name' />" +
                                                        "<attribute name='businessunitid' />" +
                                                        "<attribute name='teamid' />" +
                                                        "<attribute name='teamtype' />" +
                                                        "<attribute name='queueid' />" +
                                                        "<order attribute='name' descending='false' />" +
                                                        "<filter type='and'>" +
                                                        "<condition attribute='name' operator='eq' value='" + value + "' />" +
                                                        "</filter>" +
                                                        "</entity>" +
                                                        "</fetch>";

                                        EntityCollection resultT = service.RetrieveMultiple(new FetchExpression(fetchTeam));
                                        if (resultT[0].Attributes.Contains("name") && resultT[0]["name"] != null)
                                        {
                                            teamid = resultT[0].Attributes["name"].ToString();
                                           // myTrace.Trace("teamid :" + teamid);

                                            var fetchQueue = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                            "<entity name='queue'>" +
                                                            "<attribute name='name' />" +
                                                            "<attribute name='emailaddress' />" +
                                                            "<attribute name='queueid' />" +
                                                            "<order attribute='name' descending='false' />" +
                                                            "<filter type='and'>" +
                                                             //"<condition attribute='queueid' operator='eq' uitype='team' value='" + teamid + "' />" +
                                                             "<condition attribute='name' operator='like' value='%" + teamid + "%' />" +
                                                            "</filter>" +
                                                            "</entity>" +
                                                            "</fetch>";
                                            EntityCollection resultQ = service.RetrieveMultiple(new FetchExpression(fetchQueue));

                                            if (resultQ[0].Attributes.Contains("queueid") && resultQ[0]["queueid"] != null)
                                            {
                                                colaid = (Guid)resultQ[0].Attributes["queueid"];
                                               // myTrace.Trace("colaid :" + colaid);

                                                AddToQueueRequest moverOST = new AddToQueueRequest()
                                                {
                                                    Target = new EntityReference() { LogicalName = "ust_ostpresential", Id = target.Id },
                                                    DestinationQueueId = colaid
                                                };

                                                service.Execute(moverOST);
                                                
                                                //throw new Exception("El registro de OST se ha derivado a la cola de CSR Team :");
                                            }
                                            //throw new InvalidPluginExecutionException("Mensaje de error. ");
                                        }
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
    }
}

