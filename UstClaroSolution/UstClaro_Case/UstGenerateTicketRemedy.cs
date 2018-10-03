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
using UstClaro_Case.DTO.AmxPeruGeneraIncidencia;
using UstClaro_Case.PSBServices;

namespace UstClaro_Case
{
    
    ///  /// <summary>
    /// Creador : William Quiroz  
    /// Actualización: 7/07/2018
    /// Función : Generate Ticket in Remedy.
    /// Evento  : Pre-Create
    /// Req.    : AMXPEASIS-3162
    /// Entidad : case
    /// </summary>
    /// 
    public class UstGenerateTicketRemedy : IPlugin
    {
        ITracingService myTrace;
        IOrganizationService service;
     
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            try
            {
                string sTicketNumber = string.Empty;
                
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {                  
                    //Variables Locales
                    Entity target = (Entity)context.InputParameters["Target"];
                    
                    if (target.LogicalName != "incident") return;

                    if (target.Attributes.Contains("ticketnumber") && target.Attributes["ticketnumber"] != null)
                    {
                        sTicketNumber = target.Attributes["ticketnumber"].ToString();
                    }

                    RemedyDTO obj = IsApplyToRemedy(target);


                    if (obj == null) return;

                    //TO DO: CONSUMIR SERVICIO REMEDY
                    if (obj.isRemedy)
                    {
                        GeneraIncidenciaResponseDTO response = CallPsbServiceAmxPeruGeneraIncidencia(service, "1", "", "INT-CHQ 2-002_generarIncidenciacase", obj.categoryCode1, obj.categoryCode2, obj.categoryCode3, target.Id.ToString());
                        //throw new InvalidPluginExecutionException(response.Output.response.DescriptionResponse);

                        if (response != null)
                            if (response.Output != null)
                                if (response.Output.response != null)
                                    if (response.Output.response.Status == 0)
                                    {
                                        //target.Attributes["ust_remedyticketstatus"] = response.Output.response.Status.ToString();

                                        if (response.Output.response.ProblemId != null)
                                            target.Attributes["ust_remedyticketid"] = response.Output.response.ProblemId;
                                        else
                                            return;

                                        //if (response.Output.response.DescriptionResponse != null)
                                        //    target.Attributes["ust_remedyticketanswer"] = response.Output.response.DescriptionResponse;

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


        private RemedyDTO IsApplyToRemedy(Entity target) 
        {
            bool isRemedyCat1 = false;
            bool isRemedyCat2 = false;
            bool isRemedyCat3 = false;
            bool isRemedyCat4 = false;
            bool isRemedyCat5 = false;

            string sCodCategory1 = string.Empty;
            string sCodCategory2 = string.Empty;
            string sCodCategory3 = string.Empty;
            string sCodCategory4 = string.Empty;
            string sCodCategory5 = string.Empty;

            RemedyDTO obj = null;

            if (target.Attributes.Contains("ust_category1") && target.Attributes["ust_category1"] != null)
            {
                EntityReference erCategory1 = ((EntityReference)target.Attributes["ust_category1"]);

                //if (erCategory1 == null) return; //If category1 is not registered plugIn abort.

                Entity category = service.Retrieve("amxperu_casecategory", erCategory1.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code", "ust_istickettoremedy"));

                if (category.Attributes.Contains("ust_code") && category.Attributes["ust_code"] != null)
                {
                    //Get the Case Category1
                    sCodCategory1 = category.Attributes["ust_code"].ToString();
                }
                if (category.Attributes.Contains("ust_istickettoremedy") && category.Attributes["ust_istickettoremedy"] != null)
                {
                    //Get the Case Category1
                    isRemedyCat1 = (bool)category.Attributes["ust_istickettoremedy"];
                }

            }

            if (target.Attributes.Contains("ust_category2") && target.Attributes["ust_category2"] != null)
            {
                EntityReference erCategory2 = ((EntityReference)target.Attributes["ust_category2"]);

                Entity category2 = service.Retrieve("amxperu_casesubcategory", erCategory2.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code", "ust_istickettoremedy"));

                if (category2.Attributes.Contains("ust_code") && category2.Attributes["ust_code"] != null)
                {
                    //Get the Case Category2
                    sCodCategory2 = category2.Attributes["ust_code"].ToString();
                    
                }
                if (category2.Attributes.Contains("ust_istickettoremedy") && category2.Attributes["ust_istickettoremedy"] != null)
                {
                    isRemedyCat2 = (bool)category2.Attributes["ust_istickettoremedy"];        
                }
            }

            if (target.Attributes.Contains("ust_category3") && target.Attributes["ust_category3"] != null)
            {
                EntityReference erCategory3 = ((EntityReference)target["ust_category3"]);


                Entity category3 = service.Retrieve("amxperu_casesubsubcategory", erCategory3.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code", "ust_istickettoremedy"));

                if (category3.Attributes.Contains("ust_code") && category3.Attributes["ust_code"] != null)
                {
                    //Get the Case Category3
                    sCodCategory3 = category3.Attributes["ust_code"].ToString();
                    
                }
                if (category3.Attributes.Contains("ust_istickettoremedy") && category3.Attributes["ust_istickettoremedy"] != null)
                {
                    isRemedyCat3 = (bool)category3.Attributes["ust_istickettoremedy"];             
                }
            }

            if (target.Attributes.Contains("ust_category4") && target.Attributes["ust_category4"] != null)
            {
                EntityReference erCategory4 = ((EntityReference)target.Attributes["ust_category4"]);

                Entity category4 = service.Retrieve("amxperu_caseothercategory", erCategory4.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code", "ust_istickettoremedy"));

                if (category4.Attributes.Contains("ust_code") && category4.Attributes["ust_code"] != null)
                {
                    //Get the Case Category4
                    sCodCategory4 = category4.Attributes["ust_code"].ToString();
                      
                }
                if (category4.Attributes.Contains("ust_istickettoremedy") && category4.Attributes["ust_istickettoremedy"] != null)
                {
                    isRemedyCat4 = (bool)category4.Attributes["ust_istickettoremedy"];      
                }
            }
            if (target.Attributes.Contains("ust_category5") && target.Attributes["ust_category5"] != null)
            {
                EntityReference erCategory5 = ((EntityReference)target.Attributes["ust_category5"]);

                Entity category5 = service.Retrieve("amxperu_casecategory5", erCategory5.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code", "ust_istickettoremedy"));

                if (category5.Attributes.Contains("ust_code") && category5.Attributes["ust_code"] != null)
                {
                    //Get the Case Category4
                    sCodCategory5 = category5.Attributes["ust_code"].ToString();
                    
                }
                if (category5.Attributes.Contains("ust_istickettoremedy") && category5.Attributes["ust_istickettoremedy"] != null)
                {
                    isRemedyCat5 = (bool)category5.Attributes["ust_istickettoremedy"];        
                }
            }

            if (isRemedyCat1 || isRemedyCat2 || isRemedyCat3 || isRemedyCat4 || isRemedyCat5)
            {
                obj = new RemedyDTO()
                {
                    isRemedy = true
                    ,categoryCode1 = sCodCategory1
                    ,categoryCode2 = sCodCategory2
                    ,categoryCode3 = sCodCategory3
                };
            }

            return obj;

            #region Comentarios
            //if (sCodCaseType != null)
            //{
            //    // NO REGULADAS/FALLA TECNICA MOVIL-PRIMER NIVEL/INTERNET
            //    if (sCodCaseType == "002" && sCodCategory1 == "0229" && sCodCategory2 == "022901") 
            //    {
            //        if (sCodCategory3 == "02290101")
            //        {
            //            IsToRemedy = true;                                   
            //        }
            //        else if (sCodCategory3 == "02290102")
            //        {
            //            IsToRemedy = true;
                                   
            //        }
            //        else if (sCodCategory3 == "02290103")
            //        {
            //            IsToRemedy = true;
                                   
            //        }
            //        else if (sCodCategory3 == "02290104")
            //        {
            //            IsToRemedy = true;
                                   
            //        }
            //}
            //else if (sCodCaseType == "002" && sCodCategory1 == "0229" && sCodCategory2 == "022902")// NO REGULADAS/FALLA TECNICA MOVIL-PRIMER NIVEL/LLAMADAS
            //{
            //    if (sCodCategory3 == "02290201")
            //    {
            //        IsToRemedy = true;

            //    }
            //    else if (sCodCategory3 == "02290202")
            //    {
            //        IsToRemedy = true;

            //    }
            //    else if (sCodCategory3 == "02290203")
            //    {
            //        IsToRemedy = true;
            //    }

            //    else if (sCodCategory3 == "02290204")
            //    {
            //        IsToRemedy = true;

            //    }
            //}
            //else if (sCodCaseType == "002" && sCodCategory1 == "0229" && sCodCategory2 == "022903")// NO REGULADAS/FALLA TECNICA MOVIL-PRIMER NIVEL/SMS
            //{
            //    if (sCodCategory3 == "02290201")
            //    {
            //        IsToRemedy = true;
                                   
            //    }
            //    else if (sCodCategory3 == "02290301")
            //    {
            //        IsToRemedy = true;
                                   
            //    }
            //    else if (sCodCategory3 == "02290302")
            //    {
            //        IsToRemedy = true;
                                    
            //    }
            //}

            //else if (sCodCaseType == "004" && sCodCategory1 == "0401" && sCodCategory2 == "040101")// RECLAMO OSIPTEL/DESBLOQUEO O RETRICCION DEL EQUIPO/AVERIA MASIVA
            //{
            //    if (sCodCategory3 == "04010101" && sCodCategory4 == "0401010101")
            //    {
            //        IsToRemedy = true;                              
            //    }                               

            //}
            //else if (sCodCaseType == "004" && sCodCategory1 == "0402" && sCodCategory2 == "040201")// RECLAMO OSIPTEL/PROBLEMAS TECNICOS(CALIDAD E IDONEIDAD) SS MOVILES/INTERNET MOVIL
            //{
            //    if (sCodCategory3 == "04020101" && sCodCategory4 == "0402010101")// PROBLEMAS ESCALABLES A RED/CALIDAD E IDONEIDAD - INTERNET
            //    {
            //        IsToRemedy = true;
                                 
            //    }
            //    if (sCodCategory3 == "04020102" && sCodCategory4 == "0402010201")// PROBLEMAS ESCALABLES A TI/CALIDAD E IDONEIDAD - INTERNET
            //    {
            //        IsToRemedy = true;
                                  
            //    }
                               
            //}
            //else if (sCodCaseType == "004" && sCodCategory1 == "0402" && sCodCategory2 == "040202")// RECLAMO OSIPTEL/PROBLEMAS TECNICOS(CALIDAD E IDONEIDAD) SS MOVILES/SERVICIOS DE VOZ
            //{
            //    if (sCodCategory3 == "04020201" && sCodCategory4 == "0402020101")// PROBLEMAS ESCALABLES A RED/CALIDAD E IDONEIDAD - SERVICIOS BASICOS
            //    {
            //        IsToRemedy = true;
                                   
            //    }
                              
            //    if (sCodCategory3 == "04020202" && sCodCategory4 == "0402020201")// PROBLEMAS ESCALABLES A TI/CALIDAD E IDONEIDAD - SERVICIOS BASICOS
            //    {
            //        IsToRemedy = true;
                                 
            //    }
                              
            //}
            //else if (sCodCaseType == "004" && sCodCategory1 == "0402" && sCodCategory2 == "040203")// RECLAMO OSIPTEL/PROBLEMAS TECNICOS(CALIDAD E IDONEIDAD) SS MOVILES/SERVICIOS DE VALOR AGREGADO
            //{
            //    if (sCodCategory3 == "04020301" && sCodCategory4 == "0402030101")// PROBLEMAS ESCALABLES A RED/CALIDAD E IDONEIDAD - SERVICIOS DE VALOR AGREGADO
            //    {
            //        IsToRemedy = true;
                                   
            //    }
                               
            //    if (sCodCategory3 == "04020302" && sCodCategory4 == "0402030201")// PROBLEMAS ESCALABLES A TI/CALIDAD E IDONEIDAD - SERVICIOS DE VALOR AGREGADO
            //    {
            //        IsToRemedy = true;
                                 
            //    }
                              
            //}
            //    else if (sCodCaseType == "004" && sCodCategory1 == "0402" && sCodCategory2 == "040204")// RECLAMO OSIPTEL/PROBLEMAS TECNICOS(CALIDAD E IDONEIDAD) SS MOVILES/OTROS SERVICIOS PARA EMPRESA
            //    {
            //        if (sCodCategory3 == "04020401" && sCodCategory4 == "0402040101")// PROBLEMAS ESCALABLES A RED/CALIDAD E IDONEIDAD - SERVICIOS EMPRESA
            //        {
            //            IsToRemedy = true;

            //        }

            //        if (sCodCategory3 == "04020402" && sCodCategory4 == "0402040201")// PROBLEMAS ESCALABLES A TI/CALIDAD E IDONEIDAD - SERVICIOS EMPRESA
            //        {
            //            IsToRemedy = true;
            //        }
            //    }           
            //}
            #endregion
        }

        public GeneraIncidenciaResponseDTO CallPsbServiceAmxPeruGeneraIncidencia(IOrganizationService service, String _strUrgency, String _strServiceCI, String _strDescription, String _strCategory1
                                                            , String _strCategory2, String _strCategory3, String _strCaseId)
        {
            try
            {
                string operation = "AmxPeruGeneraIncidenciaExternal";
                //TO DO: Enable comments
                //TO DO: Enable comments
                string sUri = Utilities.Util.GetCrmConfiguration(service, "PsbEndpoint");
                sUri += operation;

                GeneraIncidenciaRequestDTO request = CreateRequest(service, _strUrgency, _strServiceCI, _strDescription, _strCategory1, _strCategory2, _strCategory3
                                                                        , _strCaseId);

                // Call the member.
                IPSBServices psb = new PSBServices.PSBServices();
                return psb.GeneraIncidencia( service, request, sUri);

            }
            catch
            {
                throw;
            }
        }


        private GeneraIncidenciaRequestDTO CreateRequest(IOrganizationService _service, String _strUrgency, String _strServiceCI, String _strDescription, String _strCategory1
                                                            , String _strCategory2, String _strCategory3, String _strCaseId)
        {
            //TO DO: Cambiar los string por los parámetros del request.

            var user = Utilities.Util.GetCrmConfiguration(_service, "PsbServiceRemedyUserName");
            var clave = Utilities.Util.GetCrmConfiguration(_service, "PsbServiceRemedyUserPassword");

            //Impact
            //1-Extensive/Widespread      1000
            //2-Significant/Large         2000
            //3-Moderate/Limited          3000
            //4-Minor/Localized           4000

            //Urgency
            //1-Critical                  1000
            // 2-High                      2000
            // 3-Medium                    3000
            // 4-Low                       4000

            //Servicio a consumir tipo PSB

            GeneraIncidenciaRequestDTO obj = new GeneraIncidenciaRequestDTO();
            obj.request = new Request()
            {
                Password = user,
                UserName = clave,
                Urgency = _strUrgency, //strUrgency (1)
                ServiceCI = "", //strServiceCI
		        Impact= "1-Extensive/Widespread", //DEFAULT
		        Action= "CREATE", //DEFAULT
                Description = _strDescription, //strDescription
                CategorizationTier1 = _strCategory1,//strCategory1
                CategorizationTier2 = _strCategory2,//strCategory2
                CategorizationTier3 = _strCategory3,//strCategory3
		        RecordType= "CASE", //DEFAULT
                RecordID = _strCaseId //strCaseId
            };


            return obj;

        }


        private class RemedyDTO
        {
            public bool isRemedy { get; set; }
            public string categoryCode1 { get; set; }
            public string categoryCode2 { get; set; }
            public string categoryCode3 { get; set; }

        }

    }
}
