using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Discovery;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;

namespace UstWcf.Data
{
    public class DAConexionCRM
    {
        #region Singleton
        private static DAConexionCRM _Instancia = null;
        static readonly object padlock = new object();

        private DAConexionCRM()
        {
        }

        public static DAConexionCRM Instancia
        {
            get
            {
                if (_Instancia == null)
                {
                    lock (padlock)
                    {
                        if (_Instancia == null)
                        {
                            _Instancia = new DAConexionCRM();
                        }
                    }
                }
                return _Instancia;
            }
        }
        #endregion

        #region Dynamics CRM
        public Microsoft.Xrm.Sdk.IOrganizationService GetService(String serverURL, String userName, String password, String domain)
        {
            IServiceConfiguration<IOrganizationService> orgConfig =
                ServiceConfigurationFactory.CreateConfiguration<IOrganizationService>
                    (new Uri(string.Format("{0}/XRMServices/2011/Organization.svc", serverURL)));

            var creds = new ClientCredentials();

            creds.Windows.ClientCredential.UserName = userName;
            creds.Windows.ClientCredential.Password = password;
            creds.Windows.ClientCredential.Domain = domain;

            ServicePointManager.ServerCertificateValidationCallback = AcceptAllCertificatePolicy;

            var orgService = new OrganizationServiceProxy(orgConfig, creds);
            orgService.ServiceConfiguration.CurrentServiceEndpoint.Behaviors.Add(new ProxyTypesBehavior());
            return orgService;
        }


        private static bool AcceptAllCertificatePolicy(
            Object sender,
            System.Security.Cryptography.X509Certificates.X509Certificate certificate,
            System.Security.Cryptography.X509Certificates.X509Chain chain,
            System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        public Microsoft.Xrm.Sdk.IOrganizationService GetService(string serverURL, string userName, string userPassword, string userDomain, string organizationCRM)
        {
            //to ignore certificates errors
            ServicePointManager.ServerCertificateValidationCallback =
                new RemoteCertificateValidationCallback(AcceptAllCertificatePolicy);

            IServiceManagement<IDiscoveryService> serviceManagement =
                ServiceConfigurationFactory.CreateManagement<IDiscoveryService>(
                    new Uri(string.Format("{0}/XRMServices/2011/Discovery.svc", serverURL)));
            AuthenticationProviderType endpointType = serviceManagement.AuthenticationType;

            // Set the credentials.
            AuthenticationCredentials authCredentials = GetCredentials(endpointType, userName, userPassword, userDomain);

            String organizationUri = String.Empty;

            // Get the discovery service proxy.
            DiscoveryServiceProxy discoveryProxy =
                GetProxy<IDiscoveryService, DiscoveryServiceProxy>(serviceManagement, authCredentials);

            // Obtain organization information from the Discovery service. 
            if (discoveryProxy != null)
            {
                // Obtain information about the organizations that the system user belongs to.
                OrganizationDetailCollection orgs = DiscoverOrganizations(discoveryProxy);
                // Obtains the Web address (Uri) of the target organization.
                organizationUri = FindOrganization(organizationCRM,
                    orgs.ToArray()).Endpoints[EndpointType.OrganizationService];

            }


            if (!String.IsNullOrWhiteSpace(organizationUri))
            {
                IServiceManagement<IOrganizationService> orgServiceManagement =
                    ServiceConfigurationFactory.CreateManagement<IOrganizationService>(
                        new Uri(organizationUri));

                // Set the credentials.
                AuthenticationCredentials credentials = GetCredentials(endpointType, userName, userPassword, userDomain);

                // Get the organization service proxy.
                OrganizationServiceProxy organizationProxy =
                    GetProxy<IOrganizationService, OrganizationServiceProxy>(orgServiceManagement, credentials);

                // This statement is required to enable early-bound type support.
                organizationProxy.EnableProxyTypes();

                return organizationProxy;
            }

            return null;
        }

        /// <summary>
        /// Obtain the AuthenticationCredentials based on AuthenticationProviderType.
        /// </summary>
        /// <param name="endpointType">An AuthenticationProviderType of the CRM environment.</param>
        /// <returns>Get filled credentials.</returns>
        private Microsoft.Xrm.Sdk.Client.AuthenticationCredentials GetCredentials(Microsoft.Xrm.Sdk.Client.AuthenticationProviderType endpointType, string userName, string password, string domain)
        {

            AuthenticationCredentials authCredentials = new AuthenticationCredentials();
            switch (endpointType)
            {
                case AuthenticationProviderType.ActiveDirectory:
                    authCredentials.ClientCredentials.Windows.ClientCredential =
                        new System.Net.NetworkCredential(userName,
                            password,
                            domain);
                    break;
                case AuthenticationProviderType.LiveId:
                    //authCredentials.ClientCredentials.UserName.UserName = userName;
                    //authCredentials.ClientCredentials.UserName.Password = password;
                    //authCredentials.SupportingCredentials = new AuthenticationCredentials();
                    //authCredentials.SupportingCredentials.ClientCredentials =
                    //Microsoft.Crm.Services.Utility.DeviceIdManager.LoadOrRegisterDevice();
                    break;
                default: // For Federated and OnlineFederated environments.                    
                    authCredentials.ClientCredentials.UserName.UserName = domain + @"\" + userName;
                    authCredentials.ClientCredentials.UserName.Password = password;
                    // For OnlineFederated single-sign on, you could just use current UserPrincipalName instead of passing user name and password.
                    //authCredentials.UserPrincipalName = UserPrincipal.Current.UserPrincipalName;  //Windows/Kerberos
                    break;
            }

            return authCredentials;
        }


        /// <summary>
        /// Generic method to obtain discovery/organization service proxy instance.
        /// </summary>
        /// <typeparam name="TService">
        /// Set IDiscoveryService or IOrganizationService type to request respective service proxy instance.
        /// </typeparam>
        /// <typeparam name="TProxy">
        /// Set the return type to either DiscoveryServiceProxy or OrganizationServiceProxy type based on TService type.
        /// </typeparam>
        /// <param name="serviceManagement">An instance of IServiceManagement</param>
        /// <param name="authCredentials">The user's Microsoft Dynamics CRM logon credentials.</param>
        /// <returns></returns>
        private TProxy GetProxy<TService, TProxy>(
            Microsoft.Xrm.Sdk.Client.IServiceManagement<TService> serviceManagement,
            Microsoft.Xrm.Sdk.Client.AuthenticationCredentials authCredentials)
            where TService : class
            where TProxy : Microsoft.Xrm.Sdk.Client.ServiceProxy<TService>
        {
            Type classType = typeof(TProxy);

            if (serviceManagement.AuthenticationType !=
                AuthenticationProviderType.ActiveDirectory)
            {
                AuthenticationCredentials tokenCredentials =
                    serviceManagement.Authenticate(authCredentials);
                // Obtain discovery/organization service proxy for Federated, LiveId and OnlineFederated environments. 
                // Instantiate a new class of type using the 2 parameter constructor of type IServiceManagement and SecurityTokenResponse.
                return (TProxy)classType
                    .GetConstructor(new Type[] { typeof(IServiceManagement<TService>), typeof(SecurityTokenResponse) })
                    .Invoke(new object[] { serviceManagement, tokenCredentials.SecurityTokenResponse });
            }

            // Obtain discovery/organization service proxy for ActiveDirectory environment.
            // Instantiate a new class of type using the 2 parameter constructor of type IServiceManagement and ClientCredentials.
            return (TProxy)classType
                .GetConstructor(new Type[] { typeof(IServiceManagement<TService>), typeof(ClientCredentials) })
                .Invoke(new object[] { serviceManagement, authCredentials.ClientCredentials });
        }

        /// <summary>
        /// Discovers the organizations that the calling user belongs to.
        /// </summary>
        /// <param name="service">A Discovery service proxy instance.</param>
        /// <returns>Array containing detailed information on each organization that 
        /// the user belongs to.</returns>
        public Microsoft.Xrm.Sdk.Discovery.OrganizationDetailCollection DiscoverOrganizations(
            Microsoft.Xrm.Sdk.Discovery.IDiscoveryService service)
        {
            if (service == null) throw new ArgumentNullException("service");
            RetrieveOrganizationsRequest orgRequest = new RetrieveOrganizationsRequest();
            RetrieveOrganizationsResponse orgResponse =
                (RetrieveOrganizationsResponse)service.Execute(orgRequest);

            return orgResponse.Details;
        }

        /// <summary>
        /// Finds a specific organization detail in the array of organization details
        /// returned from the Discovery service.
        /// </summary>
        /// <param name="orgUniqueName">The unique name of the organization to find.</param>
        /// <param name="orgDetails">Array of organization detail object returned from the discovery service.</param>
        /// <returns>Organization details or null if the organization was not found.</returns>
        /// <seealso cref="DiscoveryOrganizations"/>
        public Microsoft.Xrm.Sdk.Discovery.OrganizationDetail FindOrganization(string orgUniqueName,
            Microsoft.Xrm.Sdk.Discovery.OrganizationDetail[] orgDetails)
        {
            if (String.IsNullOrWhiteSpace(orgUniqueName))
                throw new ArgumentNullException("orgUniqueName");
            if (orgDetails == null)
                throw new ArgumentNullException("orgDetails");
            OrganizationDetail orgDetail = null;

            foreach (OrganizationDetail detail in orgDetails)
            {
                if (String.Compare(detail.UniqueName, orgUniqueName,
                        StringComparison.InvariantCultureIgnoreCase) == 0)
                {
                    orgDetail = detail;
                    break;
                }
            }
            return orgDetail;
        }

        public static string GetPickListText(string entityName, string attributeName, int optionSetValue, Microsoft.Xrm.Sdk.IOrganizationService service)
        {
            string AttributeName = attributeName;
            string EntityLogicalName = entityName;
            RetrieveEntityRequest retrieveDetails = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.All,
                LogicalName = EntityLogicalName
            };
            RetrieveEntityResponse retrieveEntityResponseObj = (RetrieveEntityResponse)service.Execute(retrieveDetails);
            Microsoft.Xrm.Sdk.Metadata.EntityMetadata metadata = retrieveEntityResponseObj.EntityMetadata;
            Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata picklistMetadata = metadata.Attributes.FirstOrDefault(attribute => String.Equals(attribute.LogicalName, attributeName, StringComparison.OrdinalIgnoreCase)) as Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata;
            Microsoft.Xrm.Sdk.Metadata.OptionSetMetadata options = picklistMetadata.OptionSet;
            IList<OptionMetadata> picklistOption = (from o in options.Options
                where o.Value.Value == optionSetValue
                select o).ToList();
            string picklistLabel = (picklistOption.First()).Label.UserLocalizedLabel.Label;
            return picklistLabel;
        }

        #endregion
    }
}