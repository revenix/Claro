// =================================================
// Creator      : Cecilia Renteria
// Creation     : 13/07/2018
// Entity       : ust_ostpresential
// State        : In progress
// =================================================
// =================================================
// Global variables
var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READ = 3;
// =================================================
if (typeof (ust_ostpresential) == "undefined") {
    ust_ostpresential = {};
}
ust_ostpresential.Funcion = {
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 17/07/2018
    // JIRA		: 3215
    // Function : Consult and obtain contact details
    //=================================================================
    fnc_onLoad: function () {
        //debugger;

        var type = Xrm.Page.ui.getFormType();

        if (type !== CRM_FORM_TYPE_UPDATE) { //Create
            ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
            ust_ostpresential.Funcion.fnc_Setphase();
            ust_ostpresential.Funcion.fnc_onChangeConsultIMEI();
            //ust_ostpresential.Funcion.fnc_viewPreviousOST();

            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents	

            // ust_ostpresential.Funcion.fnc_onChangepreviousost();


        } else if (type == CRM_FORM_TYPE_UPDATE) { //Update
            ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
            ust_ostpresential.Funcion.fnc_Setphase();
            ust_ostpresential.Funcion.fnc_OnchangePhase();
            ust_ostpresential.Funcion.fnc_viewPreviousOST();
            //ust_ostpresential.Funcion.fnc_onChangeConsultIMEI();

        }

    },
    fnc_onSave: function () {
        ust_ostpresential.Funcion.fnc_viewPreviousOST();
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA	  : 3190
    // Function : Consult and obtain contact details
    // Descriptio: This sets contact fields when the contact look up gets selected from manual
    // 			 manual creation in OST
    //=================================================================
    fnc_onChangeConsultContact: function () {
        //  debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(null);
        Xrm.Page.getAttribute("ust_contactdocumenttype").setValue(null);
        Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(null);
        Xrm.Page.getAttribute("ust_contactfixednumber").setValue(null);
        Xrm.Page.getAttribute("ust_contactemail").setValue(null);
        var contactID = Xrm.Page.getAttribute("ust_contactnameid").getValue();
        if (contactID != null) {
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='fullname'/>" +
                "<attribute name='etel_passportnumber'/>" +
                "<attribute name='contactid'/>" +
                "<attribute name='amxperu_documenttype'/>" +
                "<attribute name='mobilephone'/>" +
                "<attribute name='telephone2'/>" +
                "<attribute name='emailaddress1'/>" +
                "<order descending='false' attribute='fullname'/>" +
                "<filter type='and'>" +
                "<condition attribute='contactid' value='" + contactID[0].id + "' uitype='contact' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";
            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                var documentnumber = fetchCode[0].attributes.etel_passportnumber; //Tipo String: .value
                var documenttype = fetchCode[0].attributes.amxperu_documenttype; //Tipo String: .value
                var mobilephone = fetchCode[0].attributes.mobilephone; //Tipo String: .value
                var telephone2 = fetchCode[0].attributes.telephone2; //Tipo String: .value
                var emailaddress1 = fetchCode[0].attributes.emailaddress1; //Tipo String: .value
                if (documentnumber != null) {
                    Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(documentnumber.value);
                }
                if (documenttype != null) {
                    // alert("Nombre del Doc type 1 : " + documenttype.value); //ust_contactfixednumber
                    //alert("Nombre del doc type 2 : " + documenttype.formattedValuevalue); //ust_contactfixednumber
                    Xrm.Page.getAttribute("ust_contactdocumenttype").setValue(documenttype.formattedValue);
                }
                if (mobilephone != null) {
                    Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(mobilephone.value); //ust_contactmobilenumber
                }
                if (telephone2 != null) {
                    Xrm.Page.getAttribute("ust_contactfixednumber").setValue(telephone2.value);
                    //  alert("Nombre del telephone2 : " + telephone2.value); //ust_contactfixednumber
                }
                if (emailaddress1 != null) {
                    Xrm.Page.getAttribute("ust_contactemail").setValue(emailaddress1.value); //ust_contactemail
                }
            }
            //ust_relationshipwithcustomer
        } else {
            Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(null);
            Xrm.Page.getAttribute("ust_contactdocumenttype").setValue(null);
            Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(null);
            Xrm.Page.getAttribute("ust_contactfixednumber").setValue(null);
            Xrm.Page.getAttribute("ust_contactemail").setValue(null);
            //Limpiar los campos.
        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA	  : 3189
    // Function : Consult and obtain IMEI details when an OST request is being created not from a  individual 360 view
    // Descriptio: This sets contact fields when the contact look up gets selected from manual
    // 			 manual creation in OST
    //=================================================================
    fnc_onChangeConsultIMEI: function () {
        // debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_deviceimei").setValue(null);
        Xrm.Page.getAttribute("ust_devicebrandost").setValue(null);
        Xrm.Page.getAttribute("ust_devicemodelost").setValue(null);
        Xrm.Page.getAttribute("ust_devicestatus").setValue(null);
        Xrm.Page.getAttribute("ust_purchasedateost").setValue(null); //fecha de venta activacion?
        Xrm.Page.getAttribute("ust_warrantydate").setValue(null); //fecha de fecha de garantia
        Xrm.Page.getAttribute("ust_saleswarranty").setValue(null); //garantia de venta 
        Xrm.Page.getAttribute("ust_numberofpreviousosts").setValue(null); //garantia de venta 
        //clear all device owner fields
        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumenttype").setValue(null);
        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_customersegment").setValue(null);

        var imeiID = Xrm.Page.getAttribute("ust_imeisearch").getValue();
        if (imeiID != null) {
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_customerdevice'>" +
                "<attribute name='amxperu_customerdeviceid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='statuscode' />" +
                "<attribute name='amxperu_model' />" +
                "<attribute name='amxperu_imei' />" +
                "<attribute name='amxperu_brand' />" +
                "<attribute name='amxperu_warrantyenddate' />" +
                "<attribute name='amxperu_activationdate' />" +
                "<attribute name='amxperu_individualid' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='amxperu_customerdeviceid' operator='eq' uitype='amxperu_customerdevice' value='" + imeiID[0].id + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);

            if (fetchCode.length > 0) {
                var amxperu_imei = fetchCode[0].attributes.amxperu_imei;

                if (amxperu_imei != null) {
                    var IMEIIDValue = amxperu_imei.value;
                    /*
                     *Begins valitation funct. for active ost for selected IMEI
                     *if there an IMEI is  &
                     *if there is an active OST for that IMEI 
                     */
                    var fetchXmlCodeStatusReason = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "<entity name='amxperu_customerdevice'>" +
                        "<attribute name='amxperu_customerdeviceid' />" +
                        "<attribute name='amxperu_name' />" +
                        "<attribute name='createdon' />" +
                        "<attribute name='statuscode' />" +
                        "<order attribute='amxperu_name' descending='false' />" +
                        "<filter type='and'>" +
                        "<condition attribute='amxperu_imei' operator='eq' value='" + IMEIIDValue + "' />" +
                        "<condition attribute='statuscode' operator='in'>" +
                        "<value>1</value>" +
                        "<value>100000000</value>" +
                        "</condition>" +
                        "</filter>" +
                        "</entity>" +
                        "</fetch>";

                    var fetchCodeStatusReason = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeStatusReason);
                    if (fetchCodeStatusReason.length > 0) {

                        //start fetch falta IMEI parametro
                        var fetchXmlCodeOST = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                            "<entity name='ust_ostpresential'>" +
                            "<attribute name='ust_ostpresentialid' />" +
                            "<attribute name='ust_name' />" +
                            "<attribute name='createdon' />" +
                            "<attribute name='statuscode' />" +
                            "<order attribute='ust_name' descending='false' />" +
                            "<filter type='and'>" +
                            "<condition attribute='ust_deviceimei' operator='eq' value='" + IMEIIDValue + "' />" +
                            "<condition attribute='statuscode' operator='not-in'>" +
                            "<value>864340016</value>" +
                            "<value>864340015</value>" +
                            "</condition>" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

                        var fetchCodeOST = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeOST);
                        if (fetchCodeOST.length > 0 && fetchCodeOST.length != null) { //si hay una activa o pendiente

                            alert("Hay una OST Activa para este IMEI");

                            return false;
                        } else {
                            //OST INACTIVA
                        }

                        //end validation func

                    } else {

                        alert("El IMEI se encuentra inactivo");

                        return false;
                    }

                    /*
                     *Calculate the warranty date to today's date and will set the Saleswarranty field: Yes/No
                     *                
                     */
                    var amxperu_warrantyDate = fetchCode[0].attributes.amxperu_warrantyenddate;

                    var hoy = new Date();
                    var dd = hoy.getDate();
                    var mm = hoy.getMonth() + 1;
                    var anio = hoy.getFullYear();

                    var concatday = mm + '/' + dd + '/' + anio;
                    var newDate = new Date(concatday); //"11/8/2017"

                    if (newDate < amxperu_warrantyDate.value) {
                        Xrm.Page.getAttribute("ust_saleswarranty").setValue(true);
                    } else {
                        Xrm.Page.getAttribute("ust_saleswarranty").setValue(false);
                    }

                    //End of calculation

                    /*
                     *Set values in form
                     *1.Device details
                     */
                    if (fetchCode.length > 0 && fetchCode != null) {
                        var deviceimei = fetchCode[0].attributes.amxperu_imei;
                        var devicebrand = fetchCode[0].attributes.amxperu_brand;
                        var devicemodel = fetchCode[0].attributes.amxperu_model;
                        var devicestatus = fetchCode[0].attributes.statuscode;
                        var purchasedate = fetchCode[0].attributes.amxperu_activationdate;
                        var warratydate = fetchCode[0].attributes.amxperu_warrantyenddate;
                        var individual = fetchCode[0].attributes.amxperu_individualid;
                        //var saleswarranty = fetchCode[0].attributes.ust_saleswarranty; 

                        if (deviceimei != null) {
                            Xrm.Page.getAttribute("ust_deviceimei").setValue(deviceimei.value);
                        }
                        if (devicebrand != null) {
                            Xrm.Page.getAttribute("ust_devicebrandost").setValue(devicebrand.value);
                        }
                        if (devicemodel != null) {
                            Xrm.Page.getAttribute("ust_devicemodelost").setValue(devicemodel.value); //ust_contactmobilenumber
                        }
                        if (purchasedate != null) {
                            Xrm.Page.getAttribute("ust_purchasedateost").setValue(purchasedate.value); //ust_contactemail
                        }
                        if (devicestatus != null) {
                            Xrm.Page.getAttribute("ust_devicestatus").setValue(devicestatus.formattedValue);
                            //  alert("Nombre del telephone2 : " + telephone2.value); //ust_contactfixednumber
                        }
                        if (warratydate != null) {
                            Xrm.Page.getAttribute("ust_warrantydate").setValue(warratydate.value); //ust_contactemail
                        }
                        //set customer details. Passing the individuals parameters to fnc_ConsultContactOwner
                        if (individual != null) {
                            var individualname = individual.formattedValue;
                            ust_ostpresential.Funcion.fnc_ConsultContactOwner(individual.id, individualname);
                        }
                    } else {
                        //otherwise clear all fields
                        Xrm.Page.getAttribute("ust_deviceimei").setValue(null);
                        Xrm.Page.getAttribute("ust_devicebrandost").setValue(null);
                        Xrm.Page.getAttribute("ust_devicemodelost").setValue(null);
                        Xrm.Page.getAttribute("ust_purchasedateost").setValue(null);
                        Xrm.Page.getAttribute("ust_devicestatus").setValue(null);
                        Xrm.Page.getAttribute("ust_warrantydate").setValue(null);
                        Xrm.Page.getAttribute("ust_saleswarranty").setValue(null);
                        //Xrm.Page.getAttribute("ust_numberofpreviousosts").setValue(null);

                        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
                        Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").setValue(null);
                        Xrm.Page.getAttribute("ust_deviceownerdocumenttype").setValue(null);
                        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
                        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
                        Xrm.Page.getAttribute("ust_customersegment").setValue(null);
                    }
                }


            }
        }


    },

    //=================================================================
    // Creator  : Cecilia Rentería
    // Creation : 23/07/2018
    // Req		: AMXPEASIS-3191
    // Function : Calculates the sales warranty and get previous OST records for the IMEI. Counts and set Records.
    //=================================================================
    //get crm configuration to calculate previous OST for a selected EMEI

    fnc_viewPreviousOST: function () {
        // debugger;
        var valueCRMConfig = ust_ostpresential.Funcion.fnc_ConsultCRMConfiguration('previous ost generated');
        var IntegervalueCRMConfig = parseInt(valueCRMConfig);

        var imeiID = Xrm.Page.getAttribute("ust_imeisearch").getValue();

        if (imeiID != null && IntegervalueCRMConfig != null) {

            var fetchXmlCodecount = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='ust_ostpresential'>" +
                "<attribute name='ust_ostpresentialid' />" +
                "<attribute name='ust_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='statuscode' />" +
                "<attribute name='ust_devicemodelost' />" +
                "<attribute name='ust_devicebrandost' />" +
                "<order attribute='ust_devicebrandost' descending='false' />" +
                "<order attribute='ust_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='createdon' operator='last-x-days' value='" + IntegervalueCRMConfig + "' />" +
                "<condition attribute='ust_imeisearch' operator='eq' uitype='amxperu_customerdevice' value='" + imeiID[0].id + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";
            //for counting how many ost the selected EMEI has
            var fetchCodeCount = XrmServiceToolkit.Soap.Fetch(fetchXmlCodecount);
            if (fetchCodeCount.length > 0) {
                var counterPreviousOST = fetchCodeCount.length;

                Xrm.Page.getAttribute("ust_numberofpreviousosts").setValue(counterPreviousOST); //set value in field: # of ost

                /*
                 * set grid of previous OST               
                 */
                var previousostGrid = Xrm.Page.getControl('previousost');

                if (previousostGrid != null) {
                    previousostGrid.getGrid().setParameter('fetchXml', fetchXmlCodecount);
                    previousostGrid.refresh();
                }

            } else {
                Xrm.Page.getAttribute("ust_numberofpreviousosts").setValue(null);
            }


        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA	  : 3189
    // Function : Consult and obtain customer owner details
    // Descriptio: this sets the contact owner details filtrel by the IMEI selected on a new OST request.
    //=================================================================
    fnc_ConsultContactOwner: function (individualId, individualName) {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumenttype").setValue(null);
        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_customersegment").setValue(null);

        if (individualId != null) {
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='fullname' />" +
                "<attribute name='contactid' />" +
                "<attribute name='etel_passportnumber' />" +
                "<attribute name='amxperu_documenttype' />" +
                "<attribute name='mobilephone' />" +
                "<attribute name='telephone2' />" +
                "<attribute name='amxperu_customersegmentcode' />" +
                "<order attribute='fullname' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='contactid' operator='eq' uitype='contact' value='" + individualId + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                var deviceonwer = fetchCode[0].attributes.contactid;
                var deviceownerdocumentnumber = fetchCode[0].attributes.etel_passportnumber;
                var deviceownerdocumenttype = fetchCode[0].attributes.amxperu_documenttype;
                var deviceownermobilephone = fetchCode[0].attributes.mobilephone;
                var deviceownertelephone2 = fetchCode[0].attributes.telephone2;
                var customersegment = fetchCode[0].attributes.amxperu_customersegmentcode;

                if (deviceonwer != null) {

                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = individualId;
                    object[0].name = individualName;
                    object[0].entityType = 'contact';

                    Xrm.Page.getAttribute("ust_deviceowner").setValue(object);
                }
                if (deviceownerdocumentnumber != null) {
                    Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").setValue(deviceownerdocumentnumber.value);
                }
                if (deviceownerdocumenttype != null) {
                    Xrm.Page.getAttribute("ust_deviceownerdocumenttype").setValue(deviceownerdocumenttype.formattedValue);
                }
                if (deviceownermobilephone != null) {
                    Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(deviceownermobilephone.value);
                }
                if (deviceownertelephone2 != null) {
                    Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(deviceownertelephone2.value);
                }
                if (customersegment != null) {
                    Xrm.Page.getAttribute("ust_customersegment").setValue(customersegment.formattedValue);
                }
            }

        } else {
            Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
            Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").setValue(null);
            Xrm.Page.getAttribute("ust_deviceownerdocumenttype").setValue(null);
            Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
            Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
            Xrm.Page.getAttribute("ust_customersegment").setValue(null);
            //Limpiar los campos.
        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 17/07/2018
    // JIRA	  : 3215
    // Function : Identify Phase of the process and shows the tabs depending on the phase. OnLoad
    //=================================================================
    fnc_Setphase: function () {
        //debugger;
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.fnc_OnchangePhase);
    },

    fnc_OnchangePhase: function () {
        // debugger;
        ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
        var isOK = false;
        //Every time the phases changes on the onChange function.
        stage = Xrm.Page.data.process.getActiveStage();

        //Returns the phase of the record
        var proceso = Xrm.Page.data.process.getStatus();

        //Update Status Code and Close Task
        if (proceso == "active") {
            var nameFase = stage.getName();

            ust_ostpresential.Funcion.fnc_ConsultNameFase('ostphase', nameFase);
        }
    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 11/06/2018
    // Jira     : AMXPEASIS-3215
    // Function : Disable the tabs of a form.
    //=================================================================
    fnc_toggleSectionDisplayState: function () {
        ITC_FNC_Generico.Funcion.fnc_disableSectionDisplayState();
    },

    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 17/07/2018
    // Req		: AMXPEASIS-3191
    // Function : Fetch the records form the Translation entity and compare with the current Phase
    //=================================================================

    fnc_ConsultNameFase: function (varnameFase, nameFase) {
        // debugger;
        if (varnameFase != null) {

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='etel_translation'>" +
                "<attribute name='etel_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='etel_message' />" +
                "<attribute name='etel_lcid' />" +
                "<attribute name='etel_formid' />" +
                "<attribute name='etel_code' />" +
                "<attribute name='etel_translationid' />" +
                "<order attribute='etel_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='etel_formid' operator='eq' value='" + varnameFase + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);

            if (fetchCode.length > 0) {

                for (x = 0; x < fetchCode.length; x++) {

                    if (nameFase.toLowerCase() == fetchCode[x].attributes.etel_message.value.toLowerCase()) {

                        switch (fetchCode[x].attributes.etel_code.value) {
                            case "62001": //creation
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                break;
                            case "62002": //Document (creation)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("generateddocumentsofost", true);

                                break;
                            case "62003": //Payment (creation)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentcreation", true);

                                break;

                            case "62004": //Diagnosis
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents


                                break;

                            case "62005": //Validate quotation
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotationacceptance", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents

                                break;
                            case "62006": //Reparation
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("reparation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotationacceptance", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents

                                break;

                            case "62007": //Delivery (Local)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdeliveryreturningdevice", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("reparation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotationacceptance", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents


                                break;

                            case "62008": //Payment (Closing)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdeliveryreturningdevice", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("reparation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotationacceptance", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents    


                                break;

                            case "62009": //Document (Closing)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("deliverydocuments", true);

                                break;

                            case "62010": //Conclusion

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdeliveryreturningdevice", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("reparation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("validatequotationacceptance", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents 

                                break;

                            case "62011": //Prepare delivery
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents

                                break;

                            case "62012": //Delivery (Deliver)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("deliverydocuments", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents

                                break;

                        }
                    }
                }
            }
        }
    },
    //=================================================================
    // Creator  : Cecilia Rentería
    // Creation : 23/07/2018
    // Req		  : AMXPEASIS-3191
    // Function : get crm configuration to calculate previous OST for a selected emei
    //=================================================================
    fnc_ConsultCRMConfiguration: function (nameCRMConfig) {
        //debugger;
        var valueCRMConfig = '';

        if (nameCRMConfig != null) {

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='etel_crmconfiguration'>" +
                "<attribute name='etel_crmconfigurationid'/>" +
                "<attribute name='etel_name'/>" +
                "<attribute name='etel_value'/>" +
                "<order descending='false' attribute='etel_name'/>" +
                "<filter type='and'>" +
                "<condition attribute='etel_name' value='" + nameCRMConfig + "' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                return valueCRMConfig = fetchCode[0].attributes.etel_value.value;
            }

        }
    },

    //=================================================================
    // Creator  : Jordy
    // Creation : 12/07/2018
    // Req		: AMXPEASIS-3197
    // Function : PopUpCancelar Ost
    //=================================================================

    fnc_PopUpShowCancelarOst: function () {

        var url = "";
        var fetchXmlCodeurl = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='etel_crmconfiguration'>" +
            "<attribute name='etel_crmconfigurationid' />" +
            "<attribute name='etel_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='etel_value' />" +
            "<order attribute='etel_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='etel_name' operator='eq' value='WebResourcePopupCancelOst' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";


        var fetchCodeurl = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeurl);
        if (fetchCodeurl.length > 0) {
            url = fetchCodeurl[0].attributes.etel_value.value;
            var uri = url;
            window.open(uri, 'mostrar', 'height=300,width=450,toolbar=yes,directories=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,modal=yes');
        }
    }

}