using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using UstWcf.Request;

using System.Web.Services.Protocols;
using System.Configuration;
using System.Text;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.Globalization;
using Microsoft.Crm.Sdk.Messages;
using UstWcf.Response;

namespace UstWcf.Data
{
    public class Case
    {
        IOrganizationService service;
        string strUrl;
        string strUsuario;
        string strClave;
        string strDominio;

        public Guid colaId;

        private static Case _Instancia = null;

        public static Case Instancia
        {
            get { if (_Instancia == null) _Instancia = new Case(); return _Instancia; }
        }

        public Case()
        {
            //try
            //{
            //    Uri url = new Uri(ConfigurationManager.AppSettings["WSCRM"]);
            //    service = CrmHelper.ConnectToCRM(url, Microsoft.Xrm.Sdk.Client.AuthenticationProviderType.ActiveDirectory);
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
        }

        public int BuscarCaseExistente(UpdateOrCloseTaskCaseRequest request)
        {
            int resultado = 0;
            //CodSol codSoluc = CodSol.Ninguno;

            //EntityReference typeCase = null;
            string casoNumber = string.Empty;
            //EntityReference customerId = null;
            int statusCodeTask = 0;

            Guid casoId = new Guid(request.caseId);
            string numbercase = request.caseNumber;
            Guid taskid = new Guid(request.taskId);
            int estado = Convert.ToInt32(request.State);

            try
            {

                //Buscar si existe el Caso en el CRM
                var fetch = CasoExistente(casoId);

                service = DAConexionCRM.Instancia.GetService(strUrl, strUsuario, strClave, strDominio);
                EntityCollection resultC = service.RetrieveMultiple(new FetchExpression(fetch));


                if (resultC.Entities.Count > 0)
                {

                    if (resultC[0].Attributes["ticketnumber"] != null)
                    {
                        casoNumber = resultC[0].Attributes["ticketnumber"].ToString();

                        statusCodeTask = ((OptionSetValue)resultC[0].Attributes["statecode"]).Value;

                        if (statusCodeTask == 0)
                        {
                            //if (resultC[0].Attributes["customerid"] != null)
                            //{
                            //    customerId = (EntityReference)resultC[0].Attributes["customerid"];
                            //}

                            var fetchTask = task(taskid);
                            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchTask));

                            if (result.Entities.Count > 0)
                            {
                                SetStateRequest setStateRequest = new SetStateRequest();

                                // In my case i'm Cancelling Task Activity
                                setStateRequest.EntityMoniker = new EntityReference(result.EntityName, taskid);

                                // Set the State and Status OptionSet Values to Cancelled.
                                setStateRequest.State = new OptionSetValue(2);
                                setStateRequest.Status = new OptionSetValue(estado); //6 Cancelled

                                // Execute the Response
                                SetStateResponse setStateResponse = (SetStateResponse)service.Execute(setStateRequest);

                                resultado = Convert.ToInt32(CodSol.ActualizadoCorrectamente);
                            }

                        }
                        else
                        {

                            resultado = Convert.ToInt32(CodSol.TareaYaestaCerrada);

                        }

                    }
                }
                else
                {
                    resultado = Convert.ToInt32(CodSol.NoExisteCaso);
                }
            }
            catch (Exception ex)
            {

                Global.AuditoriaUT.GenerarLogError("Error en el servicio", "Buscar Case Existente", ex.Message, Global.AuditoriaUT.TipoExtension.Txt);
            }


            return resultado;
        }

        private string CasoExistente(Guid casoId)
        {
            string Xml = null;

            Xml = @"<fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
                                  <entity name=""incident"">
                                      <attribute name=""incidentid"" />
                                      <attribute name=""title"" />
                                      <attribute name=""ticketnumber"" />
                                      <attribute name=""createdon"" />
                                      <attribute name=""caseorigincode"" />
                                      <attribute name=""etel_isdispute"" />
                                      <attribute name=""incidentid"" />                                    
                                      <order descending=""false"" attribute=""title"" />
                                      <filter type=""and"">
                                      <filter type=""or"">
                                      <condition attribute=""incidentid"" value=""{0}"" operator=""eq"" />
                                      </filter>   
                                    </entity>
                                    </fetch>";

            return Xml;
        }

        private string task(Guid taskid)
        {
            string Xml = null;

            Xml = @"<fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
                                  <entity name=""task"">
                                      <attribute name=""subject"" />
                                      <attribute name=""title"" />
                                      <attribute name=""statecode"" />
                                      <attribute name=""prioritycode"" />
                                      <attribute name=""caseorigincode"" />
                                      <attribute name=""etel_isdispute"" />
                                      <attribute name=""incidentid"" />                                    
                                      <order descending=""false"" attribute=""title"" />                                    
                                      <condition attribute=""activityid"" value=""{0}"" operator=""eq"" />
                                      </filter>   
                                    </entity>
                                    </fetch>";

            return Xml;
        }

        enum CodSol
        {
            Ninguno = 0,
            TareaYaestaCerrada = 1,
            ActualizadoCorrectamente = 2,
            NoExisteCaso = 3
        }
    }

}