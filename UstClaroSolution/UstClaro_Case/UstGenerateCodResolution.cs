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

namespace UstClaro_Case
{
    /// Creador : William Quiroz
    /// Fecha: 16/07/2018
    /// Jira: AMXPEASIS-3097
    /// Function : Generate Cod Resolution
    /// Trigger  : 
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    /// 
    public class UstGenerateCodResolution : IPlugin
    {
        ITracingService myTrace;
        IOrganizationService service;
        EntityCollection resultC;
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is EntityReference)
                {
                    if (context.MessageName == "Update")
                    {
                        OptionSetValue oState = (OptionSetValue)context.InputParameters["State"];
                        EntityReference target = (EntityReference)context.InputParameters["Target"];
                        String strLogicalName = target.LogicalName.ToLower();

                        //If this plugIn doesnt trigger in "Close Incident".
                        if (strLogicalName != "incident" || oState.Value != 1)
                            return;

                        Entity incident = service.Retrieve("incident", target.Id, new ColumnSet("amxperu_casetype", "ust_resolutiondate", "ust_resolutioncode", "createdby"));

                        //Formato Fecha
                        DateTime fechaActual = DateTime.Today;
                        int dia = fechaActual.Day;
                        int anio = fechaActual.Year;
                        int mes = fechaActual.Month;
                        string resolutionCode = string.Empty;
                        EntityReference createdBy = null;
                        string valuedomainname = string.Empty;
                        string NameUser = string.Empty;

                        DateTime fechatemp = fechaActual;
                        DateTime fecha1 = new DateTime(fechatemp.Year, fechatemp.Month, 1);

                        if (incident["createdby"] != null)
                        {
                            createdBy = ((EntityReference)incident.Attributes["createdby"]);
                            var fectchSystemUser = ConsultDominanameCase(createdBy.Id);

                            if (fectchSystemUser != null)
                            {
                                resultC = service.RetrieveMultiple(new FetchExpression(fectchSystemUser));
                            }

                            if (resultC.Entities.Count > 0)
                            {
                                NameUser = resultC[0].Attributes["domainname"].ToString();
                            }

                            if (incident["ust_resolutiondate"] == null)
                            {
                                Entity caso = new Entity("incident");
                                caso.Id = target.Id;
                                caso["ust_resolutiondate"] = new DateTime();

                                service.Update(caso);
                            }

                            if (resolutionCode == null)
                            {
                                var areaEmpleado = "DAC-REC";// Área del empleado (obtenida de la entidad usuario en CRM)
                                var sufijo = "R";
                                //var codUsuario = "XXXXX"; //Código del usuario (obtenido de la entidad usuario en CRM).

                                var codUsuario = NameUser; // nameUser; //Obtenido de la función fnc_ConsultDominanameCase

                                string anioac = Convert.ToString(anio);
                                var anioactual = anioac.Substring(4, 2);

                                string resolucion = areaEmpleado + "-" + sufijo + "/" + codUsuario + "-" + "CodigoAutonumerico" + "-" + anioactual;

                                Entity caso2 = new Entity("incident");
                                caso2.Id = target.Id;
                                caso2["ust_resolutioncode"] = resolucion;

                                service.Update(caso2);

                            }
                        }
                    }
                }
            }
            catch (ApplicationException ex)
            {
                throw new ApplicationException("Controlled Error: " + ex.Message, ex);
            }
            catch (InvalidPluginExecutionException ex)
            {
                throw new InvalidPluginExecutionException("PlugIn Error: " + ex.Message, ex);
            }
            catch (EndpointNotFoundException ex)
            {
                throw new EndpointNotFoundException("EndPoint Error: " + ex.Message, ex);
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException("Crm Service error: " + ex.Message, ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Uncontrolled error: " + ex.Message, ex); ;
            }

        }

        private string ConsultDominanameCase(Guid codeuserguid)
        {
            string Xml = null;

            Xml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='systemuser'>" +
                    "<attribute name='fullname'/>" +
                    "<attribute name='systemuserid'/>" +
                    "<attribute name='domainname'/>" +
                    "<order descending='false' attribute='fullname'/>" +
                    "<filter type='and'>" +
                    "<condition attribute='systemuserid' value='" + codeuserguid + "' uitype='systemuser' operator='eq'/>" +
                    "</filter>" +
                    "</entity>" +
                    "</fetch>";

            return Xml;
        }
    }
}
