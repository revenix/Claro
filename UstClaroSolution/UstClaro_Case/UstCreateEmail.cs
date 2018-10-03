using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Client;
using System.ServiceModel;
using Microsoft.Xrm.Sdk.Query;

namespace UstClaro_Case
{
    public class UstCreateEmail : IPlugin
    {

        ///  /// <summary>
        /// Creador : Jordy
        /// Actualización: 11/07/2018
        /// Función : 
        /// Evento  :
        /// Req.    : AMXPEASIS-3102
        /// Entidad : case
        /// </summary>
        /// 

        ITracingService myTrace;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            try
            {
                //Campos  flag
                bool flagEmail = false;
                EntityReference customerId = null;

                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {
                        Entity entity = (Entity)context.InputParameters["Target"];

                        if (entity.LogicalName != "incident") return; //Casos
                        if (entity == null) return;

                        if (entity.Attributes.Contains("ust_flagtaskemailnotification") && entity.Attributes["ust_flagtaskemailnotification"] != null)
                        {
                            //flagEmail = entCase.GetAttributeValue<bool>("ust_flagtaskemailnotification");  // obtiene el valor true
                            flagEmail = (bool)entity.Attributes["ust_flagtaskemailnotification"];
                          
                            Entity entCase = service.Retrieve("incident", entity.Id, new ColumnSet("ust_flagtaskemailnotification", "customerid", "amxperu_casetype", "ust_osiptelcomplaintid", "ust_indecopicomplaintid", "ust_osiptelnotificationemail"));

                            if (flagEmail == true)
                            {
                                //crear un actividad de tipo Email.
                                if (entCase.Attributes.Contains("customerid") && entCase.Attributes["customerid"] != null)
                                {
                                    customerId = ((EntityReference)entCase.Attributes["customerid"]);
                                  
                                    EntityReference LookUpTypeCase = (EntityReference)entCase.Attributes["amxperu_casetype"];

                                    var TypeCaseLookupId = LookUpTypeCase.Id;
                                    var TypeCaselogicalName = LookUpTypeCase.LogicalName;
                                   
                                    // var Osiptelcomplaintid = entity.GetAttributeValue<String>("ust_osiptelcomplaintid");
                                    // var Indecopicomplaintid = entity.GetAttributeValue<String>("ust_indecopicomplaintid");
                                    string OsiptelNotificationEmail = entCase.Attributes["ust_osiptelnotificationemail"].ToString();
                                    //myTrace.Trace("OsiptelNotificationEmail " + OsiptelNotificationEmail);

                                    // Create the 'From:' activity party for the email
                                    Entity party1 = new Entity("activityparty");
                                    //party1["partyid"] = new EntityReference("contact", customerId.Id);
                                    party1["addressused"] = OsiptelNotificationEmail;

                                    // Create a new EntityCollection and add the 2 parties
                                    EntityCollection to = new EntityCollection();
                                    to.Entities.Add(party1);

                                    // Create an email with the EntityCollection

                                    Entity email = new Entity("email");
                                    email["from"] = new EntityReference("systemuser", context.UserId);
                                    email["subject"] = "Email de notificación del " + TypeCaselogicalName + " NRO:XXXXXXX";
                                    email["to"] = to;
                                    email["description"] = "OK";
                                    email["ust_sendemailnotification"] = true;
                                    email["regardingobjectid"] = new EntityReference("incident", entity.Id);

                                    email.Id = service.Create(email);

                                    //myTrace.Trace("creo actividad correo" + email.Id);

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
