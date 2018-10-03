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
    /// Fecha: 04/07/2018
    /// Jira: 3177
    /// Function :  - Â -the user who creates the task must have the authority to determine If the Executed Transaction code field must be entered or not.
    ///                 In case it is not entered it should be marked as a non-mandatory option and enter the justification.
    /// Trigger  : SetState Task
    /// REQ.    : RN-CHQ-2-001
    /// Entity : Task
    /// </summary>
    public class UstCloseTaskBILog: IPlugin
    {
        ITracingService myTrace;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            foreach (var i in context.InputParameters) 
            {
                myTrace.Trace("key: " + i.Key);
                myTrace.Trace("val: " + i.Value);
            }

            try
            {
                if (context.InputParameters.Contains("EntityMoniker") && context.InputParameters["EntityMoniker"] is EntityReference)
                {
                    OptionSetValue oState = (OptionSetValue)context.InputParameters["State"];
                    EntityReference targetMoniker = (EntityReference)context.InputParameters["EntityMoniker"];
                    String strLogicalName = targetMoniker.LogicalName.ToLower();
                    EntityReference erLogBI = null;
                    Boolean isRequiredBI = false;

                    //This part of code helps to know which attributes are passing to the context.

                    foreach (var i in targetMoniker.KeyAttributes)
                    {
                        myTrace.Trace("entitymoniker key: " + i.Key);
                        myTrace.Trace("entitymoniker val: " + i.Value.ToString());

                        if (i.Value is OptionSetValue)
                        {
                            myTrace.Trace("entitymoniker val: " + ((OptionSetValue)i.Value).Value.ToString());
                        }
                    }


                    //If this plugIn doesnt trigger in "Mark as complete Incident".
                    if (strLogicalName != "task" || oState.Value != 1)
                        return;

                    foreach(var i in targetMoniker.KeyAttributes)
                    {
                        myTrace.Trace("entitymoniker key: " + i.Key);
                        myTrace.Trace("entitymoniker val: " + i.Value.ToString());
                    }

                    if (targetMoniker.KeyAttributes.Contains("amxperu_relatedbilogactivity") &&  targetMoniker.KeyAttributes["amxperu_relatedbilogactivity"] != null) 
                    {
                        erLogBI = (EntityReference)targetMoniker.KeyAttributes["amxperu_relatedbilogactivity"];
                    }

                    if (targetMoniker.KeyAttributes.Contains("amxperu_birequired") && targetMoniker.KeyAttributes["amxperu_birequired"] != null)
                    {
                        isRequiredBI = (Boolean)targetMoniker.KeyAttributes["amxperu_birequired"];
                    }

                    Entity task = service.Retrieve("task", targetMoniker.Id, new ColumnSet("amxperu_relatedbilogactivity","amxperu_birequired"));

                    if (task != null) 
                    {
                        if (task.Attributes.Contains("amxperu_relatedbilogactivity") && task["amxperu_relatedbilogactivity"] != null) 
                        {
                            erLogBI = (EntityReference)task.Attributes["amxperu_relatedbilogactivity"];
                        }

                        if (task.Attributes.Contains("amxperu_birequired") && task["amxperu_birequired"] != null)
                        {
                            isRequiredBI = (Boolean)task.Attributes["amxperu_birequired"];
                        }
                    }

                    //Is Required BI & Log BI has data.
                    if (erLogBI == null && isRequiredBI) 
                    {
                        //Getting the user language.
                        int? langCode = getCurrentUserLanguage(service, context.UserId);
                        if (langCode == 1033)//english message
                            throw new ApplicationException("The field 'Related BI' is required to complete this task.");

                        else if (langCode == 3082)//spanish message
                            throw new ApplicationException("El campo 'BI Relacionada' es obligatorio para completar esta tarea.");
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
                }
            }).Entities.FirstOrDefault();

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
