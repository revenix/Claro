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

namespace UstClaro_Case
{

    /// <summary>
    /// Creador : FastCloudy
    /// Creación: 27/06/2018
    /// Función : Generate a correlative code from 
    /// Evento  : Pre-Create
    /// Req.    : 53-2-014
    /// Entidad : case
    /// </summary>
    public class UstPreGenerateGrievanceCode 
    {
        ITracingService myTrace;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));


            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    Entity entity = (Entity)context.InputParameters["Target"];
                    if (entity.LogicalName != "incident") return;

                    if (entity.Attributes.Contains("ticketnumber") && entity["ticketnumber"] != null) 
                    {
                        
                    }

                    Entity entOpo = service.Retrieve("incident", entity.Id, new ColumnSet("amxperu_casetype", "ust_sarresponse", "ust_flagtipocaso"));
                    


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

        private string getAutoNumberService(string strCodigo, Boolean isAccepted)
        {
            string strAutoNumberCodeService = null;

            try
            {

                BasicHttpBinding myBinding = new BasicHttpBinding();
                myBinding.Name = "AutoNumberCaseBind";
                //Get the real URL from the parameters.
                //EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://localhost:9991/esb/common/conAutoNumberCase/v2/?wsdl"));
                EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://172.17.26.146:24000/esb/common/conAutoNumberCase/v2/?wsdl"));//I have to change this.

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
                    if (response != null)
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
