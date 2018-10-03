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
    /// Fecha: 30/07/2018
    /// Jira: 3245
    /// /// 
    /// Function : Manejar la notificación del cliente mediante email
    /// Trigger  : 
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    public class UstCustomerNotificationEmail : IPlugin
    {
        ITracingService myTrace;
        IOrganizationService service;
        private Guid _templateId;       
        private Guid _emailId;
        private String strBody;
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
                        string ticketnumber = string.Empty;

                        if (entity.Attributes.Contains("statuscode") && entity["statuscode"] != null)
                        {
                            //Estado del Email
                            estadoEmail = ((OptionSetValue)entity.Attributes["statuscode"]).Value;
                         
                            //IncidentId del Caso    
                            Entity entCaseI = service.Retrieve("email", entity.Id, new ColumnSet("regardingobjectid", "ust_sendemailnotification"));

                            if (entCaseI.Attributes.Contains("regardingobjectid") && entCaseI.Attributes["regardingobjectid"] != null)
                            {
                                incidentId = ((EntityReference)entCaseI.Attributes["regardingobjectid"]);

                                if (incidentId.LogicalName == "incident")
                                { 
                                    Entity entCase = service.Retrieve("incident", incidentId.Id, new ColumnSet("amxperu_casetype", "customerid", "statuscode", "ownerid", "ticketnumber", "etel_customercontactid"));

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
                                        flagsendemail =(bool)entCaseI.Attributes["ust_sendemailnotification"];
                                    }
                                    if(entCase.Attributes.Contains("ticketnumber") && entCase["ticketnumber"] != null)
                                    {
                                        ticketnumber = (string)entCase["ticketnumber"];
                                        myTrace.Trace("ticketnumber " + ticketnumber);
                                    }

                                    if (estadoCase == 864340002 && flagsendemail == true && (sCodCaseType == "004" || sCodCaseType == "007")) //Estado "En Notificacion" - Reclamo OSIPTEL o Reclamo LDR 
                                    {
                                        if (estadoEmail == 8) //Failed
                                        {
                                            myTrace.Trace("estadoEmailFailed " + estadoEmail);
                                            customerId = ((EntityReference)entCase.Attributes["etel_customercontactid"]);                                         
                                            userId = ((EntityReference)entCase.Attributes["ownerid"]);
                                           
                                            // Create the 'From:' activity party for the email
                                            Entity party1 = new Entity("activityparty");
                                            party1["partyid"] = customerId.Id;

                                            Entity toParty = new Entity("activityparty");
                                            toParty["addressused"] = "wquiroz@fastcloudy.com";

                                            //myTrace.Trace("party1 " + party1.ToString());
                                      
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
                                            email.Id = service.Create(email);

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

                                                strBody = GetDataFromXml(_template.Entities[0].Attributes["body"].ToString(), "match");
                                                //myTrace.Trace("body " + strBody);
                                                if (_template != null)
                                                {
                                                    Entity emailAc = new Entity("email");
                                                    emailAc.Id = email.Id;
                                                    emailAc["description"] = strBody;
                                                    service.Update(emailAc);
                                                }                                                
                                            }

                                            
                                        }

                                        ///Si es Exitoso
                                        else if (estadoEmail == 1) //Completed  2  
                                        {
                                            myTrace.Trace("estadoEmail " + estadoEmail);
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
                    }
                }
            }

            catch (Exception)
            {
                throw;
            }
        }

        public string GetDataFromXml(string value, string attributeName)
        {
            if (string.IsNullOrEmpty(value))
            {
                return string.Empty;
            }

            System.Xml.Linq.XDocument document = System.Xml.Linq.XDocument.Parse(value);
            // get the Element with the attribute name specified
            System.Xml.Linq.XElement element = document.Descendants().Where(ele => ele.Attributes().Any(attr => attr.Name == attributeName)).FirstOrDefault();
            return element == null ? string.Empty : element.Value;
        }
    }
}
