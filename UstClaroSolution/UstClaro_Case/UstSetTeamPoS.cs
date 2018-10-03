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
    /// Creador : William Quiroz  
    /// Actualización: 24/08/2018
    /// Función : 
    /// Evento  : Post-Operation
    /// Req.    : AMXPEASIS-3218
    /// Entidad : case
    /// </summary>
    /// 

    public class UstSetTeamPoS : IPlugin
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
                        EntityReference ownerId = null;
                        Guid colaId = Guid.Empty;
                        Guid teamId = Guid.Empty;
                        string name = string.Empty;
                        EntityReference originpos = null;
                        int diagnosticlab = 0;
                        var fetchXmlPoint = "";
                        var fetchXmlTeam = "";
                        EntityReference teamadvisorspdv = null;
                        EntityReference teamcentrallaboratory = null;

                        Entity target = (Entity)context.InputParameters["Target"];

                        if (target.Attributes.Contains("ust_flagsetteampos") && target["ust_flagsetteampos"] != null)
                        {
                            //flagrunplugin = (bool)target.Attributes["ust_flagrunplugin"];  

                            //condicion validar el  Lab ust_diagnosticlab option set (Local (864,340,000), Central(864,340,001 ) si es vacio (null))
                            //ust_originpos obtener 
                            //Si es lab Local enviar registro de equipo Collection Team

                            // Y si es central enviar registro de equipo Credit Area

                            Entity ostPresential = service.Retrieve("ust_ostpresential", target.Id, new ColumnSet("ownerid", "ust_originpos", "ust_diagnosticlab"));

                            if (ostPresential != null)
                            {
                                if (ostPresential.Attributes.Contains("ownerid") && ostPresential["ownerid"] != null)
                                {
                                    ownerId = ((EntityReference)ostPresential.Attributes["ownerid"]);
                                }
                                if (ostPresential.Attributes.Contains("ust_originpos") && ostPresential["ust_originpos"] != null)
                                {
                                    originpos = ((EntityReference)ostPresential.Attributes["ust_originpos"]);
                                    //myTrace.Trace("originpos :" + originpos.Id);
                                }
                                if (ostPresential.Attributes.Contains("ust_diagnosticlab") && ostPresential["ust_diagnosticlab"] != null)
                                {
                                    diagnosticlab = ((OptionSetValue)ostPresential.Attributes["ust_diagnosticlab"]).Value;
                                    //myTrace.Trace("diagnosticlab1 :" + diagnosticlab);
                                }

                                if (originpos != null)
                                {
                                    if (diagnosticlab == 864340000) //Local
                                    {
                                        myTrace.Trace("diagnosticlab :" + diagnosticlab);

                                        fetchXmlPoint = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                           "<entity name='amxperu_pointofsales'>" +
                                                           "<attribute name='amxperu_pointofsalesid' />" +
                                                           "<attribute name='amxperu_name' />" +
                                                           "<attribute name='createdon' />" +
                                                           "<attribute name='ust_teamlocallaboratory' />" +
                                                           "<attribute name='ust_teamcentrallaboratory' />" +
                                                           "<attribute name='ust_teamadvisorspdv' />" +
                                                           "<order attribute='amxperu_name' descending='false' />" +                                                         
                                                           "<filter type='and'>" +
                                                           "<condition attribute='amxperu_pointofsalesid' operator='eq' uitype='amxperu_pointofsales' value = '" + originpos.Id + "' />" +
                                                           "</filter>" +                                                         
                                                           "</entity>" +
                                                           "</fetch>";

                                        EntityCollection resultP = service.RetrieveMultiple(new FetchExpression(fetchXmlPoint));
                                        if (resultP[0].Attributes.Contains("ust_teamadvisorspdv") && resultP[0]["ust_teamadvisorspdv"] != null)
                                        {
                                            teamadvisorspdv = ((EntityReference)resultP[0].Attributes["ust_teamadvisorspdv"]);
                                            myTrace.Trace("teamadvisorspdv :" + teamadvisorspdv.Name);
                                        }

                                        fetchXmlTeam = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                       "<entity name='team'>" +
                                                        "<attribute name='name' />" +
                                                        "<attribute name='businessunitid' />" +
                                                        "<attribute name='teamid' />" +
                                                        "<attribute name='teamtype' />" +
                                                        "<attribute name='queueid' />" +
                                                        "<order attribute='name' descending='false' />" +
                                                        "<filter type='and'>" +
                                                        "<condition attribute='name' operator='eq' value='" + teamadvisorspdv.Name + "' />" +
                                                        "</filter>" +
                                                        "</entity>" +
                                                        "</fetch>";

                                        EntityCollection resulT= service.RetrieveMultiple(new FetchExpression(fetchXmlTeam));
                                        if (resulT[0].Attributes.Contains("teamid") && resulT[0]["teamid"] != null)
                                        {
                                            teamId = (Guid)resulT[0].Attributes["teamid"];
                                            //myTrace.Trace("teamId :" + teamId);
                                        }
                                        if (resulT[0].Attributes.Contains("name") && resulT[0]["name"] != null)
                                        {
                                            name = resulT[0].Attributes["name"].ToString();
                                            //myTrace.Trace("name :" + name);
                                        }
                                    }
                                    if (diagnosticlab == 864340001) //Central
                                    {
                                        fetchXmlPoint = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                            "<entity name='amxperu_pointofsales'>" +
                                                            "<attribute name='amxperu_pointofsalesid' />" +
                                                            "<attribute name='amxperu_name' />" +
                                                            "<attribute name='createdon' />" +
                                                            "<attribute name='ust_teamlocallaboratory' />" +
                                                            "<attribute name='ust_teamcentrallaboratory' />" +
                                                            "<attribute name='ust_teamadvisorspdv' />" +
                                                            "<order attribute='amxperu_name' descending='false' />" +
                                                            "<filter type='and'>" +
                                                            "<condition attribute='amxperu_pointofsalesid' operator='eq' uitype='amxperu_pointofsales' value = '" + originpos.Id + "' />" +
                                                            "</filter>" +
                                                            "</entity>" +
                                                            "</fetch>";

                                        EntityCollection resultP = service.RetrieveMultiple(new FetchExpression(fetchXmlPoint));
                                        if (resultP[0].Attributes.Contains("ust_teamcentrallaboratory") && resultP[0]["ust_teamcentrallaboratory"] != null)
                                        {
                                            teamcentrallaboratory = ((EntityReference)resultP[0].Attributes["ust_teamcentrallaboratory"]);
                                        }

                                        fetchXmlTeam = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                       "<entity name='team'>" +
                                                        "<attribute name='name' />" +
                                                        "<attribute name='businessunitid' />" +
                                                        "<attribute name='teamid' />" +
                                                        "<attribute name='teamtype' />" +
                                                        "<attribute name='queueid' />" +
                                                        "<order attribute='name' descending='false' />" +
                                                        "<filter type='and'>" +
                                                        "<condition attribute='name' operator='eq' value='" + teamcentrallaboratory.Name + "' />" +
                                                        "</filter>" +
                                                        "</entity>" +
                                                        "</fetch>";

                                        EntityCollection resultT = service.RetrieveMultiple(new FetchExpression(fetchXmlTeam));

                                        if (resultT[0].Attributes.Contains("teamid") && resultT[0]["teamid"] != null)
                                        {
                                            teamId = (Guid)resultT[0].Attributes["teamid"];
                                            //myTrace.Trace("teamId :" + teamId);
                                        }
                                        if (resultT[0].Attributes.Contains("name") && resultT[0]["name"] != null)
                                        {
                                            name = resultT[0].Attributes["name"].ToString();
                                            //myTrace.Trace("name :" + name);
                                        }

                                    }

                                    if (teamId != null)
                                    {
                                        var fetchQueue = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                                      "<entity name='queue'>" +
                                                      "<attribute name='name' />" +
                                                      "<attribute name='emailaddress' />" +
                                                      "<attribute name='queueid' />" +
                                                      "<order attribute='emailaddress' descending='false' />" +
                                                      "<filter type='and'>" +
                                                       "<condition attribute='name' operator='like' value='%" + name + "%' />" +
                                                      "</filter>" +
                                                      "</entity>" +
                                                      "</fetch>";

                                        EntityCollection resultQ = service.RetrieveMultiple(new FetchExpression(fetchQueue));

                                        if (resultQ[0].Attributes.Contains("queueid") && resultQ[0]["queueid"] != null)
                                        {
                                            colaId = (Guid)resultQ[0].Attributes["queueid"];
                                            //myTrace.Trace("colaId :" + colaId);
                                        }

                                        AddToQueueRequest moverOST = new AddToQueueRequest()
                                        {
                                            Target = new EntityReference() { LogicalName = "ust_ostpresential", Id = target.Id },
                                            DestinationQueueId = colaId
                                        };

                                        service.Execute(moverOST);
                                    }

                                    //throw new InvalidPluginExecutionException("Mensaje de error. ");
                                }
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
