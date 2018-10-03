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

namespace UstClaro_Case
{
    ///  /// <summary>
    /// Creador         : Carlos Mezones  
    /// Actualización   : 24/08/2018
    /// Función         : 
    /// Evento          : Post-Operation
    /// Req.            : AMXPEASIS-3229
    /// Entidad         : ust_ostpresential
    /// </summary>
    /// 

    public class Ust_SendQueuePhaseDiagnosis : IPlugin
    {
        ITracingService myTrace;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));            
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));            

            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity) {
                    if (context.MessageName == "Update") {                                                
                        EntityReference ownerId = null;
                        Guid colaid = Guid.Empty;
                        Entity target = (Entity)context.InputParameters["Target"];

                        if ((target.Attributes.Contains("ust_flagdiagnosischanged") && target["ust_flagdiagnosischanged"] != null) || (target.Attributes.Contains("ust_flagsendlabcentral") && target["ust_flagsendlabcentral"] != null) )
                        {                                                       
                                                   
                                    Entity ostPresential = service.Retrieve("ust_ostpresential", target.Id, new ColumnSet("ownerid"));

                                    if (ostPresential != null)
                                    {
                                        if (ostPresential.Attributes.Contains("ownerid") && ostPresential["ownerid"] != null)
                                        {
                                            ownerId = ((EntityReference)ostPresential.Attributes["ownerid"]);
                                        }

                                        var fetchQueue = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                            "<entity name='queue'>" +
                                                            "<attribute name='name' />" +
                                                            "<attribute name='emailaddress' />" +
                                                            "<attribute name='queueid' />" +
                                                            "<order attribute='emailaddress' descending='false' />" +
                                                            "<filter type='and'>" +
                                                            "<condition attribute='name' operator='like' value='%" + ownerId.Name + "%' />" +
                                                            "</filter>" +
                                                            "</entity>" +
                                                            "</fetch>";

                                        EntityCollection resultQ = service.RetrieveMultiple(new FetchExpression(fetchQueue));

                                        if (resultQ[0].Attributes.Contains("queueid") && resultQ[0]["queueid"] != null)                                
                                            colaid = (Guid)resultQ[0].Attributes["queueid"];
                                
                                        AddToQueueRequest moverOST = new AddToQueueRequest()
                                        {
                                            Target = new EntityReference() { LogicalName = "ust_ostpresential", Id = target.Id },
                                            DestinationQueueId = colaid
                                        };

                                                service.Execute(moverOST);

                                        //throw new Exception("El registro de OST se ha derivado a la cola de CSR Team :" );
                                    }
                                
                                //throw new InvalidPluginExecutionException("Mensaje de error. ");
                            
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
