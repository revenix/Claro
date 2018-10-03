using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Text;
using System.Runtime.Serialization;

namespace AutoNumber.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            //Test();
            ConexionCRM();
        }

        private static void Test() 
        {
            var request = new AutoNumberCaseRequest()
            {
                InputParameters = new InputParameters()
                {
                    I_CO_ID = "01"
                    
                }
            };

            //AutoNumberCasePortClient client = new AutoNumberCasePortClient("AutoNumberCasePort");

            BasicHttpBinding myBinding = new BasicHttpBinding("AutoNumberCaseBind");
            //myBinding.CloseTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.OpenTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.ReceiveTimeout = new TimeSpan(0, 0, 10, 0, 0);
            //myBinding.SendTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.BypassProxyOnLocal = false;
            //myBinding.MaxBufferPoolSize = 524288;
            //myBinding.MaxReceivedMessageSize = 65536;
            //myBinding.UseDefaultWebProxy = true;
            //myBinding.AllowCookies = false;
            //We need the IP address
            //EndpointIdentity endpointIdentity = EndpointIdentity.CreateUpnIdentity("usuario");
            EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://localhost:9991/esb/common/conAutoNumberCase/v2/?wsdl"));//I have to change this.
            
            using (AutoNumberCasePortChannel proxy = new ChannelFactory<AutoNumberCasePortChannel>(myBinding, myEndpoint).CreateChannel()) 
            {
                AutoNumberCaseResponse response = proxy.AutoNumberCase(request);
                var codigo = response.OutputParameters.O_ID_CASE;
            }


        }

        private static void ConexionCRM() 
        {
            Microsoft.Xrm.Sdk.Client.OrganizationServiceProxy _serviceProxy;
            Microsoft.Xrm.Sdk.IOrganizationService _service;
            Microsoft.Crm.Sdk.Samples.ServerConnection.Configuration serverConfig;

            try
            {
                Microsoft.Crm.Sdk.Samples.ServerConnection serverConnect = new Microsoft.Crm.Sdk.Samples.ServerConnection();
                serverConfig = serverConnect.GetServerConfiguration();

                CrmServiceClient crmSvc = new CrmServiceClient(new System.Net.NetworkCredential("<UserName>", "<Password>", “<Domain>”), AuthenticationType.AD, "<Server>", "<Port>", "<OrgName>", useUniqueInstance:false, useSsl:false, <orgDetail>);

                // Connect to the CRM web service using a connection string.
                using (_serviceProxy = new Microsoft.Xrm.Sdk.Client.OrganizationServiceProxy(serverConfig.OrganizationUri, serverConfig.HomeRealmUri, serverConfig.Credentials, serverConfig.DeviceCredentials))
                {
                    _service = (Microsoft.Xrm.Sdk.IOrganizationService)_serviceProxy;
                    var i = 0;
                }
            }
            // Catch any service fault exceptions that Microsoft Dynamics CRM throws.
            catch (FaultException<Microsoft.Xrm.Sdk.OrganizationServiceFault>)
            {
                // You can handle an exception here or pass it back to the calling method.
                throw;
            }
            catch (Exception)
            {
                
            }
        }

        private static void GetAutoNumberCfg() 
        {
            IOrganizationService _service = UstWcf.Data.DAConexionCRM.Instancia.GetService("http://localhost:9991/CLAROPERUDEV2", "crmadminuser1", "Crm@dm!Us3r", "adtest");

            string xml = @"<?xml version=""""1.0""?>
                            <fetch distinct=""false"" mapping=""logical"" output-format=""xml-platform"" version=""1.0"">
                            <entity name=""amxperu_claroextapiconfigs"">
                            <attribute name=""amxperu_claroextapiconfigsid""/>
                            <attribute name=""amxperu_name""/>
                            <attribute name=""amxperu_value""/>
                            <attribute name=""amxperu_key""/>
                            <order descending=""false"" attribute=""amxperu_name""/>
                            <filter type=""and"">
                            <condition attribute=""amxperu_name"" value=""conAutoNumberCase"" operator=""eq""/>
                            </filter>
                            </entity>
                            </fetch>";   
            
            EntityCollection configs = _service.RetrieveMultiple(new FetchExpression(xml));
            Dictionary<string,string> configurations = new Dictionary<string,string>();
           
            foreach (var e in configs.Entities)
            {
                configurations.Add(e.Attributes["amxperu_key"].ToString(), e.Attributes["amxperu_value"].ToString());
            }

            //Populate headers
            //We Need .dll
            HeaderRequestType header1 = new HeaderRequestType()
            {
                country = ConvertToString(configurations, "country"),
                language = ConvertToString(configurations, "language"),
                consumer = ConvertToString(configurations, "consumer"),
                system = ConvertToString(configurations, "system"),
                modulo = ConvertToString(configurations, "modulo"),
                pid = ConvertToString(configurations, "pid"),
                userId = ConvertToString(configurations, "userId"),
                dispositivo = ConvertToString(configurations, "dispositivo"),
                wsIp = ConvertToString(configurations, "wsIp"),
                operation = ConvertToString(configurations, "operation"),
                msgType = ConvertToString(configurations, "msgType"),
                timestamp = DateTime.Now,
                VarArg = new List<ArgType>
                {
                    new ArgType { key = "000", value = "000" }
                }.ToArray()
            };

            HeaderRequest header2 = new HeaderRequest()
            {
                channel = ConvertToString(configurations, "channel"),
                idApplication = ConvertToString(configurations, "idApplication"),
                userApplication = ConvertToString(configurations, "userApplication"),
                userSession = ConvertToString(configurations, "userSession"),
                idBusinessTransaction = ConvertToString(configurations, "idBusinessTransaction"),
                startDate = DateTime.Now
            };

            // Security header
            //var securityHeader = new ClaroSecurityHeader("",ConvertToString(configurations, "Username"), ConvertToString(configurations, "Password"));

            //Timeout
            //var timeout = new TimeoutParameters()
            //{
            //    OpenTimeout = new TimeSpan(0, 15, 0),
            //    ReceivedTimeout = new TimeSpan(0, 15, 0),
            //    SendTimeout = new TimeSpan(0, 15, 0)
            //};

            //Endpoint
            var endPoint = ConvertToString(configurations, "endpoint");                






        }

        private static string ConvertToString(Dictionary<string,string> cfg,string key ) 
        {
            string value = cfg.Select(o=>o.Key==key).ToString();
            return value;
        }

        private class HeaderRequestType 
        {
            public string country { get; set; }
            public string language { get; set; }
            public string consumer { get; set; }
            public string system { get; set; }
            public string modulo { get; set; }
            public string pid { get; set; }

            public string userId { get; set; }
            public string dispositivo { get; set; }

            public string wsIp { get; set; }
            public string operation { get; set; }
            public string msgType { get; set; }

            public DateTime timestamp { get; set; }

            public ArgType[] VarArg { get; set; }
        }

        private class HeaderRequest
        {
            public string channel { get; set; }
            public string idApplication { get; set; }
            public string userApplication { get; set; }
            public string userSession { get; set; }
            public string idBusinessTransaction { get; set; }
            public DateTime startDate { get; set; }

        }


        private class ArgType 
        {
            public string key { get; set; }

            public string value { get; set; }
        }


        

    }
}
