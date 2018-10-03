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

namespace UstClaro_WorkFlows
{
    ///  /// <summary>
    /// Creador : William Quiroz  
    /// Actualización: 08/07/2018
    /// Función : Automatically Update OSIPTEL Complaint Phase from.
    /// Evento  : 
    /// Req.    : AMXPEASIS-3091
    /// Entidad : case
    /// </summary>
    ///

    public sealed class Ust_UpdateCasePrimeraInstancia : CodeActivity
    {
        #region Input parameters
        [Input("Put the Phase Name")]
        [ReferenceTarget("incident")]
        public InArgument<string> ComplaintPhaseName { get; set; }  //Complaint Phase

        [Input("Put Case Type")]
        [ReferenceTarget("amxperu_casetype")]
        public InArgument<EntityReference> CaseType { get; set; }


        #endregion

        // Si la actividad devuelve un valor, se debe derivar de CodeActivity<TResult>
        // y devolver el valor desde el método Execute.
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

                EntityReference erCaseType = CaseType.Get<EntityReference>(executionContext);

                // Obtain la entidad con los cambios
                if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                {

                    // GUID of target record (case)
                    Guid gCaseId = context.PrimaryEntityId;
                    string typeCase = erCaseType.Name;
                    string CaseType = "";

                    if (erCaseType != null)
                        typeCase = erCaseType.Name;

                    //Create the phase vars
                    int comPhaseCod = 0;

                    Entity entity = (Entity)context.InputParameters["Target"];
                    if (entity.LogicalName != "incident") return;
                    if (entity == null) return;

                    Entity dataCase = service.Retrieve("incident", entity.Id, new ColumnSet("amxperu_casetype", "ust_complaintphase"));

                    EntityReference erTipoCaso = null;

                    if (dataCase.Attributes.Contains("amxperu_casetype") && dataCase.Attributes["amxperu_casetype"] != null)
                        erTipoCaso = ((EntityReference)dataCase.Attributes["amxperu_casetype"]);

                    if (dataCase.Attributes.Contains("ust_complaintphase") && dataCase.Attributes["ust_complaintphase"] != null)
                        //Get the SAR  response
                        comPhaseCod = ((OptionSetValue)dataCase.Attributes["ust_complaintphase"]).Value;

                    Entity caseType = service.Retrieve("amxperu_casetype", erTipoCaso.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("ust_code"));

                    if (caseType.Attributes.Contains("ust_code") && caseType.Attributes["ust_code"] != null)
                    {
                        //Get the Case Type Code
                        CaseType = caseType.Attributes["ust_code"].ToString();

                        if (CaseType == "004" && comPhaseCod == 864340000) //RECLAMO OSIPTEL
                        {
                            comPhaseCod = 864340001; //1st Instance                        
                        }

                        //Procedemos a actualizar el complaint phase.
                        UpdateStatusCode(gCaseId, comPhaseCod, service);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        private void UpdateStatusCode(Guid gCaseId, int comPhaseCod, IOrganizationService _service)
        {
            if (comPhaseCod == 0)
                return;

            if (_service != null)
            {
                //Update of statecode and statuscode of Case entity
                Entity obj = new Entity("incident");
                obj.Id = gCaseId;
                obj["ust_complaintphase"] = new OptionSetValue(comPhaseCod);
                _service.Update(obj);
            }
            else
                throw new WorkflowApplicationException("UST-WorkFlow StatusCode updating cannot complete. Please contact with the CRM Administrator.");
        }

    }
}
