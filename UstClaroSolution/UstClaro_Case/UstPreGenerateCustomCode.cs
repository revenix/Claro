//using ITC.Helper;
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
using UstClaro_Case.Utilities;

namespace UstClaro_Case
{

    /// <summary>
    /// Creador : William Quiroz 
    /// Creación:  07/06/2018   
    /// Función : Generate an automatic code for each case depend on case tytification.
    /// Evento  : Pre-Create
    /// Req.    : 53-2-014
    /// Entidad : case
    /// </summary>
    ///  /// <summary>
    /// Creador : William Quiroz  
    /// Actualización: 21/06/2018
    /// Función : Generate an automatic code for each case depend on case tytification of WCF.
    /// Evento  : Pre-Create
    /// Req.    : 53-2-014
    /// Entidad : case
    /// </summary>
    public class UstPreGenerateCustomCode : IPlugin
    {
        ITracingService myTrace;
        IOrganizationService service;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            //IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

         // if (context.Depth > 1) return;

            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    //tracingService.Trace("2");

                    if (context.MessageName == "Update")
                    {
                        //Variables Locales
                        string sCodCaseType = string.Empty;
                        int iResponse = 0;
                        string codigo = null;
                        bool flagTipoCaso = false;
                        //

                        Entity entity = (Entity)context.InputParameters["Target"];

                        if (entity.LogicalName != "incident") return;

                        if (entity == null) return;

                        Entity entOpo = service.Retrieve("incident", entity.Id, new ColumnSet("amxperu_casetype", "ust_sarresponse", "ust_flagtipocaso"));

                        EntityReference erTipoCaso = null;

                        if (entOpo.Attributes.Contains("amxperu_casetype") && entOpo.Attributes["amxperu_casetype"] != null)
                            erTipoCaso = ((EntityReference)entOpo.Attributes["amxperu_casetype"]);

                        if(erTipoCaso == null) return; //If CaseType is not registered plugIn abort.

                        Entity caseType = service.Retrieve("amxperu_casetype", erTipoCaso.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code"));

                        if (caseType.Attributes.Contains("ust_code") && caseType.Attributes["ust_code"] != null)
                        {
                            //Get the Case Type Code
                            sCodCaseType = caseType.Attributes["ust_code"].ToString();
                        }

                        if (entOpo.Attributes.Contains("ust_sarresponse") && entOpo.Attributes["ust_sarresponse"] != null)
                        {
                            //Get the SAR  response
                            iResponse = ((OptionSetValue)entOpo.Attributes["ust_sarresponse"]).Value;
                        }
                        if (entOpo.Attributes.Contains("ust_flagtipocaso"))
                        {
                            //Get the SAR  response
                            flagTipoCaso = (bool)entOpo.Attributes["ust_flagtipocaso"];
                        }

                        if (string.IsNullOrEmpty(sCodCaseType))
                            throw new ApplicationException("There is not configured a CaseTypeCode in the TCRM. Please contact with the Administrator.");

                        string strFieldName = null;                     
                        bool isAccepted = false; 
                        //bool flagTipoCase = false;
                        bool isSAR = false;

                        if (sCodCaseType != null)
                        {
                            if (flagTipoCaso == false)
                            {
                                if (sCodCaseType == "003" && iResponse == 864340001)//Si es SAR OSIPTEL y respuesta "No Aceptada"
                                {
                                    codigo = "01"; //< -- 1 = Correlation SAR --!>
                                    strFieldName = "ust_correlationsar";
                                    isAccepted = false;                                   
                                }
                                else if (sCodCaseType == "003" && iResponse == 864340000)//Si es SAR OSIPTEL y respuesta "Aceptada"
                                {
                                    codigo = "01";
                                    strFieldName = "ust_correlationsar";
                                    isAccepted = true;                                   
                                }
                                else if (sCodCaseType == "004" && iResponse == 864340001)// Si es Reclamo OSIPTEL y respuesta "No Aceptada"
                                {
                                    codigo = "02"; //< -- 2 = Correlation Claims --!>
                                    strFieldName = "ust_osiptelcomplaintid";                                  
                                    isAccepted = false;                                    
                                }
                                else if (sCodCaseType == "004")// Reclamo OSIPTEL
                                {
                                    codigo = "02"; //< --  2 = Correlation Claims --!>
                                    strFieldName = "ust_osiptelcomplaintid";
                                    isAccepted = false;
                                    isSAR = true;
                                }
                                else if (sCodCaseType == "005")//Queja OSIPTEL
                                {
                                    codigo = "04"; //COMPLAINTS CODE
                                    strFieldName = "ust_grievanceinternalid";
                                    isAccepted = false;                                    
                                }
                                else if (sCodCaseType == "007")//Reclamo LDR
                                {
                                    codigo = "05"; //Correlation LDR
                                    strFieldName = "ust_indecopicomplaintid";
                                    isAccepted = false;                                   
                                }
                                //myTrace.Trace("Codigo:" + codigo);
                                //myTrace.Trace("Campo:" + strFieldName);

                                if (codigo != null)
                                {
                                    string strAutoNumberCode = getAutoNumberService(codigo, isAccepted);

                                    // myTrace.Trace("NumberCode :" + strAutoNumberCode);
                                    if (!string.IsNullOrEmpty(strAutoNumberCode) && !string.IsNullOrEmpty(strFieldName))
                                    {
                                        entity.Attributes[strFieldName] = strAutoNumberCode;
                                        entity.Attributes["ust_flagtipocaso"] = true;
                                        if (isSAR)
                                        {
                                            entity.Attributes["ust_saraid"] = strAutoNumberCode + "/SARA";
                                        }
                                       
                                        //service.Update(entity);
                                    }
                                }
                            }
                        // throw new InvalidPluginExecutionException("Mensaje de error. ");
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
                throw new Exception("Uncontrolled error: " + ex.Message, ex);;
            }
        }

        private string getAutoNumberService(string strCodigo, Boolean isAccepted)
        {
            string strAutoNumberCodeService = null;
           
            try
            {                
                BasicHttpBinding myBinding = new BasicHttpBinding();
                myBinding.Name = "AutoNumberCaseBind";
                
                string PhaseNameEN = Util.GetCrmConfiguration(service, myBinding.Name);
                //Get the real URL from the parameters.
                //EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://localhost:9991/esb/common/conAutoNumberCase/v2/?wsdl"));
                EndpointAddress myEndpoint = new EndpointAddress(new Uri(PhaseNameEN));//I have to change this.

                var request = new AutoNumberCaseRequest()
                {
                    InputParameters = new InputParameters()
                    {
                        I_CO_ID = strCodigo //Varia por Type Case
                        //,I_CASESpecified = isAccepted
                    }
                };

                //myTrace.Trace("codigo: " + strCodigo);
                //myTrace.Trace("isAccepted: " + isAccepted.ToString());


                using (AutoNumberCasePortChannel proxy = new ChannelFactory<AutoNumberCasePortChannel>(myBinding, myEndpoint).CreateChannel())
                {
                    AutoNumberCaseResponse response = proxy.AutoNumberCase(request);
                    if(response != null)
                        strAutoNumberCodeService = response.OutputParameters.O_ID_CASE;
                }
                
            }
            catch (EndpointNotFoundException ex)
            {
                throw new EndpointNotFoundException(ex.Message, ex);
            }
            catch (Exception)
            {
                throw;
            }

            return strAutoNumberCodeService;
        }
        
    }
}
