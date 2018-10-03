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
using Microsoft.Xrm.Tooling.Connector;


namespace UstWcf.Data
{
    public class DACase
    {
        private Microsoft.Xrm.Sdk.IOrganizationService _service = null;
        CrmServiceClient conn = null;
        string strUrl;
        string strUsuario;
        string strClave;
        string strDominio;

        public DACase()
        {
            // Obtain connection configuration information for the Microsoft Dynamics
            // CRM organization web service.
            String connectionString = DAConexionCRM.Instancia.ToString();

            // Connect to the CRM web service using a connection string.
            //conn = new CrmServiceClient(connectionString);
        }

        #region Métodos
        public DACase BuscarCaseExistente(UpdateOrCloseTaskCaseRequest request)
        {
            DACase caso = new DACase();
           
            try
            {
                // Cast the proxy client to the IOrganizationService interface.
                _service = (IOrganizationService)conn.OrganizationWebProxyClient != null ? (IOrganizationService)conn.OrganizationWebProxyClient : (IOrganizationService)conn.OrganizationServiceProxy;
                //var gestiones = FetchGestionesAbiertas(idCampania);               
            }
            catch
            {
                throw;
            }

            return caso;

        }
        

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="caseNumber"></param>
        /// <returns></returns>
        private List<Case> CaseOpen(Guid caseNumber)
        {
            Case casos;
            List<Case> data = new List<Case>();

            string xml = @"<?xml version=""1.0""?>
                            <fetch distinct=""false"" version=""1.0"" output-format=""xml-platform"" mapping=""logical"">
                            <entity name=""incident"">
                            <attribute name=""name"" />                             
                            <attribute name=""statecode"" />     
                            <order attribute=""name"" descending=""true""/>
                            <filter type=""and"">
                            <condition attribute=""statecode"" operator=""eq"" value=""0""/> 
                            <condition attribute=""statuscode"" operator=""eq"" value=""100000000""/>
                            </filter>
                            </entity>
                            </fetch>";

            xml = string.Format(xml, caseNumber);
            EntityCollection lista = _service.RetrieveMultiple(new FetchExpression(xml));

            foreach (var g in lista.Entities)
            {
            }
            return data;
        }
    }

   }
