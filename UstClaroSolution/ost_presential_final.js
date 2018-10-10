// =================================================
// Creator      : Cecilia Renteria
// Creation     : 13/07/2018
// Entity       : ust_ostpresential
// State        : In progress
// =================================================

//CODE  - NAMEPHASE
//62001 - Creation
//62002 - Documents - Creation

//62003 - Payment - Creation
//62004 - Diagnóstico
//62005 - Validate quotation
//62006 - Reparation
//62007 - Delivery - Local
//62008 - Payment - Delivery
//62009 - Document - Closing
//62010 - Conclusion
//62011 - Prepare Delivery
//62012 - Delivery - Deliver

// =================================================
// Global variables
var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READ = 3;
var CRM_STAGE = "Conclusion";
var CRM_ENTITY = "ust_ostpresential";
var addtoqueue_xmlHttpRequest = null;
// =================================================
if (typeof (ust_ostpresential) === "undefined") {
    ust_ostpresential = {};
}
var formType = Xrm.Page.ui.getFormType();

ust_ostpresential.Funcion = {

    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 17/07/2018
    // JIRA     : 3215
    // Function : Consult and obtain contact details
    //=================================================================
    fnc_onLoad: function () {
        //debugger;
        var type = Xrm.Page.ui.getFormType();

        //LuisAgui
        var objOstPresentialID = Xrm.Page.data.entity.getId().toString();
        Xrm.Page.getAttribute("ust_hidenostpid").setValue(objOstPresentialID);


        if (type !== CRM_FORM_TYPE_UPDATE) { //Create
            ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
            ust_ostpresential.Funcion.fnc_stateChangedPhase();
            ust_ostpresential.Funcion.fnc_onChangeConsultIMEI();
            ust_ostpresential.Funcion.fnc_viewPreviousOST();
            ust_ostpresential.Funcion.fnc_onChangeConsultContact();
            ust_ostpresential.Funcion.fnc_SetPDV();

            //JS - 14
            //ust_ostpresential.Funcion.fnc_CustomViewByEmailSend();
            //Req 3193
            ust_ostpresential.Funcion.fnc_ShowFieldRequirementCreation();

            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
            // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
            //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
            // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);

            //add line for task-3253
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);

            //add lines for task-3221
            ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_damagesfoundprocess", true);
            ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_deviceimei", true);
            ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_devicelent2", true);
            ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_diagnosiscost", true);
            //end lines for task-3221


            ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents  
            //ust_ostpresential.Funcion.fnc_onChangepreviousost();

        } else if (type === CRM_FORM_TYPE_UPDATE) { //Update
            //   alert("Update...");
            ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
            ust_ostpresential.Funcion.fnc_stateChangedPhase();
            ust_ostpresential.Funcion.fnc_OnchangePhase();
            ust_ostpresential.Funcion.fnc_viewPreviousOST();
            ust_ostpresential.Funcion.GetDeviceDetails();
            //Set Lookup Device Category
            ust_ostpresential.Funcion.fnc_SetValueDeviceCategory();
            ust_ostpresential.Funcion.setStateFinishedOST();
            ust_ostpresential.Funcion.fnc_setteamposreturnteamonload();
            ust_ostpresential.Funcion.fnc_SetTeamPoSReviewonload();

            //JS - 14
            //ust_ostpresential.Funcion.fnc_CustomViewByEmailSend();
            //Req 3193
            ust_ostpresential.Funcion.fnc_ShowFieldRequirementCreation();
        }
    },
    fnc_onSave: function () {
        ust_ostpresential.Funcion.GetDeviceDetails();
        //ust_ostpresential.Funcion.fnc_viewPreviousOST();       
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA   : 3190
    // Function : Consult and obtain contact details
    // Descriptio: This sets contact fields when the contact look up gets selected from manual
    //           manual creation in OST
    //=================================================================
    fnc_onChangeConsultContact: function () {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(null);
        Xrm.Page.getAttribute("ust_devicecontactdocumenttypeoption").setValue(null);//  ust_contactdocumenttype
        Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(null);
        Xrm.Page.getAttribute("ust_contactfixednumber").setValue(null);
        Xrm.Page.getAttribute("ust_contactemail").setValue(null);
        var contactID = Xrm.Page.getAttribute("ust_contactnameid").getValue();
        if (contactID !== null) {
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
                if (documentnumber !== null) {
                    Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(documentnumber.value);
                }
                if (documenttype !== null) {
                    // alert("Nombre del Doc type 1 : " + documenttype.value); //ust_contactfixednumber
                    //alert("Nombre del doc type 2 : " + documenttype.formattedValuevalue); //ust_contactfixednumber
                    Xrm.Page.getAttribute("ust_devicecontactdocumenttypeoption").setValue(documenttype.Value);// previously : ust_contactdocumenttype
                }
                if (mobilephone !== null) {
                    Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(mobilephone.value); //ust_contactmobilenumber
                }
                if (telephone2 !== null) {
                    Xrm.Page.getAttribute("ust_contactfixednumber").setValue(telephone2.value);
                    //  alert("Nombre del telephone2 : " + telephone2.value); //ust_contactfixednumber
                }
                if (emailaddress1 !== null) {
                    Xrm.Page.getAttribute("ust_contactemail").setValue(emailaddress1.value); //ust_contactemail
                }
            }
            //ust_relationshipwithcustomer
        } else {
            Xrm.Page.getAttribute("ust_contactdocumentnumber").setValue(null);
            Xrm.Page.getAttribute("ust_devicecontactdocumenttypeoption").setValue(null);// ust_contactdocumenttype
            Xrm.Page.getAttribute("ust_contactmobilenumber").setValue(null);
            Xrm.Page.getAttribute("ust_contactfixednumber").setValue(null);
            Xrm.Page.getAttribute("ust_contactemail").setValue(null);
            //Limpiar los campos.
        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA   : 3189
    // Function : Consult and obtain IMEI details when an OST request is being created not from a  individual 360 view
    // Descriptio: This sets contact fields when the contact look up gets selected from manual
    //           manual creation in OST
    //=================================================================
    fnc_onChangeConsultIMEI: function () {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_deviceimei").setValue(null);
        Xrm.Page.getAttribute("ust_devicebrandost").setValue(null);
        Xrm.Page.getAttribute("ust_devicemodelost").setValue(null);
        //add clear field devicecategory task-3253
        Xrm.Page.getAttribute("ust_devicecategory").setValue(null);

        Xrm.Page.getAttribute("ust_devicestatus").setValue(null);
        Xrm.Page.getAttribute("ust_purchasedateost").setValue(null); //fecha de venta activacion?
        Xrm.Page.getAttribute("ust_warrantydate").setValue(null); //fecha de fecha de garantia
        Xrm.Page.getAttribute("ust_saleswarranty").setValue(null); //garantia de venta 
        Xrm.Page.getAttribute("ust_noofpreviousosts").setValue(null); //garantia de venta 
        //clear all device owner fields
        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumentno").setValue(null);// change for ust_deviceownerdocumentno
        Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").setValue(null); //  Previously: ust_deviceownerdocumenttype
        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_customersegmentcode").setValue(null); //change for ust_CustomerSegmentCode

        var imeiID = Xrm.Page.getAttribute("ust_imeisearch").getValue();
        if (imeiID !== null) {
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

                if (amxperu_imei !== null) {
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
                            "<value>864340015</value>" +
                            "<value>864340016</value>" +
                            "<value>864340018</value>" +
                            "<value>2</value>" +
                            "</condition>" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

                        var fetchCodeOST = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeOST);
                        if (fetchCodeOST.length > 0 && fetchCodeOST.length !== null) { //si hay una activa o pendiente

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

                    if (amxperu_warrantyDate !== null && amxperu_warrantyDate != undefined) {
                        //debugger; //v por V
                        if (newDate < amxperu_warrantyDate.value) {
                            Xrm.Page.getAttribute("ust_saleswarranty").setValue(true);
                        } else {
                            Xrm.Page.getAttribute("ust_saleswarranty").setValue(false);
                        }
                    }

                    //End of calculation

                    //Start set field devicecategory task-3253
                    //debugger;
                    var ObjectDeviceCategory = new Array(); // Object lookUpDeviceCategory
                    var brandXml = fetchCode[0].attributes.amxperu_brand;
                    var modelXml = fetchCode[0].attributes.amxperu_model;

                    // add if brandXml != null && modelXml !=
                    if (brandXml != null && modelXml != null) {

                        var fetchXmlCodeDevice = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                            "<entity name='ust_devicecategory'>" +
                            "<attribute name='ust_devicecategoryid' />" +
                            "<attribute name='ust_name' />" +
                            "<attribute name='createdon' />" +
                            "<attribute name='ust_model' />" +
                            "<attribute name='ust_brand' />" +
                            "<order attribute='ust_name' descending='false' />" +
                            "<filter type='and'>" +
                            "<condition attribute='ust_brandname' operator='like' value='" + brandXml.value + "' />" +
                            "<condition attribute='ust_modelname' operator='like' value='" + modelXml.value + "' />" +
                            "</filter>" +
                            "</entity>" +
                            "</fetch>";

                        var fetchCodedata = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeDevice);

                        if (fetchCodedata.length > 0) {
                            //debugger;

                            ObjectDeviceCategory[0] = new Object();
                            ObjectDeviceCategory[0].id = fetchCodedata[0].attributes.ust_devicecategoryid.value;
                            ObjectDeviceCategory[0].name = fetchCodedata[0].attributes.ust_name.value;
                            ObjectDeviceCategory[0].entityType = 'ust_devicecategory';

                        }

                    }
                    //End set field devicecategory task-3253

                    /*
                     *Set values in form
                     *1.Device details
                     */
                    if (fetchCode.length > 0 && fetchCode !== null) {

                        if (fetchCode[0].attributes.amxperu_imei != null && fetchCode[0].attributes.amxperu_imei != undefined) {
                            var deviceimei = fetchCode[0].attributes.amxperu_imei;
                        }

                        if (fetchCode[0].attributes.amxperu_brand != null && fetchCode[0].attributes.amxperu_brand != undefined) {
                            var devicebrand = fetchCode[0].attributes.amxperu_brand;

                        }
                        if (fetchCode[0].attributes.amxperu_model != null && fetchCode[0].attributes.amxperu_model != undefined) {
                            var devicemodel = fetchCode[0].attributes.amxperu_model;

                        }
                        if (fetchCode[0].attributes.statuscode != null && fetchCode[0].attributes.statuscode != undefined) {
                            var devicestatus = fetchCode[0].attributes.statuscode;

                        }
                        if (fetchCode[0].attributes.amxperu_activationdate != null && fetchCode[0].attributes.amxperu_activationdate != undefined) {
                            var purchasedate = fetchCode[0].attributes.amxperu_activationdate;

                        }
                        if (fetchCode[0].attributes.amxperu_warrantyenddate != null && fetchCode[0].attributes.amxperu_warrantyenddate != undefined) {
                            var warratydate = fetchCode[0].attributes.amxperu_warrantyenddate;

                        }
                        if (fetchCode[0].attributes.amxperu_individualid != null && fetchCode[0].attributes.amxperu_individualid != undefined) {
                            var individual = fetchCode[0].attributes.amxperu_individualid;

                        }

                        //var saleswarranty = fetchCode[0].attributes.ust_saleswarranty; 

                        if (deviceimei !== null && deviceimei != undefined) {
                            Xrm.Page.getAttribute("ust_deviceimei").setValue(deviceimei.value);
                        }
                        if (devicebrand !== null && devicebrand != undefined) {
                            Xrm.Page.getAttribute("ust_devicebrandost").setValue(devicebrand.value);
                        }
                        if (devicemodel !== null && devicemodel != undefined) {
                            Xrm.Page.getAttribute("ust_devicemodelost").setValue(devicemodel.value); //ust_contactmobilenumber
                        }
                        //add set field devicecategory task-3253
                        if (ObjectDeviceCategory !== null && ObjectDeviceCategory != undefined) {
                            Xrm.Page.getAttribute("ust_devicecategory").setValue(ObjectDeviceCategory);
                        }

                        if (purchasedate !== null && purchasedate != undefined) {
                            Xrm.Page.getAttribute("ust_purchasedateost").setValue(purchasedate.value); //ust_contactemail
                        }
                        if (devicestatus !== null && devicestatus != undefined) {
                            Xrm.Page.getAttribute("ust_devicestatus").setValue(devicestatus.formattedValue);
                            //  alert("Nombre del telephone2 : " + telephone2.value); //ust_contactfixednumber
                        }
                        if (warratydate !== null && warratydate != undefined) {
                            Xrm.Page.getAttribute("ust_warrantydate").setValue(warratydate.value); //ust_contactemail
                        }
                        //set customer details. Passing the individuals parameters to fnc_ConsultContactOwner
                        if (individual !== null && individual != undefined) {
                            var individualname = individual.formattedValue;
                            ust_ostpresential.Funcion.fnc_ConsultContactOwner(individual.id, individualname);
                        }
                    } else {
                        //otherwise clear all fields
                        Xrm.Page.getAttribute("ust_deviceimei").setValue(null);
                        Xrm.Page.getAttribute("ust_devicebrandost").setValue(null);
                        Xrm.Page.getAttribute("ust_devicemodelost").setValue(null);
                        //add clear field devicecategory task-3253
                        Xrm.Page.getAttribute("ust_devicecategory").setValue(null);

                        Xrm.Page.getAttribute("ust_purchasedateost").setValue(null);
                        Xrm.Page.getAttribute("ust_devicestatus").setValue(null);
                        Xrm.Page.getAttribute("ust_warrantydate").setValue(null);
                        Xrm.Page.getAttribute("ust_saleswarranty").setValue(null);
                        //Xrm.Page.getAttribute("ust_noofpreviousosts").setValue(null);

                        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
                        Xrm.Page.getAttribute("ust_deviceownerdocumentno").setValue(null);//change for ust_deviceownerdocumentnumber
                        Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").setValue(null); //ust_deviceownerdocumenttypeoption
                        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
                        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
                        Xrm.Page.getAttribute("ust_customersegmentcode").setValue(null);//change ust_CustomerSegmentCode
                    }
                }
            }
            /*Calls out the function for previous OSTs in the onchange of fnc_onChangeConsultIMEI */
            //

            ust_ostpresential.Funcion.fnc_viewPreviousOST();
        }

    },


    //=================================================================
    // Creator  : Cecilia Rentería
    // Creation : 23/07/2018
    // Req      : AMXPEASIS-3191
    // Function : Calculates the sales warranty and get previous OST records for the IMEI. Counts and set Records.
    //=================================================================
    //get crm configuration to calculate previous OST for a selected EMEI

    fnc_viewPreviousOST: function () {
        //debugger;
        var valueCRMConfig = ust_ostpresential.Funcion.fnc_ConsultCRMConfiguration('previous ost generated');
        var IntegervalueCRMConfig = parseInt(valueCRMConfig);

        var imeiID = Xrm.Page.getAttribute("ust_imeisearch").getValue();
        var ostguidId = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');

        if (imeiID !== null && IntegervalueCRMConfig !== null) {

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
                "<condition attribute='ust_imeisearch' operator='eq' uitype='amxperu_customerdevice' value='" + imeiID[0].id + "'/>" +
                "<condition attribute='ust_ostpresentialid' value='" + ostguidId + "' uitype='ust_ostpresential' operator='ne'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";
            //for counting how many ost the selected EMEI has
            var fetchCodeCount = XrmServiceToolkit.Soap.Fetch(fetchXmlCodecount);
            if (fetchCodeCount.length > 0) {
                var counterPreviousOST = fetchCodeCount.length;

                Xrm.Page.getAttribute("ust_noofpreviousosts").setValue(counterPreviousOST); //set value in field: # of ust_noofpreviousosts

                /*
                 * set grid of previous OST               
                 */
                var previousostGrid = Xrm.Page.getControl('previousost');

                if (previousostGrid !== null) {
                    previousostGrid.getGrid().setParameter('fetchXml', fetchXmlCodecount);
                    previousostGrid.refresh();
                }

            } else {
                Xrm.Page.getAttribute("ust_noofpreviousosts").setValue(null);//change
            }


        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 18/07/2018
    // JIRA   : 3189
    // Function : Consult and obtain customer owner details
    // Descriptio: this sets the contact owner details filtrel by the IMEI selected on a new OST request.
    //=================================================================
    fnc_ConsultContactOwner: function (individualId, individualName) {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
        Xrm.Page.getAttribute("ust_deviceownerdocumentno").setValue(null); // change for ust_deviceownerdocumentnumber
        Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").setValue(null); // ust_deviceownerdocumenttypeoption
        Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
        Xrm.Page.getAttribute("ust_customersegmentcode").setValue(null);//change for ust_CustomerSegmentCode
        if (individualId !== null) {
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


                if (fetchCode[0].attributes.contactid != null && fetchCode[0].attributes.contactid != undefined) {
                    var deviceonwer = fetchCode[0].attributes.contactid;
                }

                if (fetchCode[0].attributes.etel_passportnumber != null && fetchCode[0].attributes.etel_passportnumber != undefined) {
                    var deviceownerdocumentnumber = fetchCode[0].attributes.etel_passportnumber;
                }
                if (fetchCode[0].attributes.amxperu_documenttype != null && fetchCode[0].attributes.amxperu_documenttype != undefined) {
                    var deviceownerdocumenttype = fetchCode[0].attributes.amxperu_documenttype;
                }
                if (fetchCode[0].attributes.mobilephone != null && fetchCode[0].attributes.mobilephone != undefined) {
                    var deviceownermobilephone = fetchCode[0].attributes.mobilephone;
                }
                if (fetchCode[0].attributes.telephone2 != null && fetchCode[0].attributes.telephone2 != undefined) {
                    var deviceownertelephone2 = fetchCode[0].attributes.telephone2;
                }
                if (fetchCode[0].attributes.amxperu_customersegmentcode != null && fetchCode[0].attributes.amxperu_customersegmentcode != undefined) {
                    var customersegment = fetchCode[0].attributes.amxperu_customersegmentcode;
                }

                if (deviceonwer !== null) {

                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = individualId;
                    object[0].name = individualName;
                    object[0].entityType = 'contact';

                    Xrm.Page.getAttribute("ust_deviceowner").setValue(object);

                }
                if (deviceownerdocumentnumber !== null && deviceownerdocumentnumber != undefined) {
                    Xrm.Page.getAttribute("ust_deviceownerdocumentno").setValue(deviceownerdocumentnumber.value); //change for ust_deviceownerdocumentnumber
                }
                if (deviceownerdocumenttype !== null && deviceownerdocumenttype != undefined) {
                    Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").setValue(deviceownerdocumenttype.Value); //ust_deviceownerdocumenttypeoption
                }
                if (deviceownermobilephone !== null && deviceownermobilephone != undefined) {
                    Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(deviceownermobilephone.value);
                }
                if (deviceownertelephone2 !== null && deviceownertelephone2 != undefined) {
                    Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(deviceownertelephone2.value);
                }
                if (customersegment !== null && customersegment != undefined) {
                    Xrm.Page.getAttribute("ust_customersegmentcode").setValue(customersegment.value);//change for ust_CustomerSegmentCode
                }
            }

        } else {
            Xrm.Page.getAttribute("ust_deviceowner").setValue(null);
            Xrm.Page.getAttribute("ust_deviceownerdocumentno").setValue(null); //change for ust_deviceownerdocumentno
            Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").setValue(null); //ust_deviceownerdocumenttypeoption
            Xrm.Page.getAttribute("ust_mobilenumberforadditionalcontact").setValue(null);
            Xrm.Page.getAttribute("ust_fixednumberforadditionalcontact").setValue(null);
            Xrm.Page.getAttribute("ust_customersegmentcode").setValue(null); //changr fot ust_CustomerSegmentCode
            //Limpiar los campos.
        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 17/07/2018
    // JIRA   : 3215
    // Function : Identify Phase of the process and shows the tabs depending on the phase. OnLoad
    //=================================================================
    fnc_stateChangedPhase: function () {
        //alert("fnc_stateChangedPhase..."); //CMR-26/08/2018
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.fnc_OnchangePhase);
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.fnc_faseDiagnosisChanged);
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.fnc_SetValueDeviceCategory);
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.GetDiagnosticColaEquipment);
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.GetDeviceDetails);
    },


    fnc_stateSelectedPhase: function () {
        //debugger;
        Xrm.Page.data.process.addOnStageSelected(ust_ostpresential.Funcion.fnc_OnchangePhase);
        //ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();
        Xrm.Page.data.process.addOnStageChange(onStageChange);
        onStageChange();
    },


    fnc_OnchangePhase: function () {
        debugger;
        ust_ostpresential.Funcion.fnc_toggleSectionDisplayState();

        //Every time the phases changes on the onChange function.
        stage = Xrm.Page.data.process.getActiveStage();

        //Returns the phase of the record
        var proceso = Xrm.Page.data.process.getStatus();

        //Update Status Code and Close Task
        if (proceso === "active") {
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
    // Req      : AMXPEASIS-3191
    // Function : Fetch the records form the Translation entity and compare with the current Phase
    //=================================================================

    fnc_ConsultNameFase: function (varnameFase, nameFase) {
        debugger;
        if (varnameFase !== null) {

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

                    if (nameFase.toLowerCase() === fetchCode[x].attributes.etel_message.value.toLowerCase()) {

                        switch (fetchCode[x].attributes.etel_code.value) {
                            case "62001": //creation
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);


                                //add lines for task-3221
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_damagesfoundprocess", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_deviceimei", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_devicelent2", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_diagnosiscost", true);
                                //end lines for task-3221

                                //ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62002": //Document (creation)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("generateddocumentsofost", true);
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62003": //Payment (creation)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentcreation", true);
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62004": //Diagnosis
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosis", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("diagnosisdeagnosisdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creation", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdetails", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationpreviousosts", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdevicesdefects", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationlentdevicesdetails", true);
                                //   ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                //ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);

                                //add lines for task-3221
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_devicegooduseconditionsdiagnostic", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_diagnosisresult", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_repaircosts", true);
                                //end lines for task-3221


                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                //ust_ostpresential.Funcion.fnc_faseDiagnosisChanged(); //CMR-26/08/2018
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
                                //     ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);
                                //add lines for task-3221
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_loyaltyvalidated_1", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_customeragreeswithquotation", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_totallyloyal", true);
                                //end lines for task-3221

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                //ust_ostpresential.Funcion.GetDiagnosticColaEquipment();
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
                                //   ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                //ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);
                                //add lines for task-3221
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_resultofreparation_1", true);
                                //end lines for task-3221


                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                ust_ostpresential.Funcion.fnc_setteamposreturnteam();
                                break;
                            case "62007": //Delivery (Local)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("localdeliveryreturningdevice", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ReturnAccessoriesonLoan", true);
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
                                // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                //ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);
                                //add lines for task-3221
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_devicereturned2", true);
                                ust_ostpresential.Funcion.fnc_LockUnLockFieldOnBusinessProcess("header_process_ust_needpaymentinpaymentpoint_2", true);
                                //end lines for task-3221

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                ust_ostpresential.Funcion.fnc_CopyFieldLocalDelivery();
                                //ust_ostpresential.Fu();
                                ust_ostpresential.Funcion.fnc_SetTeamPoSReview();
                                //ust_ostpresential.Funcion.GetDeviceDetails();
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
                                //  ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                //ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents   
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62009": //Document (Closing)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("deliverydocuments", true);
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62010": //Conclusion
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Conclusion", true);
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
                                // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationaestheticandaccesories", true);
                                //No sera usado por ahora , descomentar cuando sea requerido esta seccion "creationdelivery"
                                // ITC_FNC_Generico.Funcion.fnc_showHideTabs("creationdelivery", true);
                                //add line for task-3253
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("Servicesuspensiondata", true);

                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents 
                                ust_ostpresential.Funcion.fnc_ConcluirOst();
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62011": //Prepare delivery
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("paymentdelivery", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                            case "62012": //Delivery (Deliver)
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("deliverydocuments", true);
                                ITC_FNC_Generico.Funcion.fnc_showHideTabs("documents", true); //+documents                                
                                ust_ostpresential.Funcion.fnc_setRequiredField(fetchCode[x].attributes.etel_message.value.toLowerCase());
                                break;
                        }
                    }
                }
            }
        }
    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 31/07/2018
    // Req        
    // Function : 
    //=================================================================
    fnc_setRequiredField: function (nameFaseC) {

        var fetchXMLC = "";
        fetchXMLC = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
        fetchXMLC += '<entity name="ust_canalizationost">';
        fetchXMLC += '<attribute name="ust_canalizationostid" />';
        fetchXMLC += '<attribute name="ust_stagename" />';
        fetchXMLC += '<attribute name="createdon" />';
        fetchXMLC += '<attribute name="statuscode" />';
        fetchXMLC += '<attribute name="statecode" />';
        fetchXMLC += '<attribute name="ust_description" />';
        fetchXMLC += '<attribute name="ust_code" />';
        fetchXMLC += '<order attribute="ust_stagename" descending="false" />';
        fetchXMLC += '<filter type="and">';
        fetchXMLC += '<condition attribute="ust_stagename" operator="eq" value="' + nameFaseC + '" />';
        fetchXMLC += '</filter>';
        fetchXMLC += '</entity>';
        fetchXMLC += '</fetch>';

        fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXMLC);
        if (fetchDataC !== "") {
            var listaField = fetchDataC[0].attributes.ust_description.value;
            if (listaField !== null) {
                var field = listaField.split(",");
                for (var i = 0; i < field.length; i++) {
                    if (field[i] !== "" && field[i] !== null) {
                        if (Xrm.Page.getAttribute(field[i]) !== null) {
                            var valueCampo = Xrm.Page.getAttribute(field[i]).getValue();
                            if (valueCampo === null || valueCampo === "") Xrm.Page.getAttribute(field[i]).setRequiredLevel("required");
                        }
                    }

                }
            }
        }

    },

    //=================================================================
    // Creator  : Cecilia Rentería
    // Creation : 23/07/2018
    // Req        : AMXPEASIS-3191
    // Function : get crm configuration to calculate previous OST for a selected emei
    //=================================================================
    fnc_ConsultCRMConfiguration: function (nameCRMConfig) {
        //debugger;
        var valueCRMConfig = '';

        if (nameCRMConfig !== null) {

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
    // Creation : 03/08/2018
    // Req      : AMXPEASIS-3197
    // Function : Show Button PopUpCancelar Ost 
    //=================================================================
    fnc_ShowButtonCancelOst: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62001", "62002", "62003", "62004", "62005", "62006"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Diagnosis"    
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    }
    ,
    //=================================================================
    // Creator  : Luis Levano
    // Creation : 03/08/2018
    // Req      : AMXPEASIS-3197
    // Function : Concluir Ost
    //=================================================================

    fnc_ConcluirOst: function () {
        debugger;
        var varentity_guid = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');

        var stage = Xrm.Page.data.process.getActiveStage();
        var proceso = Xrm.Page.data.process.getStatus();
        if (proceso === "active") {

            if (stage.getName() === CRM_STAGE) {

                /* Case 3236
                   Creator Team Costa Rica
                */
                /*  if(Xrm.Page.getAttribute("ust_selectedpaymenttyperepair").getValue()===864340001){
                        
                        var actionCode = Xrm.Page.getAttribute("actionCode").getValue();
                        var feeClass = Xrm.Page.getAttribute("feeClass").getValue();
                        var feeType = Xrm.Page.getAttribute("feeType").getValue();
                        var rpcodePub = Xrm.Page.getAttribute("rpcodePub").getValue();
                        var spcodePub = Xrm.Page.getAttribute("spcodePub").getValue();
                        var OccType = Xrm.Page.getAttribute("OccType").getValue();
                        var sncodeSpecified = Xrm.Page.getAttribute("sncodeSpecified").getValue();
                        var amount = Xrm.Page.getAttribute("amount").getValue();
                        var numPeriods = Xrm.Page.getAttribute("numPeriods").getValue();
                        var AdjustmentType = Xrm.Page.getAttribute("AdjustmentType").getValue();
                        var BillingAccountCode = Xrm.Page.getAttribute("BillingAccountCode").getValue();
                        var CustExtId = Xrm.Page.getAttribute("CustExtId").getValue();
            
                        var request = {
                            actionCode = actionCode,
                            feeClass = feeClass,
                            feeType = feeType,
                            rpcodePub = rpcodePub,
                            spcodePub = spcodePub,
                            sncode = OccType,
                            sncodeSpecified = sncodeSpecified,
                            amount = amount,
                            numPeriods = numPeriods,
                            remark = AdjustmentType,
                            billingAccountCode = BillingAccountCode,
                            csIdPub = CustExtId
                        }; 
             
                
                        var nameCRMConfig = 'paymenttyperepair_Url';
                        var paymenttyperepair_Url = fnc_ConsultCRMConfiguration(nameCRMConfig);
                
                        $.ajax({
                            type: "POST",
                            url: paymenttyperepair_Url,
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
    
                                }
                            },
                            error: function (data) {
                                //clearInterval(myVar);
                                debugger;
                                alert(data.statusText);
                            }
                        });
                    }*/

                var flagsetconcluirost = Xrm.Page.getAttribute("ust_flagsetconcluirost").getValue();
                var flagrunpluginNew = false;
                if (flagsetconcluirost == false || flagsetconcluirost == null) flagrunpluginNew = true;
                Xrm.Page.getAttribute("ust_flagsetconcluirost").setValue(flagrunpluginNew);
                Xrm.Page.data.refresh(true).then(null, null);

                if (Xrm.Page.getAttribute("ust_lentdevicetobereturned").getValue()) {

                    if (ust_ostpresential.Funcion.fnc_ConsultCustomerDocuments(CRM_ENTITY, varentity_guid)) {

                        if (ust_ostpresential.Funcion.fnc_Consultappointment(varentity_guid)) {

                            /*
                                var control = Xrm.Page.getControl("header_statuscode").getAttribute();
                                if (control!==null) {
                                    control.setValue(value);
                                    alert("entry");
                                }
                            */

                            XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 1, 864340020, false);
                            Xrm.Page.data.refresh(true).then(null, null);
                            //Xrm.Page.data.refresh(false);
                        } else {
                            alert("pending appointments");
                        }
                    }
                    else {
                        alert("Customer Documents");
                    }
                }
                else {
                    alert("The Field equipment on loan to return is false");
                }
            } else {
                alert("the phase is not conclusion");
            }
        }
    }
    ,
    //=================================================================
    // Creator  : Jordy
    // Creation : 12/07/2018
    // Req      : AMXPEASIS-3197
    // Function : PopUpCancelar Ost
    //=================================================================

    fnc_PopUpShowCancelarOst: function () {

        //debugger;

        var url = Xrm.Page.context.getClientUrl();

        var GuidOptionSet = Xrm.Page.getAttribute("ust_cancelreason").valueOf().$2_3.$65_2.OptionSetId;
        var objectID = Xrm.Page.data.entity.getId().toString();

        var addParams = "Id=" + objectID + "&Optionsetid=" + GuidOptionSet;
        var webresourceurl = "?Data=" + encodeURIComponent(addParams);

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

            url += fetchCodeurl[0].attributes.etel_value.value;

            var DialogOptions = new Xrm.DialogOptions();
            DialogOptions.width = 680;
            DialogOptions.height = 380;
            Xrm.Internal.openDialog((url + webresourceurl), DialogOptions, null, null, null);
            // window.open(url, 'mostrar', 'height=400,width=680,toolbar=yes,directories=yes,status=no,menubar=no,scrollbars=no,resizable=yes,modal=yes');
        }
    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 26/07/2018
    // JIRA   : 3193
    // Function : Set the values of the cases related to the customer and are filtered by case types.
    // Descriptio: This sets case fields when the case look up gets selected         
    //=================================================================


    fnc_onChangeCaseNumber: function () {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_casecreationdate").setValue(null);
        Xrm.Page.getAttribute("ust_casedescription").setValue(null);
        Xrm.Page.getAttribute("ust_casenumberfield").setValue(null);

        //add field for task-3253
        Xrm.Page.getAttribute("ust_casestatus").setValue(null);



        var casenumber = Xrm.Page.getAttribute("ust_casenumber").getValue();
        if (casenumber !== null) {
            //add line for task-3253 <attribute name='statuscode' />
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='incident'>" +
                "<attribute name='ticketnumber' />" +
                "<attribute name='createdon' />" +
                "<attribute name='caseorigincode' />" +
                "<attribute name='incidentid' />" +
                "<attribute name='description' /> " +
                "<attribute name='statuscode' />" +
                "<order attribute='ticketnumber' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='incidentid' operator='eq' uitype='incident' value='" + casenumber[0].id + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";
            var fetchCodeCaseNumber = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCodeCaseNumber.length > 0) {

                if (fetchCodeCaseNumber[0].attributes.ticketnumber != null && fetchCodeCaseNumber[0].attributes.ticketnumber != undefined) {
                    var casenumberfield = fetchCodeCaseNumber[0].attributes.ticketnumber; //Tipo String: .value
                }

                if (fetchCodeCaseNumber[0].attributes.createdon != null && fetchCodeCaseNumber[0].attributes.createdon != undefined) {
                    var createdonfield = fetchCodeCaseNumber[0].attributes.createdon; //Tipo String: .value
                }
                //add field for task-3253
                if (fetchCodeCaseNumber[0].attributes.statuscode != null && fetchCodeCaseNumber[0].attributes.statuscode != undefined) {
                    var CaseStatusfield = fetchCodeCaseNumber[0].attributes.statuscode; //Tipo String formattedValue
                }

                if (fetchCodeCaseNumber[0].attributes.description !== null && fetchCodeCaseNumber[0].attributes.description != undefined) {
                    var descriptionfield = fetchCodeCaseNumber[0].attributes.description; //Tipo String: .value
                }

                if (casenumberfield !== null & casenumberfield != undefined) {
                    Xrm.Page.getAttribute("ust_casenumberfield").setValue(casenumberfield.value);
                }
                if (createdonfield !== null && createdonfield != undefined) {
                    Xrm.Page.getAttribute("ust_casecreationdate").setValue(createdonfield.value);
                }
                if (descriptionfield !== null && descriptionfield != undefined) {
                    Xrm.Page.getAttribute("ust_casedescription").setValue(descriptionfield.value);
                }
                //add field for task-3253
                if (CaseStatusfield !== null && CaseStatusfield != undefined) {
                    Xrm.Page.getAttribute("ust_casestatus").setValue(CaseStatusfield.formattedValue);
                }
            }
        } else {
            Xrm.Page.getAttribute("ust_casenumberfield").setValue(null);
            Xrm.Page.getAttribute("ust_casecreationdate").setValue(null);
            Xrm.Page.getAttribute("ust_casedescription").setValue(null);
            //add field for task-3253
            Xrm.Page.getAttribute("ust_casestatus").setValue(null);

            //Limpiar los campos.

        }
    },


    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 26/07/2018
    // JIRA   : 3190
    // Function : obtains the data form the user who creates the OST record.
    // Descriptio: This sets the point of sales (PDV) field and the record added by field in the creation tab in the form.       
    //=================================================================
    fnc_SetPDV: function () {
        // debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_originpos").setValue(null);

        var userDeviceAddedById = Xrm.Page.getAttribute("ust_deviceaddedbyid").getValue();// change for Ust_deviceaddedbyid
        if (userDeviceAddedById !== null) {
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='systemuser'>" +
                "<attribute name='fullname' />" +
                "<attribute name='systemuserid' />" +
                "<attribute name='amxperu_pointofsales' />" +
                "<order attribute='fullname' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='systemuserid' operator='eq' uitype='systemuser' value = '" + userDeviceAddedById[0].id + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCodeUserOwner = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCodeUserOwner.length > 0) {

                var userPDV = fetchCodeUserOwner[0].attributes.amxperu_pointofsales;

                if (userPDV !== null) {

                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = userPDV.id;
                    object[0].name = userPDV.formattedValue;
                    object[0].entityType = 'amxperu_pointofsales';

                    Xrm.Page.getAttribute("ust_originpos").setValue(object);

                }
            }

        } else {
            Xrm.Page.getAttribute("ust_deviceaddedbyid").setValue(null); //change for Ust_deviceaddedbyid
            //Limpiar los campos.
        }
    },


    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 08/08/2018
    // Function : Refresh Ribbon Navigation
    //=================================================================
    refreshRibbonNavigation: function () {
        Xrm.Page.ui.refreshRibbon();
    },
    //=================================================================
    // Creator  : Luis Levano
    // Creation : 29/07/2018
    // JIRA     : 3210
    // Function : Device exchange
    //=================================================================
    onChangeDeviceChange: function () {
        var stage = Xrm.Page.data.process.getActiveStage();
        var proceso = Xrm.Page.data.process.getStatus();
        if (proceso === "active") {
            if (stage.getName() === "Reparation") {
                if (Xrm.Page.getAttribute("ust_requiresdevicechange").getValue()) {
                    Xrm.Page.getAttribute("ust_newdeviceimei").setRequiredLevel("required");
                    Xrm.Page.getAttribute("ust_newdevicebrand").setRequiredLevel("required");
                    Xrm.Page.getAttribute("ust_newdevicemodel").setRequiredLevel("required");
                    Xrm.Page.getAttribute("ust_newdeviceclaimsreparation").setRequiredLevel("required");
                } else {
                    Xrm.Page.getAttribute("ust_newdeviceimei").setRequiredLevel("none");
                    Xrm.Page.getAttribute("ust_newdevicebrand").setRequiredLevel("none");
                    Xrm.Page.getAttribute("ust_newdevicemodel").setRequiredLevel("none");
                    Xrm.Page.getAttribute("ust_newdeviceclaimsreparation").setRequiredLevel("none");
                }
            }
        }
    }
    ,
    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 30/07/2018
    // JIRA     : 3209
    // Function : Show button "Cierre inmediato" when it is in the phase "Entrega Local" and Equipo Entregado = No 
    //=================================================================

    fnc_ShowButtonCierreInmediato: function () {
        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62007", "62008", "62009", "62010", "62011", "62012"];

        //debugger;
        var EquipoEntregado = Xrm.Page.getAttribute("ust_devicereturned2").getValue();
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Entrega Local"  

            if (EquipoEntregado === 864340001) {
                //retorna el true o false de validar la fase
                return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);

            } else {
                return false;
            }

        }

    },
    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 30/07/2018 
    // JIRA     : 3209
    // Function : PopUp Cierre inmediado OST- cambia a estado cancelado 
    //=================================================================

    fnc_PopUpCierreInmediadoOST: function () {

        var url = Xrm.Page.context.getClientUrl();

        var objectID = Xrm.Page.data.entity.getId().toString();

        var addParams = "Id=" + objectID;
        var webresourceurl = "?Data=" + encodeURIComponent(addParams);

        var fetchXmlCodeurl = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='etel_crmconfiguration'>" +
            "<attribute name='etel_crmconfigurationid' />" +
            "<attribute name='etel_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='etel_value' />" +
            "<order attribute='etel_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='etel_name' operator='eq' value='WebResourcePopUpCancelInmediate' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";


        var fetchCodeurl = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeurl);
        if (fetchCodeurl.length > 0) {

            url += fetchCodeurl[0].attributes.etel_value.value;
            var DialogOptions = new Xrm.DialogOptions();
            DialogOptions.width = 540;
            DialogOptions.height = 350;
            // var url = serverurl + "/_controls/lookup/lookupsingle.aspx?class=null&objecttypes=" + objecttypecode + "&browse=0&ShowNewButton=0&ShowPropButton=1&DefaultType=0";
            Xrm.Internal.openDialog(url + webresourceurl, DialogOptions, null, null, null);
        }

    },
    //=================================================================
    // Creator  : Cecilia Renteria
    // Creation : 30/07/2018 
    // JIRA     : 3192
    // Function : sets the diagnostic cost obtained from Product offering price
    //=================================================================


    fnc_SetDiagnosticCost: function () {
        //debugger;
        // Clear all fields before obtaining new attributes
        Xrm.Page.getAttribute("ust_costofdiagnosis").setValue(null);//change for ust_costofdiagnosis

        var devicegoodcondition = Xrm.Page.getAttribute("ust_devicegooduseconditionscreation").getValue(); //optionset
        var saleswarranty = Xrm.Page.getAttribute("ust_saleswarranty").getValue(); //boolean
        var devicepreviouslyentered = Xrm.Page.getAttribute("ust_devicepreviouslyentered2").getValue(); //optionset


        if (devicepreviouslyentered === 864340001) {
            if (saleswarranty === false || (devicegoodcondition === 864340001 && saleswarranty === true)) {

                var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='amxperu_productofferingprice'>" +
                    "<attribute name='amxperu_productofferingpriceid' />" +
                    "<attribute name='amxperu_name' />" +
                    "<attribute name='amxperu_price' />" +
                    "<order attribute='amxperu_name' descending='false' />" +
                    "<filter type='and'>" +
                    "<condition attribute='amxperu_name' operator='eq' value='ctRepair' />" +
                    "</filter>" +
                    "</entity>" +
                    "</fetch>";
                var fetchCodediagnosticcost = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
                if (fetchCodediagnosticcost.length > 0) {

                    var diagnosisCost = fetchCodediagnosticcost[0].attributes.amxperu_price;

                    if (diagnosisCost !== null) {
                        Xrm.Page.getAttribute("ust_costofdiagnosis").setValue(diagnosisCost.formattedValue);
                    }
                }
            }
        } else {
            Xrm.Page.getAttribute("ust_costofdiagnosis").setValue(null);
        }

    },
    //=================================================================
    // Creator  : Luis Levano
    // Creation : 31/07/2018
    // Req      : AMXPEASIS-3212
    // Function : Fetch the records form the customer documents activos
    //=================================================================

    fnc_ConsultCustomerDocuments: function (varentity, varentity_guid) {
        if (varentity !== null && varentity_guid !== null) {
            blResult = true;
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_customerdocument'>" +
                "<attribute name='amxperu_customerdocumentid'/>" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='createdon' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='statecode' operator='eq' value='0'/>" +
                "<condition attribute='amxperu_relatedentityname' operator='eq' value='" + varentity + "' />" +
                "<condition attribute='amxperu_relatedentityguid' operator='eq' value='" + varentity_guid + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                blResult = false;
            }
            return blResult;

        } else {
            return false;
        }
    }
    ,
    //=================================================================
    // Creator  : Luis Levano
    // Creation : 31/07/2018
    // Req      : AMXPEASIS-3212
    // Function : Fetch the records form the appointment
    //=================================================================

    fnc_Consultappointment: function (varentity_guid) {
        if (varentity_guid !== null) {
            blResult = true;
            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='appointment'>" +
                "<attribute name='activityid'/>" +
                "<attribute name='subject'/>" +
                "<attribute name='createdon' />" +
                "<order attribute='subject' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='statecode' operator='eq' value='0'/>" +
                "<condition attribute='activitytypecode' operator='eq' value='4201'/>" +
                "<condition attribute='regardingobjectid' operator='eq' uitype='ust_ostpresential' value='" + varentity_guid + "' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                blResult = false;
            }
            return blResult;
        } else {
            return false;
        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 15/08/2018
    // Req      : AMXPEASIS-3193
    // Function : active funcionality by requeriment in onload 
    //=================================================================
    fnc_ShowFieldRequirementCreation: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation

        var ListaFases = ["62001"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Creation"    
            var valueNameFaseByCode = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);

            if (valueNameFaseByCode === true) {
                ust_ostpresential.Funcion.fnc_setRequiredField(nameFase);
            }

        }

    }
    ,

    //=================================================================
    // Creator  : Luis Levano
    // Creation : 03/08/2018
    // Req      : AMXPEASIS-3197
    // Function : Show Button Concluir Ost 
    //=================================================================
    fnc_ShowButtonConcluirOst: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        //var ListaFases = ["62010"];
        //stage = Xrm.Page.data.process.getActiveStage();
        ////Devuelve el estado actual de la instancia del proceso
        //var proceso = Xrm.Page.data.process.getStatus();

        //if (proceso==="active") {
        //    var nameFase = stage.getName(); //"Diagnosis"    
        //    return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        //}
        return false;


    }
    ,
    //=================================================================
    // Creator  : Jordy Moises
    // Creation : 01/08/2018
    // Req      : AMXPEASIS-3205
    // Function : 
    //=================================================================

    fnc_ShowButtonSendEmail: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62005"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Diagnosis"    
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    }
    ,
    //=================================================================
    // Creator  : Jordy Moises
    // Creation : 01/08/2018
    // Req      : AMXPEASIS-3205
    // Function : 
    //=================================================================

    fnc_SendEmailOst: function () {

        //debugger;
        //var context = Xrm.Page.context;
        //var UserID = context.getUserId();
        //var UserName = context.getUserName()
        //var nameCustomer = Xrm.Page.getAttribute("ust_isdeviceowner").getValue()[0].name;
        //var IDCustomer = Xrm.Page.getAttribute("ust_isdeviceowner").getValue()[0].id; 

        var NameOST = Xrm.Page.data.entity.getEntityReference().name;
        var IdOst = Xrm.Page.data.entity.getEntityReference().id;
        var NameEntity = Xrm.Page.data.entity.getEntityReference().entityType;

        /*
        var lookupData = new Array();
        var lookupItem = new Object();

        lookupItem.id = IdOst;
        lookupItem.name = NameOST; 
        lookupItem.entityType = NameEntity;

        lookupData[0] = lookupItem;
        */


        var parameters = {};

        // parameters["from"] = UserID;
        // parameters["fromname"] = UserName;
        //parameters["fromtype"] = "queue";
        //parameters["subject"] = "";
        parameters["parameter_regardingid"] = IdOst;
        parameters["parameter_regardingname"] = NameOST;
        parameters["parameter_regardingtype"] = NameEntity;

        var windowOptions = {
            openInNewWindow: true
        };

        Xrm.Utility.openEntityForm("email", null, parameters, windowOptions);


    }
    ,

    fnc_OnLoadSetRegardingEmail: function () {
        // Get the Value of the Regarding through the Customer Parameters
        var param = Xrm.Page.context.getQueryStringParameters();
        var regardingId = param["parameter_regardingid"];
        var regardingName = param["parameter_regardingname"];
        var regardingType = param["parameter_regardingtype"];
        //Populate the Regarding if there is one
        if (regardingId !== undefined) {
            Xrm.Page.getAttribute("regardingobjectid").setValue([{
                id: regardingId,
                name: regardingName,
                entityType: regardingType
            }]);
        }
    }
    ,
    fnc_BulkUpdateOsiptelComplaint: function () {

    }

    ,
    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 30/07/2018
    // JIRA     : 3200
    // Function : Set values Option set Diagnostic Result
    //=================================================================
    fnc_SetValuesDiagnosticResult: function () {
        //With Warranty
        //864340000
        //Without Warranty
        //864340001 
        Xrm.Page.getControl("ust_diagnosticresult").addPreSearch(function () {
            ust_ostpresential.Funcion.addLookupFilter();

        });

    }
    ,

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 30/07/2018
    // JIRA     : 3200
    // Function : Filter Value Diagnostic Result
    //=================================================================
    addLookupFilter: function () {

        var FlagGoodCondition = Xrm.Page.getAttribute("ust_deviceinwarrantyofsale").getValue();
        var fetchXmlwith;

        if (FlagGoodCondition === true) {
            fetchXmlwith = "<filter type='and'>" +
                "<condition attribute='ust_warranty' value='864340000' operator='eq'/>" +
                "</filter>";
        }

        if (FlagGoodCondition === false) {
            fetchXmlwith = "<filter type='and'>" +
                "<condition attribute='ust_warranty' value='864340001' operator='eq'/>" +
                "</filter>";
        }

        Xrm.Page.getControl("ust_diagnosticresult").addCustomFilter(fetchXmlwith);

    },



    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    setDisableStatusCode: function () {
        var control = Xrm.Page.getControl("header_statuscode");

        if (control !== null)
            control.setDisabled(true);
    },
    // Author: Marlon Hernandez
    // RQ: 3214
    // Fecha: 06/09/2018
    setStateFinishedOST: function () {
        Xrm.Page.data.process.addOnProcessStatusChange(ust_ostpresential.Funcion.statusOnChange);
    },
    // Author: Marlon Hernandez
    // RQ: 3214
    // Fecha: 06/09/2018
    statusOnChange: function () {
        var status = Xrm.Page.data.process.getStatus(); //.toLowerCase();
		alert ("status: " +status);
        var id = Xrm.Page.data.entity.getId();
        var control = Xrm.Page.getControl("header_statuscode").getAttribute();
        if (status === "finished" || status === "finalizado") {
            ust_ostpresential.Funcion.setStateCodeOSTConclusion(id, control, 864340020); //864340020 (Closed) e internamente lo inactiva
        }
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    setOnChangeState: function () {
        Xrm.Page.data.process.addOnStageChange(ust_ostpresential.Funcion.onStageChange);

        ust_ostpresential.Funcion.onStageChange();
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    onStageChange: function () {
        debugger;
        console.log("onStageChange...");
        try {
            var stateCode = Xrm.Page.getAttribute("statecode").getValue();

            if (stateCode === 0) //si la OST se encuentra activa
            {
                var stage = Xrm.Page.data.process;

                if (stage.getStatus() === "active") {
                    var stageCode = "";
                    var ostPresential = null;
                    var id = Xrm.Page.data.entity.getId();
                    var fetchXmlTranslation = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "  <entity name='etel_translation'>" +
                        "    <attribute name='etel_message' />" +
                        "    <attribute name='etel_code' />" +
                        "    <filter type='and'>" +
                        "      <condition attribute='etel_formid' operator='eq' value='ostpresential' />" +
                        "      <condition attribute='etel_code' operator='like' value='stagename%' />" +
                        "    </filter>" +
                        "  </entity>" +
                        "</fetch>";
                    var fetchTranslation = XrmServiceToolkit.Soap.Fetch(fetchXmlTranslation);

                    if (fetchTranslation.length > 0) {
                        for (x = 0; x < fetchTranslation.length; x++) {
                            if (stage.getActiveStage().getName().toLowerCase() === fetchTranslation[x].attributes.etel_message.value.toLowerCase()) {
                                stageCode = fetchTranslation[x].attributes.etel_code.value.toLowerCase();

                                break;
                            }
                        }
                    }

                    var control = Xrm.Page.getControl("header_statuscode").getAttribute();
                    var ostPresential = ust_ostpresential.Funcion.getOSTPresential();
                    /*
                    if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedcentrallab)) {
                        ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340004);

                        return;
                    }
                    */
                    switch (stageCode) {
                        case "stagename_creation": // Creation
                            ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340000); // -> Pending

                            break;
                        case "stagename_paymentcreation": // Payment (creation)
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_documentspaid)) // Documents paid?
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340001); // -> Generated

                            break;
                        case "stagename_documentscreation": // Document (creation)
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_documentsgenerated)) // Documents generated?
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340001); // -> Generated

                            break;
                        case "stagename_diagnosis": // Diagnosis
                            var statecode = null;

                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340001) // Diagnostic lab = central
                            {
                                statecode = 864340017; // -> Pending of sending to main laboratory

                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab) === 864340000 || ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttocentrallab))
                                    statecode = 864340003; // -> Sent to main laboratory

                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab) === 864340000 && ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedcentrallab) === 864340000)
                                    statecode = 864340005; // -> For diagnosis in main laboratory
                            }
                            else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340000) // Diagnostic lab = local
                            {
                                statecode = 864340002; // -> To diagnosticate

                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab) === 864340000 && ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedcentrallab) === 864340000)
                                    statecode = 864340005; // -> For diagnosis in main laboratory
                            }

                            if (statecode !== null)
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, statecode)
                            /*
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab)===864340001) // Diagnostic lab = central
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340017); // -> Pending of sending to main laboratory
                            else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab)===864340000 || ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttocentrallab)) {
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340003); // -> Sent to main laboratory

                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab)===864340000 && ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedcentrallab)===864340000)
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340005); // -> For diagnosis in main laboratory
                            }
                            else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab)===864340000) // Diagnostic lab = local
                            {
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340002); // -> To diagnosticate

                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab)===864340000 && ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedcentrallab)===864340000)
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340005); // -> For diagnosis in main laboratory
                            }*/

                            break;
                        case "stagename_validatequotation": // Validate quotation
                            ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340006); // -> Received in main laboratory

                            break;
                        case "stagename_reparation": // Reparation
                            ust_ostpresential.Funcion.fnc_setteamposreturnteam();

                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340000) { // Diagnostic lab = local
                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab) === 864340000 || ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttocentrallab)) // Device sent to central lab = SI
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340008); // -> In reparation in main laboratory
                                else
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340007); // -> In reparation in local laboratory // Entra aqui
                            }
                            else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340001) // Diagnostic lab = central
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340008); // -> In reparation in main laboratory

                            break;
                        case "stagename_deliverylocal": // Delivery (Local)
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340000) { // Diagnostic lab = local
                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicereceivedinpdv) === 864340000) // Device received in PDV = no
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340011); // -> For delivering
                                else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttopdv) === 864340000) // Device sent to PDV = Si
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340010); // -> Sent to PDV
                                else// if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab)===864340000 || ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttocentrallab)) // Device sent to central lab = SI                                    
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340011); // -> For delivering (864340011)
                            }
                            else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_diagnosticlab) === 864340001) { // Diagnostic lab = central
                                if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttopdv) === 864340001) // Device sent to PDV = No
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340009); // -> For returning to PDV
                                else if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttopdv) === 864340000) // Device sent to PDV = Si
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340010); // -> Sent to PDV
                                else// if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesentcentrallab)===864340000 || ust_ostpresential.Funcion.getValue(ostPresential.ust_devicesenttocentrallab)) // Device sent to central lab = SI                                    
                                    ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340009); // -> For returning to pdv (864340009)
                            }

                            break;
                        case "stagename_preparedelivery": // Prepare delivery
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_senttomotorized)) // Sent to motorized? = si
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340014); // -> On route for returning
                            else
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340012); // -> For recolecting

                            break;
                        case "stagename_deliverydeliver": // Delivery (Deliver)
                            if (ust_ostpresential.Funcion.getValue(ostPresential.ust_devolutiontype) === 864340000) // Devolution type = local
                                ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340013); // -> Delivered

                            break;
                        case "stagename_conclusion": // Conclusion
                            //if (ust_ostpresential.Funcion.getValue(ostPresential.ust_concludeost)) // Conclude OST? = si
                            ust_ostpresential.Funcion.setStateCodeOST(id, control, 864340013); // -> Delivered

                            break;
                        case "stagename_paymentclosing": // Payment (Closing)
                            break;
                        case "stagename_documentclosing": // Document (Closing)
                            break;
                    }
                }
            }
        } catch (e) {
            alert(e);
        }
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    setStateCodeOST: function (id, control, value) {
        if (control !== null)
            control.setValue(value);

        if (id !== null)
            XrmServiceToolkit.Soap.SetState("ust_ostpresential", id, 0, value, false);
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    setStateCodeOSTConclusion: function (id, control, value) {
        if (control !== null)
            control.setValue(value);

        if (id !== null)
            XrmServiceToolkit.Soap.SetState("ust_ostpresential", id, 1, value, false);
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    getValue: function (control) {
        if (typeof (control) !== "undefined")
            return control;

        return null;
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 01/08/2018
    getOSTPresential: function () {
        var entity = {};
        entity.ust_documentspaid = Xrm.Page.getAttribute("ust_documentspaid").getValue(); // bool
        entity.ust_documentsgenerated = Xrm.Page.getAttribute("ust_documentsgenerated").getValue(); // bool
        entity.ust_diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue(); // picklist
        entity.ust_devolutiontype = Xrm.Page.getAttribute("ust_devolutiontype").getValue(); // picklist
        entity.ust_devicesenttopdv = Xrm.Page.getAttribute("ust_devicesenttopdv").getValue(); // picklist
        entity.ust_devicesenttocentrallab = Xrm.Page.getAttribute("ust_devicesenttocentrallab").getValue(); // bool
        entity.ust_devicesentcentrallab = Xrm.Page.getAttribute("ust_devicesentcentrallab").getValue(); // picklist
        entity.ust_devicereceivedinpdv = Xrm.Page.getAttribute("ust_devicereceivedinpdv").getValue(); // picklist
        entity.ust_devicereceivedcentrallab = Xrm.Page.getAttribute("ust_devicereceivedcentrallab").getValue(); // picklist
        entity.ust_devicereceivedincentrallab = Xrm.Page.getAttribute("ust_devicereceivedincentrallab").getValue(); // bool
        entity.ust_concludeost = Xrm.Page.getAttribute("ust_concludeost").getValue(); // bool
        entity.ust_senttomotorized = Xrm.Page.getAttribute("ust_senttomotorized").getValue(); // bool

        if (entity.ust_documentspaid === null)
            entity.ust_documentspaid = false;

        if (entity.ust_documentsgenerated === null)
            entity.ust_documentsgenerated = false;

        if (entity.ust_devicesenttocentrallab === null)
            entity.ust_devicesenttocentrallab = false;

        if (entity.ust_devicereceivedincentrallab === null)
            entity.ust_devicereceivedincentrallab = false;

        if (entity.ust_concludeost === null)
            entity.ust_concludeost = false;

        if (entity.ust_senttomotorized === null)
            entity.ust_senttomotorized = false;

        return entity;
    },

    //#region Creator       : Luis Agui (3208)
    /*        
     *        Creation      : 31/07/2018
     *        Requerimiento : 62-03-001  3208.
     */
    /* Obtengo y seteo los datos del contacto en la region Contact of delivered device. */
    fn_OnLoadContactField: function () {
        if (formType === CRM_FORM_TYPE_UPDATE) {
            Xrm.Page.getAttribute("ust_ownerdevice").setValue(null);
            Xrm.Page.getAttribute("ust_typedocument").setValue(null);
            Xrm.Page.getAttribute("ust_documentnumber").setValue(null);

            var deviceowner = Xrm.Page.getAttribute("ust_deviceowner").getValue();
            if (deviceowner !== null) {
                var objDO = new Array();
                objDO[0] = new Object();
                objDO[0].id = deviceowner[0].id;
                objDO[0].name = deviceowner[0].name;
                objDO[0].entityType = deviceowner[0].entityType;

                var deviceownerdocumenttype = Xrm.Page.getAttribute("ust_deviceownerdocumenttypeoption").getValue(); //ust_deviceownerdocumenttypeoption
                var deviceownerdocumentnumber = Xrm.Page.getAttribute("ust_deviceownerdocumentno").getValue();


                Xrm.Page.getAttribute("ust_ownerdevice").setValue(objDO);
                Xrm.Page.getAttribute("ust_typedocument").setValue(deviceownerdocumenttype);
                Xrm.Page.getAttribute("ust_documentnumber").setValue(deviceownerdocumentnumber);
            }

            //Validar Flujo Contact Name 
            var flagOwnerTaker = Xrm.Page.getAttribute("ust_deviceownertakesdevice").getValue();
            if (flagOwnerTaker === false) {
                Xrm.Page.getControl("ust_contactname").setDisabled(false);
                Xrm.Page.getAttribute("ust_contactname").setRequiredLevel("required");

                Xrm.Page.getAttribute("ust_authorizationdocumentloaded").setRequiredLevel("required");
                //Xrm.Page.getAttribute("ust_authorizationdocumentloaded").setValue(1);
                //Xrm.Page.getControl("ust_authorizationdocumentloaded").setDisabled(true);
            }
        }
    },

    /* Description   : Dependiendo de un flag habilito la busqueda de un contacto. */
    fn_OnChangeDeviceOwnerTakesDevice: function () {
        var flag = Xrm.Page.getAttribute("ust_deviceownertakesdevice").getValue();
        if (flag !== null) {
            if (flag) {
                Xrm.Page.getAttribute("ust_contactname").setValue(null);
                Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(null);
                Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(null);

                Xrm.Page.getAttribute("ust_contactname").setRequiredLevel("none");
                Xrm.Page.getControl("ust_contactname").setDisabled(true);

                Xrm.Page.getAttribute("ust_authorizationdocumentloaded").setRequiredLevel("none");
                //Xrm.Page.getControl("ust_authorizationdocumentloaded").setDisabled(false);

            } else {

                Xrm.Page.getAttribute("ust_contactname").setRequiredLevel("required");
                Xrm.Page.getControl("ust_contactname").setDisabled(false);

                Xrm.Page.getAttribute("ust_authorizationdocumentloaded").setRequiredLevel("required");
                //Xrm.Page.getAttribute("ust_authorizationdocumentloaded").setValue(1);
                //Xrm.Page.getControl("ust_authorizationdocumentloaded").setDisabled(true);

                //Validos si existen campos de contactos ya existentes
                var contact = Xrm.Page.getAttribute("ust_contactnameid").getValue();
                console.log(contact);
                if (contact !== null) {
                    //debugger;
                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = contact[0].id;
                    object[0].name = contact[0].name;
                    object[0].entityType = contact[0].entityType;

                    var type = Xrm.Page.getAttribute("ust_devicecontactdocumenttypeoption").getValue();//  ust_contactdocumenttype
                    var number = Xrm.Page.getAttribute("ust_contactdocumentnumber").getValue();

                    var number = String(number);
                    Xrm.Page.getAttribute("ust_contactname").setValue(object);
                    Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(type);
                    Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(number);

                } else {
                    Xrm.Page.getAttribute("ust_contactname").setValue(null);
                    Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(null);
                    Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(null);
                }
            }
        }
    },

    /* Description   : Obtengo datos de una busqueda a realizar. */
    fn_OnChangeContactName: function () {
        var objContactModel = Xrm.Page.getAttribute("ust_contactname").getValue();
        if (objContactModel !== null) {
            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='contactid' />" +
                "<attribute name='fullname' />" +
                "<attribute name='lastname' />" +
                "<attribute name='amxperu_documenttype' />" +
                "<attribute name='etel_passportnumber' />" +
                "<attribute name='amxperu_hiddenconnectiontype' />" +
                "<attribute name='address1_line1' />" +
                "<order attribute='address1_line1' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + objContactModel[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";
            var data = XrmServiceToolkit.Soap.Fetch(fetchXmlC);
            if (data.length > 0) {
                var DocumentType = data[0].attributes.amxperu_documenttype;
                var dni = data[0].attributes.etel_passportnumber;

                if (DocumentType !== null) {
                    Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(DocumentType.formattedValue);
                }
                if (dni !== null) {
                    Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(dni.value);
                }
            }
        } else {
            Xrm.Page.getAttribute("ust_contactname").setValue(null);
            Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(null);
            Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(null);
        }

    },
    //#endregion

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 30/07/2018
    // JIRA     : 3225
    // Function : Create Address
    //=================================================================

    fnc_CreateAddress: function () {
        //debugger;

        var DeviceOwnerGUID = Xrm.Page.getAttribute('ust_deviceowner').getValue();

        if (DeviceOwnerGUID === null) {
            //validar GUID lookup device owner 
            alert("Se necesita un Propietario de Equipo para crear una nueva dirección");
            return false;
        }

        //--------------------------------------------------------------
        var CrmFormId = {
            IndividualCustomer360FormId: "e283abea-f298-4c98-9510-8e791d0e1ce5",
            CorporateCustomer360FormId: "162d9ec0-d88f-4d0e-b535-1d844364d900",
        }


        var translationScope_js_BI_CustomerAddress = {
            data: null,
            GetData: function () {
                var formId = 'js_BI_CustomerAddress';
                if (translationScope_js_BI_CustomerAddress.data !== null) {
                    return;
                }
                translationScope_js_BI_CustomerAddress.data = GetTranslationData(formId);
            }
        };


        var customer = {
            LogicalName: "",
            EntityCode: undefined,
            Id: "",
            Name: "",
            GetCustomer: function () {
                var entityType = "contact";  //Xrm.Page.data.entity.getEntityName();
                if (entityType === "contact") {
                    customer.EntityCode = 2;
                    customer.Name = DeviceOwnerGUID[0].name;
                    customer.LogicalName = entityType;
                    customer.Id = DeviceOwnerGUID[0].id;
                }
                else if (entityType === "account") {
                    customer.EntityCode = 1;
                    customer.Name = getValueFromDB("AccountSet", "AccountId", Xrm.Page.data.entity.getId(), "Name");
                    customer.LogicalName = entityType;
                    customer.Id = Xrm.Page.data.entity.getId();
                }
                else if (entityType === "etel_customeraddressbusinessinteraction" || entityType === "etel_bi_customeraddressmodification") {
                    var customerIndividualField = Xrm.Page.getAttribute("etel_individualcustomer").getValue();
                    var customerCorporateField = Xrm.Page.getAttribute("etel_corporatecustomer").getValue();
                    if (customerIndividualField) {
                        customer.EntityCode = 2;
                        customer.Id = customerIndividualField[0].id;
                        customer.Name = getValueFromDB("ContactSet", "ContactId", customer.Id, "FullName");
                        customer.LogicalName = "contact";
                    }
                    else if (customerCorporateField) {
                        customer.EntityCode = 1;
                        customer.Id = customerCorporateField[0].id;
                        customer.Name = getValueFromDB("AccountSet", "AccountId", customer.Id, "Name");
                        customer.LogicalName = "account";
                    }
                }
            }
        };

        var settings = {
            ServerURL: "",
            CurrentUserId: "",
            GetUrl: function () {
                Xrm.Page.context.getClientUrl();
                if (settings.ServerURL.match(/\/$/)) {
                    settings.ServerURL = settings.ServerURL.substring(0, settings.ServerURL.length - 1);
                }
                if (typeof Xrm.Page.context.getClientUrl !== "undefined") {
                    settings.ServerURL = Xrm.Page.context.getClientUrl();
                }
            },
            GetCurrentUserId: function () {
                settings.CurrentUserId = Xrm.Page.context.getUserId();
            },
            Initialise: function () {
                settings.GetUrl();
                settings.GetCurrentUserId();
            }
        };


        var biSecurityCreateAddress = {
            IsValidated: "",
            Validate: function () {
                var paymentType = null;
                var request = new PrepareRequest(new CustomerAddressSecurityRequest('etel_customeraddressbusinessinteraction', customer.Id, customer.EntityCode, paymentType, settings.CurrentUserId));
                retrieveRecordFromCustomService(request, function (data, textStatus, XmlHttpRequest) {
                    biSecurityCreateAddress.IsValidated = data.IsValidated;
                });
            }
        };

        var createAddressSecurityRoleCheck = {
            IsValidatedRole: "",
            ValidateRole: function () {
                translationScope_js_BI_CustomerAddress.GetData();

                createAddressSecurityRoleCheck.IsValidatedRole = Util.Security.UserHasBIPrivilage("etel_customeraddressbusinessinteraction");
            }
        };


        var biSecurityUpd = {
            IsValidated: "",
            Validate: function () {
                var paymentType = null;
                var request = new PrepareRequest(new CustomerAddressModificationSecurityRequest('etel_bi_customeraddressmodification', customer.Id, customer.EntityCode, paymentType, settings.CurrentUserId));
                retrieveRecordFromCustomService(request, function (data, textStatus, XmlHttpRequest) {
                    biSecurityUpd.IsValidated = data.IsValidated;
                });
            }
        };

        var customerAddressBIValidations = {
            ExecuteValidations: function () {
                var email = Xrm.Page.getAttribute("etel_emailaddress").getValue();

                if (email !== null && !validateEmail(email)) {
                    return false;
                }

                return true;
            }
        }

        var modifyAddressSecurityRoleCheck = {
            IsValidatedRole: "",
            ValidateRole: function () {
                translationScope_js_BI_CustomerAddress.GetData();

                modifyAddressSecurityRoleCheck.IsValidatedRole = Util.Security.UserHasBIPrivilage("etel_bi_customeraddressmodification");

            }
        };

        var biAutoNumberCustomerAddress = {
            IsCreated: "",
            BINumber: "",
            CreateBINumber: function () {
                translationScope_js_BI_CustomerAddress.GetData();
                var request = new PrepareRequest(new CreateBINumberRequest());
                retrieveRecordFromCustomService(request, function (data, textStatus, XmlHttpRequest) {
                    biAutoNumberCustomerAddress.IsCreated = data.Success;
                    biAutoNumberCustomerAddress.BINumber = data.BINumber;
                });
            }
        };

        translationScope_js_BI_CustomerAddress.GetData();
        customer.GetCustomer();
        settings.Initialise();

        var selectedEntityId = DeviceOwnerGUID[0].id; // GUID
        var selectedEntityCode = DeviceOwnerGUID[0].type; //Type code 2

        biSecurityCreateAddress.Validate();

        if (biSecurityCreateAddress.IsValidated === true) {
            createAddressSecurityRoleCheck.ValidateRole();
            if (createAddressSecurityRoleCheck.IsValidatedRole === true) {
                biAutoNumberCustomerAddress.CreateBINumber();
                if (biAutoNumberCustomerAddress.IsCreated === true) {
                    var paramaters = {};
                    paramaters["etel_businessinteraction"] = 0;
                    paramaters["_CreateFromId"] = selectedEntityId;//GUID   
                    paramaters["_CreateFromType"] = selectedEntityCode;  //2

                    if (biAutoNumberCustomerAddress.BINumber !== null) {
                        paramaters["etel_binumber"] = biAutoNumberCustomerAddress.BINumber;
                        paramaters["etel_name"] = biAutoNumberCustomerAddress.BINumber + ' - ' + translationScope_js_BI_CustomerAddress.data.tNameFieldSuffix;
                    }
                    var windowOptions = {
                        openInNewWindow: false
                    };
                    Xrm.Utility.openEntityForm("etel_customeraddressbusinessinteraction", null, paramaters, windowOptions);
                }
            }
            else {
                alert(translationScope_js_BI_CustomerAddress.data.tValidationRoleCheckMessage);
            }
        }
        else {
            alert(translationScope_js_BI_CustomerAddress.data.tValidationCheckMessage);
        }


    },




    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 07/08/2018
    // JIRA     : 3225
    // Function : Create Address
    //=================================================================
    fnc_ShowCreateAddress: function () {


        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62001"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Diagnosis"    
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    },

    fnc_ShowSendToPDV: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62007"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName();
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }
    },

    fnc_SendToPDV: function () {

        // 3214
        var ostpresentialid = Xrm.Page.data.entity.getId();
        var updateEntityrca = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", ostpresentialid);
        updateEntityrca.attributes["ust_devicesenttopdv"] = { value: 864340000, type: 'OptionSetValue' }; //864340000: Yes
        var updateOSTrca = XrmServiceToolkit.Soap.Update(updateEntityrca);

        alert("TO DO Send To PDV");
    },

    fnc_ShowReceiveInPDV: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62007"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName();
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    },

    fnc_ReceiveInPDV: function () {

        // 3214
        var ostpresentialid = Xrm.Page.data.entity.getId();
        var updateEntityrca = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", ostpresentialid);
        updateEntityrca.attributes["ust_devicereceivedinpdv"] = { value: 864340000, type: 'OptionSetValue' }; //864340000: Yes
        var updateOSTrca = XrmServiceToolkit.Soap.Update(updateEntityrca);

        alert("TO DO Receive In PDV");
    },

    //=================================================================
    // Creator  : Marlon
    // Creation : 08/08/2018
    // JIRA     : 3217
    // Function : Consult Name Phase Generico
    //=================================================================

    fnc_ConsultNameFaseByCode: function (varnameFase, nameFase, codefase) {

        var isOk = false;

        if (varnameFase !== null) {

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

                    if (nameFase.toLowerCase() === fetchCode[x].attributes.etel_message.value.toLowerCase()) {

                        for (index = 0; index < codefase.length; index++) {

                            if (fetchCode[x].attributes.etel_code.value === codefase[index]) {
                                isOk = true;
                            }
                        }

                    }
                }
            }
        }

        return isOk;
    },

    //=================================================================
    // Creator  : Luis Levano
    // Creation : 10/08/2018
    // JIRA     : 3210
    // Function : Copy field to Local Delivery section
    //=================================================================
    fnc_CopyFieldLocalDelivery: function () {
        var imei;
        var brand;
        var model;
        if (Xrm.Page.getAttribute("ust_requiresdevicechange").getValue()) {
            imei = Xrm.Page.getAttribute("ust_newdeviceimei").getValue();
            brand = Xrm.Page.getAttribute("ust_newdevicebrand").getValue();
            model = Xrm.Page.getAttribute("ust_newdevicemodel").getValue();
        } else {
            imei = Xrm.Page.getAttribute("ust_deviceimei").getValue();
            brand = Xrm.Page.getAttribute("ust_devicebrandost").getValue();
            model = Xrm.Page.getAttribute("ust_devicemodelost").getValue();
        }
        Xrm.Page.getAttribute("ust_returneddeviceimei").setValue(imei);
        Xrm.Page.getAttribute("ust_returneddevicebrand").setValue(brand);
        Xrm.Page.getAttribute("ust_returneddevicemodel").setValue(model);
    },

    fnc_SetValueDeviceCategory: function () {

        //CODE  - NAMEPHASE 
        //62004 - Diagnóstico 


        var brand = Xrm.Page.getAttribute("ust_devicebrandost").getValue();
        var model = Xrm.Page.getAttribute("ust_devicemodelost").getValue();

        if (brand === null || model === null) {
            return false;
        }

        var ListaFases = ["62004"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName();

            if (ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases) === true) {

                var fetchXmlCodeDevice = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='ust_devicecategory'>" +
                    "<attribute name='ust_devicecategoryid' />" +
                    "<attribute name='ust_name' />" +
                    "<attribute name='createdon' />" +
                    "<attribute name='ust_model' />" +
                    "<attribute name='ust_brand' />" +
                    "<order attribute='ust_name' descending='false' />" +
                    "<filter type='and'>" +
                    "<condition attribute='ust_brandname' operator='like' value='" + brand + "' />" +
                    "<condition attribute='ust_modelname' operator='like' value='" + model + "' />" +
                    "</filter>" +
                    "</entity>" +
                    "</fetch>";

                var fetchCodedata = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeDevice);

                if (fetchCodedata.length > 0) {

                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = fetchCodedata[0].attributes.ust_devicecategoryid.value;
                    object[0].name = fetchCodedata[0].attributes.ust_name.value;
                    object[0].entityType = 'ust_devicecategory';

                    Xrm.Page.getAttribute("ust_devicecategory").setValue(object);

                }

                var webResourceControl = Xrm.Page.getControl("WebResource_replacePartComponent_Server");
                var src = webResourceControl.getSrc();
                webResourceControl.setSrc(null);
                webResourceControl.setSrc(src);

            }

        }

    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 14/08/2018
    // JIRA     : 
    // Function : Custom Grid View Email by GUID Ost
    //=================================================================
    fnc_CustomViewByEmailSend: function () {

        var ostguidId = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');

        var fetchXmlCodeViewEmails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='email'>" +
            "<attribute name='subject' />" +
            "<attribute name='from' />" +
            "<attribute name='to' />" +
            "<attribute name='statuscode' />" +
            "<attribute name='activityid' />" +
            "<attribute name='senton' />" +
            "<order attribute='subject' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='regardingobjectid' operator='eq' uiname='' uitype='ust_ostpresential' value='" + ostguidId + "' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";

        //<condition attribute='regardingobjectid' operator='eq' uiname='' uitype='ust_ostpresential' value='{C1087D37-F89F-E811-80EE-005056841895}' />" +

        //for counting how many ost the selected EMEI has
        var fetchCodeCountEmails = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeViewEmails);
        if (fetchCodeCountEmails.length > 0) {
            /*
             * set grid of previous fetchXmlCodecountOST               
             */
            var emailgridview = Xrm.Page.getControl('Emails_view');

            if (emailgridview !== null) {
                emailgridview.getGrid().setParameter('fetchXml', fetchXmlCodeViewEmails);
                emailgridview.refresh();
            }

        }


    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 14/08/2018
    // JIRA     :  3205
    // Function : Custom Enable Rule Add "+" in Grid Emails On Ost_presential Form
    //=================================================================
    /*
        DisableSubGridAddButton: function () {
            // debugger;
            //CODE  - NAMEPHASE
            //62001 - Creation
            //62002 - Documents - Creation
            //62003 - Payment - Creation
            //62004 - Diagnóstico
            //62005 - Validate quotation
            //62006 - Reparation
            //62007 - Delivery - Local
            //62008 - Payment - Delivery
            //62009 - Document - Closing
            //62010 - Conclusion
            //62011 - Prepare Delivery
            //62012 - Delivery - Deliver
    
            var ListaFases = ["62005", "62006", "62007", "62008", "62009", "62010", "62011", "62012"];
            stage = Xrm.Page.data.process.getActiveStage();
            //Devuelve el estado actual de la instancia del proceso
            var proceso = Xrm.Page.data.process.getStatus();
    
            if (proceso==="active") {
                var nameFase = stage.getName(); //Validate quotation  
                var seccion = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
                if (seccion===true) {
                    return false;
                } else {
                    return true;
                }
            }
        },
    */
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 16/08/2018
    // JIRA     :  3211
    // Function : 
    //=================================================================

    GetDeviceDetails: function () {
        //debugger;
        //62007 - Delivery - Local
        var valueNameFaseByCode = false;
        var ListaFases = ["62007"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Delivery Local"    
            valueNameFaseByCode = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

        if (valueNameFaseByCode === true) {

            //Section : Lent Device Details (web resource here)
            var customerWants = Xrm.Page.getAttribute("ust_customerwantstoborrowdevice").getValue();
            var saleswarranty = Xrm.Page.getAttribute("ust_saleswarranty").getValue();


            if (saleswarranty === true) {
                Xrm.Page.getAttribute("ust_deviceinwarrantyofsale").setValue(true);
            }
            //Si el atributo 'Cliente quiere equipo en prestamo' = Si, obtener valor del equipo reservado.
            if (customerWants === false) {
                /*
                var imeitolent = Xrm.Page.getAttribute("ust_imeitolent").getValue();
                var brandtolent = Xrm.Page.getAttribute("ust_brandtolent").getValue();
                var modeltolent = Xrm.Page.getAttribute("ust_modeltolent").getValue();
                var deviceconditionlent = Xrm.Page.getAttribute("ust_deviceconditionlent").getValue();
                var repositionamount = Xrm.Page.getAttribute("ust_repositionamount").getValue();
                
                if (imeitolent!==null){Xrm.Page.getAttribute("ust_lentdeviceimei").setValue(imeitolent);}
                if (brandtolent!==null){Xrm.Page.getAttribute("ust_lentdevicebrand").setValue(brandtolent);}
                if (modeltolent!==null){Xrm.Page.getAttribute("ust_lentdevicemodel").setValue(modeltolent);}
                if (deviceconditionlent!==null){Xrm.Page.getAttribute("ust_lentdevicereturnedstatus").setValue(deviceconditionlent);}
                if (repositionamount!==null){ Xrm.Page.getAttribute("ust_repositioncost").setValue(repositionamount);}
                */

                Xrm.Page.getAttribute("ust_lentdeviceimei").setValue(null);
                Xrm.Page.getAttribute("ust_lentdevicebrand").setValue(null);
                Xrm.Page.getAttribute("ust_lentdevicemodel").setValue(null);
                Xrm.Page.getAttribute("ust_lentdevicereturnedstatus").setValue(null);
                Xrm.Page.getAttribute("ust_repositioncost").setValue(null);
                //Xrm.Page.getControl("ust_lentdevicenotes").setDisabled(false);
                //Xrm.Page.getAttribute("ust_lentdevicenotes").controls.forEach(function(control, index) { control.setDisabled(false); });

            }
            else {
                //Xrm.Page.getAttribute("ust_lentdevicenotes").controls.forEach(function(control, index) { control.setDisabled(true); });
                //Xrm.Page.getControl("ust_lentdevicenotes").setDisabled(true);
            }
        }

        //ust_returnaccesoriesloans
    },

    GetDeviceNotes: function () {

        //debugger;
        //Section : Lent Device Details (web resource here)
        var customerWants = Xrm.Page.getAttribute("ust_customerwantstoborrowdevice").getValue();

        //Si el atributo 'Cliente quiere equipo en prestamo' = Si, obtener valor del equipo reservado.
        if (customerWants === true) {

            //Xrm.Page.getAttribute("ust_lentdevicenotes").controls.forEach(function(control, index) { control.setDisabled(false); });
            Xrm.Page.getControl("ust_lentdevicenotes").setDisabled(false);
        }
        else {
            //Xrm.Page.getAttribute("ust_lentdevicenotes").controls.forEach(function(control, index) { control.setDisabled(true); });
            Xrm.Page.getControl("ust_lentdevicenotes").setDisabled(true);
        }


        //ust_returnaccesoriesloans
    },

    //=================================================================
    // Creator  : Luis Lévano
    // Creation : 16/08/2018
    // JIRA   : 3218
    // Function : 
    // Descriptio: 
    //=================================================================
    fnc_SetTeamPoS: function () {
        //debugger;
        var originpos = Xrm.Page.getAttribute("ust_originpos").getValue();
        var diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue();
        var fetchXmlCode = "";
        //Local 864340000
        //Central 864340001
        if (originpos !== null) {
            if (diagnosticlab === 864340000) { //Local
                fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='team'>" +
                    "<attribute name='name' />" +
                    "<attribute name='teamid' />" +
                    "<order attribute='name' descending='false' />" +
                    "<link-entity name='amxperu_pointofsales' from='ust_teamlocallaboratory' to='teamid' alias='af'>" +
                    "<filter type='and'>" +
                    "<condition attribute='amxperu_pointofsalesid' operator='eq' uitype='amxperu_pointofsales' value = '" + originpos[0].id + "' />" +
                    "</filter>" +
                    "</link-entity>" +
                    "</entity>" +
                    "</fetch>";
            }

            if (diagnosticlab === 864340001) { //Central
                fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                    "<entity name='team'>" +
                    "<attribute name='name' />" +
                    "<attribute name='teamid' />" +
                    "<order attribute='name' descending='false' />" +
                    "<link-entity name='amxperu_pointofsales' from='ust_teamcentrallaboratory' to='teamid' alias='af'>" +
                    "<filter type='and'>" +
                    "<condition attribute='amxperu_pointofsalesid' operator='eq' uitype='amxperu_pointofsales' value = '" + originpos[0].id + "' />" +
                    "</filter>" +
                    "</link-entity>" +
                    "</entity>" +
                    "</fetch>";
            }
            var fetchCodeTeamOwner = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCodeTeamOwner.length > 0) {
                var TeamID = fetchCodeTeamOwner[0].attributes.teamid.value;
                var TeamName = fetchCodeTeamOwner[0].attributes.name.value;
                if (TeamID !== null) {
                    Xrm.Page.getAttribute("ownerid").setValue([{ id: TeamID, name: TeamName, entityType: "team" }]);
                    var flagsetteampos = Xrm.Page.getAttribute("ust_flagsetteampos").getValue();
                    var flagrunpluginNew = false;
                    if (flagsetteampos === false || flagsetteampos === null) flagrunpluginNew = true;
                    Xrm.Page.getAttribute("ust_flagsetteampos").setValue(flagrunpluginNew);
                    Xrm.Page.data.refresh(true).then(null, null);

                    Xrm.Page.getAttribute("ownerid").setValue([{ id: TeamID, name: TeamName, entityType: "team" }]);
                    alert("El registro de OST se ha derivado a la cola " + TeamName);
                }
            }
        }
    },

    // Author: Schatten des Todes
    // RQ: 3214
    // Fecha: 29/07/2018
    setOnchangeChangeStateCode: function () {
        ust_ostpresential.Funcion.onStageChange();
    },


    //=================================================================
    // Creator  : William Quiroz
    // Creation : 20/08/2018
    // JIRA     :  3250
    // Function : 
    //=================================================================

    GetDiagnosticColaEquipment: function () {
        //debugger;
        var valueNameFaseByCode = false;
        var ListaFases = ["62005"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Validate Quotation"    
            valueNameFaseByCode = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

        if (valueNameFaseByCode === true) {

            var ostpresentialid = Xrm.Page.data.entity.getId();
            var pointofsalesId = Xrm.Page.getAttribute("ust_originpos").getValue();

            //-------------Register CRM Configuration-----------                          
            var fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='etel_crmconfiguration'>" +
                "<attribute name='etel_crmconfigurationid' />" +
                "<attribute name='etel_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='etel_value' />" +
                "<attribute name='statuscode' />" +
                "<attribute name='statecode' />" +
                "<attribute name='overriddencreatedon' />" +
                "<order attribute='etel_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='etel_name' operator='eq' value='EquipoDeValidacióndeCotizaciónOST' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchConfig = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (fetchConfig.length > 0) {

                var nameConfig = fetchConfig[0].attributes.etel_value;

                if (nameConfig !== null) {

                    //-------------Set Team-----------             
                    var fetchTeam = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "<entity name='team'>" +
                        "<attribute name='businessunitid' />" +
                        "<attribute name='teamid' />" +
                        "<attribute name='teamtype' />" +
                        "<order attribute='name' descending='false' />" +
                        "<filter type='and'>" +
                        "<condition attribute='name' operator='like' value='" + nameConfig.value + "' />" +
                        "</filter>" +
                        "</entity>" +
                        "</fetch>";

                    var fetchPoint = XrmServiceToolkit.Soap.Fetch(fetchTeam);
                    if (fetchPoint.length > 0) {

                        var teamid = fetchPoint[0].attributes.teamid;//Entity Team

                        if (teamid !== null) {

                            try {

                                var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamid.value);
                                if (assignResponse !== null) {

                                    // XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory

                                    var flagrunplugin = Xrm.Page.getAttribute("ust_flagrunplugin").getValue();
                                    var flagrunpluginNew = false;
                                    if (flagrunplugin === false || flagrunplugin === null) flagrunpluginNew = true;
                                    Xrm.Page.getAttribute("ust_flagrunplugin").setValue(flagrunpluginNew);
                                    Xrm.Page.data.refresh(true).then(null, null);

                                    alert("El registro de OST se ha derivado a la cola " + nameConfig.value);

                                }

                            } catch (e) {
                                alert(e.message);
                            }
                        }
                    }
                }
            }
        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 01/08/2018
    // ModifiedBy  : Carlos Mezones
    // ModifiedOn  : 26/08/2018
    // JIRA     : 3198
    // Function : Set Diagnostic Lab in fase = Diagnostic
    //=================================================================
    fnc_faseDiagnosisChanged: function () {
        //debugger;
        try {
            //alert("fnc_faseDiagnosisChanged...");
            var valueNameFaseByCode = false;
            var ListaFases = ["62004"];
            stage = Xrm.Page.data.process.getActiveStage();
            //Devuelve el estado actual de la instancia del proceso
            var proceso = Xrm.Page.data.process.getStatus();

            if (proceso === "active") {
                var nameFase = stage.getName(); //"Diagnosis"    
                valueNameFaseByCode = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
            }

            if (valueNameFaseByCode === true) {
                var pointofsalesId = Xrm.Page.getAttribute("ust_originpos").getValue();
                if (pointofsalesId === null) return;
                var ostpresentialid = Xrm.Page.data.entity.getId();

                var objPoS = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(pointofsalesId[0].id);
                if (objPoS === null) return;

                var valueHaslaboratory = objPoS.attributes.ust_haslaboratory; //Si: true || No: false     
                var teamlocallaboratory = objPoS.attributes.ust_teamlocallaboratory;

                if (valueHaslaboratory === null) {
                    alert("No tiene definido un Punto de Venta. Por favor ingrese un registro sobre este campo.");
                    return false;
                }

                //ust_diagnosticlab  //864340000 (Local) , 864,340,001 (Central)
                //--------------Laboratorio Central-------------
                if (!valueHaslaboratory.value) {
                    Xrm.Page.getAttribute("ust_diagnosticlab").setValue(864340001);
                    Xrm.Page.getAttribute("ust_diagnosticlab").setSubmitMode("always");
                    ust_ostpresential.Funcion.fnc_UpdateDiagnosticLab(864340001);
                }

                //-----------Laboratorio Local------------
                if (valueHaslaboratory.value) {
                    Xrm.Page.getAttribute("ust_diagnosticlab").setValue(864340000);
                    Xrm.Page.getAttribute("ust_diagnosticlab").setSubmitMode("always");
                    ust_ostpresential.Funcion.fnc_UpdateDiagnosticLab(864340000);

                    if (teamlocallaboratory !== null) {
                        try {
                            //Derivar al Equipo Local
                            var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamlocallaboratory.id);
                            if (assignResponse !== null) {
                                //Xrm.Page.data.refresh(true).then(null, null);

                                //Enviar a la cola del Laboratorio Local.
                                ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagdiagnosischanged");
                                alert("El registro de OST se ha derivado a la cola de Laboratorio Local");
                            }
                        }
                        catch (e) {
                            alert(e.message);
                        }
                    }

                }

            }

        }
        catch (ex) {
            alert(ex.message);
        }

    },

    //=================================================================
    // Creator  : Carlos Mezones
    // Creation : 26/08/2018
    // JIRA     : 3198
    // Function : Get Point Of Sales
    //=================================================================    
    fnc_GetPointOfSalesById: function (var_Id) {
        var fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='amxperu_pointofsales'>" +
            "<attribute name='amxperu_pointofsalesid' />" +
            "<attribute name='amxperu_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='ust_haslaboratory' />" +
            "<attribute name='ust_laboratorycentral' />" +
            "<attribute name='ust_teamcentrallaboratory' />" +
            "<attribute name='ust_teamlocallaboratory' />" +
            "<attribute name='ust_teamadvisorspdv' />" +
            "<order attribute='amxperu_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='amxperu_pointofsalesid' operator='eq' uitype='amxperu_pointofsales' value='" + var_Id + "' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";

        var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXML);
        if (fetchCode.length > 0) return fetchCode[0];
        else return null;
    },

    //=================================================================
    // Creator  : Carlos Mezones
    // Creation : 26/08/2018
    // JIRA     : 3198
    // Function : Get Point Of Sales
    //=================================================================
    fnc_UpdateDiagnosticLab: function (var_ValueLab) {
        if (var_ValueLab === null) return;
        var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", Xrm.Page.data.entity.getId());
        updateEntity.attributes["ust_diagnosticlab"] = { value: var_ValueLab, type: 'OptionSetValue' };
        var updateOST_DL = XrmServiceToolkit.Soap.Update(updateEntity);
    },


    //=================================================================
    // Creator  : Jordy + Marlon
    // Creation : 27/07/2018
    // ModifiedBy  : Carlos Mezones
    // ModifiedOn  : 26/08/2018
    // JIRA     : AMXPEASIS-3198
    // Function : Automatically advance to local or central lab for diagnostic based on rules
    //=================================================================
    fnc_SendLabCentral: function () {
        //debugger;
        try {
            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1;
            var anio = hoy.getFullYear();
            var concatday = mm + '/' + dd + '/' + anio;
            var newDate = new Date(concatday); //"11/8/2017"

            var devicesenttocentrallab = Xrm.Page.getAttribute("ust_devicesentcentrallab").getValue();
            if (devicesenttocentrallab === 864340000) {    //864340001 (No) || 864340000 (Si)          
                alert("Este equipo ya fue enviado a Laboratorio Central");
                return;
            }

            Xrm.Page.getAttribute("ust_devicesentcentrallab").setValue(864340000); //
            Xrm.Page.getAttribute("ust_devicesentcentrallab").setSubmitMode("always");
            Xrm.Page.getAttribute("ust_dateofdevicesenttocentrallab").setValue(newDate); //Actualiza fecha actual
            Xrm.Page.getAttribute("ust_dateofdevicesenttocentrallab").setSubmitMode("always");
            Xrm.Page.getAttribute("statuscode").setValue(864340003); //Enviado a Laboratoio Central
            Xrm.Page.getAttribute("statuscode").setSubmitMode("always");
            var modified = Xrm.Page.getAttribute("modifiedby").getValue();

            if (modified !== null) {
                var objectUser = new Array();
                objectUser[0] = new Object();
                objectUser[0].id = modified[0].id;
                objectUser[0].name = modified[0].name;
                objectUser[0].entityType = 'systemuser';
                Xrm.Page.getAttribute("ust_devicesentbyid").setValue(objectUser);
                Xrm.Page.getAttribute("ust_devicesentbyid").setSubmitMode("always");
            }

            // 3214
            var ostpresentialid = Xrm.Page.data.entity.getId();
            var updateEntityrca = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", ostpresentialid);
            updateEntityrca.attributes["ust_devicesentcentrallab"] = { value: 864340000, type: 'OptionSetValue' }; //864340000: Yes
            updateEntityrca.attributes["ust_dateofdevicesenttocentrallab"] = newDate;
            updateEntityrca.attributes["ust_devicesentbyid"] = { id: modified[0].id.toString(), logicalName: modified[0].entityType.toString(), type: 'EntityReference' };
            var updateOSTrca = XrmServiceToolkit.Soap.Update(updateEntityrca);

            var pointofsalesId = Xrm.Page.getAttribute("ust_originpos").getValue();
            if (pointofsalesId === null) return;

            var objPoS = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(pointofsalesId[0].id);
            if (objPoS === null) return;

            var teamcentrallaboratory = objPoS.attributes.ust_teamcentrallaboratory;//Entity Team
            if (teamcentrallaboratory !== null) {
                try {
                    //Derivar al equipo de Laboratorio Central.                                 
                    var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamcentrallaboratory.id);
                    if (assignResponse !== null) {
                        XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory                                  
                        //Xrm.Page.data.refresh(true).then(null, null);

                        //Enviar a la cola del Laboratorio Central
                        ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagsendlabcentral");
                        alert("El registro de OST se ha derivado a la cola de Laboratorio Central");
                        if (parent.opener !== undefined) { window.parent.close(); } else Xrm.Page.ui.close();
                    }

                }
                catch (e) {
                    alert(e.message);
                }

            }

        }
        catch (ex) {
            alert(ex.message);
        }
    },

    fnc_ShowSendLabCentral: function () {
        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62004"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Diagnosis"    
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    },
    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 01/08/2018
    // JIRA     : 3198
    // Function : Set Received OST
    //=================================================================
    fnc_ReceivedOST: function () {
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1;
        var anio = hoy.getFullYear();
        var concatday = mm + '/' + dd + '/' + anio;
        var newDate = new Date(concatday); //"11/8/2017"

        var devicesenttocentrallab = Xrm.Page.getAttribute("ust_devicesentcentrallab").getValue();
        var modified = Xrm.Page.getAttribute("modifiedby").getValue();

        if (devicesenttocentrallab === null || devicesenttocentrallab === 864340001) {    //864340001 (No) || 864340000 (Si)      
            alert("Por favor primero tiene que seleccionar el botón 'Enviar a Laboratorio Central' ");
        } else { //Cuando se verifica que si envio a Laboratorio Central. Que el campo 'devicesenttocentrallab' = 864340000     
            Xrm.Page.getAttribute("ust_devicereceivedcentrallab").setValue(864340000); //
            Xrm.Page.getAttribute("ust_devicereceivedcentrallab").setSubmitMode("always");
            Xrm.Page.getAttribute("ust_dateofdevicereceivedincentrallab").setValue(newDate); //Actualiza fecha actual
            Xrm.Page.getAttribute("ust_dateofdevicereceivedincentrallab").setSubmitMode("always");
            Xrm.Page.getAttribute("statuscode").setValue(864340005); //Enviado a Laboratoio Central
            Xrm.Page.getAttribute("statuscode").setSubmitMode("always");

            if (modified !== null) {
                var objectUser = new Array();
                objectUser[0] = new Object();
                objectUser[0].id = modified[0].id;
                objectUser[0].name = modified[0].name;
                objectUser[0].entityType = 'systemuser';
                Xrm.Page.getAttribute("ust_devicereceivedbyid").setValue(objectUser);
                Xrm.Page.getAttribute("ust_devicereceivedbyid").setSubmitMode("always");
            }

            Xrm.Page.data.entity.save();

            //-------------Set status reason------------                        
            /*
                var guidOST = Xrm.Page.data.entity.getId();             
                var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", guidOST);
                updateEntity.attributes["statuscode"] = { value: 864340004, type: 'OptionSetValue' }; //864340004: Received in main laboratory
                var updateOST = XrmServiceToolkit.Soap.Update(updateEntity);
                */


            // 3214
            var guidOSTrca = Xrm.Page.data.entity.getId();
            var updateEntityrca = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", guidOSTrca);
            updateEntityrca.attributes["ust_devicereceivedcentrallab"] = { value: 864340000, type: 'OptionSetValue' }; //864340000: Yes
            var updateOSTrca = XrmServiceToolkit.Soap.Update(updateEntityrca);
            //

            XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340005, false); //864340005: Received in main laboratory
            Xrm.Page.data.refresh(true).then(null, null);

            alert("El registro de OST se ha recibido.");

            if (parent.opener !== undefined) { window.parent.close(); } else Xrm.Page.ui.close();
        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 03/09/2018
    // JIRA   : 3218
    // Function : 
    // Description: 
    //=================================================================
    fnc_SetTeamPoSReview: function () {
        //debugger;
        var originpos = Xrm.Page.getAttribute("ust_originpos").getValue();
        var diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue();
        var ostpresentialid = Xrm.Page.data.entity.getId().toString();
        var fetchXmlCode = "";
        //Local 864340000
        //Central 864340001

        if (originpos !== null) {

            var objTeam = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(originpos[0].id);
            if (objTeam !== null) {
                var teamadvisorpdv = objTeam.attributes.ust_teamadvisorspdv;//Entity Team PDV
                var teamcentrallab = objTeam.attributes.ust_teamcentrallaboratory;//Entity Team Central
            }

            if (diagnosticlab === 864340000) { //Local

                if (teamadvisorpdv !== null) {

                    var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamadvisorpdv.id);
                    if (assignResponse !== null) {
                        //XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory                                  

                        ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagsetteampos");
                        Xrm.Page.data.refresh(true).then(null, null);

                    }
                }

            }

            if (diagnosticlab === 864340001) { //Central

                if (teamcentrallab !== null) {

                    var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamcentrallab.id);
                    if (assignResponse !== null) {
                        //XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory                                  
                        ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagsetteampos");
                        Xrm.Page.data.refresh(true).then(null, null);
                    }
                }

            }

        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 03/09/2018
    // JIRA   : 3218
    // Function : 
    // Description: 
    //=================================================================
    fnc_SetTeamPoSReviewonload: function () {
        //debugger;
        var originpos = Xrm.Page.getAttribute("ust_originpos").getValue();
        var diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue();
        var ostpresentialid = Xrm.Page.data.entity.getId().toString();
        var fetchXmlCode = "";
        //Local 864340000
        //Central 864340001

        var ListaFases = ["62007"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //   
            var returnost = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);

            if (returnost === true) {

                if (originpos !== null) {

                    var objTeam = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(originpos[0].id);
                    if (objTeam !== null) {
                        var teamadvisorpdv = objTeam.attributes.ust_teamadvisorspdv;//Entity Team PDV
                        var teamcentrallab = objTeam.attributes.ust_teamcentrallaboratory;//Entity Team Central
                    }

                    if (diagnosticlab === 864340000) { //Local
                        if (teamadvisorpdv !== null) {
                            XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamadvisorpdv.id);
                            Xrm.Page.data.refresh(true).then(null, null);
                        }
                    }

                    if (diagnosticlab === 864340001) { //Central
                        if (teamcentrallab !== null) {
                            XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamcentrallab.id);
                            Xrm.Page.data.refresh(true).then(null, null);
                        }
                    }

                }

            }

        }
    },

    fnc_ShowReceivedOST: function () {

        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62004"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Diagnosis"    
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 03/09/2018
    // JIRA   : 3218
    // Function : 
    // Description: 
    //=================================================================
    fnc_setteamposreturnteamonload: function () {
        //debugger;     
        //62006 - Reparation
        var originpos = Xrm.Page.getAttribute("ust_originpos").getValue();
        var diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue();
        var ostpresentialid = Xrm.Page.data.entity.getId().toString();
        var fetchXmlCode = "";
        //Local 864340000
        //Central 864340001

        var ListaFases = ["62006"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName(); //"Reparation"    
            var returnvarost = ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);

            if (returnvarost === true) {
                if (originpos !== null) {

                    var objTeam = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(originpos[0].id);
                    if (objTeam !== null) {
                        var teamlocallab = objTeam.attributes.ust_teamlocallaboratory;//Entity Team Local
                        var teamcentrallab = objTeam.attributes.ust_teamcentrallaboratory;//Entity Team Central
                    }

                    if (diagnosticlab === 864340000) { //Local
                        if (teamlocallab !== null) {
                            XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamlocallab.id);
                            Xrm.Page.data.refresh(true).then(null, null);
                        }
                    }

                    if (diagnosticlab === 864340001) { //Central
                        if (teamcentrallab !== null) {
                            XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamcentrallab.id);
                            Xrm.Page.data.refresh(true).then(null, null);

                        }
                    }

                }
            }
        }

    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 03/09/2018
    // JIRA   : 3218
    // Function : 
    // Description: 
    //=================================================================
    fnc_setteamposreturnteam: function () {
        //debugger;
        var originpos = Xrm.Page.getAttribute("ust_originpos").getValue();
        var diagnosticlab = Xrm.Page.getAttribute("ust_diagnosticlab").getValue();
        var ostpresentialid = Xrm.Page.data.entity.getId().toString();
        var fetchXmlCode = "";
        //Local 864340000
        //Central 864340001

        if (originpos !== null) {

            var objTeam = ust_ostpresential.Funcion.fnc_GetPointOfSalesById(originpos[0].id);
            if (objTeam !== null) {
                var teamlocallab = objTeam.attributes.ust_teamlocallaboratory;//Entity Team Local
                var teamcentrallab = objTeam.attributes.ust_teamcentrallaboratory;//Entity Team Central
            }

            if (diagnosticlab === 864340000) { //Local

                if (teamlocallab !== null) {

                    var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamlocallab.id);
                    if (assignResponse !== null) {
                        //XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory                                  

                        ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagreturnteamplugin");

                    }
                }

            }

            if (diagnosticlab === 864340001) { //Central

                if (teamcentrallab !== null) {

                    var assignResponse = XrmServiceToolkit.Soap.Assign("ust_ostpresential", ostpresentialid, "team", teamcentrallab.id);
                    if (assignResponse !== null) {
                        //XrmServiceToolkit.Soap.SetState("ust_ostpresential", Xrm.Page.data.entity.getId(), 0, 864340003, false); //864340003: Sent to main laboratory                                  
                        ust_ostpresential.Funcion.fnc_UpdateFlagRunPlugin("ust_flagreturnteamplugin");
                    }
                }

            }

        }
    },

    //=================================================================
    // Creator  : Carlos Mezones
    // Creation : 26/08/2018
    // JIRA     : 3198
    // Function : Get Point Of Sales
    //=================================================================
    fnc_UpdateFlagRunPlugin: function (var_NameField) {
        if (var_NameField === null || var_NameField === "") return;

        var flagdiagnosischanged = Xrm.Page.getAttribute(var_NameField).getValue();
        var flagrunplugin = false;
        if (flagdiagnosischanged === false || flagdiagnosischanged === null) flagrunplugin = true;
        Xrm.Page.getAttribute(var_NameField).setValue(flagrunplugin);
        Xrm.Page.getAttribute(var_NameField).setSubmitMode("always");

        var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("ust_ostpresential", Xrm.Page.data.entity.getId());
        updateEntity.attributes[var_NameField] = flagrunplugin;
        var updateOST_DL = XrmServiceToolkit.Soap.Update(updateEntity);
    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 08/08/2018
    // JIRA     : 3217
    // Function : 
    //=================================================================
    fnc_ShowValidateExemption: function () {


        //CODE  - NAMEPHASE
        //62001 - Creation
        //62002 - Documents - Creation
        //62003 - Payment - Creation
        //62004 - Diagnóstico
        //62005 - Validate quotation
        //62006 - Reparation
        //62007 - Delivery - Local
        //62008 - Payment - Delivery
        //62009 - Document - Closing
        //62010 - Conclusion
        //62011 - Prepare Delivery
        //62012 - Delivery - Deliver

        var ListaFases = ["62005"];
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso === "active") {
            var nameFase = stage.getName();
            return ust_ostpresential.Funcion.fnc_ConsultNameFaseByCode('ostphase', nameFase, ListaFases);
        }

    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Carlos Mezones
    //Requirement   : 3230
    //Date          : 2018-08-22
    //Function Purpose: Gets the IMF values for the service
    //-------------------------------------------------------------------------------------------------
    fnc_ValidateExemption: function () {
        //debugger;

        try {
            var alert1033 = "";
            var alert3082 = "";
            var lcid = Xrm.Page.context.getUserLcid();

            var customerId = Xrm.Page.getAttribute("ust_deviceowner") !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue() !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0] !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].id !== null ? Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].id : "";

            if (customerId === "") {
                alert1033 = "The device owner field is empty.";
                alert3082 = "El campo Dueño del equipo esta vacio.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            } else {
                var isPostPago = ust_ostpresential.Funcion.fnc_GetTipoCLiente(customerId);

                if (isPostPago) {
                    alert1033 = "The individual has no a postpaid subscription.";
                    alert3082 = "El cliente no tiene un contrato postpago.";

                    Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                    return;
                }
            }

            var var_CDId;
            var Lookup_CD = Xrm.Page.getAttribute("ust_imeisearch").getValue();

            if (Lookup_CD !== null)
                var_CDId = Lookup_CD[0].id;

            if (var_CDId === null) {
                alert1033 = "The customer device field is empty.";
                alert3082 = "El campo dispositivo del cliente esta vacio.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            }

            var objCD = ust_ostpresential.Funcion.fnc_GetCustomerDeviceById(var_CDId);

            if (objCD === null) {
                alert1033 = "The customer device does not exist.";
                alert3082 = "El dispositivo del cliente no existe.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            }

            //var num_ConsumedIMF = objCD.ConsumedIMF!==null ? objCD.ConsumedIMF : "";                
            var txt_Contract = objCD.attributes.amxperu_contractid !== null ? objCD.attributes.amxperu_contractid.value : "";

            if (txt_Contract === null || txt_Contract === "") {
                alert1033 = "There is no associated contract.";
                alert3082 = "No existe contrato asociado.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            }

            var objSubscription = ust_ostpresential.Funcion.fnc_GetSubscriptionByContrato(txt_Contract);

            if (objSubscription === null) {
                alert1033 = "The Subscription does not exist.";
                alert3082 = "La Suscripción no existe.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            }
            debugger;
            var amxperu_msisdn = objSubscription.attributes.etel_msisdnserialno !== null ? objSubscription.attributes.etel_msisdnserialno.value : "";
            var var_IMFConsumido = objSubscription.attributes.amxperu_consumedimf !== null ? objSubscription.attributes.amxperu_consumedimf.value : 0;
            var var_subscriptionid = objSubscription.attributes.etel_subscriptionid !== null ? objSubscription.attributes.etel_subscriptionid.value : "";

            //IMF Actual
            if (amxperu_msisdn === "") {
                alert1033 = "Directory Number was not provided.";
                alert3082 = "No se indicó el número de directorio.";

                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);

                return;
            }

            //SERVICIO 01 (INT-CHQ 1-N-0001): tomar los valores para cargar en el formulario
            var objResponse01 = ust_ostpresential.Funcion.fnc_Get_Service_IMR_IMF(amxperu_msisdn);

            if (objResponse01 === null) {
                alert1033 = "The service 1 is with errors.";
                alert3082 = "El servicio 1 esta con errores.";

                Xrm.Utility.alertDialog(lcid === 1033 ? msg1033 : msg3082);

                return;
            }

            var var_IMFActual = objResponse01.ConsumedIMF !== null ? parseFloat(objResponse01.ConsumedIMF) : 0;

            if (Xrm.Page.getAttribute("ust_currentimf") !== null)
                Xrm.Page.getAttribute("ust_currentimf").setValue(var_IMFActual);

            if (Xrm.Page.getAttribute("ust_consumedimf") !== null)
                Xrm.Page.getAttribute("ust_consumedimf").setValue(var_IMFConsumido);

            //SERVICIO 02 (INT-CHQ 1-N-0052): tomar los valores para cargar en el formulario
            var objResponse02 = ust_ostpresential.Funcion.fnc_Get_Service_Routing();

            if (objResponse02 === null) {
                alert1033 = "The service 2 is with errors.";
                alert3082 = "El servicio 2 esta con errores.";

                Xrm.Utility.alertDialog(lcid === 1033 ? msg1033 : msg3082);

                return;
            }

            var var_CostoReparacion = 0;

            if (objResponse02.respuestaFidelizacion !== null) {
                if (!(objResponse02.respuestaFidelizacion.costoReparacion === null || objResponse02.respuestaFidelizacion.costoReparacion === ""))
                    var_CostoReparacion = parseFloat(objResponse02.respuestaFidelizacion.costoReparacion);
            }

            //Actualizar el campo de la OST, Monto a Pagar (S/.)
            if (Xrm.Page.getAttribute("ust_finalamounttopay") !== null)
                Xrm.Page.getAttribute("ust_finalamounttopay").setValue(var_CostoReparacion);

            //Actualizar el campo Monto Fidelizado
            //Monto Fidelizado (S/.): ust_waivedamount
            //Total Cotizado (S/.): ust_totalquotation
            //Monto a Pagar (S/.): ust_finalamounttopay
            var var_TotalCotizado = Xrm.Page.getAttribute("ust_totalquotation") !== null ? Xrm.Page.getAttribute("ust_totalquotation").getValue() : 0;
            var var_MontoPagar = Xrm.Page.getAttribute("ust_finalamounttopay") !== null ? Xrm.Page.getAttribute("ust_finalamounttopay").getValue() : 0;
            var var_MontoFidelizado = var_TotalCotizado - var_MontoPagar;

            if (Xrm.Page.getAttribute("ust_waivedamount") !== null)
                Xrm.Page.getAttribute("ust_waivedamount").setValue(var_MontoFidelizado);

            //add line for task-3221
            Xrm.Page.getAttribute('ust_loyaltyvalidated').setValue(true);

        }
        catch (ex) {
            alert(ex.message);
        }
    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Carlos Mezones
    //Requirement   : 3230
    //Date          : 2018-08-29
    //Function Purpose: Gets the customer device by Id
    //-------------------------------------------------------------------------------------------------
    fnc_GetCustomerDeviceById: function (var_CustomerDeviceId) {
        var objEntity = null;

        try {
            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="amxperu_customerdevice">';
            fetchXML += '<attribute name="amxperu_customerdeviceid" />';
            fetchXML += '<attribute name="amxperu_name" />';
            fetchXML += '<attribute name="amxperu_msisdn" />';
            fetchXML += '<attribute name="amxperu_contractid" />';
            fetchXML += '<order attribute="amxperu_name" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="amxperu_customerdeviceid" operator="eq" value="' + var_CustomerDeviceId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXML);

            if (objCD.length > 0)
                objEntity = objCD[0];
        } catch (ex) {
            alert(ex.message);
        }

        return objEntity;
    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Carlos Mezones
    //Requirement   : 3230
    //Date          : 2018-08-29
    //Function Purpose: Gets the Subscription by contrato
    //-------------------------------------------------------------------------------------------------
    fnc_GetSubscriptionByContrato: function (var_Contrato) {
        var objEntity = null;

        try {
            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="etel_subscription">';
            fetchXML += '<attribute name="etel_subscriptionid" />';
            fetchXML += '<attribute name="etel_name" />';
            fetchXML += '<attribute name="amxperu_consumedimf" />';
            fetchXML += '<attribute name="etel_msisdnserialno" />';
            fetchXML += '<order attribute="etel_name" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="etel_externalid" operator="eq" value="' + var_Contrato + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXML);

            if (objCD.length > 0)
                objEntity = objCD[0];
        }
        catch (ex) {
            alert(ex.message);
        }

        return objEntity;
    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Carlos Mezones
    //Requirement   : 3230
    //Date          : 2018-08-27
    //Function Purpose: Gets the values IMR IMF
    //-------------------------------------------------------------------------------------------------
    fnc_Get_Service_IMR_IMF: function (var_MSISDN) {
        //debugger;
        var objResponse = null;
        var psbWorkflowUrl = ust_ostpresential.Funcion.fnc_ConsultCRMConfiguration('PsbRestServiceUrl');
        var serviceUrl = psbWorkflowUrl + 'AmxPeruGetCustomerConsumedInfo';

        try {
            var req = {
                "request": {
                    "ServiceIdentifier": var_MSISDN //"51900000909"
                }
            };

            $.ajax({
                type: "POST",
                url: serviceUrl,
                dataType: "json",
                data: JSON.stringify(req, null, 4),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                xhrFields:
                {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    //debugger;
                    if (data)
                        objResponse = data.Output.response;
                },
                error: function (data) {
                    alert("Error."); //data.statusText
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }

        return objResponse;
    },

    fnc_GetChannelPointOfSales: function () {
        //debugger;
        var var_ChannelName = "";

        try {
            var var_PVId;
            var Lookup_PV = Xrm.Page.getAttribute("ust_originpos").getValue();

            if (Lookup_PV !== null)
                var_PVId = Lookup_PV[0].id;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="amxperu_pointofsales">';
            fetchXML += '<attribute name="amxperu_pointofsalesid" />';
            fetchXML += '<attribute name="amxperu_name" />';
            fetchXML += '<attribute name="amxperu_channelid" />';
            fetchXML += '<order attribute="amxperu_name" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="amxperu_pointofsalesid" operator="eq" value="' + var_PVId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXML);

            for (var j = 0; j <= objCD.length - 1; j++) {
                var_ChannelName = (objCD[j].attributes.amxperu_channelid === undefined) ? "" : objCD[j].attributes.amxperu_channelid.formattedValue;
                break;
            }
        }
        catch (ex) {
            alert(ex.message);
        }

        return var_ChannelName;
    },

    fnc_GetExternalId_Individual: function () {
        //debugger;
        var var_ExternalId = "";

        try {
            var var_CDId;
            var Lookup_CD = Xrm.Page.getAttribute("ust_deviceowner").getValue();

            if (Lookup_CD !== null)
                var_CDId = Lookup_CD[0].id;

            fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>";
            fetchXml += "<entity name='contact'>";
            fetchXml += "<attribute name='fullname' />";
            fetchXml += "<attribute name='contactid' />";
            fetchXml += "<attribute name='etel_externalid' />";
            fetchXml += "<order attribute='fullname' descending='false' />";
            fetchXml += "<filter type='and'>";
            fetchXml += "<condition attribute='contactid' operator='eq' value='" + var_CDId + "' />";
            fetchXml += "</filter>";
            fetchXml += "</entity>";
            fetchXml += "</fetch>";

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXml);

            var_ExternalId = objCD.attributes.etel_externalid !== null ? objCD.attributes.etel_externalid.value : "";
        }
        catch (ex) {
            alert(ex.message);
        }

        return var_ExternalId;
    },

    fnc_GetTipoCLiente: function (customerId) {
        //debugger;
        var result = "";

        try {
            var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>";
            fetchXml += "<entity name='etel_subscription'>";
            fetchXml += "<attribute name='etel_subscriptionid' />";
            fetchXml += "<attribute name='etel_name' />";
            fetchXml += "<attribute name='createdon' />";
            fetchXml += "<order attribute='etel_name' descending='false' />";
            fetchXml += "<filter type='and'>";
            fetchXml += "<condition attribute='etel_individualcustomerid' operator='eq' value='" + customerId + "' />";
            fetchXml += "<condition attribute='amxperu_servicetype' operator='eq' value='10' />";
            fetchXml += "</filter>";
            fetchXml += "</entity>";
            fetchXml += "</fetch>";

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXml);

            result = objCD.length > 0;
        }
        catch (ex) {
            alert(ex.message);
        }

        return result;
    },

    fnc_Get_Service_Routing: function () {
        //debugger;

        var objResponse = null;

        try {
            var var_OSTName = Xrm.Page.getAttribute("ust_name") !== null ? Xrm.Page.getAttribute("ust_name").getValue() : "";

            var customerId = Xrm.Page.getAttribute("ust_deviceowner") !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue() !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0] !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].id !== null ? Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].id : "";
            var entityType = Xrm.Page.getAttribute("ust_deviceowner") !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue() !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0] !== null && Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].entityType !== null ? Xrm.Page.getAttribute("ust_deviceowner").getValue()[0].entityType : "";
            var ostId = Xrm.Page.data.entity.getId().toString();

            var var_MontoPagar = ust_ostpresential.Funcion.fnc_Get_PaidTotalAmount(customerId, entityType, ostId);
            var var_TipoProductoMovil = "MOVIL";
            var var_TipoOperacionFidelizacion = "FIDELIZACION";
            var var_Usuario = ust_ostpresential.Funcion.fnc_Get_UserCode();
            var var_CanalPresencial = "PRESENCIAL";
            var var_CanalPuntoVenta = ust_ostpresential.Funcion.fnc_GetChannelPointOfSales();
            var var_Origen = "Servicio Técnico";
            var var_ExternalId_Individual = ust_ostpresential.Funcion.fnc_GetExternalId_Individual();
            var var_TipoCLiente = entityType === "contact" ? "CONSUMER" : "CARTERIZADO";
            var var_SegmentoCLiente = Xrm.Page.getAttribute("ust_customersegmentcode") !== null && Xrm.Page.getAttribute("ust_customersegmentcode").getText() !== null ? Xrm.Page.getAttribute("ust_customersegmentcode").getText() : "";

            var req = {
                "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
                "request": {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruConsultaRetencionEnrutamientoRequestDTO, AmxPeruPSBActivities",
                    "DecisionID": var_OSTName,
                    "idCaso": var_OSTName,
                    "perfilAsesor": "",
                    "perfilEscalamiento": "",
                    "tipoProducto": var_TipoProductoMovil,
                    "tipoOperacion": var_TipoOperacionFidelizacion,
                    "ostCotizada": var_MontoPagar,
                    "usuario": var_Usuario,
                    "canal": var_CanalPresencial,
                    "puntoVenta": var_CanalPuntoVenta,
                    "origen": var_Origen,
                    "motivo": {
                        "$type": "AmxPeruPSBActivities.Activities.External.MotivoRequestTypeDTO, AmxPeruPSBActivities",
                        "motivoSolicitud": "",
                        "submotivoSolicitud": ""
                    },
                    "servicio": {
                        "$type": "AmxPeruPSBActivities.Activities.External.ServicioRequestTypeDTO, AmxPeruPSBActivities",
                        "planAplicaMB": "",
                        "planAplicaVOZoSMS": "",
                        "planRRSSFree": "",
                        "saldoMBLinea": 0.0,
                        "saldoMinutosLinea": 0.0,
                        "tipoPlay": null,
                        "tieneConsumoExacto": "",
                        "saldoIMR": 0.0,
                        "saldoIMF": 0.0,
                        "tienePrestamoEquipo": "",
                        "reparacionGarantia": "",
                        "servicios": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.ServicioReqTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [
                                {
                                    "$type": "AmxPeruPSBActivities.Activities.External.ServicioReqTypeDTO, AmxPeruPSBActivities",
                                    "descripcion": "",
                                    "codigo": ""
                                }
                            ]
                        },
                        "cantLlamUltMes": "",
                        "tieneAlquilerDecoHD": "",
                        "tieneAlquilerDecoBas": "",
                        "tieneAlquilerDecoDVR": "",
                        "planoInstalacion": "",
                        "codigoUbigeo": "",
                        "plan": {
                            "$type": "AmxPeruPSBActivities.Activities.External.PlanRequestTypeDTO, AmxPeruPSBActivities",
                            "plazoAcuerdo": null,
                            "tipoAcuerdo": "",
                            "cargoFijo": 0.0,
                            "mesesVencimientoAcuerdo": null,
                            "acuerdoLibre": ""
                        }
                    },
                    "cliente": {
                        "$type": "AmxPeruPSBActivities.Activities.External.ClienteRequestTypeDTO, AmxPeruPSBActivities",
                        "idCliente": var_ExternalId_Individual,
                        "tipoCliente": var_TipoCLiente,
                        "capacidadPagoCliente": "",
                        "nivelSatisfaccionCliente": null,
                        "cantidadLineasCliente": 3,
                        "antiguedadCliente": null,
                        "segmentoCliente": var_SegmentoCLiente,
                        "edadCliente": 0,
                        "generoCliente": "",
                        "comportamientoPago": ""
                    }
                }
            };

            var psbWorkflowUrl;
            //psbWorkflowUrl = Ust_Case.Funcion.fnc_getConfigValues("PsbRestServiceUrl");//http://localhost:7004/api/v1/workflow/
            psbWorkflowUrl = ust_ostpresential.Funcion.fnc_ConsultCRMConfiguration('PsbRestServiceUrl');
            var serviceUrl = psbWorkflowUrl + 'AmxPeruConsultaRetencionEnrutamiento';

            $.ajax({
                type: "POST",
                url: serviceUrl,
                dataType: "json",
                data: JSON.stringify(req, null, 4),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                xhrFields:
                {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {
                    //debugger;
                    if (data) objResponse = data.Output.response;
                },
                error: function (data) {
                    alert("Error."); //data.statusText
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }

        return objResponse;
    },

    fnc_Get_UserCode: function () {
        var userCode = "";
        var userId = Xrm.Page.context.getUserId();

        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>";
        fetchXml += "<entity name='systemuser'>";
        fetchXml += "<attribute name='fullname' />";
        fetchXml += "<attribute name='systemuserid' />";
        fetchXml += "<attribute name='amxperu_usercode' />";
        fetchXml += "<filter type='and'>";
        fetchXml += "<condition attribute='systemuserid' operator='eq-userid' />";
        fetchXml += "</filter>";
        fetchXml += "</entity>";
        fetchXml += "</fetch>";

        var objUser = XrmServiceToolkit.Soap.Fetch(fetchXml);

        if (objUser.length > 0) {
            userCode = objUser[0].attributes.amxperu_usercode !== null && objUser[0].attributes.amxperu_usercode !== undefined ? objUser[0].attributes.amxperu_usercode : "";
        }

        return userCode;
    },

    fnc_Get_PaidTotalAmount: function (customerId, entityType, ostId) {
        var totalAmount = 0;

        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>";
        fetchXml += "<entity name='ust_ostpresential'>";
        fetchXml += "<attribute name='ust_ostpresentialid' />";
        fetchXml += "<attribute name='ust_name' />";
        fetchXml += "<attribute name='ust_finalamounttopay' />";
        fetchXml += "<order attribute='ust_name' descending='false' />";
        fetchXml += "<filter type='and'>";
        fetchXml += "<condition attribute='ust_deviceowner' operator='eq' uitype='" + entityType + "' value='" + customerId + "' />";
        fetchXml += "<condition attribute='createdon' operator='last-x-months' value='12' />";
        fetchXml += "<condition attribute='ust_ostpresentialid' operator='ne' value='" + ostId + "' />";
        fetchXml += "</filter>";
        fetchXml += "</entity>";
        fetchXml += "</fetch>";

        var objUser = XrmServiceToolkit.Soap.Fetch(fetchXml);

        if (objUser !== null && objUser !== undefined) {
            for (var i = 0; i < objUser.length; i++) {
                totalAmount += objUser[i].attributes
            }
        }

        return totalAmount;
    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Jordy Sullca
    //Requirement   : 3221
    //Date          : 20-09-2018
    //Function : Lock Field or UnlockField On Business Process by name , valor 
    //-------------------------------------------------------------------------------------------------
    fnc_LockUnLockFieldOnBusinessProcess: function (name, valor) {

        if (Xrm.Page.getControl(name) != null) {
            //Set the control disabled or enable
            Xrm.Page.getControl(name).setDisabled(valor);
        }

    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Jordy Sullca
    //Requirement   : 3221
    //Date          : 20-09-2018
    //Function : set Value Diagnosis Cost? = SI  
    //-------------------------------------------------------------------------------------------------

    fnc_setValueDiagnosisCostOnChange: function () {
        debugger;
        //Xrm.Page.getAttribute("ust_costofdiagnosis").setValue("0.00")
        var DiagnosticCost = Xrm.Page.getAttribute('ust_costofdiagnosis').getValue();

        if (DiagnosticCost != null && DiagnosticCost != undefined) {

            var res = DiagnosticCost.substring(1);

            if (res > 0) {

                Xrm.Page.getAttribute('ust_diagnosiscost').setValue(true);

            } else {
                Xrm.Page.getAttribute('ust_diagnosiscost').setValue(false);
            }

        }else{
            Xrm.Page.getAttribute('ust_diagnosiscost').setValue(false);
        }

    }

};