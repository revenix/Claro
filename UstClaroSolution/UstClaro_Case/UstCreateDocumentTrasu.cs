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
    /// Creador : FastCloudy
    /// Fecha: 14/07/2018
    /// Jira: 3110
    /// /// 
    /// Function : Crear el documento de Reporte de Acreditación TRASU basado en la Información de Reclamo OSIPTEL  y Queja OSIPTEL.
    /// Trigger  : 
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    public class UstCreateDocumentTrasu : IPlugin
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
                        string stageId = null;

                        Entity target = (Entity)context.InputParameters["Target"];
                       myTrace.Trace("stageid:" + target["stageid"].ToString());
                        if (target.Attributes.Contains("stageid") && target["stageid"] != null)
                        {
                            stageId = target.Attributes["stageid"].ToString();

                            if (target.Attributes.Contains("amxperu_casetype") && target["amxperu_casetype"] != null)
                            {
                                Guid idCaseType = ((EntityReference)target.Attributes["amxperu_casetype"]).Id;

                                Entity caseType = service.Retrieve("amxperu_casetype", idCaseType, new ColumnSet("ust_code"));

                                if (caseType != null)
                                {
                                    if (caseType.Attributes.Contains("ust_code") && caseType["ust_code"] != null)
                                    {
                                        strCode = caseType.Attributes["ust_code"].ToString();
                                    }
                                }
                                myTrace.Trace("strCode:" + strCode.ToString());
                                if (strCode == "004") //Reclamo OSIPTEL
                                {
                                    string PhaseNameEN = Util.GetCrmConfiguration(service, "NameFaseNotifyTRASUEnglish");
                                    string PhaseNameES = Util.GetCrmConfiguration(service, "NameFaseNotifyTRASUSpanish");
                                    string stageName = Util.GetProcessStageName(service, new Guid(stageId));

                                    //TO DO: Buscar el stagename by stageid
                                    if (stageName == PhaseNameEN || stageName == PhaseNameES)
                                    {
                                        Entity customerDocument = new Entity("amxperu_customerdocument");
                                        //myTrace.Trace("customerDocument:" + customerDocument.Id);

                                        customerDocument["amxperu_name"] = "HIDDEN CONSUME SERVICE";

                                        Guid customerDocId = service.Create(customerDocument);

                                        myTrace.Trace("Se registro Customer Document: ");
                                        throw new Exception("El registro es : " + customerDocId);
                                    }
                                }
                                else if (strCode == "005") //Queja OSIPTEL
                                {
                                    string PhaseNameEN = Util.GetCrmConfiguration(service, "NameFaseNotifyTRASUEnglish");
                                    string PhaseNameES = Util.GetCrmConfiguration(service, "NameFaseNotifyTRASUSpanish");
                                    string stageName = Util.GetProcessStageName(service, new Guid(stageId));

                                    //TO DO: Buscar el stagename by stageid
                                    if (stageName == PhaseNameEN || stageName == PhaseNameES)
                                    {
                                        Entity customerDocument = new Entity("amxperu_customerdocument");
                                        //myTrace.Trace("customerDocument:" + customerDocument.Id);

                                        customerDocument["amxperu_name"] = "HIDDEN CONSUME SERVICE";

                                        Guid customerDocId = service.Create(customerDocument);

                                        myTrace.Trace("Se registro Customer Document: ");
                                        throw new Exception("El registro es : " + customerDocId);
                                    }
                                }
                            }
                        }
                        throw new InvalidPluginExecutionException("Mensaje de error. ");
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
