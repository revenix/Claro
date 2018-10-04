using System;
using System.Activities;
using System.Collections.ObjectModel;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using Libreria_ExportExcel;
using System.Linq;
using System.Collections.Generic;
using Libreria_ExportExcel.DTO;
//using UstClaro_Case.Utilities;

namespace UstClaro_WorkFlows
{
    public sealed class Ust_CreateExcelTrasu : CodeActivity
    {

        protected override void Execute(CodeActivityContext executionContext)
        {
            //Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            //Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            UrlFile.Set(executionContext, "" );

            GenerarExcel export = new GenerarExcel();

            try
            {
                // var columna = Util.GetCrmConfiguration(service , "3108" );

                string fetch2 = @"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                  <entity name='incident'>
                                    <attribute name='title' />
                                    <attribute name='ticketnumber' />
                                    <attribute name='createdon' />
                                    <attribute name='caseorigincode' />
                                    <attribute name='etel_isdispute' />
                                    <attribute name='incidentid' />
                                    <order attribute='title' descending='false' />
                                  </entity>
                                </fetch>";


                   EntityCollection lista = service.RetrieveMultiple(new FetchExpression(fetch2));

                if (lista != null )
                {

                    List<Trasu> listaExcel = new List<Trasu>();
                    foreach (Entity item in lista.Entities)
                    {

                        Trasu obj = new Trasu();
                        obj.NOMEO = item.Contains("title") ? item["title"].ToString() : "";
                        obj.NUMRUCEO = item.Contains("ticketnumber") ? item["ticketnumber"].ToString() : "";

                        listaExcel.Add(obj);

                    }

                    String UrlFileExcel = "";

                    string path = @"C:\Program Files\Microsoft Dynamics CRM\CRMWeb\Test\";
                    path = export.Exportar_Excel(path, listaExcel);

                    UrlFileExcel = "/test/" + path.Replace(@"C:\Program Files\Microsoft Dynamics CRM\CRMWeb\Test\", "");
                    UrlFile.Set(executionContext, UrlFileExcel);

                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        [Output("UrlFile")]
        public OutArgument<string> UrlFile { get; set; }

    }


}