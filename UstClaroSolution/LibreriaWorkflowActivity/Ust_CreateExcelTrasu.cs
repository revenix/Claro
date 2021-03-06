﻿using System;
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
                            <attribute name='incidentid' />
                            <attribute name='ust_serviceissuestartdate' />
                            <attribute name='ust_serviceissueenddate' />
                            <attribute name='ust_category5' />
                            <attribute name='ust_category4' />
                            <attribute name='ust_category3' />
                            <attribute name='ust_category2' />
                            <attribute name='ust_category1' />
                            <attribute name='amxperu_casetype' />
                            <attribute name='ust_osiptelgrievanceid' />
                            <attribute name='amxperu_osiptelcomplaintid' />
                            <attribute name='ust_registrationdateclaim' />
                            <attribute name='ust_resolutiondate' />
                            <attribute name='ust_resolutiondateindecopicomplaint' />
                            <attribute name='ust_resultosiptelclaim' />
                            <attribute name='ust_resultgrievanceosiptel' />
                            <attribute name='ust_dateofnotification' />
                            <attribute name='ust_osiptelnotificationaddress' />
                            <attribute name='ust_alternativenotificationaddress' />
                            <attribute name='ust_notificationtypeosiptelclaim' />
                            <attribute name='ust_osiptelnotificationemail' />
                            <attribute name='ust_grievancecontactdocumentnumber' />
                            <attribute name='ust_grievancecontactdocumenttype' />
                            <attribute name='ust_grievancecontactlastname' />
                            <attribute name='ust_grievancecontactname' />
                            <attribute name='ust_appealcontactdocumentnumber' />
                            <attribute name='ust_appealcontactdocumenttype' />
                            <attribute name='ust_appealcontactname' />
                            <attribute name='customerid' />
                            <order attribute='title' descending='false' />
                            <filter type='and'>
                              <filter type='or'>
                                <filter type='and'>
                                  <condition attribute='amxperu_casetype' operator='eq' uiname='05-Reclamo OSIPTEL' uitype='amxperu_casetype' value='{942CAA0F-57BD-E811-80DC-00505684F50C}' />
                                  <condition attribute='statuscode' operator='eq' value='864340004' />
                                  <condition attribute='ust_complaintphase' operator='eq' value='864340002' />
                                </filter>
                                <filter type='and'>
                                  <condition attribute='amxperu_casetype' operator='eq' uiname='06-Queja OSIPTEL' uitype='amxperu_casetype' value='{962CAA0F-57BD-E811-80DC-00505684F50C}' />
                                  <condition attribute='statuscode' operator='eq' value='864340004' />
                                </filter>
                              </filter>
                            </filter>
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
                        var codSubReclamo = "";
                        EntityReference categoria3;
                        EntityReference categoria1;
                        var DESSUMILLARECLAMO = "";
                        var NUMRECLAMOEO = "";
                        var FECPRESRECLAMO = "";
                        var FECRESOL1ERA = "";
                        OptionSetValue OptionSetCODSENTRESOL1ERA;
                        var CODSENTRESOL1ERA = "";
                        EntityReference OsiptelDireccion;
                        var OsiptelDireccionAlternativa = "";
                        var DIRNOTIFRESOL1ERA = "";
                        OptionSetValue optionsetdeNotificacion;
                        var FLANOTELUSU = "";
                        //var FECPRESENAPELACQUEJA = "";
                        var NUMDOCQUEJOSO = "";
                        OptionSetValue optionsetCodQuejoso;
                        var CODQUEJOSO = "";
                        var APEQUEJOSO = "";
                        var NOMQUEJOSO = "";

                        EntityReference NombreCliente;


                        if (LookupCaseType != null)
                        {
                            switch (LookupCaseType)
                            {
                                case ("05-Reclamo OSIPTEL"):
                                    TipoCaso = "RQJ";
                                    categoria3 = item.GetAttributeValue<EntityReference>("ust_category3");
                                    codSubReclamo = categoria3 != null ? categoria3.Name.Substring(0, 4) : "";
                                    DESSUMILLARECLAMO = categoria3 != null ? categoria3.Name : "";
                                    NUMRECLAMOEO = item.Contains("amxperu_osiptelcomplaintid") ? item["amxperu_osiptelcomplaintid"].ToString() : "";
                                    FECPRESRECLAMO = item.Contains("ust_registrationdateclaim") ? item.GetAttributeValue<DateTime>("ust_registrationdateclaim").ToString("dd.mm.yyyy") : "";
                                    FECRESOL1ERA = item.Contains("ust_resolutiondateindecopicomplaint") ? item.GetAttributeValue<DateTime>("ust_resolutiondateindecopicomplaint").ToString("dd.mm.yyyy") : "";
                                    //.Value obtiene el index id del option set 
                                    OptionSetCODSENTRESOL1ERA = item.GetAttributeValue<OptionSetValue>("ust_resultosiptelclaim");
                                    CODSENTRESOL1ERA = OptionSetCODSENTRESOL1ERA != null ? OptionSetCODSENTRESOL1ERA.Value.ToString() : "";

                                    switch (CODSENTRESOL1ERA)
                                    {
                                        case ("Fundado"):
                                            CODSENTRESOL1ERA = "101";
                                            break;
                                        case ("Infundado"):
                                            CODSENTRESOL1ERA = "102";
                                            break;
                                        case ("Improcedente"):
                                            CODSENTRESOL1ERA = "103";
                                            break;
                                        case ("Parcialmente Fundado"):
                                            CODSENTRESOL1ERA = "104";
                                            break;
                                        case ("Dar por Concluido"):
                                            CODSENTRESOL1ERA = "121";
                                            break;
                                        case ("Combinaciones"):
                                            CODSENTRESOL1ERA = "Combinaciones";
                                            break;
                                        case ("Inadmisible"):
                                            CODSENTRESOL1ERA = "Inadmisible";
                                            break;
                                        case ("Rechazar"):
                                            CODSENTRESOL1ERA = "109";
                                            break;
                                        case ("Otros"):
                                            CODSENTRESOL1ERA = "Otros";
                                            break;
                                        default:
                                            CODSENTRESOL1ERA = "";
                                            break;
                                    }

                                    //OsiptelDireccion = item.GetAttributeValue<EntityReference>("ust_osiptelnotificationaddress");
                                    //OsiptelDireccionAlternativa = item.Contains("ust_alternativenotificationaddress") ? item["ust_alternativenotificationaddress"].ToString() : "";
                                    //DIRNOTIFRESOL1ERA = OsiptelDireccion != null ? OsiptelDireccion.Name.ToString() : OsiptelDireccionAlternativa;

                                    //FECPRESENAPELACQUEJA = item.Contains("ust_resolutiondate") ? item.GetAttributeValue<DateTime>("ust_resolutiondate").ToString("dd.mm.yyyy") : "";

                                    optionsetdeNotificacion = item.GetAttributeValue<OptionSetValue>("ust_notificationtypeosiptelclaim");
                                    FLANOTELUSU = optionsetdeNotificacion != null ? optionsetdeNotificacion.Value.ToString() : "";
                                    NUMDOCQUEJOSO = "";


                                    switch (FLANOTELUSU)
                                    {
                                        case ("864340000"):
                                            FLANOTELUSU = "1";
                                            break;
                                        case ("864340001"):
                                            FLANOTELUSU = "0";
                                            break;
                                        default:
                                            FLANOTELUSU = "";
                                            break;
                                    }
                                    CODQUEJOSO = "";
                                    APEQUEJOSO = "";
                                    NOMQUEJOSO = "";


                                    break;
                                case ("06-Queja OSIPTEL"):
                                    TipoCaso = "RA";
                                    categoria1 = item.GetAttributeValue<EntityReference>("ust_category1");
                                    codSubReclamo = categoria1 != null ? categoria1.Name.Substring(0, 4) : "";
                                    DESSUMILLARECLAMO = categoria1 != null ? categoria1.Name : "";
                                    NUMRECLAMOEO = item.Contains("ust_osiptelgrievanceid") ? item["ust_osiptelgrievanceid"].ToString() : "";
                                    FECPRESRECLAMO = item.Contains("ust_registrationdateclaim") ? item.GetAttributeValue<DateTime>("ust_registrationdateclaim").ToString("dd.mm.yyyy") : "";
                                    FECRESOL1ERA = item.Contains("ust_resolutiondate") ? item.GetAttributeValue<DateTime>("ust_resolutiondate").ToString("dd.mm.yyyy") : "";

                                    OptionSetCODSENTRESOL1ERA = item.GetAttributeValue<OptionSetValue>("ust_resultgrievanceosiptel");
                                    CODSENTRESOL1ERA = OptionSetCODSENTRESOL1ERA != null ? OptionSetCODSENTRESOL1ERA.Value.ToString() : "";

                                    //OsiptelDireccion = item.GetAttributeValue<EntityReference>("ust_osiptelnotificationaddress");
                                    //OsiptelDireccionAlternativa = item.Contains("ust_alternativenotificationaddress") ? item["ust_alternativenotificationaddress"].ToString() : "";
                                    //DIRNOTIFRESOL1ERA = OsiptelDireccion != null ? OsiptelDireccion.Name.ToString() : OsiptelDireccionAlternativa;

                                    FLANOTELUSU = "";
                                    NUMDOCQUEJOSO = item.Contains("ust_grievancecontactdocumentnumber") ? item["ust_grievancecontactdocumentnumber"].ToString() : "";

                                    optionsetCodQuejoso = item.GetAttributeValue<OptionSetValue>("ust_grievancecontactdocumenttype");
                                    CODQUEJOSO = optionsetCodQuejoso != null ? optionsetCodQuejoso.Value.ToString() : "";

                                    switch (CODQUEJOSO)
                                    {
                                        case ("250000000"):
                                            CODQUEJOSO = "1";
                                            break;
                                        case ("250000001"):
                                            CODQUEJOSO = "4";
                                            break;
                                        case ("250000002"):
                                            CODQUEJOSO = "6";
                                            break;
                                        default:
                                            CODQUEJOSO = "5";
                                            break;
                                    }

                                    APEQUEJOSO = item.Contains("ust_grievancecontactlastname") ? item["ust_grievancecontactlastname"].ToString() : "";

                                    NOMQUEJOSO = item.Contains("ust_grievancecontactname") ? item["ust_grievancecontactname"].ToString() : "";


                                    break;
                                default:
                                    TipoCaso = "";
                                    codSubReclamo = "";
                                    DESSUMILLARECLAMO = "";
                                    NUMRECLAMOEO = "";
                                    FECPRESRECLAMO = "";
                                    FECRESOL1ERA = "";
                                    CODSENTRESOL1ERA = "";
                                    FLANOTELUSU = "";
                                    NUMDOCQUEJOSO = "";
                                    CODQUEJOSO = "";
                                    APEQUEJOSO = "";
                                    NOMQUEJOSO = "";

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
                        obj.CODSUBCRECLAMO = codSubReclamo != null ? codSubReclamo.ToString() : "";
                        obj.NUMRECIBORECLAMO = "";
                        obj.FECRECIBORECLAMO = "";
                        obj.FECVENCRECIBRECLAMO = "";

                        var start = item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() != null && item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() != "1/1/0001 12:00:00 AM" ? item.GetAttributeValue<DateTime>("ust_serviceissuestartdate").ToString() : "";
                        var end = item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() != null && item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() != "1/1/0001 12:00:00 AM" ? item.GetAttributeValue<DateTime>("ust_serviceissueenddate").ToString() : "";

                        obj.DESPERIODRECLAMO = start.ToString() != null && end.ToString() != null ? "Fecha Inicio Averia: " + start.ToString() + "-\n" + "Fecha Fin Averia: " + end.ToString() : "";
                        obj.MONRECLAMO = "";
                        obj.CODMONEDARECLAMO = "";
                        obj.DESSUMILLARECLAMO = DESSUMILLARECLAMO != null ? DESSUMILLARECLAMO : "";
                        obj.CODMEDIOPROBATORIO = "";
                        obj.FECEJECRESOLTRASU = "";
                        obj.NUMREPORTEEO = "";
                        obj.FECREPORTEEO = "";

                        obj.NUMRECLAMOEO = NUMRECLAMOEO != null ? NUMRECLAMOEO : "";
                        obj.FECPRESRECLAMO = FECPRESRECLAMO;
                        obj.CODMEDIORECLAMO = "";
                        obj.NUMRESOL1ERA = "";
                        obj.FECRESOL1ERA = FECRESOL1ERA;
                        obj.CODSENTRESOL1ERA = CODSENTRESOL1ERA;

                        var fechaNotificacion = item.Contains("ust_dateofnotification") ? item.GetAttributeValue<DateTime>("ust_dateofnotification").ToString("dd.mm.yyyy") : "";
                        obj.FECNOTIFRESOL1ERA = fechaNotificacion != null ? fechaNotificacion.ToString() : "";
                        obj.DIRNOTIFRESOL1ERA = DIRNOTIFRESOL1ERA;
                        obj.FECRECURSORECON1ERA = "";
                        obj.CODMEDIORECON1ERA = "";
                        obj.NUMRESOLRECON1ERA = "";
                        obj.FECRESOLRECON1ERA = "";
                        obj.CODSENTRECON1ERA = "";
                        obj.FECNOTIFRESOLREC1ERA = "";
                        obj.DIRNOTIFRESOLREC1ERA = "";
                        //obj.FECPRESENAPELACQUEJA = "PENDIENTE ";
                        // obj.DIRQUEJOSO = "";
                       NombreCliente = item.GetAttributeValue<EntityReference>("customerid");
                       var NombreCliente1 = NombreCliente != null ? NombreCliente.Name.ToString() : "";
                        obj.NOMABONADO = NombreCliente1 ;
                        obj.APEABONADO = "";
                        obj.CODDOCABONADO = ""; 
                        obj.NUMDOCABONADO = "";
                        obj.DIRABONADO = "NR";
                        obj.NOMRECLAMANTE = "";
                        // Apellido Paterno + Apellido Materno de la entidad Contacto. 
                        obj.APERECLAMANTE = "";
                        obj.CODDOCRECLAMANTE = "";
                        obj.NUMDOCRECLAMANTE = "";
                        obj.DIRRECLAMANTE = "";
                        obj.NOMAPELANTE = item.Contains("ust_appealcontactname") ? item["ust_appealcontactname"].ToString() : "";
                        obj.APEAPELANTE = item.Contains("ust_appealcontactlastname") ? item["ust_appealcontactlastname"].ToString() : "";
                        obj.CODDOCAPELANTE = item.Contains("ust_appealcontactdocumenttype") ? item["ust_appealcontactdocumenttype"].ToString() : "";
                        obj.NUMDOCAPELANTE = item.Contains("ust_appealcontactdocumentnumber") ? item["ust_appealcontactdocumentnumber"].ToString() : "";
                        obj.DIRAPELANTE = "";
                        obj.NOMQUEJOSO = NOMQUEJOSO != null ? NOMQUEJOSO : "";
                        obj.APEQUEJOSO = APEQUEJOSO != null ? APEQUEJOSO : "";
                        obj.CODQUEJOSO = CODQUEJOSO != null ? CODQUEJOSO : "";
                        obj.NUMDOCQUEJOSO = NUMDOCQUEJOSO != null ? NUMDOCQUEJOSO : "";
                        obj.DIRQUEJOSO = "";
                        obj.DIRPROCESAL = "NR";
                        //obj. = "NR";
                        //obj. = "NR";

                        //obj.CODUBIGEODPROC = "";
                        obj.FLANOTELUSU = FLANOTELUSU != null ? FLANOTELUSU : "";

                        //quejas asociadas a reclamo, obtener el valor del reclamo. Si no está asociada, envía vacío. 
                        obj.EMAILNOTUSUARIO = item.Contains("ust_osiptelnotificationemail") ? item["ust_osiptelnotificationemail"].ToString() : "";
                        obj.NUMTELFUSUARIO = "NR";
                        obj.DIRALTUSUARIO = "NR";
                        obj.EMAILNOTEO = columna_EMAILNOTEO;

                        ////Update Case Statuscode record.

                        SetStateRequest state = new SetStateRequest();

                        int value = 864340005;

                        state.State = new OptionSetValue(0);
                        state.Status = new OptionSetValue(value);
                        state.EntityMoniker = new EntityReference("incident", item.Id);
                        service.Execute(state);

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