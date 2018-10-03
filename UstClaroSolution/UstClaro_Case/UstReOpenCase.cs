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

namespace UstClaro_Case
{
    /// Creador : FastCloudy
    /// Fecha: 30/06/2018
    /// Jira: 3113
    /// Function : Allow OSIPTEL Complaint to be reopened
    /// Trigger  : Re-Open
    /// REQ.    : 53-2-020
    /// Entity : Incident
    /// </summary>
    public class UstReOpenCase : IPlugin
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
                if (context.InputParameters.Contains("EntityMoniker") && context.InputParameters["EntityMoniker"] is EntityReference)
                {
                    OptionSetValue oState = (OptionSetValue)context.InputParameters["State"];
                    EntityReference targetMoniker = (EntityReference)context.InputParameters["EntityMoniker"];
                    String strLogicalName = targetMoniker.LogicalName.ToLower();

                    //If this plugIn doesnt trigger in "Reactivate Incident".
                    if (strLogicalName != "incident" || oState.Value != 0)
                        return;
                    
                    Entity incident = service.Retrieve("incident", targetMoniker.Id, new ColumnSet("amxperu_casetype"));

                    if (incident.Attributes.Contains("amxperu_casetype") && incident["amxperu_casetype"] != null)
                    {
                        Guid idCaseType = ((EntityReference)incident.Attributes["amxperu_casetype"]).Id;
                        Entity caseType = service.Retrieve("amxperu_casetype", idCaseType, new ColumnSet("ust_code"));

                        if (caseType != null)
                        {
                            if (caseType.Attributes.Contains("ust_code") && caseType["ust_code"] != null)
                            {
                                string strCode = caseType.Attributes["ust_code"].ToString();

                                /* Just this kind of cases can be open:
                                 * 	• Reclamo OSIPTEL   
                                    • Denuncia OSIPTEL   
                                    • Reclamo SAC   
                                    • Denuncia INDECOPI  
                                 * 
                                 */

                                if (strCode != "004" && strCode != "006" && strCode != "009" && strCode != "008")
                                {
                                    int? langCode = getCurrentUserLanguage(service, context.UserId);

                                    if (langCode == 1033)//english message
                                        throw new ApplicationException("This case type cannot be open.");

                                    else if (langCode == 3082)//spanish message
                                        throw new ApplicationException("Este tipo de caso no puede ser reabierto.");
                                }
                            }
                        }
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

        private int? getCurrentUserLanguage(IOrganizationService service, Guid userId) 
        {
            //1033 : English
            //3082 : Spanish
            int? languageCode = null;
            Entity userSettings = service.RetrieveMultiple(
            new QueryExpression("usersettings")
            {
                ColumnSet = new ColumnSet("uilanguageid"),
                Criteria = new FilterExpression
                {
                    Conditions =
                    {
                        new ConditionExpression("systemuserid", ConditionOperator.Equal, userId)
                    }
            }}).Entities.FirstOrDefault();

            if (userSettings != null && userSettings.Contains("uilanguageid"))
            {
                if (userSettings != null && userSettings.Contains("uilanguageid"))
                {
                    languageCode = int.Parse(userSettings["uilanguageid"].ToString());
                }
            }

            return languageCode;

         }

    }
}
