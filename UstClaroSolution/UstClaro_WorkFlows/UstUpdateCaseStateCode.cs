using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Activities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;

namespace UstClaro_WorkFlows
{
    public sealed class UstUpdateCaseStateCode : CodeActivity
    {
        #region Input parameters
        [Input("Put the Phase Name")]
        [ReferenceTarget("incident")]
        public InArgument<string> PhaseName { get; set; }  //Fase o Etapa del Proceso de Negocio

        [Input("Put the Response Document")]
        [ReferenceTarget("incident")]
        public InArgument<bool> ResponseDocument { get; set; } //Documento de Respuesta

        [Input("Put the Letter Set Courier")]
        [ReferenceTarget("incident")]
        public InArgument<bool> CourierLetterSent { get; set; }//Carta de Envio al Courier

        [Input("Put the Sent Email Customer")]
        [ReferenceTarget("incident")]
        public InArgument<bool> CustomerEMailSent { get; set; } //Envio de Email al cliente

        [Input("Put the Sent Received Letter")]
        [ReferenceTarget("incident")]
        public InArgument<bool> LetterWasReceived { get; set; } //Notificado en fisiso(carta)

        [Input("Put the Sent Received Email")]
        [ReferenceTarget("incident")]
        public InArgument<bool> EMailWasReceived { get; set; } ///Notificado en email

        [Input("Put the Sent Generated File")]
        [ReferenceTarget("incident")]
        public InArgument<bool> TrasuFileGenerated { get; set; } //Se genera archivo

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

            // GUID of target record (case)
            Guid gCaseId = context.PrimaryEntityId;

            //Create the statecode vars
            int iStatusCode = 0;
            int iStateCode = 0;

            //Obtenemos los valores de los parámetros del caso.
            string strPhaseName = PhaseName.Get<string>(executionContext);
            bool isResponseDocument = ResponseDocument.Get<bool>(executionContext);
            bool isCourierLetterSent = CourierLetterSent.Get<bool>(executionContext);
            bool isCustomerEMailSent = CustomerEMailSent.Get<bool>(executionContext);
            bool isLetterWasReceived = LetterWasReceived.Get<bool>(executionContext);
            bool isEMailWasReceived = EMailWasReceived.Get<bool>(executionContext);
            bool isTrasuFileGenerated = TrasuFileGenerated.Get<bool>(executionContext);


            //4.2.3	Reclamos OSIPTEL – Estados:

            //1. BORRADOR, todos los casos inician con este statecode = 864340007

            //2. PENDIENTE, después de haber pasado por: Identificación, Documentación, Investigación = 864340008
            //Validamos que el caso haya pasado correctamente por los estados mencionados arriba. 

            if (strPhaseName == "Identificacion" || strPhaseName == "Identity")
            {
                iStatusCode = (int)StatusCode.Pending;
                iStateCode = (int)StateCode.Active;
            }
            else if (strPhaseName == "Documentacion" || strPhaseName == "Documents")
            {
                iStatusCode = (int)StatusCode.Pending;
                iStateCode = (int)StateCode.Active;
            }
            else if (strPhaseName == "Investigacion" || strPhaseName == "Research")
            {
                iStatusCode = (int)StatusCode.Pending;
                iStateCode = (int)StateCode.Active;
            }

            //3. CON RESOLUCIÓN,después de que el documento de respuesta es generado en la etapa "Notificar Cliente" = 864340001
            if (isResponseDocument)
            {
                if (strPhaseName == "Notificar Cliente" || strPhaseName == "Notify Customer")
                {
                    if (isResponseDocument == true)
                    {
                        iStatusCode = (int)StatusCode.WithResolution;
                        iStateCode = (int)StateCode.Active;
                    }
                }

            }

            //4. EN NOTIFICACIÓN, Caso de Reclamo OSIPTEL con Estado actualizado a “En Notificación” después de recibir la confirmación del sistema
            //   externo de que la carta se envió al courier o el email se envió al cliente = 864340002
            else if (isCourierLetterSent || isCustomerEMailSent)
            {
                if (isCourierLetterSent == true)
                {
                    iStatusCode = (int)StatusCode.InNotification;
                    iStateCode = (int)StateCode.Active;
                }

                else if (isCustomerEMailSent == true)
                {
                    iStatusCode = (int)StatusCode.InNotification;
                    iStateCode = (int)StateCode.Active;
                }
            }

            //5. NOTIFICADO, Caso de Reclamo OSIPTEL con estado actualizado a “Notificado” después de la confirmación del sistema externo
            //   sobre el envío de la notificación vía email o en físico por el Courier.  = 864340003
            //To get this answer we need consume a web service to know if email or letter was received to their destiny.
            else if (isLetterWasReceived || isEMailWasReceived)
            {
                if (isLetterWasReceived == true)
                {
                    iStatusCode = (int)StatusCode.Notified;
                    iStateCode = (int)StateCode.Active;
                }

                else if (isEMailWasReceived == true)
                {
                    iStatusCode = (int)StatusCode.Notified;
                    iStateCode = (int)StateCode.Active;
                }
              }

            //6. POR ELEVAR, Caso de Reclamo OSIPTEL se actualiza con el estado “Por Elevar ” cuando el caso es avanzado a la etapa “Notificar TRASU” 
            //   Esto significa que el cliente apeló y la oferta SARA fue rechazada / imposible  = 864340004
            else if (strPhaseName == "Notificar TRASU" || strPhaseName == "Notify TRASU")
            {
                iStatusCode = (int)StatusCode.ToElevate;
                iStateCode = (int)StateCode.Active;
            }

            //7. ELEVADO, Caso de Reclamo OSIPTEL es actualizado con estado “Elevado” cuando se genera el archivo de informe a TRASU = 864340005
            else if (isTrasuFileGenerated)
            {
                if (isTrasuFileGenerated == true)
                    iStatusCode = (int)StatusCode.Elevated;
                    iStateCode = (int)StateCode.Active;
            }

            //8. RESUELTO, Caso de Reclamo OSIPTEL es actualizado con estado “Resuelto” después de que es concluido automáticamente   = 864340009
            //Esto se guarda automáticamente.

            //Procedemos a actualizar el statuscode del caso.
            UpdateStatusCode(gCaseId, iStatusCode, iStateCode, service);

        }

        private void UpdateStatusCode(Guid gCaseId, int iStatuCode, int iStateCode, IOrganizationService _service)
        {
            if (iStatuCode == 0 || iStateCode == 0)
                return;

            if (_service != null)
            {
                //Update of statecode and statuscode of Case entity
                Entity obj = new Entity("incident");
                obj.Id = gCaseId;
                //obj["statecode"] = new OptionSetValue(iStateCode);
                obj["statuscode"] = new OptionSetValue(iStatuCode);
                obj["statecode"]= new OptionSetValue(iStateCode);
                _service.Update(obj);
            }
            else
                throw new WorkflowApplicationException("UST-WorkFlow StatusCode updating cannot complete. Please contact with the CRM Administrator.");
        }


        private enum StatusCode : int
        {
            Draft = 864340007 //Borrador
            , Pending = 864340008  //Pendiente
            , WithResolution = 864340001 //ConResolucion
            , InNotification = 864340002 //En notificacion
            , Notified = 864340003 //Notificado
            , ToElevate = 864340004 //Por elevar
            , Elevated = 864340005 //Elevado
            , Resolved = 864340009 //Resuelto

        }

        private enum StateCode : int
        {
              Active = 0 //Abierto
            , Resolved = 1  //Completado
              
        }
    }
}
