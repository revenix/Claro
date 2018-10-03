using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Activities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System.ServiceModel;

namespace UstClaro_WorkFlows
{

    public sealed class UstCreateCaseRetention : CodeActivity
    {
        #region Input parameters

        [Input("Put Case Type")]
        [ReferenceTarget("amxperu_casetype")]
        public InArgument<EntityReference> CaseType { get; set; }

        //[Input("Put Case Type Code")]
        //public InArgument<string> CaseTypeCode { get; set; } 

        [Input("Put Category 1")]
        [ReferenceTarget("amxperu_casecategory")]
        public InArgument<EntityReference> Category1 { get; set; } 

        [Input("Put Category 2")]
        [ReferenceTarget("amxperu_casesubcategory")]
        public InArgument<EntityReference> Category2 { get; set; }

        //[Input("Put Category 3")]
        //[ReferenceTarget("")]
        //public InArgument<EntityReference> Category3 { get; set; }

        //[Input("Put Category 4")]
        //[ReferenceTarget("")]
        //public InArgument<EntityReference> Category4 { get; set; }

        //[Input("Put Category 5")]
        //[ReferenceTarget("")]
        //public InArgument<EntityReference> Category5 { get; set; } 

        [Input("Put Origin User")]
        [ReferenceTarget("systemuser")]
        public InArgument<EntityReference> OriginUser { get; set; } 

        [Input("Put Origin Point of Sales")]
        [ReferenceTarget("amxperu_pointofsales")]
        public InArgument<EntityReference> OriginPDV { get; set; }

        [Input("Put Origin Region")]
        [ReferenceTarget("amxperu_region")]
        public InArgument<EntityReference> OriginRegion { get; set; } 

        [Input("Put Origin Channel")]
        [AttributeTarget("incident", "amxperu_originchannel")]
        public InArgument<OptionSetValue> OriginChannel { get; set; }

        [Input("Put Status Code")]
        [AttributeTarget("incident", "statuscode")]
        public InArgument<OptionSetValue> StatusCode { get; set; } //Pendiente

        [Input("Put Customer")]
        [ReferenceTarget("contact")]
        public InArgument<EntityReference> Customer { get; set; }

        //[Input("Put Customer Name")]
        //public InArgument<string> CustomerName { get; set; }

        //[Input("Put Document Type")]
        //public InArgument<string> DocumentType { get; set; }

        //[Input("Put Document Number")]
        //public InArgument<string> DocumentNumber { get; set; }

        //[Input("Put Customer Id")]
        //public InArgument<string> CustomerId { get; set; }

        //[Input("Put Customer Type")]
        //public InArgument<string> CustomerType { get; set; }

        [Input("Put Case Title")]
        public InArgument<String> CaseTitle { get; set; }

        [Input("Put Contract")]
        [ReferenceTarget("contract")]
        public InArgument<EntityReference> Contract { get; set; }

        [Input("Is Reincident case?")]
        public InArgument<Boolean> ReincidentCase { get; set; }

        [Input("Put Associated Case")]
        [ReferenceTarget("incident")]
        public InArgument<EntityReference> AssociatedCase { get; set; }

        [Input("Put TransactionType")]
        [AttributeTarget("incident", "ust_transactiontypecode")]
        public InArgument<OptionSetValue> TransactionType { get; set; } 


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
            Guid idWorkFlowInstance = executionContext.WorkflowInstanceId;
            Boolean isError = false;

            try
            {
                // GUID of target record (case)
                Guid gCaseId = context.PrimaryEntityId;
                Guid gNewCaseId = Guid.Empty;

                //Obtenemos los valores de los parámetros del caso.
                //string strCaseTypeCode = CaseTypeCode.Get<string>(executionContext);
                EntityReference erCaseType = CaseType.Get<EntityReference>(executionContext);
                EntityReference erCategory1 = Category1.Get<EntityReference>(executionContext);
                EntityReference erCategory2 = Category2.Get<EntityReference>(executionContext);
                EntityReference erOriginUser = OriginUser.Get<EntityReference>(executionContext);
                EntityReference erOriginPDV = OriginPDV.Get<EntityReference>(executionContext);
                EntityReference erOriginRegion = OriginRegion.Get<EntityReference>(executionContext);
                OptionSetValue oOriginChannel = OriginChannel.Get<OptionSetValue>(executionContext);
                OptionSetValue oStatusCode = StatusCode.Get<OptionSetValue>(executionContext);
                EntityReference erCustomer = Customer.Get<EntityReference>(executionContext);
                string strTitle = CaseTitle.Get<string>(executionContext);
                EntityReference erContract = Contract.Get<EntityReference>(executionContext);
                Boolean? isReincidentCase = ReincidentCase.Get<Boolean>(executionContext);
                EntityReference erAssociatedCase = AssociatedCase.Get<EntityReference>(executionContext);
                OptionSetValue oTransactionType = TransactionType.Get<OptionSetValue>(executionContext);

                Entity eCase = new Entity("incident");

                if (erCaseType != null)
                    eCase.Attributes["amxperu_casetype"] = erCaseType;

                if (erCategory1 != null)
                    eCase.Attributes["ust_category1"] = erCategory1;

                if (erCategory2 != null)
                    eCase.Attributes["ust_category2"] = erCategory2;

                //if (erOriginUser != null)
                //    eCase.Attributes["ownerid"] = erOriginUser;

                if (erOriginPDV != null)
                    eCase.Attributes["amxperu_originpdv"] = erOriginPDV;

                if (erOriginRegion != null)
                    eCase.Attributes["amxperu_originregion"] = erOriginRegion;

                if (oOriginChannel != null)
                    eCase.Attributes["amxperu_originchannel"] = oOriginChannel;

                if (oStatusCode != null)
                    eCase.Attributes["statuscode"] = oStatusCode;

                if (erCustomer != null)
                    eCase.Attributes["customerid"] = erCustomer;

                if (!string.IsNullOrEmpty(strTitle))
                    eCase.Attributes["title"] = strTitle;

                if (erContract != null)
                    eCase.Attributes["contractid"] = erContract;

                //if (isReincidentCase != null)
                //    eCase.Attributes["amxperu_reincidentcase"] = isReincidentCase;

                if (erAssociatedCase != null)
                    eCase.Attributes["ust_associatedcase1"] = erAssociatedCase;

                if (oTransactionType != null)
                    eCase.Attributes["ust_transactiontype"] = oTransactionType;

                if (eCase.Attributes.Count > 0)
                {
                    gNewCaseId = service.Create(eCase);

                    //if (gNewCaseId != Guid.Empty)
                    //{
                    //    //Entity incident = new Entity("incident");
                    //    //incident.Id = gCaseId;
                    //    //incident["ust_isretentioncreated"] = true;
                    //    //service.Update
                    //}
                }
            }
            catch (FaultException<IOrganizationService> ex)
            {
                isError = true;
                throw new FaultException("IOrganizationServiceExcepcion: " + ex.Message);
            }
            catch (FaultException ex)
            {
                isError = true;
                throw new FaultException("FaultException: " + ex.Message);
            }
            catch (InvalidWorkflowException ex)
            {
                isError = true;
                throw new InvalidWorkflowException("InvalidWorkflowException: " + ex.Message);
            }
            catch (Exception ex)
            {
                isError = true;
                throw new Exception(ex.Message);
            }
            finally
            {
                if (isError)
                {
                    //Entity workflowToCancel = new Entity("asyncoperation");
                    //workflowToCancel.Id = idWorkFlowInstance;
                    //workflowToCancel["statecode"] = new OptionSetValue(3);
                    //workflowToCancel["statuscode"] = new OptionSetValue(32);
                    //service.Update(workflowToCancel);
                }
            }
        }
    }
}
