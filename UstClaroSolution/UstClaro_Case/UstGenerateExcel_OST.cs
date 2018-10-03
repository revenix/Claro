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

using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Messages;
using System.Configuration;
using System.Data;
using Libreria_ExportExcel;
using System.Web.Mvc;

namespace UstClaro_Case
{
    public class UstGenerateExcel_OST : IPlugin
    {
        //ActionResult o FileResult
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));
            GenerarExcel export = new GenerarExcel();
            
            
            try
            {
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    if (context.MessageName == "Update")
                    {
                        //Variables Locales                         
                        Entity target = (Entity)context.InputParameters["Target"];
                        
                        if (target.Attributes.Contains("ust_flaggenerateexcel") && target["ust_flaggenerateexcel"] != null)
                        {
                            
                            string path = @"C:\Program Files\Microsoft Dynamics CRM\CRMWeb\Test\";
                            path = export.Exportar_Excel(path);
                        }
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
