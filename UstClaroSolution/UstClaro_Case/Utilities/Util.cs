using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace UstClaro_Case.Utilities
{
    public class Util
    {
        private const string format = @"<?xml version=""1.0""?>
                                        <fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
                                        <entity name=""amxperu_claroextapiconfigs"">
                                        <attribute name=""amxperu_claroextapiconfigsid""/>
                                        <attribute name=""amxperu_name""/>
                                        <attribute name=""amxperu_value""/>
                                        <attribute name=""amxperu_key""/>
                                        <order descending=""false"" attribute=""amxperu_name""/>
                                        <filter type=""and"">
                                        <condition attribute=""amxperu_name"" value=""{0}"" operator=""eq""/>
                                        </filter>
                                        </entity>
                                        </fetch>";

        public Dictionary<string, string> GetAmxPeruName(IOrganizationService _service, string amxPeruName)
        {
            string xml = string.Format(format, amxPeruName);

            EntityCollection configs = _service.RetrieveMultiple(new FetchExpression(xml));
            Dictionary<string, string> configurations = new Dictionary<string, string>();

            foreach (var e in configs.Entities)
            {
                configurations.Add(e.Attributes["amxperu_key"].ToString(), e.Attributes["amxperu_value"].ToString());
            }

            return configurations;
        }

        public static string GetCrmConfiguration(IOrganizationService _service, string name)
        {
            string value = string.Empty;
            string xml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                          "<entity name='etel_crmconfiguration'>" +
                          "<attribute name='etel_crmconfigurationid'/>" +
                          "<attribute name='etel_name'/>" +
                          "<attribute name='etel_value'/>" +
                          "<order descending='false' attribute='etel_value'/>" +
                          "<filter type='and'> " +
                          "<condition attribute='etel_name' value='" + name + "' operator='eq'/>" +
                          "</filter>" +
                          "</entity>" +
                          "</fetch>";

            EntityCollection configs = _service.RetrieveMultiple(new FetchExpression(xml));
            Dictionary<string, string> configurations = new Dictionary<string, string>();

            if (configs != null && configs.Entities != null) 
            {
                var entity = configs.Entities.FirstOrDefault();
                value = entity.Attributes["etel_value"].ToString();
            }

            return value;
        }

        public static string GetCrmTranslation(IOrganizationService _service, string name)
        {
            string value = string.Empty;
            string xml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                          "<entity name='etel_translation'>" +
                            "<attribute name='etel_name' />" +
                            "<attribute name='createdon' />" +
                            "<attribute name='etel_message' />" +
                            "<attribute name='etel_lcid' />" +
                            "<attribute name='etel_formid' />" +
                            "<attribute name='etel_code' />" +
                            "<attribute name='etel_translationid' />" +
                            "<order attribute='etel_name' descending='false' />" +
                            "<filter type='and'>" +
                            "<condition attribute='etel_message' operator='eq' value='" + name + "' />" +
                            "<condition attribute='etel_formid' operator='eq' value='ostphase' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

            EntityCollection configs = _service.RetrieveMultiple(new FetchExpression(xml));
            Dictionary<string, string> configurations = new Dictionary<string, string>();

            if (configs != null && configs.Entities != null)
            {
                var entity = configs.Entities.FirstOrDefault();
                value = entity.Attributes["etel_message"].ToString();
            }

            return value;
        }
        public static string GetProcessStageName(IOrganizationService _service, Guid stageid)
        {
            string stageName = null;
            QueryExpression query = new QueryExpression("processstage");
            
            ColumnSet col = new ColumnSet("stagename");
            query.ColumnSet = col;
            ConditionExpression ce1 = new ConditionExpression("primaryentitytypecode", ConditionOperator.Equal, "incident");
            ConditionExpression ce2 = new ConditionExpression("processstageid", ConditionOperator.Equal, stageid);
            FilterExpression filter = new FilterExpression(LogicalOperator.And);
            filter.Conditions.Add(ce1);
            filter.Conditions.Add(ce2);
            query.Criteria.AddFilter(filter);

            EntityCollection collection = _service.RetrieveMultiple(query);
            if (collection.Entities.Count > 0)
            {
                stageName = collection.Entities[0].Attributes["stagename"].ToString();
            }
            return stageName;

        }

        public static string GetProcessStageNameOST(IOrganizationService _service, Guid stageid)
        {
            string stageName = null;
            QueryExpression query = new QueryExpression("processstage");

            ColumnSet col = new ColumnSet("stagename");
            query.ColumnSet = col;
            ConditionExpression ce1 = new ConditionExpression("primaryentitytypecode", ConditionOperator.Equal, "ust_ostpresential");
            ConditionExpression ce2 = new ConditionExpression("processstageid", ConditionOperator.Equal, stageid);
            FilterExpression filter = new FilterExpression(LogicalOperator.And);
            filter.Conditions.Add(ce1);
            filter.Conditions.Add(ce2);
            query.Criteria.AddFilter(filter);

            EntityCollection collection = _service.RetrieveMultiple(query);
            if (collection.Entities.Count > 0)
            {
                stageName = collection.Entities[0].Attributes["stagename"].ToString();
            }
            return stageName;

        }

        public static string ConvertToString(Dictionary<string, string> cfg, string key)
        {
            string value = cfg.Select(o => o.Key == key).ToString();
            return value;
        }

        public string SendRestRequest(IOrganizationService _service, string request, string url)
        {
            string user = GetCrmConfiguration(_service,"PsbServiceUserName");
            string password = GetCrmConfiguration(_service, "PsbServiceUserPassword");
            string domain = GetCrmConfiguration(_service,"ActiveDirectoryDomainName");


            var jsonResponse = string.Empty;
            HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(url);

            webrequest.Credentials = new NetworkCredential(user, password, domain);

            webrequest.Method = "POST";
            webrequest.ContentType = "application/json";

            using (Stream webStream = webrequest.GetRequestStream())
            using (StreamWriter requestWriter = new StreamWriter(webStream, System.Text.Encoding.ASCII))
            {
                requestWriter.Write(request);
            }
            var webResponse = (HttpWebResponse)webrequest.GetResponse();

            using (Stream webStream = webResponse.GetResponseStream())
            {
                if (webStream != null)
                {
                    using (StreamReader responseReader = new StreamReader(webStream))
                    {
                        jsonResponse = responseReader.ReadToEnd();
                    }
                }
            }

            return jsonResponse;
        }
    }
}
