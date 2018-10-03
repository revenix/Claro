// JavaScript source code
function getConfigValues(value) {
    var url;
    var fetchXml = "<fetch distinct='false'>" +
        "<entity name='etel_crmconfiguration'>" +
        "<attribute name='etel_crmconfigurationid' />" +
        "<attribute name='etel_name' />" +
        "<attribute name='etel_value' />" +

        "<order attribute='etel_name' descending='false'/>" +
        "<filter type='and'>" +
        "<condition attribute='etel_name' operator='eq' value='" + value + "' />" +
        "</filter>" +
        "</entity>" +
        "</fetch>";
    var retriveID = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (retriveID.length > 0) {

        if (retriveID != null || retriveID != "undefined") {
            url = retriveID[0].attributes.etel_value.value;
        }
    }
    return url;
}

function getCustomerExternalId(Customer) {
    var externalID;
    var cols = ["etel_externalid"];
    var retrievedContact = XrmServiceToolkit.Soap.Retrieve(Customer.entityType, Customer.id, cols);
    if (retrievedContact != null) {
        externalID = retrievedContact.attributes['etel_externalid'].value;
    }
    return externalID;
}


function CrearDisputa_INT_CHQ_2_010() {
    if (Xrm.Page.getAttribute("customerid").getValue() && Xrm.Page.getAttribute("customerid").getValue()[0]) {
        var externalid = getCustomerExternalId(Xrm.Page.getAttribute("customerid").getValue()[0]);
        var psbWorkflowUrl;
        var EntityID = Xrm.Page.data.entity.getId();
        var entityName = Xrm.Page.data.entity.getEntityName();
        var _ProblemID = "39271465"; //TO DO:
        var _PartyAccountID = "39275295"; //TO DO:
        var _BillingAmountUnit = "604"; //TO DO:
        var _BillingAmount = "100.89"; //TO DO:
        var _ServiceSpecTypeName = "MOVIL"; //TO DO:
        var _EntitySpecType = "REC"; //TO DO:
        var _EntitySpecID = "TRX-08021_002"; //TO DO:
        var _IntStartDate = "2016-01-15"; //TO DO:
        var _Description = "Reclamos"; //TO DO:
        var _BusinessIntTypeName = "I"; //TO DO:
        var _ReasonCode = "12"; //TO DO:


        psbWorkflowUrl = getConfigValues("PsbRestServiceUrl");
        var workflowServiceUrl = psbWorkflowUrl + 'AmxPeruTransaccionDisputas';
        var request = {
            "Input":
                {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruCrearDisputaRequestDTO, AmxPeruPSBActivities",
                    "CustomerID": "",
                    "ProblemID": this._ProblemID,
                    "PartyAccountID": this._PartyAccountID,
                    "BillingAmountUnit": this._BillingAmountUnit,
                    "BillingAmount": this._BillingAmount,
                    "ServiceSpecTypeName": this._ServiceSpecTypeName,
                    "EntitySpecType": this._EntitySpecType,
                    "EntitySpecID": this._EntitySpecID,
                    "IntStartDate": this._IntStartDate,
                    "Description": this._Description,
                    "BusinessIntTypeName": this._BusinessIntTypeName,
                    "ReasonCode": this._ReasonCode,
                    "Reson": ""
                }
        };
        $.ajax({
            type: "POST",
            url: workflowServiceUrl,
            dataType: "json",
            data: JSON.stringify(request),
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            xhrFields:
                {
                    withCredentials: true
                },
            crossDomain: true,
            success: function (data) {
                // debugger;
                if (data) {
                    //TO DO: aqui hacer lo que se requiera con la info
                }
            },
            error: function (data) {
                //clearInterval(myVar);
                debugger;
                alert(data.statusText);
            }
        });
    }
}

