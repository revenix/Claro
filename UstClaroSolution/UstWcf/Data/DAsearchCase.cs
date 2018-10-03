using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using UstWcf.Response;
using UstWcf.BusinessEntities;

namespace UstWcf.Data
{
    public class DAsearchCase
    {
        private Microsoft.Xrm.Sdk.IOrganizationService _service = null;
        string strUrl;
        string strUsuario;
        string strClave;
        string strDominio;

        public DAsearchCase()
        {
            if (System.Configuration.ConfigurationManager.AppSettings["URL_CRM"] != null)
                strUrl = System.Configuration.ConfigurationManager.AppSettings["URL_CRM"];

            if (System.Configuration.ConfigurationManager.AppSettings["USUARIO_CRM"] != null)
                strUsuario = System.Configuration.ConfigurationManager.AppSettings["USUARIO_CRM"];

            if (System.Configuration.ConfigurationManager.AppSettings["CLAVE_CRM"] != null)
                strClave = System.Configuration.ConfigurationManager.AppSettings["CLAVE_CRM"];

            if (System.Configuration.ConfigurationManager.AppSettings["DOMINIO_CRM"] != null)
                strDominio = System.Configuration.ConfigurationManager.AppSettings["DOMINIO_CRM"];

            if (string.IsNullOrEmpty(strUrl) || string.IsNullOrEmpty(strUsuario) || string.IsNullOrEmpty(strClave) || string.IsNullOrEmpty(strDominio))
                throw new ApplicationException("No se han configurado todas las variables de conxión al CRM.\n Por favor consulte con el Administrador."); 

        }



        public ResponseMessage SearchCase(String strFetch)
        {
            List<Case> lista = new List<Case>();
            ResponseMessage response = new ResponseMessage();
            try
            {
                //_service = DAConexionCRM.Instancia.GetService(strUrl, strUsuario, strClave, strDominio);
                //EntityCollection casos = _service.RetrieveMultiple(new FetchExpression(strFetch));


                //var newcase = new ResponseMessage();
                response.successFlag = 1;

                var c1 = new Incident();
                c1.description = "Mensaje";
                c1.caseType = "04-Reclamo Opsitel";
                c1.caseTypeCategory1 = "0402-PROBLEMAS TECNICOS(CALIDAD E IDONEIDAD)SS MOVILES";
                c1.caseTypeCategory2 = "040201-Internet Móvil";
                c1.caseTypeCategory3 = "04020101-Problemas escalares a Red";
                c1.caseTypeCategory4 = "0402010101-CALIDAD E IDONEIDAD-INTERNET";
                c1.status =318580001;
                c1.complaintPhase = "1ra Instancia";
                c1.referentialPhoneNumber = "999999999";

                //response.cases = new Incident[] {c1};

                response.cases = new Incident[] { c1 };



                //foreach(var ca in casos.Entities)
                //{
                //    //Aqui es llenar la clase del response.
                //    UstWcf.BusinessEntities.Case data = new UstWcf.BusinessEntities.Case();

                //}

            }
            catch (Exception e)
            {
                throw;
            }
            return response;
        }
    }
}