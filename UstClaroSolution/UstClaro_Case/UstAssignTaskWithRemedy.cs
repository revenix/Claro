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
    /// Creador : FastCloudy
    /// Fecha: 16/07/2018
    /// Jira: 3167
    /// Function : CSR indicara si la tarea debe crearse como un ticket en Remedy. En este escenario, el propietario de la tarea es el usuario que lo creó. CRM expondrá un servicio web donde Remedy puede actualizar o cerrar la tarea.
    /// Trigger  : Change the type amxperu_tasktype = 1 (Remedy) 
    /// Entity : Task
    /// </summary>
    public class UstAssignTaskWithRemedy : IPlugin
    {
        void IPlugin.Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            try
            {

                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {

                        Entity entity = (Entity)context.InputParameters["Target"];

                        if (entity.LogicalName != "task") { return; };

                        if (entity == null) { return; };

                        Entity entTask = service.Retrieve("task", entity.Id, new ColumnSet("amxperu_tasktype"));

                        if (entTask.Attributes.Contains("amxperu_tasktype") && entTask.Attributes["amxperu_tasktype"] != null)
                        {
                            int erTipoTaskRemedy = ((int)entTask.Attributes["amxperu_tasktype"]);

                            if (erTipoTaskRemedy == 1)
                            { 

                                //Invoca servicio para notificar la creación de tarea en Remedy

                            }                            

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
    }    

}
