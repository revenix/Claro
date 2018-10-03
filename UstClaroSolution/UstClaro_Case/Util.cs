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
        private const string format = @"<?xml version=""""1.0""?>
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

        private Dictionary<string, string> GetAmxPeruName(IOrganizationService _service, string amxPeruName)
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

        private static string ConvertToString(Dictionary<string, string> cfg, string key)
        {
            string value = cfg.Select(o => o.Key == key).ToString();
            return value;
        }

        public string SendRestRequest(IOrganizationService _service, string request, string url, string amxperuname)
        {
            var configs = GetAmxPeruName(_service, amxperuname);

            string user = ConvertToString(configs, "PsbServiceUserName");
            string password = ConvertToString(configs, "PsbServiceUserPassword");
            string domain = ConvertToString(configs, "ActiveDirectoryDomainName");

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
