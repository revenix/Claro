using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case
{
    public class UstCreateRecordEntityByCaseType 
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            //try
            //{
            //    tracingService.Trace("Inicio");
            //    if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            //    {
            //        if (context.MessageName == "Create") {
            //            Entity entity = (Entity)context.InputParameters["Target"];
            //            if (entity == null) return;

            //            tracingService.Trace("Es Create y La entidad si tiene datos");
            //            if (entity.LogicalName != "incident") return;

            //            if (entity.Id == Guid.Empty) return;
            //            tracingService.Trace("entity.Id: " + entity.Id.ToString());

            //            EntityReference erCaseType = null;
            //            if (entity.Attributes.Contains("amxperu_casetype") && entity.Attributes["amxperu_casetype"] != null)
            //                erCaseType = ((EntityReference)entity.Attributes["amxperu_casetype"]);

            //            string strCodeCaseType = string.Empty;
            //            Entity entCaseType = service.Retrieve("amxperu_casetype", erCaseType.Id, new ColumnSet("ust_code"));
            //            if (entCaseType.Attributes.Contains("ust_code") && entCaseType.Attributes["ust_code"] != null)
            //                strCodeCaseType = entCaseType.Attributes["ust_code"].ToString();

            //            if (strCodeCaseType == "003") {
            //                Entity obj = new Entity("ust_sarosiptel");
            //                if (obj.Attributes.Contains("ust_Case")) obj.Attributes["ust_Case"] = new EntityReference("incident", entity.Id);
            //                else obj.Attributes.Add("ust_Case", new EntityReference("incident", entity.Id));
            //                service.Create(obj);
            //                tracingService.Trace("Record Created");
            //            }
                        
            //        }
            //    }
            //}
            //catch (FaultException<OrganizationServiceFault> ex)
            //{
            //    throw new InvalidPluginExecutionException("UstCreateRecordEntityByCaseType plug-in." + ex.Message, ex);
            //}
            //catch (Exception ex)
            //{
            //    tracingService.Trace("UstCreateRecordEntityByCaseType plug-in: {0} " + ex.Message, ex.ToString());
            //    throw;
            //}
        }
    }
}
