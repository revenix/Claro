// =================================================
// Global variables
var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READ = 3;

// =================================================

if (typeof (Ust_Task) == "undefined")
{ Ust_Task = {}; }

Ust_Task.Funcion = {
    
    //=================================================================
    // Creator  : Edson Espinoza
    // Creation : 04/07/2018
    // Function : RN-CHQ-2-001
    // the user who creates the task must have the authority to determine If the Executed Transaction code field must be entered or not. 
    // In case it is not entered it should be marked as a non-mandatory option and enter the justification.
    //=================================================================
    fnc_ShowBILog: function () {
    
        var regardingObject = Xrm.Page.getAttribute("regardingobjectid").getValue();
        var entityType = regardingObject.getValue()[0].entityType;
        var objCustomer = null;
        if (entityType != "incident") {
            return;
        }

        var caseId = regardingObject.getValue()[0].id;

        XrmServiceToolkit.Rest.Retrieve(caseId, "IncidentSet", "CustomerId", null, function (result) {
            objCustomer = result.CustomerId;
        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        }, false);

        if (regardingObjectId != null)
        {
            var relatedBillingLog = Xrm.Page.getAttribute("amxperu_relatedbilogactivity").getValue();
            var availableDefaultViewId = Xrm.Page.getControl("ust_relatedsarcomplaintgrievance").getDefaultView();
            var viewId = "{00000000-0000-0000-0000-000000000000}";
            var entityName = "etel_bi_log";
            var viewDisplayName = "Associated bi log for " + objCustomer[0].name + "";

            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                            "<entity name='etel_bi_log'>" +
                            "<attribute name='etel_bi_logid' />" +
                            "<attribute name='subject' />" +
                            "<attribute name='etel_individualcustomerid' />" +
                            "<order attribute='subject' descending='false' />" +
                            "<filter type='and'>" +
                            "<condition attribute='etel_individualcustomerid' operator='eq' value='" + customerId + "' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

            var data = XrmServiceToolkit.Soap.Fetch(fetchXml);

            if (data.length > 0)
            {
                Xrm.Page.getControl("etel_customercontactid").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
            }
            else
            {
                fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                            "<entity name='etel_bi_log'>" +
                            "<attribute name='etel_bi_logid' />" +
                            "<attribute name='subject' />" +
                            "<attribute name='etel_individualcustomerid' />" +
                            "<order attribute='subject' descending='false' />" +
                            "<filter type='and'>" +
                            "<condition attribute='etel_individualcustomerid' operator='eq' value='" + viewId + "' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";
            }

            //// build Grid Layout 
            var layoutXml = "<grid name='resultset' object='1' jump='etel_bi_logid' select='1' icon='0' preview='1'>" +
                            "<row name='result' id='etel_bi_logid'>" +
                            "<cell name='subject' width='330' />" +
                            "<cell name='etel_individualcustomerid' width='200' />" +
                            "</row>" +
                            "</grid>";

            // add the Custom View to the primary contact lookup control  ust_relatedsarcomplaintgrievance          
            Xrm.Page.getControl("ust_relatedsarcomplaintgrievance").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

        }
    }

}