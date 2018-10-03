using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using UstClaro_WorkFlows;
using UstClaro_Case.Utilities;

namespace UstClaro_WorkFlows
{
    /// Creador : FastCloudy
    /// Fecha: 07/08/2018
    /// Jira: 3196
    /// /// 
    /// Function : Automatizar cancelación pendientes de OST
    /// Trigger  : 
    /// REQ.    : -
    /// Entity : Incident
    /// </summary>
    public sealed class OSTsCancelPend : CodeActivity
    {
        DateTime createdOn = DateTime.Now;
        DateTime fechaUtil = DateTime.Now;
        string stageId = null;
        string stageName = string.Empty;
        int plazo = 0;
        DateTime fechaActual = DateTime.Now;
        DateTime nextexecutiondate = DateTime.Now;
        string inputparameters = string.Empty;

        protected override void Execute(CodeActivityContext executionContext)
        {

            //Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            //Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            try
            {

                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {
                    Entity entity = (Entity)context.InputParameters["Target"];
                    if (entity.LogicalName != "amxperu_scheduledjob") return;
                    if (entity == null) return;

                    //Local Variables                  

                    Entity scheduledEntity = service.Retrieve("amxperu_scheduledjob", entity.Id, new ColumnSet("amxperu_name", "amxperu_tracelogs", "amxperu_numbers", "amxperu_nextexecutiondate", "amxperu_executiondate", "amxperu_inputparameters", "amxperu_measurementunit"));

                    OptionSetValue _measurementUnit = (scheduledEntity.Contains("amxperu_measurementunit")) ? (OptionSetValue)scheduledEntity.Attributes["amxperu_measurementunit"] : new OptionSetValue();
                    DateTime _lastExecutionDate = (scheduledEntity.Contains("amxperu_executiondate")) ? (DateTime)scheduledEntity.Attributes["amxperu_executiondate"] : DateTime.Now.AddDays(1);
                    DateTime _nextExecuionDate = (scheduledEntity.Contains("amxperu_nextexecutiondate")) ? (DateTime)scheduledEntity.Attributes["amxperu_nextexecutiondate"] : DateTime.Now.AddDays(1);
                    string uniqueJobName = (scheduledEntity.Contains("amxperu_name")) ? (string)scheduledEntity.Attributes["amxperu_name"] : string.Empty;
                    string _traceLogs = (scheduledEntity.Contains("amxperu_tracelogs")) ? (string)scheduledEntity.Attributes["amxperu_tracelogs"] : string.Empty;
                    string _inputParameters = (scheduledEntity.Contains("amxperu_inputparameters")) ? (string)scheduledEntity.Attributes["amxperu_inputparameters"] : string.Empty;
                    int _durationNumber = (scheduledEntity.Contains("amxperu_numbers")) ? (int)scheduledEntity.Attributes["amxperu_numbers"] : 1000;


                    if (scheduledEntity.Attributes.Contains("amxperu_nextexecutiondate") && scheduledEntity.Attributes["amxperu_nextexecutiondate"] != null)
                    {
                        nextexecutiondate = (DateTime)scheduledEntity.Attributes["amxperu_nextexecutiondate"];
                        tracingService.Trace("nextexecutiondate :" + nextexecutiondate);
                    }

                    if (scheduledEntity.Attributes.Contains("amxperu_inputparameters") && scheduledEntity["amxperu_inputparameters"] != null)
                    {
                        inputparameters = scheduledEntity.Attributes["amxperu_inputparameters"].ToString();
                        tracingService.Trace("inputparameters :" + inputparameters);
                    }

                    _traceLogs += _nextExecuionDate.ToString("dd-MM-yyyy hh:mm:ss-tt") + " - Executed\n";
                    _traceLogs += "Current Depth - " + context.Depth.ToString() + " \n";

                    switch (uniqueJobName)
                    {
                        case "CancelPending":
                            DisableXDayLogOutUsers _CancelPending = new DisableXDayLogOutUsers();
                            _traceLogs += _CancelPending.cancelationAutomatic(service, uniqueJobName, _inputParameters);
                            break;


                        default:
                            _traceLogs += "Job unique name not found.\n";
                            break;
                    }
                    _traceLogs += _nextExecuionDate.ToString("dd-MM-yyyy hh:mm:ss- tt") + " - Finished Successfully\n\n";
                    //if (inputparameters != "")
                    //{


                }


                //throw new InvalidPluginExecutionException("Mensaje de error. ");
                //}
            }

            catch (System.Exception exce)
            {
                throw new Exception(exce.Message);
            }
        }

        private void SetNextExecution(IOrganizationService service, Entity entity, DateTime executionDate, DateTime nextExecutionDate, string traceLogs)
        {
            Entity updateEntity = new Entity(entity.LogicalName);
            updateEntity.Id = entity.Id;
            updateEntity["amxperu_executiondate"] = executionDate;
            updateEntity["amxperu_nextexecutiondate"] = nextExecutionDate;
            if (traceLogs.Length > 20000)
                updateEntity["amxperu_tracelogs"] = traceLogs.Substring(traceLogs.Length - 20000, 20000);
            else
                updateEntity["amxperu_tracelogs"] = traceLogs;
            service.Update(updateEntity);
        }

        public class DisableXDayLogOutUsers
        {
            DateTime createdOn = DateTime.Now;
            DateTime fechaUtil = DateTime.Now;
            string stageId = null;
            string stageName = string.Empty;
            int plazo = 0;
            DateTime fechaActual = DateTime.Now;
            DateTime nextexecutiondate = DateTime.Now;
            string inputparameters = string.Empty;


            public string cancelationAutomatic(IOrganizationService service, string uniqueJobName, string _inputParameters)
            {
                string _traceLogs = string.Empty;
                var fetchOST = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                     "<entity name='ust_ostpresential'>" +
                                     "<attribute name='createdon' />" +
                                     "<attribute name='ust_deviceimei' />" +
                                     "<attribute name='statuscode' />" +
                                     "<attribute name='ust_deviceowner' />" +
                                     "<attribute name='ust_imeisearch' />" +
                                     "<attribute name='ownerid' />" +
                                     "<attribute name='ust_name' />" +
                                     "<attribute name='ust_ostpresentialid' />" +
                                     "<attribute name = 'statecode' /> " +
                                     "<attribute name='stageid' />" +
                                     "<attribute name='ust_reasonid' />" +
                                     "<attribute name='ust_cancelreason' />" +
                                     "<order attribute='ust_deviceimei' descending='false' />" +
                                     "<filter type='and'>" +
                                     "<condition attribute='statuscode' value ='864340000' operator= 'eq' />" +
                                     "</filter>" +
                                     "</entity>" +
                                     "</fetch>";

                EntityCollection resultOST = service.RetrieveMultiple(new FetchExpression(fetchOST));

                for (int j = 1; j < resultOST.Entities.Count; j++)
                {
                    if (resultOST[j].Attributes.Contains("createdon") && resultOST[j]["createdon"] != null)
                    {
                        createdOn = (DateTime)resultOST[j].Attributes["createdon"];
                        DateTime fechaexec = createdOn;
                        int diaE = fechaexec.Day;
                        int mesE = fechaexec.Month;
                        int anioE = fechaexec.Year;

                        plazo = Convert.ToInt32(inputparameters);

                        for (int i = 1; i < plazo; i++)
                        {
                            if (createdOn.DayOfWeek == DayOfWeek.Sunday || createdOn.DayOfWeek == DayOfWeek.Saturday) plazo = plazo + 1;
                            createdOn = createdOn.AddDays(1);
                            //tracingService.Trace("createdOn2 :" + createdOn);
                        }

                        fechaUtil = createdOn.AddDays(1);
                        //tracingService.Trace("fechaUtil :" + fechaUtil);
                    }
                    if (resultOST[j].Attributes.Contains("stageid") && resultOST[j]["stageid"] != null)
                    {
                        stageId = resultOST[j].Attributes["stageid"].ToString();
                        //tracingService.Trace("stageId :" + stageId);
                    }

                    string PhaseNameEN = Util.GetCrmConfiguration(service, "NameFaseCreation");
                    stageName = Util.GetProcessStageName(service, new Guid(stageId));

                    if ("Creation" == PhaseNameEN) //stageName
                    {
                        //y su registro se almacena con un motivo de “Cancelación Automática por Tiempo sin actualización”.
                        fechaActual = DateTime.Now;
                        //tracingService.Trace("fechaActual:" + fechaActual);
                        //tracingService.Trace("resultOST:" + resultOST[0].Id);
                        if (createdOn < fechaActual)
                        {
                            Entity obj = new Entity("ust_ostpresential");
                            obj.Id = resultOST[j].Id;
                            //obj["statuscode"] = new OptionSetValue(864340018); //Cancelar  
                            obj["ust_cancelreason"] = new OptionSetValue(100000000); //Automatic cancelation for time without update   
                            service.Update(obj);

                            EntityReference moniker = new EntityReference();
                            moniker.LogicalName = "ust_ostpresential";
                            moniker.Id = resultOST[j].Id;

                            OrganizationRequest orgrequest = new OrganizationRequest() { RequestName = "SetState" };
                            orgrequest["EntityMoniker"] = moniker;

                            OptionSetValue state = new OptionSetValue(1);
                            OptionSetValue status = new OptionSetValue(864340018);

                            orgrequest["State"] = state;
                            orgrequest["Status"] = status;

                            service.Execute(orgrequest);
                        }
                    }

                }
                return _traceLogs;
            }
        }
    }

    }