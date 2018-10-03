using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UstWcf.Response;

namespace UstWcf.BL
{
    public class BLsearchCase
    {
        public ResponseMessage SearchCase(RequestMessage request)
        {
            ResponseMessage response = null;
            try
            {
                Data.DAsearchCase da= new Data.DAsearchCase();
                var fetch = GetCasos(request);
                response = da.SearchCase(fetch);
                //var data = da.SearchCase(fetch);

            }
            catch
            {
                //Log evento de errores
                response = null;
            }
            return response;
        }

        #region Fetch XML
     

        

        private string GetCasos(RequestMessage requestMessage)
        {
            string Xml = null;
            string c1 = string.Empty;
            string c2 = string.Empty;

//            Xml = @"<fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
//                      <entity name=""incident"">
//                          <attribute name=""incidentid"" />
//                          <attribute name=""parentcaseid"" />
//                          <attribute name=""amxperu_originpdv"" />
//                          <attribute name=""amxperu_originregion"" />
//                          <attribute name=""amxperu_originchannel"" />
//                          <attribute name=""etel_description"" />
//                          <attribute name=""customerid"" />
//                          <attribute name=""amxperu_casetype"" />
//                          <attribute name=""amxperu_billingaccountid"" />
//                          <attribute name=""ust_referentialphonenumber"" />
//                          <attribute name=""ust_category5"" />
//                          <attribute name=""ust_category4"" />
//                          <attribute name=""ust_category3"" />
//                          <attribute name=""ust_category2"" />
//                          <attribute name=""ust_category1"" />
//                          <attribute name=""ust_resolutiondate"" />
//                          <attribute name=""ust_resolutioncode"" />
//                          <attribute name=""amxperu_addressfixedtelephonypreselection"" />
//                          <order descending=""false"" attribute=""parentcaseid"" />
//                          <filter type=""and"">
//                             <filter type=""or"">";

//            if (!string.IsNullOrEmpty(requestMessage.CustomerTCRMId))
//                c1 = string.Format(@"<condition attribute=""customerid"" value=""{0}"" operator=""eq"" />", requestMessage.CustomerTCRMId);

//            if (!string.IsNullOrEmpty(requestMessage.ReferentialPhoneNumber))
//                c1 += string.Format(@"<condition attribute=""referentialphonenumber"" value=""{0}"" operator=""eq"" />", requestMessage.ReferentialPhoneNumber);

//            if (!string.IsNullOrEmpty(c1))
//                Xml += c1;

//            if (requestMessage.CreationDateFrom != DateTime.MinValue && requestMessage.CreationDateTo != DateTime.MinValue)
//                c2 = string.Format(@"<filter type=""and"">
//                                   <condition attribute=""createdon"" value=""{0}"" operator=""on-or-after"" />
//                                   <condition attribute=""createdon"" value=""{1}"" operator=""on-or-before"" />
//                                </filter>", requestMessage.CreationDateFrom, requestMessage.CreationDateTo);

//            if (!string.IsNullOrEmpty(c2))
//                Xml = Xml + c2;

//            if (!string.IsNullOrEmpty(requestMessage.CaseId))
//                Xml += string.Format(@"<condition attribute=""incidentid"" value=""{0}"" operator=""eq"" />", requestMessage.CaseId);

//            if (!string.IsNullOrEmpty(requestMessage.OsiptelCaseId))
//                Xml += string.Format(@"<condition attribute=""amxperu_osiptelcomplaintid"" value=""{0}"" operator=""eq"" />", requestMessage.OsiptelCaseId);

//            if (!string.IsNullOrEmpty(requestMessage.IndecopiCaseId))
//                Xml += string.Format(@"<condition attribute=""ust_indecopicomplaintid"" value=""{0}"" operator=""eq"" />", requestMessage.IndecopiCaseId);

//            Xml += "</filter></filter>";

//            if (!string.IsNullOrEmpty(requestMessage.CustomerId) || !string.IsNullOrEmpty(requestMessage.DocumentNumber) || requestMessage.DocumentTYpe != 0)
//            {
//                Xml += @"<link-entity name=""contact"" alias=""af"" to=""customerid"" from=""contactid"">
//                    <filter type = ""and"" >
//                    <filter type = ""or"" >";

//                if (!string.IsNullOrEmpty(requestMessage.CustomerId))
//                    Xml += string.Format(@"<condition attribute=""customerid"" value=""{0}"" operator=""eq"" />", requestMessage.CustomerId);

//                if (!string.IsNullOrEmpty(requestMessage.DocumentNumber))
//                    Xml += string.Format(@"<condition attribute=""etel_passportnumber"" value=""{0}"" operator=""eq"" />", requestMessage.DocumentNumber);

//                if (requestMessage.DocumentTYpe != 0)
//                    Xml += string.Format(@"<condition attribute=""amxperu_documenttype"" value=""{0}"" operator=""eq"" />", requestMessage.DocumentTYpe);

//                //Falta agregar el filtro para el CustomerType


//                Xml += @"</filter>
//                        </filter>
//                        </link-entity>";
                
//            }

//            Xml += @"</entity>
//                        </fetch>";

            Xml = @"<fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
                    <entity name=""incident"">
                    <attribute name=""title""/>
                    <attribute name=""ticketnumber""/>
                    <attribute name=""createdon""/>
                    <attribute name=""caseorigincode""/>
                    <attribute name=""etel_isdispute""/>
                    <attribute name=""incidentid""/>
                    <order descending=""false"" attribute=""title""/>
                    </entity>
                    </fetch>";


            //Paso adicional que es considerar que si el filtro no tiene data, no se procesa.

            return Xml;
        }

        #endregion




















    }
}