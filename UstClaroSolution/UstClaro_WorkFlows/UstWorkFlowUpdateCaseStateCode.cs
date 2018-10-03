using System;
using System.Activities;
using System.Collections.ObjectModel;

using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;


namespace UstClaro_Case
{
    /// <summary>
    /// Creador : EEA / WQ 
    /// Creación: 18/06
    /// Actualización: -
    /// Función : Update case statecode according stageNames in Claim OSIPTEL
    /// Req.    : 4.2.3	Reclamos OSIPTEL – Estados
    /// Entidad : Case / Incident
    /// </summary>
    public sealed class UstWorkFlowUpdateCaseStateCode : CodeActivity
    {
        // Defina un argumento de entrada de actividad de tipo string
        public InArgument<string> Text { get; set; }

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

            

            
        }
    }
}
