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

namespace UstClaro_WorkFlows
{
    /// Creador : FastCloudy
    /// Fecha: 30/07/2018
    /// Jira: 3245
    /// /// 
    /// Function : Manejar la notificación del cliente mediante email
    /// Trigger  : 
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>

    public sealed class UstCustomerNotification : CodeActivity
    {
        #region Input parameters
        [Input("Put Status Code Draft ")]
        [AttributeTarget("email", "statuscode")]
        public InArgument<OptionSetValue> StatusCodeD { get; set; } // 

        [Input("Put Status Code Faild")]
        [AttributeTarget("email", "statuscode")]
        public InArgument<OptionSetValue> StatusCodeF { get; set; } //  

        #endregion

        // Si la actividad devuelve un valor, se debe derivar de CodeActivity<TResult>
        // y devolver el valor desde el método Execute.
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
                    OptionSetValue usEstadoD = StatusCodeD.Get<OptionSetValue>(executionContext);
                    OptionSetValue usEstadoF = StatusCodeF.Get<OptionSetValue>(executionContext);

                    //if (context.MessageName == "Update")
                    //{
                    Entity entity = (Entity)context.InputParameters["Target"];
                        if (entity.LogicalName != "email") return;

                        if (entity == null) return;

                        //Variables Locales                      
                        int estadoEmail = 0;
                        int estadoCase = 0;
                        bool flagsendemail = false;
                        EntityReference incidentId = null;
                        EntityReference erTipoCaso = null;
                        EntityReference customerId = null;
                        EntityReference userId = null;
                        string sCodCaseType = string.Empty;
                        string description = string.Empty;
                        Guid _templateId = Guid.Empty;
                        int estadoD = usEstadoD.Value;
                        int estadoF = usEstadoF.Value;

                    //if (entity.Attributes.Contains("statuscode") && entity["statuscode"] != null)
                    //    {
                    //Estado del Email
                   /* estadoEmail = estado;*/ //((OptionSetValue)entity.Attributes["statuscode"]).Value;

                            //IncidentId del Caso    
                            Entity entCaseI = service.Retrieve("email", entity.Id, new ColumnSet("regardingobjectid", "ust_sendemailnotification"));

                            if (entCaseI.Attributes.Contains("regardingobjectid") && entCaseI.Attributes["regardingobjectid"] != null)
                            {
                                incidentId = ((EntityReference)entCaseI.Attributes["regardingobjectid"]);

                                if (incidentId.LogicalName == "incident")
                                {
                                    Entity entCase = service.Retrieve("incident", incidentId.Id, new ColumnSet("amxperu_casetype", "customerid", "statuscode", "ownerid"));

                                    erTipoCaso = ((EntityReference)entCase.Attributes["amxperu_casetype"]);

                                    Entity caseType = service.Retrieve("amxperu_casetype", erTipoCaso.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code"));

                                    if (caseType.Attributes.Contains("ust_code") && caseType.Attributes["ust_code"] != null)
                                    {
                                        //Get the Case Type Code
                                        sCodCaseType = caseType.Attributes["ust_code"].ToString();
                                    }
                                    if (entCase.Attributes.Contains("statuscode") && entCase["statuscode"] != null)
                                    {
                                        estadoCase = ((OptionSetValue)entCase.Attributes["statuscode"]).Value;
                                    }
                                    if (entCaseI.Attributes.Contains("ust_sendemailnotification") && entCaseI.Attributes["ust_sendemailnotification"] != null)
                                    {
                                        flagsendemail = (bool)entCaseI.Attributes["ust_sendemailnotification"];
                                    }

                                    if (estadoCase == 864340002 && flagsendemail == true && (sCodCaseType == "004" || sCodCaseType == "007")) //Estado "En Notificacion" - Reclamo OSIPTEL o Reclamo LDR 
                                    {
                                        if (estadoD == 8) //Failed
                                        {                                           
                                            customerId = ((EntityReference)entCase.Attributes["customerid"]);                                          
                                            userId = ((EntityReference)entCase.Attributes["ownerid"]);
                                           
                                            // Create the 'From:' activity party for the email
                                            Entity party1 = new Entity("activityparty");
                                            party1["partyid"] = new EntityReference("contact", customerId.Id);

                                            Entity toParty = new Entity("activityparty");
                                            toParty["addressused"] = "wquiroz@fastcloudy.com";

                                            // Create a new EntityCollection and add the 2 parties
                                            EntityCollection to = new EntityCollection();
                                            to.Entities.Add(party1);
                                            to.Entities.Add(toParty);

                                            // Create an email with the EntityCollection
                                            Entity email = new Entity("email");
                                            email["from"] = new EntityReference("systemuser", userId.Id);
                                            email["subject"] = "Email Customer Notification ";
                                            email["to"] = party1;
                                            email["description"] = "OK";
                                            email["regardingobjectid"] = new EntityReference("incident", incidentId.Id);

                                            //Create a query expression to get one of Email Template of type "contact"
                                            QueryExpression queryBuildInTemplates = new QueryExpression
                                            {
                                                EntityName = "template",
                                                ColumnSet = new ColumnSet(true),
                                                Criteria = new FilterExpression()
                                            };

                                            queryBuildInTemplates.Criteria.AddCondition("title",
                                                ConditionOperator.Equal, "Notificación por email del Reclamo OSIPTEL");
                                            EntityCollection _template = service.RetrieveMultiple(queryBuildInTemplates);

                                            if (_template.Entities.Count > 0)
                                            {
                                                _templateId = (Guid)_template.Entities[0].Attributes["templateid"];
                                                tracingService.Trace("_templateId " + _templateId);

                                                email.Id = service.Create(email);

                                            }


                                        }

                                        ///Si es Exitoso
                                        else if (estadoF == 1) //Completed  2  
                                        {
                                            Entity obj = new Entity("incident");
                                            obj.Id = incidentId.Id;

                                            obj["statuscode"] = new OptionSetValue(864340003); //Notificado
                                            service.Update(obj);
                                        }
                                    }
                                    //throw new InvalidPluginExecutionException("Mensaje de error. ");
                                }
                            }
                        }
                    //}
                //}
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}

