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

      UrlFile.Set(executionContext, "");

      GenerarExcel export = new GenerarExcel();

      try
      {
        // var columna = Util.GetCrmConfiguration(service , "3108" );

        string fetch2 = @"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                          <entity name='incident'>
                            <attribute name='title' />
                            <attribute name='ust_osiptelcomplaintid' />
                            <attribute name='ust_osiptelcasegenerated' />
                            <attribute name='ust_customername' />
                            <attribute name='ust_trasurecordnumber' />
                            <attribute name='ust_trasuemissiondate' />
                            <attribute name='statuscode' />
                            <attribute name='incidentid' />
                            <attribute name='amxperu_casetype' />
                            <attribute name='ust_serviceissueenddate' />
                            <attribute name='ust_serviceissuestartdate' />
                            <order attribute='title' descending='false' />
                          </entity>
                        </fetch>";


        EntityCollection lista = service.RetrieveMultiple(new FetchExpression(fetch2));

        var columna_EMAILEO = GetCrmConfiguration(service, "[GeneracionExcelTRASU-Columna]-EMAILEO");
        var columna_EMAILNOTEO = GetCrmConfiguration(service, "[GeneracionExcelTRASU-Columna]-EMAILNOTEO");
        var columna_NOMEO = GetCrmConfiguration(service, "[GeneracionExcelTRASU-Columna]-NOMEO");
        var columna_NUMCARTALTRASU = GetCrmConfiguration(service, "[GeneracionExcelTRASU-Columna]-NUMCARTALTRASU");
        var columna_NUMRUCEO = GetCrmConfiguration(service, "[GeneracionExcelTRASU-Columna]-NUMRUCEO");

        var FechaActual = DateTime.Now.ToString("dd.mm.yyyy");


        if (lista != null)
        {

          List<Trasu> listaExcel = new List<Trasu>();
          foreach (Entity item in lista.Entities)
          {


            EntityReference entref = (EntityReference)item["amxperu_casetype"];
            var LookupCaseType = entref.Name;
            var TipoCaso = "";

            if (LookupCaseType != null)
            {
              switch (LookupCaseType)
              {
                case ("05 - Reclamo OSIPTEL"):
                  TipoCaso = "RQJ";
                  break;
                case ("06-Queja OSIPTEL"):
                  TipoCaso = "RA";
                  break;
                default:
                  TipoCaso = "";
                  break;
              }
            }

            Trasu obj = new Trasu();
            obj.NOMEO = columna_NOMEO.ToString() != null ? columna_NOMEO.ToString() : "";
            obj.NUMRUCEO = columna_NUMRUCEO.ToString() != null ? columna_NUMRUCEO.ToString() : "";
            obj.EMAILEO = columna_EMAILEO.ToString() != null ? columna_EMAILEO.ToString() : "";
            obj.NUMCARTALTRASU = columna_NUMCARTALTRASU.ToString() != null ? columna_NUMCARTALTRASU.ToString() + TipoCaso + "/" : "";
            obj.FECCARTALTRASU = FechaActual != null ? FechaActual : "";
            obj.NUMFOLCARTALTRASU = "";
            obj.CLARECURSO = TipoCaso != null ? TipoCaso : "";
            obj.CODSERVCONTRATADO = "";
            obj.NUMSERVABONADO = "";
            obj.NUMSERVRECLAMO = "";
            obj.CODSUBCRECLAMO = "";
            obj.NUMRECIBORECLAMO = "";
            obj.FECRECIBORECLAMO = "";
            obj.FECVENCRECIBRECLAMO = "";

            var start = item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() !=null && item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() != "1/1/0001 12:00:00 AM" ? item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() : "";
            var end = item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() != null && item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() != "1/1/0001 12:00:00 AM" ? item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() : "";

            obj.DESPERIODRECLAMO = "Fecha Inicio Averia: " + start.ToString() + "-\n" + "Fecha Fin Averia: " + end.ToString();
            obj.MONRECLAMO = "" ;
            obj.CODMONEDARECLAMO = "";

            //obj.NUMRECIBORECLAMO = "";
            //obj.NUMRECIBORECLAMO = "";
            //obj.NUMRECIBORECLAMO = "";
            //obj.NUMRECIBORECLAMO = "";
            //obj.NUMRECIBORECLAMO = "";






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



    public string GetCrmConfiguration(IOrganizationService _service, string name)
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




    [Output("UrlFile")]
    public OutArgument<string> UrlFile { get; set; }

  }


}