// =================================================
// Creator      : Sergio Atencio
// Creation     : 22/05/2018
// Entity       : 
// State        : Pending
// =================================================

// =================================================
// Global variables
var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READ = 3;

// =================================================

if (typeof (Ust_Case) == "undefined") { Ust_Case = {}; }

Ust_Case.Funcion = {

    //=================================================================
    // Creator  : Sergio Atencio
    // Creation : 22/05/2018
    // Function : 
    // Creator  : William Quioz
    // Update : 15/06/2018
    // Function : 
    //REQ: 53-1-003
    //=================================================================
    onLoad_case: function (econtext) {
        //debugger;

        var type = Xrm.Page.ui.getFormType();
        if (type !== CRM_FORM_TYPE_UPDATE) {
            // 
            //debugger;
            Ust_Case.Funcion.fnc_toggleSectionDisplayState();
            Ust_Case.Funcion.fnc_showCorrespondingTab();
            Ust_Case.Funcion.fnc_CustomerRelatedSAR();
            //Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("general", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_27", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("AssociatedCase", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_26", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_28", true); //SLA

            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
        }

        else if (type == CRM_FORM_TYPE_UPDATE) {
            //

            Ust_Case.Funcion.fnc_toggleSectionDisplayState();
            Ust_Case.Funcion.fnc_fiedRequired();
            Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();
            //Ust_Case.Funcion.fnc_OnchangeFase();
            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("none");
            Ust_Case.Funcion.fnc_DisableButtonGenerateDocumentTrasu();
            Ust_Case.Funcion.fnc_DisableButtonGenerateResponseLetter();
            Ust_Case.Funcion.fnc_OnChange_ContactField();

            Ust_Case.Funcion.fnc_CustomerRelatedSAR();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("general", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_27", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("AssociatedCase", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_26", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_28", true); //SLA



            var correlativoSAR = Xrm.Page.getAttribute("ust_correlationsar").getValue(); //SAR OSIPTEL  
            var correlativoReclamo = Xrm.Page.getAttribute("ust_osiptelcomplaintid").getValue(); //Claim OSIPTEL 
            var correlativoQuejaOsiptel = Xrm.Page.getAttribute("ust_grievanceinternalid").getValue(); //Queja OSIPTEL   
            var reclamoLDR = Xrm.Page.getAttribute("ust_indecopicomplaintid").getValue(); //Reclamo LDR
            var correlativoOsiptel = Xrm.Page.getAttribute("ust_osipteldenunciationid").getValue(); //OSIPTEL Denunciation(Denuncia)
            var denunciaIndecopi = Xrm.Page.getAttribute("ust_expedientnumber").getValue(); //Denuncia(Complaint) Indecopi  
            var reclamoSAC = Xrm.Page.getAttribute("ust_saccomplaintid").getValue(); //Reclamo SAC  
            var complaintPhase = Xrm.Page.getAttribute("ust_complaintphase").getValue();
            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();

            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";

            ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                var datos = result;

                if (datos != null && datos.d.results.length > 0) {
                    var entidad = datos.d.results[0];
                    if (entidad.ust_Code != null) {

                        tipoCasoCode = entidad.ust_Code;
                    }
                }
            });

            if (tipoCasoCode == "004" && sarResponse == "864340001") { //No Aceptada

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                if (correlativoSAR != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getAttribute("amxperu_casetype").controls.forEach(function (control, index) { control.setDisabled(true); });

                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }

            }
            else if (tipoCasoCode == "004" && sarResponse == "864340000") // Aceptada) 
            {

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

                if (correlativoSAR != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getAttribute("amxperu_casetype").controls.forEach(function (control, index) { control.setDisabled(true); });

                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }

            }
            else if (tipoCasoCode == "004") {

                //Xrm.Page.getControl("header_process_amxperu_casetype_lookupValue").setDisabled(true);  //Disabeld
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELDenunciation", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("007");

                if (correlativoOsiptel != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }

            else if (tipoCasoCode == "005" && sarResponse == null && complaintPhase == "864340001") { //1st Instance


                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                if (correlativoReclamo != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }

            }
            else if (tipoCasoCode == "005" && sarResponse == "864340000" && complaintPhase != "864340002") // Aceptada
            {

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                if (correlativoReclamo != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }

            else if (tipoCasoCode == "005" && complaintPhase == "864340002") { // Appeal

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");

                if (correlativoReclamo != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }
            else if (tipoCasoCode == "004" && complaintPhase == "864340002" && sarResponse == "864340000") { // Appeal

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("012");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                if (correlativoReclamo != null) {
                    /*Ocultar ca mpo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }

            }
            else if (tipoCasoCode == "005" && sarResponse == null && complaintPhase == "864340000") { //Averia


                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                if (correlativoReclamo != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }
            else if (tipoCasoCode == "006") { //Queja OSIPTEL

                //Xrm.Page.getAttribute("casetypecode").controls.forEach(function (control, index) { control.setDisabled(true); });
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OsiptelGrievance", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("006");

                if (correlativoQuejaOsiptel != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }

            }
            else if (tipoCasoCode == "008") { //Reclamo LDR

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimLDR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("008");

                if (reclamoLDR != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }
            else if (tipoCasoCode == "009") { //Denuncia Indecopi

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("IndecopiDenunciation", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("009");

                if (denunciaIndecopi != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }
            else if (tipoCasoCode == "010") { //Reclamo SAC

                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimSAC", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("010");

                if (reclamoSAC != null) {
                    /*Ocultar campo*/
                    Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                    var controlCaseType = Xrm.Page.getControl("header_process_amxperu_casetype");
                    if (controlCaseType != null) {
                        controlCaseType.setDisabled(true);
                    }
                }
            }

            else if (tipoCasoCode == "011") {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("RetentionLoyalty", true);
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
            }


        }

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 07/06/2018
    // Function : Show tabs depends on Answers.
    //=================================================================
    onchange_CaseAns: function () {

        Ust_Case.Funcion.fnc_hidetabOptions();
        Ust_Case.Funcion.fnc_hidetabOptionsOpsitelSAR();
        Ust_Case.Funcion.fnc_CustomerRelatedSAR();
        Ust_Case.Funcion.fnc_OnchangeFase();
    },




    //=================================================================
    // Creator  : Sergio Atencio
    // Creation : 22/05/2018
    // Function : Show tabs depends on case typifications.
    //=================================================================
    onchange_CaseTypification: function () {
        //debugger;
        Ust_Case.Funcion.fnc_showCorrespondingTab();

        // USAR DESDE WEB RESOURCE HTML PARA GRILLAS Y CAMPOS

        //var orgLcid = Xrm.Page.context.getUserLcid();
        //alert(orgLcid); 
        //var datos = ITC_FNC_Generico.Funcion.fnc_getAllTranslations(orgLcid, 'js_BI_CustomertBillingAddress');
        //var mensaje = ITC_FNC_Generico.Funcion.fnc_getMessageTranslation(datos, "tNumberOfCopies");
        //alert(mensaje);


    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 04/06/2018
    // Function : save case.
    //=================================================================
    onsave_Case: function (econtext) {
        //
        var type = Xrm.Page.ui.getFormType();
        if (type !== CRM_FORM_TYPE_UPDATE) {
            Ust_Case.Funcion.fnc_QuestionSaveCase(econtext);
            Ust_Case.Funcion.fnc_OnSaveRegulated();
        }
        Ust_Case.Funcion.fnc_OnSaveReclamoOsiptel();
    },
    //=================================================================
    // Creator  : Sergio Atencio
    // Creation : 22/05/2018
    // Function : Function that show corresponding tabs
    // Creator  : William Quiroz
    // Update   : 15/06/2018
    // Function : 
    //REQ: 53 - 1 - 001 
    //=================================================================
    fnc_showCorrespondingTab: function () {
        //
        //Ust_Case.Funcion.fnc_hideAllTabs();
        Ust_Case.Funcion.fnc_fiedRequired();
        Ust_Case.Funcion.fnc_toggleSectionDisplayState();
        Ust_Case.Funcion.fnc_CustomerRelatedSAR();
        ITC_FNC_Generico.Funcion.fnc_showHideTabs("general", true);
        ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_27", true);
        ITC_FNC_Generico.Funcion.fnc_showHideTabs("AssociatedCase", true);
        ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_26", true);
        //ITC_FNC_Generico.Funcion.fnc_SateFase_FieldsRequerid();

        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
        Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
        Xrm.Page.getAttribute("customerid").setRequiredLevel("required");

        if (caseType != null) {

            //Query to Case type.
            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";

            ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                var datos = result;

                if (datos != null && datos.d.results.length > 0) {
                    var entidad = datos.d.results[0];
                    if (entidad.ust_Code != null) {

                        tipoCasoCode = entidad.ust_Code;
                    }
                }
            });

            try {

                //Show or hide tabs.
                if (tipoCasoCode === "004") { // OSIPTEL SAR Related information.

                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);  //Anterior OSIPTELAppealComplain

                    //Set mandatory fields according tab.   
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                }
                else if (tipoCasoCode === "005") { // Tipo de caso: "Reclamo OSIPTEL" -- " CLAIM OSIPTEL" ??

                    var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();

                    if (sarResponse == "864340001") // No Aceptada
                    {
                        ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);

                        //Set mandatory fields according tab. 
                        Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                        ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                        //Set mandatory fields according tab.
                        Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

                        Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                        Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                        Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                        Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                        Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                        Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                    }
                    else {
                        ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                        Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                        Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                        Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                        Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                        Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                        Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                        Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                        Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                    }

                }
                else if (tipoCasoCode === "006") { // Tipo de caso: "QUEJA OSIPTEL" --  "OSIPTEL Complain"

                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("OsiptelGrievance", true);

                    //Set mandatory fields according tab.
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");

                }
                else if (tipoCasoCode === "007")// Tipo de caso: "Denuncia OSIPTEL" -- "OSIPTEL Complaint" ??
                {
                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELDenunciation", true);

                    //Set mandatory fields according tab.
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    //Limpiar  los campos con valores 
                    Xrm.Page.getAttribute("ust_sarresponse").setValue(null);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                }
                else if (tipoCasoCode === "008") { // Tipo de caso: "RECLAMO LDR" -- "LDR Claim"

                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimLDR", true);

                    //Set mandatory fields according tab.
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                }
                else if (tipoCasoCode === "009") { // Tipo de caso: "DENUNCIA INDECOPI"--"INDECOPI Complaint"

                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("IndecopiDenunciation", true);

                    //Set mandatory fields according tab.
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");

                } else if (tipoCasoCode === "010") { // Tipo de caso: "RECLAMO SAC" -- "SAC Claim"

                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimSAC", true);

                    //Set mandatory fields according tab. 
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("RetentionLoyalty");
                }
                else if (tipoCasoCode === "11") { // Tipo de caso "RETENCION / FIDELIZACION" -- "Retention / Loyalty"

                    //debugger;
                    ITC_FNC_Generico.Funcion.fnc_showHideTabs("RetentionLoyalty", true);

                    //Set mandatory fields according tab. 
                    Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                    Ust_Case.Funcion.fnc_Clearformfields("ClaimOsiptel");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                    Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                    Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                    Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                    Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
                }

            } catch (ex) {
            }
        }

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 04/06/2018
    // Function : Respuesta SAR
    //=================================================================
    fnc_QuestionSaveCase: function (econtext) {
        // 
        try {

            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();
            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("none");
            var mensaje;

            //Query to Case type.          
            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";

            ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                var datos = result;

                if (datos != null && datos.d.results.length > 0) {
                    var entidad = datos.d.results[0];
                    if (entidad.ust_Code != null) {

                        tipoCasoCode = entidad.ust_Code;
                    }
                }
            });

            if (tipoCasoCode === "004" && sarResponse == "864340001") {// No aceptada

                var opcion = confirm("¿Seguro desea generar código SAR?");
                if (opcion == true) {
                    mensaje = "SI";
                } else {
                    mensaje = "NO";
                    econtext.getEventArgs().preventDefault();
                }

                if (mensaje == "SI") {
                    Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente 
                }
            }
            else if (tipoCasoCode == "005" && sarResponse == "864340001") // No aceptada
            {
                var opcion = confirm("¿Seguro desea generar código SAR?");
                if (opcion == true) {
                    mensaje = "SI";
                } else {
                    mensaje = "NO";
                    econtext.getEventArgs().preventDefault();
                }

                if (mensaje == "SI") {
                    Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente 
                }
            }

            else {

                var opcion2 = confirm("¿Seguro desea guardar el caso?");
                if (opcion2 == true) {
                    mensaje = "SI";
                } else {
                    mensaje = "NO";
                    econtext.getEventArgs().preventDefault();
                }
                if (mensaje == "SI") {
                    Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente 
                }
            }


        } catch (ex) {

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 06/06/2018
    // Function : Selection Complaint Phase (Appeal, Grievance o 1st Instance)
    //=================================================================
    fnc_hidetabOptions: function () {

        //
        try {

            var complaintPhase = Xrm.Page.getAttribute("ust_complaintphase").getValue();
            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();
            Ust_Case.Funcion.fnc_fiedRequired();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");

            if (complaintPhase == "864340002" && sarResponse == null)// Appeal
            {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("012");

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340002" && sarResponse == "864340001")// Appeal y No Aceptada
            {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("012");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340000" && sarResponse == null)// Averia
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                //Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340000" && sarResponse == "864340001")// Averia y No Aceptada
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                // Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340001" && sarResponse == null)// 1st Instance
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340001" && sarResponse == "864340001")// 1st Instance y No Aceptada
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");
                Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }

        } catch (ex) {

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 14/06/2018
    // Function : Selection SAR response (Accepted o Not Accepted)
    //=================================================================
    fnc_hidetabOptionsOpsitelSAR: function () {

        try {

            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();

            if (sarResponse == "864340000") // Aceptada
            {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", false);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                Ust_Case.Funcion.fnc_fiedRequired();
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (sarResponse == "864340001") // No Aceptada
            {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");

                // Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }

        } catch (ex) {

        }

    },


    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 05/07/2018
    // Req      : AMXPEASIS-3148
    // Function : 1. Obtaing case type and category 1.
    //=================================================================

    fnc_OnSaveRegulated: function () {

        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
        var category1 = Xrm.Page.getAttribute("ust_category1").getValue();

        var mensaje;
        if (caseType != null) {

            //Query to Case type.          
            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";
            if (strConsultaTipoCaso != null) {
                ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                    var datos = result;

                    if (datos != null && datos.d.results.length > 0) {
                        var entidad = datos.d.results[0];
                        if (entidad.ust_Code != null) {
                            tipoCasoCode = entidad.ust_Code;
                        }
                    }
                });
            }

        }

        if (category1 != null) {

            //Query to Case Category 1.          
            var strConsultaCategory1 = "amxperu_casecategorySet?$select=ust_Code,&$filter=amxperu_casecategoryId eq guid'" + category1[0].id + "'";

            var tipoCategory1 = "";
            if (strConsultaCategory1 != null) {
                ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaCategory1, function (result) {
                    var datoscategory = result;

                    if (datoscategory != null && datoscategory.d.results.length > 0) {
                        var entidadCategory = datoscategory.d.results[0];
                        if (entidadCategory.ust_Code != null) {
                            tipoCategory1 = entidadCategory.ust_Code;
                        }
                    }
                });
            }
        }

        if (tipoCasoCode != null && tipoCategory1 != null) {

            if (tipoCasoCode == 002 && tipoCategory1 == 1003) {
                Ust_Case.Funcion.fnc_ConsultMarketSegmentxClient();
            }
        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 05/07/2018
    // Req      : AMXPEASIS-3148
    // Function : 1. Consult the "Segmento del cliente" (amxperu_customersegmentcode) from the "costumer client"  
    //=================================================================
    fnc_ConsultMarketSegmentxClient: function () {

        var customerClient = Xrm.Page.getAttribute("customerid").getValue();

        if (customerClient != null) {

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='fullname'/>" +
                "<attribute name='contactid'/>" +
                "<attribute name='etel_marketsegmentid'/>" +
                "<attribute name='amxperu_customersegmentcode'/>" +
                "<order descending='false' attribute='fullname'/>" +
                "<filter type='and'>" +
                "<condition attribute='contactid' value='" + customerClient[0].id + "' uitype='contact' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);

            if (fetchCode.length > 0) {
                var nameMarketSegment = fetchCode[0].attributes.amxperu_customersegmentcode;

                if (nameMarketSegment != null) {
                    Ust_Case.Funcion.fnc_ConsultCRMConfiguration(nameMarketSegment.formattedValue);
                } else {
                    alert("El cliente" + customerClient[0].name + "no tiene registrado un 'Segmento de Cliente'. Por favor verifiquelo");
                }
            }

        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 05/07/2018
    // Req      : AMXPEASIS-3148
    // Function : 1. Compare nameMarketSegment with record in CRM Configuration
    //=================================================================
    fnc_ConsultCRMConfiguration: function (nameMarketSegment) {

        var customerClient = Xrm.Page.getAttribute("customerid").getValue();

        if (customerClient != null) {

            var ConsumerOutboundSegmentValidation = "ConsumerOutboundSegmentValidation";

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='etel_crmconfiguration'>" +
                "<attribute name='etel_crmconfigurationid'/>" +
                "<attribute name='etel_name'/>" +
                "<attribute name='etel_value'/>" +
                "<order descending='false' attribute='etel_name'/>" +
                "<filter type='and'>" +
                "<condition attribute='etel_name' value='" + ConsumerOutboundSegmentValidation + "' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {

                var nameMarketSegmentCRMConfig = fetchCode[0].attributes.etel_value;

                if (nameMarketSegmentCRMConfig != null) {
                    //Declaración de arreglo con los valores para este registro de nombre = "ConsumerOutboundSegmentValidation"
                    var datos = nameMarketSegmentCRMConfig.value.split(",");

                    var Equal = false;

                    for (x = 0; x < datos.length; x++) {
                        if (nameMarketSegment.toLowerCase() == datos[x].toLowerCase()) {
                            Equal = true;
                        }
                    }

                    if (Equal == false) {
                        Xrm.Page.getAttribute("ust_outboundcalljustification").setRequiredLevel("required");
                    } else {
                        Xrm.Page.getAttribute("ust_outboundcalljustification").setRequiredLevel(null);
                    }
                }
            }


        }
    },


    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 11/07/2018
    // Req      : AMXPEASIS-3114, AMXPEASIS-3134
    // Function : 1. Consult name fase for incident
    //=================================================================

    fnc_ConsultNameFase: function (varnameFase) {
        //

        if (varnameFase != null) {

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='etel_crmconfiguration'> " +
                "<attribute name='etel_crmconfigurationid'/>  " +
                "<attribute name='etel_name'/> " +
                "<attribute name='etel_value'/> " +
                "<order descending='false' attribute='etel_name'/> " +
                "<filter type='and'> " +
                "<condition attribute='etel_name' value='" + varnameFase + "' operator='eq'/> " +
                "</filter> " +
                "</entity> " +
                "</fetch> ";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);

            if (fetchCode.length > 0) {
                var valuenamefase = fetchCode[0].attributes.etel_value.value;

                if (valuenamefase != null) {
                    return valuenamefase;
                } else {
                    alert("No se ha configurado correctamente las fases en la entidad CRM Configuration. Por favor pongas en contacto con el administrador");
                }
            }
        }
    },


    //=================================================================
    // Creator  : William Quiroz
    // Creation : 16/06/2018
    // Function : Identify Phase of the process and type of case to show required fields. OnLoad
    //=================================================================
    fnc_SateFase_FieldsRequerid: function () {
        //
        Xrm.Page.data.process.addOnStageChange(Ust_Case.Funcion.fnc_OnchangeFase);

    },

    fnc_OnchangeFase: function () {
        //
        var isOK = false;
        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

        var mensaje;
        if (caseType != null) {

            //var caseId = Xrm.Page.data.entity.getId();
            //Query to Case type.          
            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";
            if (strConsultaTipoCaso != null) {
                ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                    var datos = result;

                    if (datos != null && datos.d.results.length > 0) {
                        var entidad = datos.d.results[0];
                        if (entidad.ust_Code != null) {

                            tipoCasoCode = entidad.ust_Code;
                        }
                    }
                });

                //Siempre que los cambios de etapa activen una función onchange
                stage = Xrm.Page.data.process.getActiveStage();

                var NameFaseIdentitySpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseIdentitySpanish');
                var NameFaseIdentityEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseIdentityEnglish');
                var NameFaseDocumentSpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseDocumentSpanish');
                var NameFaseDocumentEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseDocumentEnglish');
                var NameFaseResearchSpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseResearchSpanish');
                var NameFaseResearchEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseResearchEnglish');
                var NameFaseNotifyCustomerSpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseNotifyCustomerSpanish');
                var NameFaseNotifyCustomerEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseNotifyCustomerEnglish');
                var NameFaseResolveSpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseResolveSpanish');
                var NameFaseResolveEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseResolveEnglish');
                var NameFaseNotifyTRASUSpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseNotifyTRASUSpanish');
                var NameFaseNotifyTRASUEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseNotifyTRASUEnglish');

                //Devuelve el estado actual de la instancia del proceso
                var proceso = Xrm.Page.data.process.getStatus();
                var elevatedTrasu = Xrm.Page.getAttribute("ust_elevatedtotrasu").getValue();
                //Update Status Code and Close Task
                if (proceso == "active") {
                    var nameFase = stage.getName(); //"Notify Customer"
                    var nameFaseToLowerCase = nameFase.toLowerCase();

                    //Update StatusCode
                    if (nameFaseToLowerCase == NameFaseIdentityEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseIdentitySpanish.toLowerCase()) {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente 
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            //Xrm.Page.data.process.movePrevious(function () { Xrm.Page.data.process.setActiveStage(stage.getId()); });
                            isOK = true;
                        }
                    }
                    else if (nameFaseToLowerCase == NameFaseDocumentEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseDocumentSpanish.toLowerCase()) {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFaseToLowerCase == NameFaseResearchEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseResearchSpanish.toLowerCase()) {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFaseToLowerCase == NameFaseNotifyCustomerEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseNotifyCustomerSpanish.toLowerCase()) {
                        Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFaseToLowerCase == NameFaseResolveEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseResolveSpanish.toLowerCase()) {
                        //Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.data.process.movePrevious(function () { Xrm.Page.data.process.setActiveStage(stage.getId()); });
                            isOK = true;
                        }
                    }
                    else if (nameFaseToLowerCase == NameFaseNotifyTRASUEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseNotifyTRASUSpanish.toLowerCase()) {
                        Xrm.Page.getAttribute("statuscode").setValue(864340004); // Por Elevar
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);

                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }

                    //if (notificationEmail == true) {
                    //    Xrm.Page.getAttribute("statuscode").setValue(864340003); //Notificado      
                    //}
                    if (elevatedTrasu != null) {
                        if (elevatedTrasu == false && (nameFaseToLowerCase == NameFaseNotifyTRASUEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseNotifyTRASUSpanish.toLowerCase())) {
                            Xrm.Page.getAttribute("statuscode").setValue(864340004); //Por Elevar
                            var complet = Ust_Case.Funcion.fnc_btnResolve(false);

                            if (complet == true) {
                                Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                                isOK = true;
                            }
                        }

                        //AMXPEASIS-3119
                        else if (elevatedTrasu == true && (nameFaseToLowerCase == NameFaseNotifyTRASUEnglish.toLowerCase() || nameFaseToLowerCase == NameFaseNotifyTRASUSpanish.toLowerCase())) {

                            Xrm.Page.getAttribute("statuscode").setValue(864340005); //Elevado                                           
                        }
                    }
                }

                var fase = Xrm.Page.getAttribute("ust_complaintphase").getText();
                var fetchXMLC = "";
                var fetchDataC = null;

                fetchXMLC = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
                fetchXMLC += '<entity name="ust_canalization">';
                fetchXMLC += '<attribute name="ust_canalizationid" />';
                fetchXMLC += '<attribute name="ust_stagename" />';
                fetchXMLC += '<attribute name="createdon" />';
                fetchXMLC += '<attribute name="statuscode" />';
                fetchXMLC += '<attribute name="statecode" />';
                fetchXMLC += '<attribute name="ust_description" />';
                fetchXMLC += '<attribute name="ust_casetypeid" />';
                fetchXMLC += '<attribute name="ust_entity" />';
                fetchXMLC += '<order attribute="ust_stagename" descending="false" />';
                fetchXMLC += '<filter type="and">';
                fetchXMLC += '<condition attribute="ust_casetypeid" operator="eq" value="' + caseType[0].id + '" />';
                fetchXMLC += '<condition attribute="ust_stagename" operator="eq" value="' + stage.getName() + '" />';
                fetchXMLC += '<condition attribute="ust_complaintphase" operator="eq" value="' + fase + '" />';
                fetchXMLC += '</filter>';
                fetchXMLC += '</entity>';
                fetchXMLC += '</fetch>';

                fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXMLC);


                if (fetchDataC.length == 0) {
                    fetchXMLC = "";
                    fetchXMLC = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
                    fetchXMLC += '<entity name="ust_canalization">';
                    fetchXMLC += '<attribute name="ust_canalizationid" />';
                    fetchXMLC += '<attribute name="ust_stagename" />';
                    fetchXMLC += '<attribute name="createdon" />';
                    fetchXMLC += '<attribute name="statuscode" />';
                    fetchXMLC += '<attribute name="statecode" />';
                    fetchXMLC += '<attribute name="ust_description" />';
                    fetchXMLC += '<attribute name="ust_casetypeid" />';
                    fetchXMLC += '<attribute name="ust_entity" />';
                    fetchXMLC += '<order attribute="ust_stagename" descending="false" />';
                    fetchXMLC += '<filter type="and">';
                    fetchXMLC += '<condition attribute="ust_casetypeid" operator="eq" value="' + caseType[0].id + '" />';
                    fetchXMLC += '<condition attribute="ust_stagename" operator="eq" value="' + stage.getName() + '" />';
                    fetchXMLC += '<condition attribute="ust_complaintphase" operator="null"  />';

                    fetchXMLC += '</filter>';
                    fetchXMLC += '</entity>';
                    fetchXMLC += '</fetch>';

                    fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXMLC);

                }

                if (fetchDataC != "") {
                    var listaField = fetchDataC[0].attributes.ust_description.value;
                    var typeCaseId = fetchDataC[0].attributes.ust_casetypeid.id;
                    var nameStage = fetchDataC[0].attributes.ust_stagename.value;

                    var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
                    fetchXML += '<entity name="amxperu_casetype">';
                    fetchXML += '<attribute name="amxperu_casetypeid" />';
                    fetchXML += '<attribute name="amxperu_name" />';
                    fetchXML += '<attribute name="createdon" />';
                    fetchXML += '<attribute name="statuscode" />';
                    fetchXML += '<attribute name="ust_code" />';
                    fetchXML += '<order attribute="amxperu_name" descending="false" />';
                    fetchXML += '<filter type="and">';
                    fetchXML += '<condition attribute="amxperu_casetypeid" operator="eq" value="' + typeCaseId + '" />';
                    fetchXML += '</filter>';
                    fetchXML += '</entity>';
                    fetchXML += '</fetch>';

                    var fetchData = XrmServiceToolkit.Soap.Fetch(fetchXML);

                    if (fetchData != "") {
                        var tipoCase = fetchData[0].attributes.ust_code.value; //Cod Type Case   

                        if (listaField != null) {
                            var field = listaField.split(",");

                            //var letterCourier = Xrm.Page.getAttribute("xxxxxx").getValue();
                            //var notificationEmail = Xrm.Page.getAttribute("xxxxxx").getValue();
                            //var generatedInformationFile = Xrm.Page.getAttribute("xxxxxx").getValue();

                            if (proceso == "active") {
                                var nameFase = stage.getName(); //"Notify Customer"                                                             

                                if (nameStage != null || nameStage != "") {
                                    if (tipoCase == tipoCasoCode && nameFase == nameStage) {

                                        //if (nameFase == "Notify Customer" || nameFase == "Notificar Cliente")
                                        // Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)

                                        for (var i = 0; i < field.length; i++) {

                                            var valueCampo = Xrm.Page.getAttribute(field[i]).getValue();

                                            if (valueCampo == null) {

                                                Xrm.Page.getAttribute(field[i]).setRequiredLevel("required");
                                            }

                                            isOK = true;
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
            return isOK;
        }

    },
    //==============================================
    // Creator  : William Quiroz
    // Creation : 7/06/2018
    // Function : Fileds Requeried. 
    //=================================================================
    fnc_fiedsRequiredTypeCaso: function (typeCaso) {
        debugger;
        if (typeCaso == "004") { //SAR OSIPTEL
            Xrm.Page.getAttribute("ust_sarresponse").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_saroffereddescription").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_dateofacceptance").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_acceptancemechanism").setRequiredLevel("required");
        }
        else if (typeCaso == "005") { //RECLAMO OSIPTEL
            Xrm.Page.getAttribute("ust_osiptelcomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_complaintphase").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_registrationdateclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_notificationtypeosiptelclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_webaccessnotificationtype").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_appliestoallservicenumbers").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_dateofnotification").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_generatedbyldr").setRequiredLevel("required");
        }
        else if (typeCaso == "006") { //QUEJA OSIPTEL
            //Xrm.Page.getAttribute("ust_grievanceinternalid").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_osiptelgrievanceid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_resultgrievanceosiptel").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_trasurecordnumbergrievanceosiptel").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_trasuemissiondategrievance").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_claroreceptiondategrievance").setRequiredLevel("required");
        }
        else if (typeCaso == "007") { //DENUNCIA OSIPTEL
            Xrm.Page.getAttribute("ust_osipteldenunciationid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_osiptelemissiondate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_claroreceiveddate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_denunciationtranscription").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_expectedresolutiontime").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_relatedsarcomplaintgrievance").setRequiredLevel("required");
        }
        else if (typeCaso == "008") { //RECLAMO LDR
            Xrm.Page.getAttribute("ust_indecopicomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_notificationtype").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_nameoffathermother").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_identificationdocument").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_namesoftheclaimantldr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_claimantssurnameldr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_detailoftheclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_priority").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_notificationemail").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_channeled").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_resultdateldr").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_responsetext").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_channeled").setRequiredLevel("required");     
        }
        else if (typeCaso == "009") { //DENUNCIA(COMPLAINT) INDECOPI
            Xrm.Page.getAttribute("ust_expedientnumber").setRequiredLevel("required");//INDECOPI Denunciation Id
            Xrm.Page.getAttribute("ust_indecopiauthority").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_sanctionrisk").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_denunciationstage").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_indecopiresolution").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_provinceldr").setRequiredLevel("required");
        }
        else if (typeCaso == "010") { //RECLAMO SAC
            Xrm.Page.getAttribute("ust_saccomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_indecopioffice").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_result").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_resultdate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_answertext").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_costofconclusion").setRequiredLevel("required");
        }
        else if (typeCaso == "011") { //RETENCION / FIDELIZACION
            Xrm.Page.getAttribute("ust_transactiontypecode").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_retentionandloyaltyoptions").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_consumedimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_actualimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_availableimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_consumedimr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_actualimr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_availableimr").setRequiredLevel("required");
        }
        else if (typeCaso == "012") //OSIPTELAppealComplain
        {
            Xrm.Page.getAttribute("ust_saraid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_appealdescription").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_saraoffer").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_saraanswer").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_trasuresult").setRequiredLevel("required");
        }
    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 7/06/2018
    // Function : Update required fields of crm not required. 
    //=================================================================
    fnc_fiedRequired: function () {

        ITC_FNC_Generico.Funcion.fnc_CampoRequeridos();
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 11/06/2018
    // Function : Disable the tabs of a form. 
    //=================================================================
    fnc_toggleSectionDisplayState: function () {

        ITC_FNC_Generico.Funcion.fnc_disableSectionDisplayState();
    },

    //=================================================================
    // Creator  : FastCloudy
    // Creation : 27/07/18
    // Function : Cleyton demo
    //=================================================================
    fnc_showRemedyTab: function () {

        //debugger;
        var remedyId = Xrm.Page.getAttribute("ust_remedyticketid").getValue();

        if (remedyId != null && remedyId != "") {
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("TechnologicalAtention", true);
        } else {
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("TechnologicalAtention", false);
        }
    },


    //=================================================================
    // Creator  : William Quiroz
    // Creation : 11/06/2018
    // Function : Clear form fields. 
    //=================================================================
    fnc_Clearformfields: function (tabName) {

        ITC_FNC_Generico.Funcion.fnc_Clearfields(tabName);
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 18/06/2018
    // Function : Task open in Case. 
    //=================================================================

    fnc_btnResolve: function (isOK) {
        //

        if (isOK == false) {
            var OK = this.CanResolve(isOK);
            if (OK == false) {
                Xrm.Page.getAttribute("ust_flagtask").setValue("OK");
            }
            else {
                Xrm.Page.getAttribute("ust_flagtask").setValue(null);
            }
        }
        return OK
    },

    CanResolve: function (isOK) {
        var OK = false;
        var flagTask = Xrm.Page.getAttribute("ust_flagtask").getValue();
        //alert("Entro aqui al CanResolve");
        var ArrActivities = new Array();
        var CaseId = Xrm.Page.data.entity.getId();

        if (CaseId.length > 0) {
            XrmServiceToolkit.Rest.RetrieveMultiple(
                "IncidentSet",
                "?      $select=incident_activity_parties/ActivityId,Incident_ActivityPointers/ActivityTypeCode,Incident_ActivityPointers/StateCode,Incident_ActivityPointers/StatusCode&$expand=incident_activity_parties,Incident_ActivityPointers&$filter=IncidentId eq guid' " + CaseId + "'",
                function (results) {
                    for (var i = 0; i < results.length; i++) {
                        ArrActivities.push(results[i]);
                    }
                },
                function (error) {
                    alert(error.message);
                },
                function () {

                },
                false
            );

            if (ArrActivities.length > 0) {
                //Check if any activity with status Open
                var ActivityItems = ArrActivities[0].Incident_ActivityPointers.results;

                for (i = 0; i < ActivityItems.length; i++) {
                    if (ActivityItems[i].StateCode.Value == 0) {

                        var opcion = confirm("Favor de cerrar la Tarea.");
                        if (opcion == true) {
                            mensaje = "SI";
                            OK = true;
                            //Xrm.Page.getAttribute("ust_flagtask").setValue("OK");
                        } else {
                            mensaje = "NO";
                            OK = true;
                            //Xrm.Page.getAttribute("ust_flagtask").setValue("OK");
                        }
                    }
                }
            }
        }
        return OK;
    },
    //=================================================================
    // Creator  : EEA
    // Creation : 26/06
    // Function : Secuential autonumber child case from OSIPTEL Complaint
    //=================================================================
    //OnSave_ChildGrievanceCase: function () {

    //    var objParentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
    //    var objCaseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
    //    var parentCaseId = null;
    //    var caseTypeId = null;
    //    var parentCaseTypeCode = null; //CasetypeCode from the parent case.
    //    var currentCaseTypeCode = null; //CasetypeCode from the current case.
    //    var total = 0;
    //    //Validate which field is: ust_grievanceinternalid or ust_osiptelgrievanceid
    //    var grievanceInternalId = Xrm.Page.getAttribute("ust_grievanceinternalid").getValue();

    //    //if we dont have parent case or currentCaseType or grievanceId exists
    //    if (objParentCase == null || objCaseType == null || grievanceInternalId != null) {
    //        return;
    //    }

    //    //get the parent case type code : 004 OSIPTEL Complaint
    //    SDK.REST.retrieveRecord(objParentCase[0].id, "Incident", "amxperu_amxperu_casetype_incident_CaseType/ust_Code", 'amxperu_amxperu_casetype_incident_CaseType', function (result) {
    //        parentCaseTypeCode = result.amxperu_amxperu_casetype_incident_CaseType.ust_Code;
    //        alert("parentCaseTypeCode: " + parentCaseTypeCode);
    //    }, function (error) {
    //        Xrm.Utility.alertDialog(error.message);
    //    });

    //    //get the current case type code : 005 OSIPTEL Grievance
    //    SDK.REST.retrieveRecord(objCaseType[0].id, "amxperu_casetype", "ust_Code", null, function (result) {
    //        currentCaseTypeCode = result.ust_Code;
    //        alert("currentCaseTypeCode: " + currentCaseTypeCode);
    //    }, function (error) {
    //        Xrm.Utility.alertDialog(error.message);
    //    });

    //    //If parent case is OSIPTEL COMPLAINT & current case is OSIPTEL Grievance
    //    if (parentCaseTypeCode == "004" && currentCaseTypeCode == "005") //
    //    {
    //        //Get the list of codes.
    //        SDK.REST.retrieveMultipleRecords("Incident", "?$filter=ParentCaseId/Id eq (guid'1111111111') and amxperu_CaseType/Id eq (guid'2222222222')", function (results) {
    //            var total = results.Count;
    //            alert("total: " + total);

    //        }, function (error) {
    //            Xrm.Utility.alertDialog(error.message);
    //        }, function () {
    //            //On Complete - Do Something
    //        });


    //        var nCount = total + 1;
    //        //Set the total
    //        Xrm.Page.getAttribute().setValue(nCount);

    //    }

    //},

    //=================================================================
    // Creator  : EEA
    // Creation : 26/06
    // Description: Generar el id único de Reclamo OSIPTEL
    // Function : Secuential autonumber child case from OSIPTEL Complaint
    // Event    : OnSave
    //=================================================================
    OnSave_ChildGrievanceCase: function () {
        var currentId = "";
        var query = "";
        var objParentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
        var objCaseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
        var osiptelComplaintId = null;
        var parentCaseId = null;
        var caseTypeId = null;
        var parentCaseTypeCode = null; //CasetypeCode from the parent case.
        var currentCaseTypeCode = null; //CasetypeCode from the current case.
        var total = 0;
        var nCode = null;
        //Validate which field is: ust_grievanceinternalid or ust_osiptelgrievanceid
        var grievanceCorrelativeId = Xrm.Page.getAttribute("ust_osiptelgrievanceid").getValue();

        var formType = Xrm.Page.ui.getFormType();

        if (formType == CRM_FORM_TYPE_UPDATE) {
            currentId = Xrm.Page.data.entity.getId();
            query = "and ust_osiptelgrievanceid ne '" + currentId + "'";
        }

        //if we dont have parent case or currentCaseType or grievanceId exists
        if (objCaseType == null || grievanceCorrelativeId != null) {
            return false;
        }

        if (objParentCase != null) {
            //get the parent case type code : 004 OSIPTEL Complaint
            //SDK.REST.retrieveRecord(objParentCase[0].id, "Incident", "ust_osiptelcomplaintid,amxperu_amxperu_casetype_incident_CaseType/ust_Code", 'amxperu_amxperu_casetype_incident_CaseType', function (result) {
            XrmServiceToolkit.Rest.Retrieve(objParentCase[0].id, "IncidentSet", "amxperu_OSIPTELComplaintID,TicketNumber,ust_OsiptelComplaintid,amxperu_amxperu_casetype_incident_CaseType/ust_Code", 'amxperu_amxperu_casetype_incident_CaseType', function (result) {
                if (result != null) {
                    parentCaseTypeCode = result.amxperu_amxperu_casetype_incident_CaseType.ust_Code;
                    osiptelComplaintId = result.ust_OsiptelComplaintid;
                    //ticketNumber = result.TicketNumber;
                    //var ust_OsiptelComplaintid = result.ust_OsiptelComplaintid;
                }
            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);


            //get the current case type code : 005 OSIPTEL Grievance
            XrmServiceToolkit.Rest.Retrieve(objCaseType[0].id, "amxperu_casetypeSet", "ust_Code", null, function (result) {
                if (result != null) {
                    currentCaseTypeCode = result.ust_Code;
                }
            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);

            //If parent case is OSIPTEL COMPLAINT & current case is OSIPTEL Grievance
            if (parentCaseTypeCode == "004" && currentCaseTypeCode == "005") //
            {

                //Get the list of codes.
                XrmServiceToolkit.Rest.RetrieveMultiple("IncidentSet", "?$filter=ParentCaseId/Id eq (guid'" + objParentCase[0].id + "') " + query + " and amxperu_CaseType/Id eq (guid'" + objCaseType[0].id + "')", function (results) {
                    if (results != null) {
                        total = results.length + 1;
                    }

                }, function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }, function () {
                    //On Complete - Do Something
                }, false);

                nCode = osiptelComplaintId + "-" + total;

                //Set the total
                Xrm.Page.getAttribute("ust_osiptelgrievanceid").setValue(nCode);

            }
        }
        else {
            nCode = Xrm.Page.getAttribute("ticketnumber").getValue();
            Xrm.Page.getAttribute("ust_osiptelgrievanceid").setValue(nCode);
        }

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 26/06/2018
    // Function : Customer Related SAR/Complaint. 
    //=================================================================
    fnc_CustomerRelatedSAR: function () {
        //
        var customerContact = Xrm.Page.getAttribute("customerid").getValue();

        var availableDefaultViewId = Xrm.Page.getControl("etel_customercontactid").getDefaultView();
        //if (availableDefaultViewId != null || availableDefaultViewId != "") {
        //    Xrm.Page.getAttribute("etel_customercontactid").setValue(null);
        //} 

        if (customerContact != null) {
            var relatedSar = Xrm.Page.getAttribute("ust_relatedsarcomplaintgrievance").getValue();

            var availableDefaultViewId = Xrm.Page.getControl("ust_relatedsarcomplaintgrievance").getDefaultView();
            var viewId = "{6fd72744-3676-41d4-8003-ae4cde9ac288}";
            var entityName = "incident";
            // give the custom view a name      
            var viewDisplayName = "Associated incident for " + customerContact[0].name + "";

            //if (relatedSar != null || relatedSar != "") {
            //    Xrm.Page.getAttribute("ust_relatedsarcomplaintgrievance").setValue(null);
            //}

            var fetchXmlCode3 = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_casetype'>" +
                "<attribute name='amxperu_casetypeid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='ust_code' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='ust_code' operator='eq' value='003' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode3 = XrmServiceToolkit.Soap.Fetch(fetchXmlCode3);
            var code03 = fetchCode3[0].attributes.ust_code.value;

            var fetchXmlCode4 = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_casetype'>" +
                "<attribute name='amxperu_casetypeid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='ust_code' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='ust_code' operator='eq' value='004' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode4 = XrmServiceToolkit.Soap.Fetch(fetchXmlCode4);
            var code04 = fetchCode4[0].attributes.ust_code.value;

            var fetchXmlCode5 = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_casetype'>" +
                "<attribute name='amxperu_casetypeid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='ust_code' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='ust_code' operator='eq' value='005' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode5 = XrmServiceToolkit.Soap.Fetch(fetchXmlCode5);
            var code05 = fetchCode5[0].attributes.ust_code.value;

            // Case relation in Customer for Type Case
            var fetchXmlI = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +

                "<entity name='incident'>" +
                "<attribute name='incidentid' />" +
                "<attribute name='title' />" +
                "<attribute name='amxperu_casetype' />" +
                "<attribute name='customerid' />" +
                "<order attribute='caseorigincode' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='customerid' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + "' />" +
                "</filter>" +
                "<link-entity name='amxperu_casetype' from='amxperu_casetypeid' to='amxperu_casetype' alias='ah'>" +
                "<filter type='and'>" +
                "<filter type='or'>" +
                "<condition attribute='ust_code' operator='eq' value='" + code03 + "' />" +
                "<condition attribute='ust_code' operator='eq' value='" + code04 + "' />" +
                "<condition attribute='ust_code' operator='eq' value='" + code05 + "' />" +
                "</filter>" +
                "</filter>" +
                "</link-entity>" +
                "</entity>" +
                "</fetch>";

            var fetchData2 = XrmServiceToolkit.Soap.Fetch(fetchXmlI);

            Ust_Case.Funcion.fnc_OnloadContactCase(customerContact); // Mostrar Contactos relation al Cliente
            Ust_Case.Funcion.fnc_OnloadGrievanceContact(customerContact); // Mostrar Contactos in Osiptel Grievance
            Ust_Case.Funcion.fnc_OnloadAppealContact(customerContact); //Mostrar Contactos in Appeal

            //// build Grid Layout 
            var layoutXml = "<grid name='resultset' object='1' jump='incidentid' select='1' icon='0' preview='1'>" +
                "<row name='result' id='incidentid'>" +
                "<cell name='amxperu_casetype' width='330' />" +
                "<cell name='customerid' width='200' />" +
                "<cell name='title' width='180' />" +
                "</row>" +
                "</grid>";

            // add the Custom View to the primary contact lookup control  ust_relatedsarcomplaintgrievance          
            Xrm.Page.getControl("ust_relatedsarcomplaintgrievance").addCustomView(viewId, entityName, viewDisplayName, fetchXmlI, layoutXml, true);

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 28/06/2018
    // Function : Contacts relation in Customer. 
    //=================================================================
    fnc_OnloadContactCase: function (customerContact) {
        //

        var viewId = "{6fd72744-3676-41d4-8003-ae4cde9ac282}";
        var entityName = "contact";
        // give the custom view a name      
        var viewDisplayName = "Associated contacts for " + customerContact[0].name + "";

        var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='contact'>" +
            "<attribute name='contactid' />" +
            "<attribute name='fullname' />" +
            "<attribute name='etel_iddocumentnumber' />" +
            "<attribute name='emailaddress1' />" +
            "<attribute name='etel_countryid' />" +
            "<attribute name='address1_line1' />" +
            "<attribute name='address1_postalcode' />" +
            "<order attribute='address1_line1' descending='false' />" +
            "<link-entity name='connection' from='record2id' to='contactid' alias='ac'>" +
            "<filter type='and'>" +
            "<condition attribute='record1id' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
            "</filter>" +
            "</link-entity>" +
            "</entity>" +
            "</fetch>";

        var con = XrmServiceToolkit.Soap.Fetch(fetchXmlC);

        //alert("Contador : " + con.length);

        var layoutXml = "<grid name='resultset' object='1' jump='contactid' select='1' icon='0' preview='1'>" +
            "<row name='result' id='contactid'>" +
            "<cell name='fullname' width='150' />" +
            "<cell name='etel_iddocumentnumber' width='125' />" +
            "<cell name='emailaddress1' width='150' />" +
            "<cell name='etel_countryid' width='100' />" +
            "<cell name='address1_line1' width='150' />" +
            "<cell name='address1_postalcode' width='100' />" +
            "</row>" +
            "</grid>";

        // add the Custom View to the primary contact lookup control      
        //Xrm.Page.getControl(primContactFieldName).addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

        if (con.length > 0) {
            Xrm.Page.getControl("etel_customercontactid").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
        }

        else {
            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='contactid' />" +
                "<attribute name='fullname' />" +
                "<attribute name='etel_iddocumentnumber' />" +
                "<attribute name='emailaddress1' />" +
                "<attribute name='etel_countryid' />" +
                "<attribute name='address1_line1' />" +
                "<attribute name='address1_postalcode' />" +
                "<order attribute='address1_line1' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            Xrm.Page.getControl("etel_customercontactid").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 02/07/2018
    // Function : Contacts Case in OSIPTEL Grievance. 
    //=================================================================
    fnc_OnloadGrievanceContact: function (customerContact) {
        // 

        var availableDefaultViewId = Xrm.Page.getControl("ust_contactcase").getDefaultView();
        var viewId = "{6fd72744-3676-41d4-8003-ae4cde9ac282}";
        var entityName = "contact";
        // give the custom view a name      
        var viewDisplayName = "Associated contacts for " + customerContact[0].name + "";

        var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='contact'>" +
            "<attribute name='fullname' />" +
            "<attribute name='contactid' />" +
            "<attribute name='etel_iddocumentnumber' />" +
            "<attribute name='emailaddress1' />" +
            "<attribute name='etel_countryid' />" +
            "<attribute name='address1_line1' />" +
            "<attribute name='address1_postalcode' />" +
            "<order attribute='address1_line1' descending='false' />" +
            "<link-entity name='connection' from='record2id' to='contactid' alias='ac'>" +
            "<filter type='and'>" +
            "<condition attribute='record1id' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
            "</filter>" +
            "</link-entity>" +
            "</entity>" +
            "</fetch>";

        var fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXmlC);

        //// build Grid Layout 
        var layoutXml = "<grid name='resultset' object='1' jump='contactid' select='1' icon='0' preview='1'>" +
            "<row name='result' id='contactid'>" +
            "<cell name='fullname' width='150' />" +
            "<cell name='etel_iddocumentnumber' width='125' />" +
            "<cell name='emailaddress1' width='150' />" +
            "<cell name='etel_countryid' width='100' />" +
            "<cell name='address1_line1' width='150' />" +
            "<cell name='address1_postalcode' width='100' />" +
            "</row>" +
            "</grid>";

        if (fetchDataC.length > 0) {
            // add the Custom View to the primary contact lookup control            
            Xrm.Page.getControl("ust_contactcase").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
        }
        else {
            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='fullname' />" +
                "<attribute name='contactid' />" +
                "<attribute name='etel_iddocumentnumber' />" +
                "<attribute name='emailaddress1' />" +
                "<attribute name='etel_countryid' />" +
                "<attribute name='address1_line1' />" +
                "<attribute name='address1_postalcode' />" +
                "<order attribute='address1_line1' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            Xrm.Page.getControl("ust_contactcase").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 02/07/2018
    // Function : Contacts Appeal Contact Name. 
    //=================================================================
    fnc_OnloadAppealContact: function (customerContact) {

        var availableDefaultViewId = Xrm.Page.getControl("ust_contactcase").getDefaultView();
        var viewId = "{6fd72744-3676-41d4-8003-ae4cde9ac282}";
        var entityName = "contact";
        // give the custom view a name      
        var viewDisplayName = "Associated contacts for " + customerContact[0].name + "";

        // give the custom view a name      
        var viewDisplayName = "Consulting Contact relation Connections";// [" + codigoCatalogo + "]

        var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='contact'>" +
            "<attribute name='fullname' />" +
            "<attribute name='contactid' />" +
            "<attribute name='etel_iddocumentnumber' />" +
            "<attribute name='emailaddress1' />" +
            "<attribute name='etel_countryid' />" +
            "<attribute name='address1_line1' />" +
            "<attribute name='address1_postalcode' />" +
            "<order attribute='address1_line1' descending='false' />" +
            "<link-entity name='connection' from='record2id' to='contactid' alias='ac'>" +
            "<filter type='and'>" +
            "<condition attribute='record1id' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
            "</filter>" +
            "</link-entity>" +
            "</entity>" +
            "</fetch>";

        var fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXmlC);

        //// build Grid Layout 
        var layoutXml = "<grid name='resultset' object='1' jump='contactid' select='1' icon='0' preview='1'>" +
            "<row name='result' id='contactid'>" +
            "<cell name='fullname' width='150' />" +
            "<cell name='etel_iddocumentnumber' width='125' />" +
            "<cell name='emailaddress1' width='150' />" +
            "<cell name='etel_countryid' width='100' />" +
            "<cell name='address1_line1' width='150' />" +
            "<cell name='address1_postalcode' width='100' />" +
            "</row>" +
            "</grid>";

        if (fetchDataC.length > 0) {
            // add the Custom View to the primary contact lookup control            
            Xrm.Page.getControl("ust_appealcontactcomplaint").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
        }
        else {
            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='contact'>" +
                "<attribute name='fullname' />" +
                "<attribute name='contactid' />" +
                "<attribute name='etel_iddocumentnumber' />" +
                "<attribute name='emailaddress1' />" +
                "<attribute name='etel_countryid' />" +
                "<attribute name='address1_line1' />" +
                "<attribute name='address1_postalcode' />" +
                "<order attribute='address1_line1' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            Xrm.Page.getControl("ust_appealcontactcomplaint").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 23/07/2018
    // Function : Reclamo LDR/Claro Device.
    //=================================================================
    fnc_CustomerClaroDevice: function () {

        var customerContact = Xrm.Page.getAttribute("customerid").getValue();

        var availableDefaultViewId = Xrm.Page.getControl("etel_customercontactid").getDefaultView();

        if (customerContact != null) {

            var viewId = "{6fd72744-3676-41d4-8003-ae4cde9ac289}";
            var entityName = "amxperu_customerdevice";
            // give the custom view a name      
            var viewDisplayName = "Associated incident for " + customerContact[0].name + "";

            // Case relation in Customer for Type Case
            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_customerdevice'>" +
                "<attribute name='amxperu_customerdeviceid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='amxperu_imei' />" +
                "<attribute name='createdon' />" +
                "<order attribute='amxperu_imei' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='amxperu_individualid' operator='eq' uiname='' uitype='contact' value='" + customerContact[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var data = XrmServiceToolkit.Soap.Fetch(fetchXmlC);
            //// build Grid Layout 
            var layoutXml = "<grid name='resultset' object='1' jump='amxperu_individualid' select='1' icon='0' preview='1'>" +
                "<row name='result' id='amxperu_individualid'>" +
                "<cell name=' amxperu_name ' width='330' />" +
                "<cell name=' amxperu_imei ' width='200' />" +
                "<cell name=' createdon ' width='200' />"
            "</row>" +
                "</grid>";

            if (data != null) {
                // add the Custom View to the primary contact lookup control  ust_relatedsarcomplaintgrievance          
                Xrm.Page.getControl("ust_clarodevice").addCustomView(viewId, entityName, viewDisplayName, fetchXmlC, layoutXml, true);
            }

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 06/07/2018
    // Function : Device Complet Fields
    // REQ      : AMXPEASIS-3129
    //=================================================================
    fnc_OnChange_ReclamoLDRField: function () {

        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();

        if (objCustomer != null) {

            var fetchXmlC = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='amxperu_customerdevice'>" +
                "<attribute name='amxperu_customerdeviceid' />" +
                "<attribute name='amxperu_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='amxperu_model' />" +
                "<attribute name='amxperu_imei' />" +
                "<attribute name='amxperu_brand' />" +
                "<attribute name='amxperu_individualid' />" +
                "<order attribute='amxperu_name' descending='false' />" +
                "<filter type='and'>" +
                "<condition attribute='amxperu_individualid' operator='eq' uiname='' uitype='contact' value='" + objCustomer[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var data = XrmServiceToolkit.Soap.Fetch(fetchXmlC);

            if (data.length > 0) {

                var ClaroDeviceBran = data[0].attributes.amxperu_name;
                var ClaroDeviceIMEI = data[0].attributes.amxperu_imei;
                var ClaroDeviceModel = data[0].attributes.amxperu_model;

                if (ClaroDeviceBran != null) {
                    Xrm.Page.getAttribute("ust_clarodevicebrand").setValue(ClaroDeviceBran.value);
                }
                if (ClaroDeviceIMEI != null) {
                    Xrm.Page.getAttribute("ust_clarodeviceimei").setValue(ClaroDeviceIMEI.value);
                }
                if (ClaroDeviceModel != null) {
                    Xrm.Page.getAttribute("ust_clarodevicemodel").setValue(ClaroDeviceModel.value);
                }
            }
        }
        else {
            Xrm.Page.getAttribute('ust_clarodevicebrand').setValue(null);
            Xrm.Page.getAttribute('ust_clarodeviceimei').setValue(null);
            Xrm.Page.getAttribute('ust_clarodevicemodel').setValue(null);
        }
    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 02/07/2018
    // Description: Traer datos de Contact
    // Function : 
    // Event    : OnChange
    //=================================================================

    fnc_OnChange_ContactField: function () {

        var objContact = Xrm.Page.getAttribute("etel_customercontactid").getValue();
        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();
        var roleName = "";

        if (objCustomer != null && objContact != null) {
            //Obtener conection type de Conecction
            XrmServiceToolkit.Rest.RetrieveMultiple("ConnectionSet", "?$select=Record2RoleId,connection_role_connections2/Name&$expand=connection_role_connections2&$filter=Record1Id/Id eq (guid'" + objCustomer[0].id + "') and Record2Id/Id eq (guid'" + objContact[0].id + "')", function (results) {
                if (results[0] != null) {
                    roleName = results[0].connection_role_connections2.Name;
                }
            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, function () {
                //On Complete - Do Something
            }, false);

            XrmServiceToolkit.Rest.Retrieve(objContact[0].id, "ContactSet", "amxperu_DocumentType,amxperu_hiddenconnectiontype,etel_iddocumentnumber,etel_passportnumber,FullName", null, function (result) {

                var fullName = result.FullName;
                var amxperu_DocumentType = result.amxperu_DocumentType;
                var etel_passportnumber = result.etel_passportnumber;
                var etel_iddocumentnumber = result.etel_iddocumentnumber;

                if (amxperu_DocumentType != null) {
                    Xrm.Page.getAttribute("ust_contactdoctype").setValue(amxperu_DocumentType.Value);
                }
                if (etel_passportnumber != null) {
                    Xrm.Page.getAttribute("ust_contactdocid").setValue(etel_passportnumber);
                }
                if (fullName != null) {
                    Xrm.Page.getAttribute("ust_contactnamecase").setValue(fullName);
                }
                if (roleName != null) {
                    Xrm.Page.getAttribute("ust_contactconectiontype").setValue(roleName);
                }


            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);
            ///

        }
        else {
            Xrm.Page.getAttribute('ust_contactdocid').setValue(null);
            Xrm.Page.getAttribute('ust_contactnamecase').setValue(null);
            Xrm.Page.getAttribute('ust_contactconectiontype').setValue(null);
        }
    }
    ,

    fnc_OnChange_CustomerField: function () {

        //limpiamos los datos del contacto, esto hace que se limpie los datos del contacto.
        //Xrm.Page.getAttribute('etel_customercontactid').setValue(null);

        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();
        if (objCustomer != null) {

            XrmServiceToolkit.Rest.Retrieve(objCustomer[0].id, "ContactSet", "amxperu_DocumentType,amxperu_hiddenconnectiontype,etel_iddocumentnumber,etel_passportnumber,FullName", null, function (result) {
                //if (result != null) {
                var fullName = result.FullName;
                var amxperu_DocumentType = result.amxperu_DocumentType;
                var etel_passportnumber = result.etel_passportnumber;
                var etel_iddocumentnumber = result.etel_iddocumentnumber;
                var conectionType = result.amxperu_hiddenconnectiontype;


                if (fullName != null) {
                    Xrm.Page.getAttribute("ust_customername").setValue(fullName);
                }
                if (amxperu_DocumentType != null) {
                    Xrm.Page.getAttribute("amxperu_documenttype").setValue(amxperu_DocumentType.Value);
                }
                if (etel_passportnumber != null) {
                    Xrm.Page.getAttribute("amxperu_documentnumber").setValue(etel_passportnumber);
                }
                if (etel_iddocumentnumber != null) {
                    Xrm.Page.getAttribute("ust_customerid").setValue(etel_iddocumentnumber);
                }
                if (conectionType != null) {
                    Xrm.Page.getAttribute("amxperu_customertype").setValue(conectionType);
                }
                Xrm.Page.getAttribute("amxperu_customertype").setValue(1);
                //}

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);


        } else {
            Xrm.Page.getAttribute('ust_customername').setValue(null);
            Xrm.Page.getAttribute('amxperu_documenttype').setValue(null);
            Xrm.Page.getAttribute('amxperu_documentnumber').setValue(null);
            Xrm.Page.getAttribute('ust_customerid').setValue(null);
            Xrm.Page.getAttribute('amxperu_customertype').setValue(null);

            //limpiamos los datos del contacto, esto hace que se limpie los datos del contacto.
            Xrm.Page.getAttribute('etel_customercontactid').setValue(null);
        }
    },


    fnc_OnChange_CustomerOpsitelField: function () {

        var objContact = Xrm.Page.getAttribute("ust_appealcontactcomplaint").getValue();
        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();
        var roleName = "";

        if (objContact != null && objContact != null) {
            //Obtener conection type de Conecction
            XrmServiceToolkit.Rest.RetrieveMultiple("ConnectionSet", "?$select=Record2RoleId,connection_role_connections2/Name&$expand=connection_role_connections2&$filter=Record1Id/Id eq (guid'" + objCustomer[0].id + "') and Record2Id/Id eq (guid'" + objContact[0].id + "')", function (results) {
                if (results[0] != null) {
                    roleName = results[0].connection_role_connections2.Name;
                }
            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, function () {
                //On Complete - Do Something
            }, false);

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
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + objContact[0].id + " ' />" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var data = XrmServiceToolkit.Soap.Fetch(fetchXmlC);

            if (data.length > 0) {
                var DocumentType = data[0].attributes.amxperu_documenttype;
                var dni = data[0].attributes.etel_passportnumber;
                var fullName = data[0].attributes.fullname;
                var lastname = data[0].attributes.lastname;
                var conectionType = data[0].attributes.amxperu_hiddenconnectiontype;

                if (DocumentType != null) {
                    Xrm.Page.getAttribute("ust_appealcontactdocumenttype").setValue(DocumentType.formattedValue);
                }
                if (dni != null) {
                    Xrm.Page.getAttribute("ust_appealcontactdocumentnumber").setValue(dni.value);
                }
                if (fullName != null) {
                    Xrm.Page.getAttribute("ust_appealcontactname").setValue(fullName.value);
                }
                if (lastname != null) {
                    Xrm.Page.getAttribute("ust_appealcontactlastname").setValue(lastname.value);
                }
                if (roleName != null || roleName != "") {
                    Xrm.Page.getAttribute("ust_appealconnectiontype").setValue(roleName);
                }
            }
        }
        else {
            ITC_FNC_Generico.fnc_Clearfields('ust_appealcontactdocumenttype');
            ITC_FNC_Generico.fnc_Clearfields('ust_appealcontactdocumentnumber');
            ITC_FNC_Generico.fnc_Clearfields('ust_appealcontactname');
            ITC_FNC_Generico.fnc_Clearfields('ust_appealcontactlastname');
        }
    }
    ,

    fnc_OnChange_QuejaOpsitelField: function () {

        var objContact = Xrm.Page.getAttribute("ust_contactcase").getValue();
        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();
        var roleName = "";

        if (objCustomer != null && objContact != null) {
            //Obtener conection type de Conecction
            XrmServiceToolkit.Rest.RetrieveMultiple("ConnectionSet", "?$select=Record2RoleId,connection_role_connections2/Name&$expand=connection_role_connections2&$filter=Record1Id/Id eq (guid'" + objCustomer[0].id + "') and Record2Id/Id eq (guid'" + objContact[0].id + "')", function (results) {
                if (results[0] != null) {
                    roleName = results[0].connection_role_connections2.Name;
                }
            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, function () {
                //On Complete - Do Something
            }, false);

            XrmServiceToolkit.Rest.Retrieve(objContact[0].id, "ContactSet", "amxperu_DocumentType,amxperu_hiddenconnectiontype,etel_iddocumentnumber,etel_passportnumber,LastName,FullName", null, function (result) {

                var DocumentType = result.amxperu_DocumentType.Value;
                var etel_passportnumber = result.etel_passportnumber;
                var fullName = result.FullName;
                var lastname = result.LastName;
                var conectionType = result.amxperu_hiddenconnectiontype;

                if (fullName != null) {
                    Xrm.Page.getAttribute("ust_grievancecontactname").setValue(fullName);
                }
                if (lastname != null) {
                    Xrm.Page.getAttribute("ust_grievancecontactlastname").setValue(lastname);
                }
                if (DocumentType != null) {
                    Xrm.Page.getAttribute("ust_grievancecontactdocumenttype").setValue(DocumentType);
                }
                if (etel_passportnumber != null) {
                    Xrm.Page.getAttribute("ust_grievancecontactdocumentnumber").setValue(etel_passportnumber);
                }
                if (roleName != null) {
                    Xrm.Page.getAttribute("ust_grievanceconnectiontype").setValue(roleName);
                }

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);

        } else {
            ITC_FNC_Generico.fnc_Clearfields('ust_appealcontactdocumenttype');
            ITC_FNC_Generico.fnc_Clearfields('ust_grievancecontactname');
            ITC_FNC_Generico.fnc_Clearfields('ust_grievancecontactlastname');
            ITC_FNC_Generico.fnc_Clearfields('ust_grievancecontactdocumenttype');
            ITC_FNC_Generico.fnc_Clearfields('ust_grievancecontactdocumentnumber');
        }
    },

    //=================================================================
    // Creator  : Marlon Hernandez
    // Creation : 07/07/2018
    // Req      : AMXPEASIS-3097
    // Function : 1. Consult domainname for owner for case
    //=================================================================
    fnc_ConsultDominanameCase: function (codeuserguid) {
        //
        var NameUser;
        //var customerClient = Xrm.Page.getAttribute("customerid").getValue();

        if (codeuserguid != null) {

            var fetchXmlCode = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "<entity name='systemuser'>" +
                "<attribute name='fullname'/>" +
                "<attribute name='systemuserid'/>" +
                "<attribute name='domainname'/>" +
                "<order descending='false' attribute='fullname'/>" +
                "<filter type='and'>" +
                "<condition attribute='systemuserid' value='" + codeuserguid + "' uitype='systemuser' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var fetchCode = XrmServiceToolkit.Soap.Fetch(fetchXmlCode);
            if (fetchCode.length > 0) {
                var valuedomainname = fetchCode[0].attributes.domainname.value;
                //
                if (valuedomainname != null) {
                    return NameUser = valuedomainname;
                    //var datos = valuedomainname.split("/\/");
                    //if (datos[1] != null){
                    //  return NameUser;                    
                    //}                             
                }
            }

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 03/07/2018
    // Function : Generate Cod Resolution
    // REQ      : AMXPEASIS-3097
    //=================================================================
    fnc_generateResolution: function () {
        //

        //var flagGeneracionCod = Xrm.Page.getAttribute("ust_flaggeneraciondocument").getValue();
        //if (flagGeneracionCod == false) {
        //  flagGeneracionCod = Xrm.Page.getAttribute("ust_flaggeneraciondocument").setValue(true);
        //}

        //var flagGeneracionCod = Xrm.Page.getAttribute("ust_flaggeneraciondocument").setValue(true);

        //Obtaing el codeuser del user:
        var codeuser = Xrm.Page.getAttribute("createdby").getValue();

        if (codeuser != null) {
            var codeuserguid = codeuser[0].id;
            var nameUser = Ust_Case.Funcion.fnc_ConsultDominanameCase(codeuserguid);
        }

        //if (flagGeneracionCod == true) {

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1;
        var anio = hoy.getFullYear();

        //today.setDate(today.getDate());

        var resolutionDate = Xrm.Page.getAttribute("ust_resolutiondate").getValue();

        if (resolutionDate == null)
            Xrm.Page.getAttribute("ust_resolutiondate").setValue(new Date());

        // Xrm.Page.attribute("ust_resolutiondate").setValue(hoy);

        var resolutionDate = Xrm.Page.getAttribute("ust_resolutioncode").getValue();
        var typeCaseId = Xrm.Page.getAttribute("amxperu_casetype").getValue();

        if (resolutionDate == null) {
            var areaEmpleado = "DAC-REC";// Área del empleado (obtenida de la entidad usuario en CRM)
            var sufijo = "R";
            //var codUsuario = "XXXXX"; //Código del usuario (obtenido de la entidad usuario en CRM).

            var codUsuario = nameUser; //Obtenido de la función fnc_ConsultDominanameCase

            //Get the list of codes --> Esto debe ser reemplazado por el servicio. 
            XrmServiceToolkit.Rest.RetrieveMultiple("IncidentSet", "?$filter=amxperu_CaseType/Id eq (guid'" + typeCaseId[0].id + "')", function (results) {
                if (results[0] != null) {
                    total = results.length + 1;
                }

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, function () {
                //On Complete - Do Something
            }, false);

            nCode = total;

            var anioac = String(anio);
            var anioactual = anioac.substring(4, 2);

            var resolucion = areaEmpleado + "-" + sufijo + "/" + codUsuario + "-" + nCode + "-" + anioactual;

            //Set the total
            Xrm.Page.getAttribute("ust_resolutioncode").setValue(resolucion);
            //MOSTRAR boton Send Email Notification

            // var flagsendemail = 1;
            Ust_Case.Funcion.fnc_ShowButtonSendEmailNotification();
            //refresh the ribbon buttons
            Xrm.Page.getAttribute("ust_flagshowbuttonsendemailnotification").setValue(true);



        }

        //}
    }
    ,
    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 09/07/2018
    // Function : ButtonGenerateDocument
    // REQ      : AMXPEASIS-3099
    //=================================================================

    fnc_DisableButtonGenerateDocument: function () {


        stage = Xrm.Page.data.process.getActiveStage();

        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso == "active") {
            var nameFase = stage.getName(); //"Notify Customer"    

            if (nameFase == "Notify Customer" || nameFase == "Notificar Al Cliente") {

                var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                if (caseType != null) {

                    var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
                    var tipoCasoCode = "";

                    ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                        var datos = result;

                        if (datos != null && datos.d.results.length > 0) {
                            var entidad = datos.d.results[0];
                            if (entidad.ust_Code != null) {

                                tipoCasoCode = entidad.ust_Code;
                            }
                        }
                    });
                }

                if (tipoCasoCode == "004") {
                    Ust_Case.Funcion.fnc_generateResolution();
                    return true;
                }
                else {
                    return false;

                }
            }

        }
    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 14/07/2018
    // Function : InvoquePluginGenerateDocumentTrasu
    // REQ      : AMXPEASIS-3110
    //=================================================================

    fnc_InvoquePluginGenerateDocumentTrasu: function () {

        //var result = Ust_Case.Funcion.fnc_DisableButtonGenerateDocumentTrasu();
        //Invoca al Servicio
        //if (result == true) {
        //var hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

        //if (hiddenConsumeService == false) {
        //    Xrm.Page.getAttribute("ust_hiddenconsumeservice").setValue(true); //Cambia el value del campo a true
        var data = Ust_Case.Funcion.fnc_generateDocumentTrasu();

        if (data != null)
            Ust_Case.Funcion.fnc_documentLoadSignature();
        //}
        //else {
        //    Xrm.Page.getAttribute("ust_hiddenconsumeservice").setValue(false); //Cambia el value del campo a true
        //}

        //}
    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 14/07/2018
    // Function : ButtonGenerateDocumentTrasu
    // REQ      : AMXPEASIS-3110
    //=================================================================
    fnc_DisableButtonGenerateDocumentTrasu: function () {
        //debugger;
        stage = Xrm.Page.data.process.getActiveStage();

        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso == "active") {
            var nameFase = stage.getName();

            if (nameFase == "Notify TRASU" || nameFase == "Notificar a TRASU") {

                var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                var tipoCasoCode = "";
                if (caseType != null) {

                    var objCaseType = Ust_Case.Funcion.fnc_getCaseTypeById(caseType[0].id);
                    if (objCaseType == null) { alert("objCaseType is empty"); return; }
                    tipoCasoCode = (objCaseType.attributes.ust_code === undefined) ? "" : objCaseType.attributes.ust_code.value;

                }

                if (tipoCasoCode == "004") { //Tipo Reclamo OSIPTEL
                    //Ust_Case.Funcion.fnc_generateResolution();
                    var trasuResultReclamo = Xrm.Page.getAttribute("ust_trasuresult").getValue();
                    var trasuResultQueja = Xrm.Page.getAttribute("ust_resultgrievanceosiptel").getValue();

                    if (trasuResultReclamo == "864340000" || trasuResultReclamo == "864340003") //Fundado o Parcialmente Fundado
                    {
                        return true;
                    }
                }
                else if (tipoCasoCode == "005")//Tipo Caso Queja OSIPTEL
                {
                    var resultgrievanceosiptel = Xrm.Page.getAttribute("ust_resultgrievanceosiptel").getValue();

                    if (resultgrievanceosiptel == "864340000" || resultgrievanceosiptel == "864340003") //Fundado o Parcialmente Fundado
                    {
                        //Ust_Case.Funcion.fnc_InvoquePluginGenerateDocumentTrasu();
                        return true;
                    }
                }
                else {
                    return false;

                }
            }

        }
    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 07/07/2018
    // Req      : AMXPEASIS-3099
    // Function : Deshabilitar boton cuando no se encuentre en la fase "Notificar Cliente" y "Reclamo Osiptel"
    //=================================================================
    fnc_getCaseTypeById: function (var_CaseTypeId) {
        //debugger;
        try {
            if (var_CaseTypeId == null || var_CaseTypeId == "") return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="amxperu_casetype">';
            fetchXML += '<attribute name="amxperu_casetypeid" />';
            fetchXML += '<attribute name="ust_code" />';
            fetchXML += '<order attribute="amxperu_name" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="amxperu_casetypeid" operator="eq" value="' + var_CaseTypeId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCon = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objCon.length == 0) return null;
            else return objCon[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },


    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 07/07/2018
    // Req      : AMXPEASIS-3099
    // Function : Deshabilitar boton cuando no se encuentre en la fase "Notificar Cliente" y "Reclamo Osiptel"
    //=================================================================

    fnc_DisableButtonGenerateDocument: function () {
        stage = Xrm.Page.data.process.getActiveStage();

        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso == "active") {
            var nameFase = stage.getName(); //"Notify Customer"    

            if (nameFase == "Notify Customer" || nameFase == "Notificar al cliente") {

                var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                if (caseType != null) {

                    var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
                    var tipoCasoCode = "";

                    ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                        var datos = result;

                        if (datos != null && datos.d.results.length > 0) {
                            var entidad = datos.d.results[0];
                            if (entidad.ust_Code != null) {

                                tipoCasoCode = entidad.ust_Code;
                            }
                        }
                    });
                }

                if (tipoCasoCode == "004") {

                    return true;
                }
                else {
                    return false;


                }
            }

        }
    }
    ,

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 10/07/2018
    // Req      : AMXPEASIS-310822
    // Function : Obtener Ids de la vista y llamar a la funcion  "updateCaseRecords"
    //=================================================================

    fnc_UpdateFields: function (selectedIds) {

        var srcPopUp = "/WebResources/ust_PopUpNotifyTrasu.html";
        var serverUrl = Xrm.Page.context.getClientUrl();

        var url = serverUrl + srcPopUp;

        var DialogOptions = new Xrm.DialogOptions();
        DialogOptions.width = 500;
        DialogOptions.height = 330;
        Xrm.Internal.openDialog(url, DialogOptions, null, null, null);

        /* if (selectedIds != null && selectedIds != "") {
            var strIds = selectedIds.toString();
            var arrIds = strIds.split(",");
            for (var indxIds = 0; indxIds < arrIds.length; indxIds++) {

                Ust_Case.Funcion.updateCaseRecords(arrIds[indxIds]);
                alert("funcion generar excel");
            }
            alert("Actualización de estado a Elevado");
        }
        else {
            alert("No ha seleccionado ningún Caso ");
        } */





    }
    ,

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 10/07/2018
    // Req      : AMXPEASIS-3108
    // Function : Actualizar Campos seleccionados de la vista y Generar Excel
    //=================================================================

    updateCaseRecords: function (casesId) {

        var objCase = new Object();
        objCase.StatusCode = {
            Value: 864340005
        };
        var jsonEntity = window.JSON.stringify(objCase);
        var serverUrl = Xrm.Page.context.getClientUrl();

        var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc/IncidentSet";
        var ODataPath = serverUrl + ODATA_ENDPOINT;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: ODataPath + "(guid'" + casesId + "')",
            data: jsonEntity,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
                XMLHttpRequest.setRequestHeader("X-HTTP-Method", "MERGE");
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus + "; ErrorThrown: " + errorThrown);
            }
        });
    }

    ,

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 12/07/2018
    // Req  : AMXPEASIS-3108
    // Function : Ocultar Boton basado en la vista seleccionada (selectedctrl es un parameter del enable rule ribbonbutton)
    //https://mahadeomatre.blogspot.com/2015/04/hide-ribbon-button-based-on-view.html
    //=================================================================

    HideButtonOnViewSelected: function (selectedCtrl) {
        var query = selectedCtrl.get_viewTitle();
        if (query == 'TRASU OSIPTEL Grievance and OSIPTEL Complaints Appealed') {
            return true;
        }
        else {
            return false;
        }
    }
    ,

    //=================================================================
    // Creator  : Luis Levano
    // Creation : 12/07/2018
    // Req      : AMXPEASIS-2939
    // Function : 1. With category4 = CALIDAD AVERIA, set ust_complaintphase = Averia.
    //=================================================================

    fnc_OnSaveReclamoOsiptel: function () {

        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
        var category4 = Xrm.Page.getAttribute("ust_category4").getValue();
        if (caseType != null) {
            //Query to Case type.          
            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";
            if (strConsultaTipoCaso != null) {
                ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                    var datos = result;
                    if (datos != null && datos.d.results.length > 0) {
                        var entidad = datos.d.results[0];
                        if (entidad.ust_Code != null) {
                            tipoCasoCode = entidad.ust_Code;
                        }
                    }
                });
            }
            if (category4 != null) {
                //Proccess Phase Name
                var activeStage = Xrm.Page.data.process.getActiveStage();
                var stagename = activeStage.getName();
                var NameFaseIdentitySpanish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseIdentitySpanish');
                var NameFaseIdentityEnglish = Ust_Case.Funcion.fnc_ConsultNameFase('NameFaseIdentityEnglish');
                //Category 4 Name          
                var tipoCategory4 = category4[0].name;
                if (tipoCasoCode == 004 && tipoCategory4.match(/^.*CALIDAD - AVERÍA.*$/) && (stagename.toLowerCase() == NameFaseIdentitySpanish.toLowerCase() || stagename.toLowerCase() == NameFaseIdentitySpanish.toLowerCase())) {
                    //set value Averia
                    Xrm.Page.getAttribute("ust_complaintphase").setValue(864340000);
                }
            }
        }
    },

    //=================================================================
    // Creator  : Jordy
    // Creation : 12/07/2018
    // Req      : AMXPEASIS-3163
    // Function : PopUp Retencion
    //=================================================================

    fnc_PopUpRetencion: function () {
        //debugger;
        var url = Xrm.Page.context.getClientUrl();

        var fetchXmlCodeurlweb = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "<entity name='etel_crmconfiguration'>" +
            "<attribute name='etel_crmconfigurationid' />" +
            "<attribute name='etel_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='etel_value' />" +
            "<order attribute='etel_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='etel_name' operator='eq' value='WebResourcePopupRetencion' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";


        var fetchCodeurl = XrmServiceToolkit.Soap.Fetch(fetchXmlCodeurlweb);
        if (fetchCodeurl.length > 0) {
            url += fetchCodeurl[0].attributes.etel_value.value;
        }

        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

        if (caseType != null) {

            var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
            var tipoCasoCode = "";

            ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                var datos = result;

                if (datos != null && datos.d.results.length > 0) {
                    var entidad = datos.d.results[0];
                    if (entidad.ust_Code != null) {

                        tipoCasoCode = entidad.ust_Code;
                    }
                }
            });

            if (tipoCasoCode == "010") {
                //var retecion = fnc_retencion();
                var DialogOptions = new Xrm.DialogOptions();
                DialogOptions.width = 500;
                DialogOptions.height = 330;
                Xrm.Internal.openDialog(url, DialogOptions, null, null, null);

            }
        }

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 21/07/2018
    // Req      : 
    // Function : Get Customer Document
    //=================================================================
    fnc_getCustomerDocument: function (objContact) {

        try {
            if (objContact == null) return null;

            var relatedIndividual = objContact;
            if (relatedIndividual != null) {

                relatedIndividual = relatedIndividual.replace("{", "");
                relatedIndividual = relatedIndividual.replace("}", "");
            }

            var fetchXML = "<fetch distinct='false' mapping='logical' output-format='xml-platform' version='1.0'>" +
                "<entity name='amxperu_customerdocument'>" +
                "<attribute name='amxperu_customerdocumentid'/>" +
                "<attribute name='amxperu_name'/>" +
                "<attribute name='amxperu_documenttype'/>" +
                "<attribute name='amxperu_filepath'/>" +
                "<attribute name='amxperu_documentidonbase'/>" +
                "<attribute name='amxperu_documentcode'/>" +
                "<attribute name='amxperu_documentid'/>" +
                "<attribute name='createdon'/>" +
                "<order descending='false' attribute='amxperu_name'/>" +
                "<filter type='and'>" +
                "<condition attribute='amxperu_relatedentityguid' value='" + relatedIndividual + "' operator='eq'/>" +
                "</filter>" +
                "</entity>" +
                "</fetch>";

            var objCon = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objCon.length == 0) return null;
            else return objCon[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },


    //=================================================================
    // Creator  : Rudy Capatinta
    // Creation : 22/07/2018
    // Function : DisableButtonAppoinmentLog
    // REQ      : 52-1-007
    //=================================================================
    fn_DisableButtonAppoinmentLog: function () {
        try {
            var activeStage = Xrm.Page.data.process.getActiveStage();

            if (activeStage.getName() == "Identity" || activeStage.getName() == "Research")
                return true;
        }
        catch (e) {
            //
            //alert(e);
        }

        return false;
    },

    //-------------------------------------------------------------------------------------------------
    //Author        : Carlos Mezones
    //Requirement   : 3184
    //Date          : 2018-09-04
    //Function Purpose: Gets the Subscription by Id
    //-------------------------------------------------------------------------------------------------
    fnc_GetSubscriptionById: function (var_Id) {
        var objEntity = null;
        try {
            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="etel_subscription">';
            fetchXML += '<attribute name="etel_subscriptionid" />';
            fetchXML += '<attribute name="etel_name" />';
            fetchXML += '<attribute name="amxperu_newinstallationaddress" />';
            fetchXML += '<order attribute="etel_name" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="etel_subscriptionid" operator="eq" value="' + var_Id + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCD = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objCD.length > 0) objEntity = objCD[0];
        }
        catch (ex) {
            alert(ex.message);
        }

        return objEntity;
    },

    //=================================================================
    // Creator  : Rudy Capatinta
    // Creation : 22/07/2018
    // ModifiedBy  : Carlos Mezones
    // ModifiedOn  : 04/09/2018
    // Function : ButtonAppoinmentLog
    // REQ      : 52-1-007
    //=================================================================

    fn_ButtonAppoinmentLog: function () {
        //debugger;
        try {
            var alert1033 = "";
            var alert3082 = "";
            var lcid = Xrm.Page.context.getUserLcid();

            var var_SubscriptionId;
            var Lookup_Subscription = Xrm.Page.getAttribute("etel_subscriptionid").getValue();
            if (Lookup_Subscription != null) var_SubscriptionId = Lookup_Subscription[0].id;
            if (var_SubscriptionId == null || var_SubscriptionId == "") {
                alert1033 = "The Subscription field is empty.";
                alert3082 = "El campo Suscripción esta vacio.";
                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);
                return;
            }

            var objSubscription = Ust_Case.Funcion.fnc_GetSubscriptionById(var_SubscriptionId);
            if (objSubscription == null) {
                alert1033 = "The Subscription does not exist.";
                alert3082 = "La Suscripción no existe.";
                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);
                return;
            }

            var var_InstallationAddressId = (objSubscription.attributes.amxperu_newinstallationaddress === undefined) ? "" : objSubscription.attributes.amxperu_newinstallationaddress.id;
            if (var_InstallationAddressId == null || var_InstallationAddressId == "") {
                alert1033 = "Select a Subscription that contains installation address.";
                alert3082 = "Seleccionar una Subscripción que contenga direcccion de instalación.";
                Xrm.Utility.alertDialog(lcid === 1033 ? alert1033 : alert3082);
                return;
            }


            var activeStage = Xrm.Page.data.process.getActiveStage();

            if (!(activeStage.getName() == "Identity" || activeStage.getName() == "Research"))
                return;

            var subscription = Xrm.Page.getAttribute("etel_subscriptionid").getValue();
            var options = { openInNewWindow: true };
            var parameters = {};

            parameters["etel_name"] = "New appointment log";
            parameters["ust_caseid"] = Xrm.Page.data.entity.getId();
            parameters["ust_caseidname"] = Xrm.Page.data.entity.getEntityName();

            if (subscription != null)
                parameters["etel_relatedsubscription"] = subscription[0].id;

            Xrm.Utility.openEntityForm("etel_appointmentlog", null, parameters, options);
        }
        catch (ex) {
            alert(ex.message);
        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 23/07/2018
    // Function : DisableButtonGenerateResponseLetter
    // REQ      : AMXPEASIS-3241
    //=================================================================
    fnc_DisableButtonGenerateResponseLetter: function () {

        stage = Xrm.Page.data.process.getActiveStage();

        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso == "active") {
            var nameFase = stage.getName();

            if (nameFase == "Notify Customer" || nameFase == "Notificar al cliente") {

                var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                if (caseType != null) {

                    //var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
                    //var tipoCasoCode = "";

                    //ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                    //    var datos = result;

                    //    if (datos != null && datos.d.results.length > 0) {
                    //        var entidad = datos.d.results[0];
                    //        if (entidad.ust_Code != null) {

                    //            tipoCasoCode = entidad.ust_Code;
                    //        }
                    //    }
                    //});

                    var objCaseType = Ust_Case.Funcion.fnc_getCaseTypeById(caseType[0].id);
                    if (objCaseType == null) { alert("objCaseType is empty"); return; }
                    tipoCasoCode = (objCaseType.attributes.ust_code === undefined) ? "" : objCaseType.attributes.ust_code.value;
                }

                if (tipoCasoCode == "007") { //Tipo Reclamo INDECOPI                  
                    //if (!false)
                    //{
                    // Ust_Case.Funcion.fnc_InvoqueServiceGenerateResponseLetter();
                    //}                  

                    return true;
                }
                else {
                    return false;

                }
            }

        }
    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 23/07/2018
    // Function : InvoqueServiceGenerateResponseLetter
    // REQ      : AMXPEASIS-3241
    //=================================================================

    fnc_InvoqueServiceGenerateResponseLetter: function () {

        var data = Ust_Case.Funcion.fnc_generateResponseLetter();

        if (data != null)
            Ust_Case.Funcion.fnc_documentLoadSignature();
    },

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 23/07/2018
    // Req      : AMXPEASIS-3102
    // Function : Hide or Show Button SendEmailNotification
    //=================================================================
    fnc_ShowButtonSendEmailNotification: function () {

        var flag_showbutton = Xrm.Page.getAttribute("ust_flagshowbuttonsendemailnotification").getValue();

        stage = Xrm.Page.data.process.getActiveStage();

        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        if (proceso == "active") {
            var nameFase = stage.getName(); //"Notify Customer"    

            if (nameFase == "Notify Customer" || nameFase == "Notificar al cliente") {

                var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                if (caseType != null) {

                    var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
                    var tipoCasoCode = "";

                    ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
                        var datos = result;

                        if (datos != null && datos.d.results.length > 0) {
                            var entidad = datos.d.results[0];
                            if (entidad.ust_Code != null) {

                                tipoCasoCode = entidad.ust_Code;
                            }
                        }
                    });
                }

                if (tipoCasoCode == "004") { // && flag_showbutton == true
                    // alert("valor = >  " + flag_showbutton);
                    return true;
                }
                else {
                    return false;

                }
            }

        }
        //  Xrm.Page.ui.refresfhRibbon();  
    }

    ,

    //=================================================================
    // Creator  : Jordy Sullca
    // Creation : 23/07/2018
    // Req      : AMXPEASIS-3102
    // Function : Action Button SendEmailNotification call Plug-In UstCreateEmail
    //=================================================================

    fnc_SendEmailNotification: function () {

        //debugger;

        Xrm.Page.getAttribute("ust_flagtaskemailnotification").setValue(true);

        Xrm.Page.data.entity.save();
        Xrm.Page.data.entity.refresh(true);


    },

    //=================================================================
    // Creator  : 
    // Creation : 23/07/2018
    // Req      : 
    // Function : Data Incident, Contact, Customer Address y systemuser
    //=================================================================
    getIncidentById: function (var_IncidentId) {
        //
        try {
            if (var_IncidentId == null) return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="incident">';
            fetchXML += '<attribute name="incidentid" />'; //guid
            fetchXML += '<attribute name="ticketnumber" />'; // txt
            fetchXML += '<attribute name="ust_customerid" />'; //guid
            fetchXML += '<attribute name="ust_customername" />'; //name
            fetchXML += '<attribute name="customerid" />'; //guid
            fetchXML += '<attribute name="ust_osiptelcomplaintid" />'; //txt  
            fetchXML += '<attribute name="ust_indecopicomplaintid" />'; //txt          
            fetchXML += '<attribute name="createdon" />'; //txt
            fetchXML += '<attribute name="amxperu_casetype" />'; //guid Case Type
            fetchXML += '<attribute name="ust_category1" />'; // guid Case Category
            fetchXML += '<attribute name="ust_category2" />'; //guid Case Sub-Category
            fetchXML += '<attribute name="ust_category3" />'; //guid Case Sub-Sub Category
            fetchXML += '<attribute name="ust_category4" />'; //guid Case Other Category
            fetchXML += '<attribute name="ust_category5" />'; //guid Case Category 5
            fetchXML += '<attribute name="ust_osiptelnotificationaddress" />'; //guid Customer Address
            fetchXML += '<attribute name="ownerid" />'; //guid SystemUser           
            fetchXML += '<order attribute="incidentid" descending="true" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="incidentid" operator="eq" value="' + var_IncidentId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objInc = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objInc.length == 0) return null;
            else return objInc[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },

    getContactById: function (var_CustomerId) {
        //
        try {
            if (var_CustomerId == null) return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="contact">'; //individuals
            fetchXML += '<attribute name="contactid" />';
            fetchXML += '<attribute name="firstname" />';
            fetchXML += '<attribute name="lastname" />';
            fetchXML += '<attribute name="middlename" />';
            fetchXML += '<attribute name="amxperu_documenttype" />';
            fetchXML += '<attribute name="etel_passportnumber" />';
            fetchXML += '<attribute name="mobilephone" />';
            fetchXML += '<attribute name="emailaddress1" />';
            fetchXML += '<order attribute="contactid" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="contactid" operator="eq" uitype="contact" value="' + var_CustomerId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCon = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objCon.length == 0) return null;
            else return objCon[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },

    getCustomerAddressById: function (var_CustomerId) {
        //
        try {
            if (var_CustomerId == null) return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="etel_customeraddress">'; //individuals
            fetchXML += '<attribute name="etel_customeraddressid" />';
            fetchXML += '<attribute name="etel_customeraddresstypecode" />';
            fetchXML += '<attribute name="etel_cityid" />';
            fetchXML += '<attribute name="amxperu_department" />';
            fetchXML += '<attribute name="amxperu_province" />';
            fetchXML += '<attribute name="amxperu_district" />';
            fetchXML += '<attribute name="amxperu_street1" />';
            fetchXML += '<attribute name="etel_addressline2" />';
            fetchXML += '<attribute name="etel_addressline3" />';
            fetchXML += '<order attribute="etel_customeraddressid" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="etel_individualcustomerid" operator="eq" value="' + var_CustomerId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objCustAddress = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objCustAddress.length == 0) return null;
            else return objCustAddress[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },

    getUserById: function (var_UserId) {
        //
        try {
            if (var_UserId == null) return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="systemuser">'; //individuals
            fetchXML += '<attribute name="systemuserid" />';
            fetchXML += '<attribute name="fullname" />';
            fetchXML += '<attribute name="domainname" />';
            fetchXML += '<attribute name="internalemailaddress" />';
            fetchXML += '<attribute name="mobilephone" />';
            fetchXML += '<attribute name="positionid" />';
            fetchXML += '<attribute name="firstname" />';
            fetchXML += '<attribute name="lastname" />';
            fetchXML += '<attribute name="middlename" />';
            fetchXML += '<order attribute="systemuserid" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="systemuserid" operator="eq" uitype="systemuser" value="' + var_UserId + '" />';
            fetchXML += '</filter>';
            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objUser = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objUser.length == 0) return null;
            else return objUser[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    },

    createCustomerDocument: function (txt_documentName, txt_relatedindividual_Id, txt_relatedindividual_Name, txt_relatedentityname, txt_relatedentityguid) {
        //debugger;
        try {
            var docId = "";
            var entity = new XrmServiceToolkit.Soap.BusinessEntity("amxperu_customerdocument");
            entity.attributes["amxperu_name"] = txt_documentName; //txt
            entity.attributes['amxperu_relatedindividual'] = { id: txt_relatedindividual_Id, logicalName: txt_relatedindividual_Name, type: 'EntityReference' };
            entity.attributes["amxperu_relatedentityname"] = txt_relatedentityname; //txt
            entity.attributes["amxperu_relatedentityguid"] = txt_relatedentityguid; //txt   
            entity.attributes["amxperu_documentid"] = txt_relatedentityguid; //txt
            docId = XrmServiceToolkit.Soap.Create(entity);
        }
        catch (ex) {
            alert(ex.message);
        }

        return docId;
    },


    saveCustomerDocument: function (txt_relatedindividual_Id, txt_relatedindividual_Name, txt_documentid, int_documenttype, bln_filesenttoonbase,
        txt_filepath, txt_relatedentityname, txt_relatedentityguid, int_status) {
        //
        try {
            var docId;
            var entity = new XrmServiceToolkit.Soap.BusinessEntity("amxperu_customerdocument");
            entity.attributes['amxperu_relatedindividual'] = { id: txt_relatedindividual_Id, logicalName: txt_relatedindividual_Name, type: 'EntityReference' };
            entity.attributes["amxperu_documentid"] = txt_documentid; //txt
            entity.attributes["amxperu_documenttype"] = { value: int_documenttype, type: "OptionSetValue" }; //5: Letter
            entity.attributes["amxperu_filesenttoonbase"] = bln_filesenttoonbase; //bool
            entity.attributes["amxperu_filepath"] = txt_filepath; //txt
            entity.attributes["amxperu_relatedentityname"] = txt_relatedentityname; //txt, Incident
            entity.attributes["amxperu_relatedentityguid"] = txt_relatedentityguid; //txt
            entity.attributes["amxperu_status"] = { value: int_status, type: "OptionSetValue" }; //2: Generated     
            docId = XrmServiceToolkit.Soap.Create(entity);
        }
        catch (ex) {
            alert(ex.message);
        }
    },

    getDataPDVById: function (var_UserId) {
        // 
        try {
            if (var_UserId == null) return null;

            var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
            fetchXML += '<entity name="systemuser">';
            fetchXML += '<attribute name="systemuserid" />';
            fetchXML += '<attribute name="fullname" />';
            fetchXML += '<order attribute="systemuserid" descending="false" />';
            fetchXML += '<filter type="and">';
            fetchXML += '<condition attribute="systemuserid" operator="eq" uitype="systemuser" value="' + var_UserId + '" />';
            fetchXML += '</filter>';

            fetchXML += '<link-entity name="amxperu_pointofsales" from="amxperu_pointofsalesid" to="amxperu_pointofsales" alias="a_d3eb5fe10d31e81180d2005056841895">';
            fetchXML += '<attribute name="amxperu_pointofsalesid" />';
            fetchXML += '<attribute name="amxperu_region" />';
            fetchXML += '<attribute name="amxperu_name" />';
            fetchXML += '<attribute name="amxperu_channelid" />';
            fetchXML += '<attribute name="amxperu_address" />';
            fetchXML += '</link-entity>';

            fetchXML += '</entity>';
            fetchXML += '</fetch>';

            var objPDV = XrmServiceToolkit.Soap.Fetch(fetchXML);
            if (objPDV.length == 0) return null;
            else return objPDV[0];

        } catch (ex) {
            alert(ex.message);
            return null;
        }
    }
    ,

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 18/07/2018
    // Req      : AMXPEASIS-3110
    // Function : Get Servicio - AmxPeruImprimirCase
    // PDB      : INT-DOC-008
    //=================================================================
    fnc_generateDocumentTrasu: function () {

        //debugger;

        try {

            var formType = Xrm.Page.ui.getFormType();
            if (formType != FORM_TYPE_UPDATE) return;

            //Datos del Caso
            var var_CaseId = Xrm.Page.data.entity.getId();
            if (var_CaseId == null || var_CaseId == "") { alert("Case is empty"); return; }

            var objInc = Ust_Case.Funcion.getIncidentById(var_CaseId);
            if (objInc == null) { alert("Case is empty"); return; }
            var var_Case_TicketNumber = (objInc.attributes.ticketnumber === undefined) ? "" : objInc.attributes.ticketnumber.value;
            var var_Case_Createdon = (objInc.attributes.createdon === undefined) ? "" : objInc.attributes.createdon.value;
            var var_Case_CaseType = (objInc.attributes.amxperu_casetype === undefined) ? "" : objInc.attributes.amxperu_casetype.formattedValue;
            var var_Case_Cat1 = (objInc.attributes.ust_category1 === undefined) ? "" : objInc.attributes.ust_category1.name;
            var var_Case_Cat2 = (objInc.attributes.ust_category2 === undefined) ? "" : objInc.attributes.ust_category2.name;
            var var_Case_Cat3 = (objInc.attributes.ust_category3 === undefined) ? "" : objInc.attributes.ust_category3.name;
            var var_Case_Cat4 = (objInc.attributes.ust_category4 === undefined) ? "" : objInc.attributes.ust_category4.name;
            var var_Case_Cat5 = (objInc.attributes.ust_category5 === undefined) ? "" : objInc.attributes.ust_category5.name;
            var var_Case_OsiptelNotAddressId = (objInc.attributes.ust_osiptelnotificationaddress === undefined) ? "" : objInc.attributes.ust_osiptelnotificationaddress.id;
            var var_Case_OwnerId = (objInc.attributes.ownerid === undefined) ? "" : objInc.attributes.ownerid.id;
            var var_Case_CreatedById = (objInc.attributes.createdby === undefined) ? "" : objInc.attributes.createdby.id;
            var var_Case_OsiptelNotEmail = (objInc.attributes.ust_osiptelnotificationemail === undefined) ? "" : objInc.attributes.ust_osiptelnotificationemail.value;
            var var_Case_OsiptelComplaintId = (objInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objInc.attributes.ust_osiptelcomplaintid.value;
            var var_ParentCaseId = (objInc.attributes.parentcaseid === undefined) ? "" : objInc.attributes.parentcaseid.id;
            var var_CustomerId = (objInc.attributes.customerid === undefined) ? "" : objInc.attributes.customerid.id;
            var var_CustContactId = (objInc.attributes.etel_customercontactid === undefined) ? "" : objInc.attributes.etel_customercontactid.id;


            //Datos del Padre Caso
            //var var_ParentCaseId="";
            //var Lookup_ParentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
            //if(Lookup_ParentCase != null) var_ParentCaseId = Lookup_ParentCase[0].id;
            //if(var_ParentCaseId == null || var_ParentCaseId == "") { alert("The ParentCase is empty"); return; } 
            var var_PCase_TicketNumber = "", var_PCase_OsiptelComplaintId = "";
            if (var_ParentCaseId != null && var_ParentCaseId != "") {
                var objPInc = getIncidentById(var_ParentCaseId);
                if (objPInc != null) {
                    var_PCase_TicketNumber = (objPInc.attributes.ticketnumber === undefined) ? "" : objPInc.attributes.ticketnumber.value;
                    var_PCase_OsiptelComplaintId = (objPInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objPInc.attributes.ust_osiptelcomplaintid.value;
                }

            }

            //Datos del Customer
            //var var_CustomerId="";
            //var Lookup_Customer = Xrm.Page.getAttribute("customerid").getValue();
            //if(Lookup_Customer != null) var_CustomerId = Lookup_Customer[0].id;
            //if(var_CustomerId == null || var_CustomerId == "") { alert("The CustomerId is empty"); return; } 

            var var_Cont_FisrtName = "", var_Cont_LastName = "", var_Cont_MiddleName = "", var_Cont_DocTypeName = "";
            var var_Cont_DocTypeNum = "", var_Cont_Mobile = "", var_Cont_Email = "";

            if (var_CustomerId != null && var_CustomerId != "") {
                var objContact = Ust_Case.Funcion.getContactById(var_CustomerId);
                if (objContact != null) {
                    var_Cont_FisrtName = (objContact.attributes.firstname === undefined) ? "" : objContact.attributes.firstname.value;
                    var_Cont_LastName = (objContact.attributes.lastname === undefined) ? "" : objContact.attributes.lastname.value;
                    var_Cont_MiddleName = (objContact.attributes.middlename === undefined) ? "" : objContact.attributes.middlename.value;
                    var_Cont_DocTypeName = (objContact.attributes.amxperu_documenttype === undefined) ? "" : objContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cont_DocTypeNum = (objContact.attributes.etel_passportnumber === undefined) ? "" : objContact.attributes.etel_passportnumber.value;
                    var_Cont_Mobile = (objContact.attributes.mobilephone === undefined) ? "" : objContact.attributes.mobilephone.value;
                    var_Cont_Email = (objContact.attributes.emailaddress1 === undefined) ? "" : objContact.attributes.emailaddress1.value;
                }

            }

            //Datos del Contact of Customer
            //var var_CustContactId="";
            //var Lookup_CustContact = Xrm.Page.getAttribute("etel_customercontactid").getValue(); //(Customer Contact, etel_customercontactid)
            //if(Lookup_CustContact != null) var_CustContactId = Lookup_CustContact[0].id;
            //if(var_CustContactId == null || var_CustContactId == "") { alert("The Customer ContactId is empty"); return; } 

            var var_Cust_Cont_FisrtName = "", var_Cust_Cont_LastName = "", var_Cust_Cont_MiddleName = "", var_Cust_Cont_DocTypeName = "";
            var var_Cust_Cont_DocTypeNum = "", var_Cust_Cont_Mobile = "", var_Cust_Cont_Email = "";

            if (var_CustContactId != null && var_CustContactId != "") {
                var objCustContact = getContactById(var_CustContactId);
                if (objCustContact != null) {
                    var_Cust_Cont_FisrtName = (objCustContact.attributes.firstname === undefined) ? "" : objCustContact.attributes.firstname.value;
                    var_Cust_Cont_LastName = (objCustContact.attributes.lastname === undefined) ? "" : objCustContact.attributes.lastname.value;
                    var_Cust_Cont_MiddleName = (objCustContact.attributes.middlename === undefined) ? "" : objCustContact.attributes.middlename.value;
                    var_Cust_Cont_DocTypeName = (objCustContact.attributes.amxperu_documenttype === undefined) ? "" : objCustContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cust_Cont_DocTypeNum = (objCustContact.attributes.etel_passportnumber === undefined) ? "" : objCustContact.attributes.etel_passportnumber.value;
                    var_Cust_Cont_Mobile = (objCustContact.attributes.mobilephone === undefined) ? "" : objCustContact.attributes.mobilephone.value;
                    var_Cust_Cont_Email = (objCustContact.attributes.emailaddress1 === undefined) ? "" : objCustContact.attributes.emailaddress1.value;
                }

            }

            //Direccion del Caso
            var var_ContAddr_Id = "", var_ContAddr_Type = "", var_ContAddr_City = "", var_ContAddr_Depa = "", var_ContAddr_Prov = "", var_ContAddr_Dist = "";
            var var_ContAddr_Line1 = "", var_ContAddr_Line2 = "", var_ContAddr_Line3 = "", var_ContAddr_StandardAddress = "";

            if (var_Case_OsiptelNotAddressId != null && var_Case_OsiptelNotAddressId != "") {
                var objCaseNotiAddress = Ust_Case.Funcion.getCustomerAddressById(var_Case_OsiptelNotAddressId);
                if (objCaseNotiAddress != null) {
                    var_ContAddr_Id = (objCaseNotiAddress.attributes.etel_customeraddressid === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddressid.value;
                    var_ContAddr_Type = (objCaseNotiAddress.attributes.etel_customeraddresstypecode === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddresstypecode.formattedValue;
                    var_ContAddr_City = (objCaseNotiAddress.attributes.etel_cityid === undefined) ? "" : objCaseNotiAddress.attributes.etel_cityid.name;
                    var_ContAddr_Depa = (objCaseNotiAddress.attributes.amxperu_department === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_department.name;
                    var_ContAddr_Prov = (objCaseNotiAddress.attributes.amxperu_province === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_province.name;
                    var_ContAddr_Dist = (objCaseNotiAddress.attributes.amxperu_district === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_district.name;
                    var_ContAddr_Line1 = (objCaseNotiAddress.attributes.amxperu_street1 === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_street1.formattedValue;
                    var_ContAddr_Line2 = (objCaseNotiAddress.attributes.etel_addressline2 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline2.value;
                    var_ContAddr_Line3 = (objCaseNotiAddress.attributes.etel_addressline3 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline3.value;
                    var_ContAddr_StandardAddress = var_ContAddr_Line1 + " " + var_ContAddr_Line2 + " " + var_ContAddr_Line3;
                }

            }

            //Datos del Usuario
            var var_Usr_UserName = "", var_Usr_FullName = "", var_Usr_Email = "", var_Usr_Mobile = "";
            var var_Usr_Position = "", var_Usr_FirstName = "", var_Usr_LastName = "", var_Usr_MiddleName = "";

            if (var_Case_OwnerId != null && var_Case_OwnerId != "") {
                var objUser = Ust_Case.Funcion.getUserById(var_Case_OwnerId);
                if (objUser != null) {
                    var_Usr_UserName = (objUser.attributes.domainname === undefined) ? "" : objUser.attributes.domainname.value;
                    var_Usr_FullName = (objUser.attributes.fullname === undefined) ? "" : objUser.attributes.fullname.value;
                    var_Usr_Email = (objUser.attributes.internalemailaddress === undefined) ? "" : objUser.attributes.internalemailaddress.value;
                    var_Usr_Mobile = (objUser.attributes.mobilephone === undefined) ? "" : objUser.attributes.mobilephone.value;
                    var_Usr_Position = (objUser.attributes.positionid === undefined) ? "" : objUser.attributes.positionid.value;
                    var_Usr_FirstName = (objUser.attributes.firstname === undefined) ? "" : objUser.attributes.firstname.value;
                    var_Usr_LastName = (objUser.attributes.lastname === undefined) ? "" : objUser.attributes.lastname.value;
                    var_Usr_MiddleName = (objUser.attributes.middlename === undefined) ? "" : objUser.attributes.middlename.value;
                }

            }

            //Datos del PDV
            var var_PDV_Id = "", var_PDV_Adress = "", var_PDV_Name = "", var_PDV_Zona = "", var_PDV_Chanel = "";
            if (var_Case_CreatedById != null && var_Case_CreatedById != "") {
                var objPDV = Ust_Case.Funcion.getDataPDVById(var_Case_CreatedById);
                if (objPDV != null) {
                    var_PDV_Id = (objPDV.attributes.amxperu_pointofsalesid === undefined) ? "" : objPDV.attributes.amxperu_pointofsalesid.value;
                    var_PDV_Adress = (objPDV.attributes.amxperu_address === undefined) ? "" : objPDV.attributes.amxperu_address.value;
                    var_PDV_Name = (objPDV.attributes.amxperu_name === undefined) ? "" : objPDV.attributes.amxperu_name.value;
                    var_PDV_Zona = (objPDV.attributes.amxperu_region === undefined) ? "" : objPDV.attributes.amxperu_region.name;
                    var_PDV_Chanel = (objPDV.attributes.amxperu_channelid === undefined) ? "" : objPDV.attributes.amxperu_channelid.name;
                }

            }

            //Creamos en Customer Document
            var txt_relatedentityname = "incident";
            var txt_relatedentityguid = var_CaseId;
            var txt_CustomerDocId = Ust_Case.Funcion.createCustomerDocument("Doc001", var_CustomerId, "contact", txt_relatedentityname, txt_relatedentityguid);

            var objCD = Ust_Case.Funcion.fnc_getCustomerDocument(var_CaseId);
            if (objCD != null) {
                var var_document_Id = (objCD.attributes.amxperu_documentid === undefined) ? "" : objCD.attributes.amxperu_documentid.value;
            }

            //configuracion para Envio de Documentos por Serviccio
            var psbWorkflowUrl;
            psbWorkflowUrl = Ust_Case.Funcion.fnc_getConfigValues("PsbRestServiceUrl");//http://localhost:6004/api/v1/workflow/
            var serviceUrl = psbWorkflowUrl + 'AmxPeruImprimirCase';

            var req =
            {
                "request": {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruImprimirCaseRequestDTO, AmxPeruPSBActivities",
                    "ListadoDocumentos": {
                        "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities]], mscorlib",
                        "$values": [{
                            "$type": "AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities",
                            "DocumentIDTCRM": "DTCRM00001",
                            "Nombre": "CHQ_APELACION_OSIPTEL", //"CHQ_APELACION_OSIPTEL",
                            "FlagFirmaDigital": "true"
                        }
                        ]
                    },
                    "Huella": {
                        "$type": "AmxPeruPSBActivities.Activities.External.HuellaTypeDTO, AmxPeruPSBActivities",
                        "IdHuella": "",
                        "HuellaImagen": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAAAAAB5Gfe6AABgnklEQVR42uzc5XNUWds/emZ+M/cMDrGOtLu7u6a7Y5103BUCCQnBggcL7hYkuCa4BQlOcIcQAvEQl3ZNgCdnzovzDzynijD3j/Wiq/euVdVVn7q+a12ravceMfR/+RjxC+AXwC+AXwC/AH4B/AL4BfAL4BfAL4BfAL8AfgH8AvgF8AvgF8AvgF8AvwB+AfwC+AXwC+AXwC+AHzPMxqHmod6hTrd54P8ugP5rNf/f16v79257/+BVx/Unt//7Ady25ldnLy9bu/frPxdtL4eGjq75PDQ0WZ8SnbtszuUFxWuu/XP/w4fB/1aA1vOVe5aVZiWel0kS1MEJCdPSL73uvfvw5Y6HiVlhTEmwPkaXnv/PvOsP/gsBBuqf3Vg4f25ilp6P43qTdFKcV+FYoL8Phpt81zwwYGybfj4QDcyLlMlq/5l96cKb/y4A07UVg0M9m6etuJyVkBkcTMdwYSN9oCSwzyQW1scHg5t6v7624s06ms9EGUEg/jQ09GVzSdN/EYDV9c/Hu9M7iriRhHe958uPVlc/fHggn3khkzluHCTkz7E+ozGrTC7Xq1dgHBwOxSsedxrzt1U2/xdF4GVVbhicll2en7Q/v2LG3qeFhd2G/j3fXbb2E1oUFYaBwdE+NEak4skZTyBuOpGpbBtqKNp39b8B4OmNlUVZISIIAeIJRSOR3iQK4S+Mp89YME6coF34vNViGTBWzWAj4D5E9P/JaDGZXkmx9NVIyKz+79sWPjT/+wEOLpuaIItMRYfpULFIPEdEgk6DS319dCOLx4PH+4wEToCs638Yt3hHKRqt8CdOjPpoaSoO8ISme4b+k4BbJ//lAN+rzs688KjuzUIVVkwBIdhkARIKxRCQYB+wlxcUuoYM4QIJQMw8wz2+wXSVOJKaxgULKKENuyBSGAeyamjo9injv70C3G9SOSBG2euS47NEcXiAco7BVHfnwvXKsstxOAIBFQ6DhIP/Il290NK5aO0cKB6wDQwIKHDUA0aSaPCQf1ql0vZ/NcCAJI7NoIX58p5R6Y9LOvJmFqQePLLv0rZr3TajzdxtbH1+N4cJQyX4YiayVOgYUzYA6PcXHhtx/IAOIsOSIwaGLm3s+/cCfM+UhSozcRBxWKvz7tu9EcEZSjIQSiAKyGOIR/H4tHOv5Ej0+71TKTxfIJw1MiDmWuTGp1TqWnJA3qurNyETVoFZ/3QDG5v+rQBLJi3SqFAk1YXez/sUSC6SA+PSImRMlpghIsCDUEwyBwwEaw/m5d4X40Rk8vkA6Egqnj6fjcQyQaB9zR/4cCIc+s9hYcenfyVAZVl+fqAofkfTfQHGB69YK6UVSCODpJGps8tjWDJZEJsMXldKoFPh4qjNIcJZAiDRb463J3wsse4ilSheGICLnB+mYLEIgUPfd/0bAS7dL0iMiXjefyuRzw5mYYUhebs3nrB9WlH2OO/AgN1t6n1+oChMzsZqCWAW/saCxV+eK9B0OZI9NmG1Zbk3ihBDgSTbN+ASubA1Q0OHv/zbANqeHCxOCl/Q30kT02ezheIZzy0ul8PV12y0trzobmuyOu1Ok/3r4YzwQClmMdGXtOS9JaahPIKIJKLzHBYYjU4jARb023eDqKqAG0NDJ5z/LoDuoc3LJm+s/HiaoF3MYBD2N1dIOhzP165QYClKPA3LYlCYKEHS6Srbhnb3w0UyIVE/eyJ5J1TU9RqMpiOZl6WoPAxuvRBZZ+3UBbLw9UMDl/5VAF8bz04+MmS9xOIF6eJ4k15db6tZlk8jo7PYaMpCVHgsTXyKOUXL5dPEN3udpgFrXSoLAwYALsSssdgEeDITEhxh6RGQ6GQ4YdAsQlPAg0NXqv9NAA33ShqGNst1oUGJaV0GW11RLJ2OjWQRkjlwuYwerNBJlWK6arOCEsLHspnHXV+fnktRpk8kw3Mu2JryoapJaHGPoyMAJZaiw631nmASc2io7NW/B6D6dN/QwHx+zCRp/AGToW5bsERBl8B5JPLetuq3JqvJZjObDR03jq+fEaXgT5PAUdn7DpjTkQR4Lnks+nzHaxk2kowhPbKcgmo20SL63kDJOPrQ0K6GfwtA/d6hoSJhepz+/Osu2xP4eGnOJhyfoUna9tz19WieofvyzmkUdXJKXG7Zlz5raZKcjMZzV/db7hHhDF4yQ/Z60seLaHI2ARE/WIyVxTGLrdUEHJfyj8C/BMDQO2RTyiOnXrAM9D0MBGapFSp54YOLGdlXu6sPzYyJgAK9iyVQppZHGz+C/84x8CWSqaGCyWWm+wdvwONiQrXFKW3byXQxk9HWswnOmUqONiWBmWvyh4ZuDPxLIjBfqePnN38feI8bHSVEifZU9xst165couJBwRgmnSvETWHyhZHaeJ1SICKGPSi6IIqmwHwJkXkhCQvQ/mo6dJOpIx+dHcbaemEOFBJNXOpMhCsEEUNDd/8VAKcTIlUhoZaBMgVPx5bTS770d9aXyIIU5HwhKZPGzFETEhdPnbxo9tJIjFTByFATIqmdC0Vo1FQMqabl0iIgLQwIbkt4dgOtYQt29t+CUuiMN9bpGIqmYGjg/r8AYFFCdHrhI9cnJIeXsSV0zRdjpeLPkViiIokpZwSJsl+ctpuMlqcZ4evbvva+XSXnMAU8xCJ3u4wPwQphh20nbTsYNAbyCvTFczB+vmyS/SwtP4bcZo0Dc5ElQ0OdPz1A6a4HMaU2y56AfCUt+FJn8w7YODKZw0QxWXFxGR3WHQcarR+SqGuW5e09mfug23AOxSE+WIngvowURKCFkLGomrdGIX+erxdaXveUSdTwFhvfU5SRgnsmIDxZdfinj8Dpm8mTii5Ye2LIgqlB5w22fb4oZRhdxIsN0524Ufj5y56MOCEFzFFxxEK2hMr2Suw99zKVjedzyQQuccoihm8E5HV9M55KSKbL537voWs0kmDzGTiDjnzSQ/HWyH52gBc7iwoydlgPEyat4k3p/LwMo1BiEg9VNfdbmoML+o1JNCT/Fpc5DR0u5wiUEvlkloB7usP8ehqTqICiD2Z+viCRY2ErPlxcRJdsxNFMtq4I9IbAjc71vkUikfGkNy8mfmjI9RMDVG/fMX/OSWeJNDQ4qNxQSCKq0oJO9+/D8DIGbB+3YfQsVZAsKCZvysHbH1u/PFrFIJCXqNT8h59MuzQ09Ry2942IKacYUtJGGEPphZdleZU5bCHsaOkLZx6cxRS1ZaKzOaVDQ99/WoD2N0Op+Y/MV9Rnw9JbZgiVk+nc4v7uKUxNYtDAxwItKjWdERi6xjQ46Gzts5naB809ywJFnAKp4PZKwQG+hqzHM6iVOxn7CMWnQXU0YmYy5pKrhSISSpvNXHwsd6Z5FUI09dTPG4HuoaH0WYXf7sjC4zaZEslB4gjpM+NlGE/J0r7eSCFziYKgiu6UQ472njgkv5DDm37EaDdVxSWKxPyQGXsck5gFHH8a7vUOjIBXYgVXKejxEVRy9yscQ+B597uXr0xQaY4lRKTs/FkB/mdoaLEurPeNMjai1NEbqpipm9/WPYVTsVqe1Z0JZS5hplU73c62m7sDsDyKZplYKZVTJr22GBv0qs0CwlnrR4VCPp1HvGP/hCergnLV79ngnSlyncU4R6INaH0E5iWLasw8wboU208bgXgpr60/Koef37sxcFa4/KOtASmUcUUnjTu44QyepmnA8nASn69UyilSrpIj1ssSRGj/uI+GjSpGrjy+Q6KTMTkE+gf7J3RsHvm6s52AkyoVi1stNKws3laBhAcJy+/7Jqyf/pMCGLUzF37s5OnV+3vmCeXhIW+sNWw2XRlZ05+IkCrSDiYsepJIXq6ICg7ZGLSlvOLom+vBmUJ5jChgq7NloTaUJm1MqomjBcnHzrWXe4rD2RsGlgF8yf8cF1v7Q/Xq9A4Am8EPnH0BLcnb/nMCxGcyO9yZYeoDhhL9Dn602RoKFE3SbbIai/A0Wfjngf4gdoZUE/Kxoddx3G00dlgsHV1lUUyunBrw3vIpRBJGn11+JIklYnsEfqWSdNcwsw4HRUIPKtWqshpVBnlaxxmUKE8yKZUSuOb6zwhQGKE90qxKD46yBTIjxUk1HXJvEYW35vii/JAV6GkP83u1GiZXke9wGRu35sVyGFggVHHVbv68gabhAItd7QnhQlHKmUO3waIMxOl1fAglVEaV3s8HsjYKY7oXUWmsPNMmskYfbtpLzj1c9bMBDAytT6LtspKIgWm2Nxh9RGnv5VHSFQLle2s5khsZtqi1qSAzJkZwzFRrKSaRsvixMxPZ0rCwUN/8KrPzNDcQduG5gqeZLZc32WuCUTy/64tMorRbnNnbG4AofZRow/ctkkThPlMUOkW1oU+XefNw588F4BxyJAUxzeVBvEhHa9TJ+Ssdr/zDeNrcg30vaExxurNeLqRmzNAUO56+iJSSlDSSTkxSczDCaRrP8WOqrMY4Ou/F9rO3gqgc7BXu7R0cGqza0oEQyiWSJ01s9I61ad9d01mx9Le2GJoi4rJDEbbi5s8WgfRNc1vLCRLim2pguPZ4byMhJ1FaYO3aTVOGcT7a9pM1KaI5z3Xtc+VsgeLItUfGVs17w5UgGUVcLkTzWvqSQsT73m7oSNd/Bq1gpm+RnoK9t1/D4jRs8V2DCquVLLFbSSFybXc/wT+c8vxDYPLt3p8LYGZaREcvGCvdZeBGBWb0voYL1agdfS9kwXJN0D1THYEoDZ17qOsmFatnzH2/cMOnKese3TrVaLPcmyOR6QNHLjckbmefbKDna/lq0ef4hEMsoe8Dxx0kepcsyGCLQavZhwwPwEyNuvMVDKblm7pUl978VACz0laU9wYFsnMGtPS18t7PE3aEyu4ayr1hco3svH2zx05Jeq/VsFeZqP3YZmzPSNdjNbHRTF4At7TP+CA4SsbcZArR4zZXC9A7gvW4mRUPqSwB+p37xFh4ykLWFxOOkciqMt2H7pYsaU6HpGjZtrfBK3t+IoAvK+NOG/FEKdJ0lhQse9GLV7CkV+Z8jtLpSeKaj8sINGlQh/sOPpKpaDTZlwUrNRlUiUDO0jPXKHgFHwyfOGR657tgtZh0PkS9Qcb2O2r9NFsZyH7nuIVhz2LI3R94WaGoCPt5vCztiHkhCEZOG4wqqPiJAJbunmTX4jWUJyZRJPWcKS4sUXnZmsVABQoyW98digrkCKQPDo7iBGX2dKfHTAkMp8mVeecfnUoTs4SJaWralmMa4n3TZ5IydmMlgPcexSSV3jXzebHIo44CBD2Gcst+GCsLC0u3PPIhBz1zcUGsoKLvUat/HoBzSeLOZWC5otHAPnu5yLKcUC3ZOvBugpZGyO83ZXD46hut53dgGITMS4/Gzacog7Vl79aWNFntMbINd1TxYTyZRMwpsuydog5RsVdQFhRCVgD3OGqxHCWlwzGZu03EcryFKYKCOVMty3izydXPGejp1IpvWRcHfhaABXOedNIFsncDEeKEpJ6rQAWZZb1LZ0zjcpc/y0ZohBeMn7REWfrRpgYCGUNaZ24PPLJWr9FHHax+YHHVzJcGRgTvEAtrQcUhoVLyoeR+CoKJu965B1IsmGzu2wsmoBd+nyMWwtnCfgOUJWIZSkBiOf3z0PH3PwvA1vvurLiMdQMPsGrRC5c0jY6va+BiQvCxxdUCkp6x1nbOj1XIndlTxdyBl2XNqKxQ6INnKvbsi5AogstNNuOjeLZauRFfntEml0fiT9dd9xMkju0U3ASgC6XZphNIBfWqEQtaFSSaanuBitqz0BALyBIqf55dYE1S9VOIKrSr0TtVo/u6AxOmrGhhcjPZe9puB9CVhNSmTpqIqjlmklExsxWZFatlEZlpqdNZTI1WuUCrUmPDZrX0FQSGhklSbd0w+T54guQlSkXevG7FQlxIhIpgXj4fH2hbicM10dn8ri8BUbEbO72DuJykoaG+nwNgsnKfmJLx/guSz4touQ0Ox+Ybo6SJRHlWqQ8ig4B+0ssW5kKrTGlcBr382UmJ+JNgZvmtmnt3Xm2NVujzCtJlFGyR/bJQ/ZCkdM0FIVSBy1RCtEj6ct015nK9IirEjWVxyw0U5OIbcDqrZzpeGXblIgIsVjz4SSqgV6TayVAdtuWDhbibtTBRJr7tCkAVQT8Z5KFmAumXzQKmJvJtjYeilHbNMo0rShWddttqbs/Wb6tr/ac56DfMF1XHBLfJCMQl0rn24+xpgeD4M5y8hXLXKzA2nQjCnbiCksB7d9Kg1XkESVQXB8QJMd+AEuLTLv0cANe46wPTpC2XaPuUM75rscH4NFcUOFCyG7WbLvGIaTPPZco51S5NQJDkrCWJvo3EX+puQCFI9ORo8F8TwSDAzK7P2mBh8JMTOoGSsq6hFo+9xrI3kHHKpU4lgdcACoX1T02iL+5lY8RtPlp1mRNFUWh6+Dh6yRTLTwGQSmMmk8o6+Qkqjvkg/mFAgOARd514/7bLqHhywLNta8lE7GJ3cUQU/2InLUrO5uc0FQM0T2V0ulIdJdwVEij12dgeoo9gyj+qwxQULimbGhW497jGezHu7i66YP+DMZjyFk9/1OdlJPTgVE9UiHl3digvrx2BwcWv/hkAvoayhcpNFniURvDkDUWE8X4yiyLnc7rbdAp9aOnqq1QlhXCiE0PEzr7IxFGZa2c9YOkiEDTMtNoDc2LnrJocpI+CCO1z1FqGuJfODNcDo2TQIPWDk1x//KFBlj/EuQKFN53wJU/tQgvet/sJqSVPeSI9a103X5iwwv4TAByJStXGtWVJw9HXjF5cJX+b08QOApVfWUs8xvxw4kuGRBWb+4w1FRhSshCZRNk7UC+IJCk4Rf0Oc3l+asbr3lcsdknB6D6NjkmeV4VdRw1l14DTclYX7MEpeM47/hMiB/CEa0a4HGxctjxkUO+zir+jfzk+hH/zDo2/4fjwA2wRZ4oER2oR0cGMgQUTcvhRWYYTVBrUaJPzELE1uuecCO7SrWI2kF9Vglfx0VXGLOVlTmhT/6kETKRoMUsketyZDYtDB9ojVOH8wUJ/ophRPkGqEd2ahM+RH3EpYYAHpShC1wFf5P32CdhrPfCwWVLnK6BErgzOCjp6wTDcAJVbuVheqqlMwWI31U5kCFekeW6YLEYI3W/wEvpzYikkhHSrb1csjPexihShLly6naNcx7tleEbHyHEqAQu/nokE2UrJElxxG2uTeO9AKB2svDIDAgKdly739oD3PPCeDjKCNk22+EPyHX7EHOu10bDASncsYWqU6lVsyPzK4QbYeYiVF3TfkRJMv29UM5SxjzD8EzEafl6/LJjKn8kI1ZGrrFMpKPhFA4fDVX+rhhCQUZ+745EKOiIAORVCA9E528bsW06Tel16Q1RL3vUgNwfNKj8Oo7LbTxFiPWZb4+DepzdCic82I1RfVqI5Lwx4os9yt3GBIFSafC9xxYPvwx2BsBnLCr6+SpNfHMhBI8PeESiRr8hEYs55Py6gPJDGyWWZzhH4SS/PpulINKlTsoATZnRLItaFcIGBzxzLERp7Mg6GZL/wCoC4YxQKlqVgA9fvkRUdGZTRKw28COuuAUJEtnGkSAMQPrObJJc6KhB+ynt4jsafG/z81fZNTcML0NQRGsY7YRIGR7u6sBROde6ofzo4IJwyfzYXLrB+JlL9Dlqo21FPD6VxlvqGJy2CUXx67ZPekP0FEa9tffbeYMI8+1YZmUucgoel1ATs0SS6wSDojA69Lw587okHEj/fyQ+CtE9BTWyZh0E3lwHxT408Uf5VsiR/E5AufDi05vHwAvzP9klY9bs1ZFHyQLqMs97CS6Lsnx8bN9UpzITusW9VYzm2S3QE13WAujog2fgaAhVdcU6jsWGbWl8KFwTmHseiCXVu8wPsdD85Cdcm9uThTr31zuC2vgChDsYYZ6gTKf2VbND+Tx45S1+jADfe0/GJrlJeVC9zEr9ABRHphh4fHuYIZNGRQc1Y6YxDjzn6nKaNkExQM2QPa4NxPH7itUak0m95H0kJKqssJa6AGrvgylCa+zoWCMt2t+DxcABwajLxmO+s7qi0cdkpAuFRNp85R2TI1abguw/4I0DPOvFokLyfTEWbItA4m4xEckpxxEuNyIAnUZHc+Gx8FKls6GLrsAIsSVFnPX3CZ6q6I9Yyb9iRAk9MJ4iA3fUaMUXSnwjDsp6tRS4Gr7kMT5iQO7CNQABuMcdHFQSaTRoGEeGJCICMBmO1iB0XGlA4eODcyRRcZUxOZwCWdtGyBA5nypZCltMai72Rb976wIv3T5ZvPU6C4gcjQVtfQBjc7psePN3QUNewAgTliy/UammBJ+4IsYBPF7RziIdW+XC1hmQq5ZJLroMUOJdBMZmcfZylUH4xKR4LbHwXwAp4bp+BPUsY7wn0xgCRQDrfs/WMLgX+DLOahPdDw6rLUDjM2UuAHBpjMxJKSP0cwM6wSqCsDhI2yMImsT5f5wrb58Yxg+9nE+W7hncbXJMZnj2wXaLWX07QQ2H2OTIExSwXRER+gcpp/R34J4DKQR3N/1letgBZDiphabxDXDlwqL9hF30MFDhOnPf56L6ap37jvaRf8PPqEiHUSyvGa3ULrMx7MPZeUeB8nw3LRQyClZZP7d2MxR4sHO97/B5UPrMviVLeOZ6Fy6vHkRXXhhPgW56I9NCsyJ+clhCbT9A2BUPR66poTOLM2SBEctttBN7/VS9VTrY+ojL5faR1LKH8fW9wuf/BgYB9eOCu9aAY04de8/Vj8ycymeHIks2MuYwLl/0okjslSBpl+XIEDbytwqccdm7nBNS+Fjgj3kouljiVCHhzrYDcW0xSCJsZwnWbhhNg/yFJpG1TOE9zabGUMO5FkRStdqTz+RkOYjL43MnNKFbkzB0AZOCxQwQM33Q+fr2+z3GDSUD0dPnHI1e4+oAoNZd9oIVnPUzDJU3HtWRFkHfP1/4Fy2oHhMLndoJmQKJ6ZEivlUYIXOb0ATNqN8EYe89Aw0J6haziHnhwbHQFFhU1nIvg6kfMj7YYrWped+YMIq+PzgZv6Oas9a8wTCCKap5xibSM3QkM6H35Ij4I7m5CoRj2bzK+kPe9HXnTZ9tXE3JrGm4+bmaf+lOoR8AhdK5jF5LeWefLlvQkp2J51vidkdBPVWSoyhmIIl0/x5uR3gTlgDo5Mn1ztJTdtxotkN+dSxOdG0aAxSE+bTdF5MB7/WICLPq+oCCgocw7AGE8PDJi3enX/l68S9dxybhDi3VEgKL9LRrhc9Do7zdxjrMedt77vvsiIhCJ8eQEHf4SOQ+0xjefs6sFKWUYIrGL5cc9PPBdJRQcvNUOw3u1lBMXaNqAE4F9lCxmZYW3195mMonUgoZ6aV+qeXndwwZwegn1hTFSAZnXdkAlievLQGT5WcVM2GSr2k90z7UHyiReeQtEwI43euIRL4OLyR6rZGf9SQmyUy4gx7/VkR0IC+lJYYaQ7qgmHB/tf+Ykpit1LXbzthQ/1qPJkyQ3KxVyoMAi4xcs6YJB4c0ikOersvGe8/s5NJAtk499dxKLIt0vUM+sGDaAdcmFxkdgEXpZgzCMuaRPzIAEtmMPIve888ZRna5n4OkC2+OR4eCuZnAG+vMxHFzelIsQoGtxcANiGvXNeXEC/e33rw/RMBLJA8zAYQ9Td7+CCmh3QRBI4dFEzfSMcC4f/yoIN1rgxviB7uxmhE834JngrqMk4IJ2tB/Hml7AiWxO15cNF0B/1bRr1rkMLPn6bR2VeKaUKGeceU4mqfqviIIyr101AfGhg1foVOKMZn+swmABx0s+1zGLpp4uBH0WAVF5zOx8RZ/xhrWVnuD5Wn5QfpVwIbA6sQq2La2JCoulAbFBhax8/6YLSOy4/gV+an03FITsmStkzOym+CG/7wByl3WQoITi3NilhmECOJrH6/hO+xSw5+vk9KyYFxw5cpalKAA1fVBGVb+isWx4etC3WI44OOQekKl0m7EJoqtnoaR9V7De5xb60qeo4sH4LwZG1uD9ScK8PsWWqPHH8iK/kPnk/uIS7qQQEryoicgDF3VG4gBvHhP4fi3R/n7Zt6nhrJ6UFD/X5b+38b41IynxFzL2PBgmgHUR6VYXJJvw0IJGQdY14+KhG6x4IOl0ux9uVzUR1wHiSb9PilQnPfqA4urtbbgC/rd0NLWsioo+1OoZnWzeyIR/aIfh7ri1ATwtSyUKGPuYa1qWCiw+xfRBJWPg/S5sKi/WlsdHHumlIhEv78EVCKsI7X/+Lhl+0jULCq00hoFxC3fmHBkmgD2xK1xX0bDMhgPsKMbT9SIorfQdmcOrPxNAKD/BgX0gh3Hc0ghBsPMaS0U0bwbgud+UHOHWKiJhYx9SIHfXkMGfe8fmYo0nYIVwHJHHSKA1OE1KHKpVi6UTKbhnvb7heUTXQ9Ypctd6LDLVIrhCfLKaNEvgjKThu7oCQSmuNRI8+9GBM9+HB6BEMb9nHQ5TcRZNn6XpmgGVcZrPUOKEzpka7P2d/h714bGYQZFYnWguIqB9m3coQ4SDyiD6mXcYedYTPHGMtcUX82kZ2Y/9YL8AOTOscIkQJg8ccKZr8AsPjl8MfUJTtF9CIkfd7vBFTmj7DBJzB9IRYH07GelbVwf2TBqYDQVOP8JI5C9Zd6pveAByVEvssWJo/WrvKEZ8Lz0qRmqZN5oWZBOezH4wS4FrCEtGmDi5uGj7PjkeYP6EDIxx6/Syty8CwKLMyTGEXlcWei5CCI9nr4OgFWzdte3ELbgvzskLmejakWcDUzkrv9rICkS2FU4ZVWQGqgR7T4owaHcIB3CmDusBeR0ik/BnZrFoywfLGoYHYFXGkvsTiaLucpw89NUzHIXF7AD5c4pMcDGiOid6zsUZEIJRJ4byzBUy1diePpwo/ltCgeJgLUnKCsxBAe98uiqn0FFyVCZzZAmA5SUuZxBP6B2WXF8ZtyPoVoyS2O+Yk00IcK4LoYOsiynjGQ7+AeyLE0gl7fskpsfUIhodrTOGg7lfml8ND8DcFOM5QnqKTZeRJbqdRN4umVLlg+Nu6QOokY1TA+hHpxG4jdEU1ugv99kov3qDmKVwBYqx5RZBMIwTCvNMoFzkCG4dbEOhRayD60FEkekYAT+y1n1NO4PcXPiRzQOfM1yV8ce0PaHhJ9RUcAvg1gTf/yT3w1bga9tYq8BvQaSEmOZmPi5pmPqA3ozlAwVcaVszJJidUqPMm0458Za6lbij/Z9EtKeDfV/PY5I23GMl/3bWhEB6lzl5IlHHMTFL1R8SCjo2m1y4MihSjkHvpuZRqNq67ygU941hMYZwpndgV6inrulJ0tIg8JIMWDjqbL8PYUKFkcRjHjsJpxG/Kfy9Io0zpqO6blPZE+/1a0icYQLYl1Jl19BmuGdwWOSpT/xE/ODueoSMeubphES5VVtCeZPAQce3kNE+ajNJSCwwEkP5p99KlZCSNX6wD/OXcXWPwKsCI9cp6VPz6E/tR3i+FOM9TDa3y9oM96I4bpyjS4kVch2DJnHt0qLUX7Usb5EVXYStOuQPg9ZtII885tzJm1jovJOg/Do8AItSDZ8gwGoLcR1p8qlVXnL1AudpKB1XdQa6h9839iT5Xh5eILLo8XDK1TBNYJqN4Y/efx+XKBw9j0U5r7zIwmyEPBTMYH2k36VjZw7W+7D9LnXJsGMIB3tCJJC5e5pxUswm9m4WE+OsIpCh7umkBKRRSYdI2/0F3gcO+Pmi7JUilteXtgTakuEB2K4rPY/HPFwHyUXNuFHoFcr+8KwWwIK36lAwWB84iFp5EJkCcM8QIrC920Fea116hv+Z9QFgj1HlWlnazRdEpjAmZOVo9f6Hn3EQtsUaL2aPq34BEU/oaLKj8PrKfdxgKqunBx+LPGuVRnmU3SJuBd9dyg4gfk9QA/F1ZPDo3c5dC4n65gVM2eHhALBtLlwhCWL2MPBYQvZCZpQ6YRLhNSkE/WyOWEDuAgTTzpqxJP/q7UTZqObXPIzavUupPnJPFOXHTYrKgT3/oKEGcAJeYXKEdVdfojwOOd8zFESugcWER7osTD4WllZG3yTtOEjR5njWCim0VJMP3DPZIBf5PD7kjfKdXCpBez9E4piM4oZI9erhAPi2R74RJ8qvVhXjkAuyFaWaRVLQWjKDezNZoywwADmYLQMoiqLo1QTBmAvtCDnNfRiKm2xWqWAHSmYg8U+J4HTSTb9HSTIC67ZBGIfoGMj1WwXXfBh/le+y784UAT0bIVL/ucrDaAihowAJQH4Vyrz+7qOwknYaQMQx8iZiIEdzUihhpn05HJE3HAAnNoSdAiKqBZwE9sYvE1FB0nCdbBeeTqybLpCVWtgg8H7zdoRSa8JLJxTaA2SYpkUYhr8pmQjPDdlFlq/InMRA5uSu6UEk+FVY1rDVaqcj3GPMdLeMBX1pfqvw+09L1QQkAlT73F85Zu9zBgnUn0OUjH26A4Vgf0sXqzeZk6Lg4+7vYc/xDFubP/PpMAA8Kz3UII67i5exEp93+QfoXsSQEVcxgRpHLlk90wKFge4lvZbG4DqXykB6Cywee60cqfT7uIOoQ8VepIYoa95giZCTyD4vqkzz3S7jAE9bW6F4iPs1wUf63TWD4H3CmUYMGVVbSwrx/+dIwR43+WUAY4r0KQoHbtvlN08zOXERUdhpEYL8eWl5cy4NA8Ce3ddsu3su+0p09VY1h11oVDIhjf6q+J58Dn6ulTMF9JQxuUhGXl2ZQvXrySChD9eh56GOX2ZSsJs/ICl4Q6tAkzwzpa4AmkWw9B/38hrf6IbrMRWW1doMh6NFKdlpNWqnEElZgdqikY9Totlj++Uob94APgBdYvHTgBMviGj3rIMtYWj4rNLk0x0/HqBn/fOG2noeh1ri+ADJoW2/h8lFfAgNQnTNyqIv72GF8G4yqBV8Iq8JRPN5soJBmjEgo4qX9/I5sIU2LBdZk7sRkoJ9FMQLKIx75LKTiB5tzmPsDGyPnYm7arFGz51qsUiFWW2fngdw/Pee/BvjcakMQ/LuzojTLDIQAARFfw7Z9+ZAv5BI2fRke/UwVEDdqrKWxpnBSt85rvUwnbROAPHC9nAWsuvUAkBxO1Mc90BIeBeCgbik4dSSKml80EBuHEy9cwFbFudMi/VanvYYlUPQX4/cDBg3st5+fUI8osVxXfVnkmVxFr3OeJfl8djihY/sGTC+TaC3OcMR2nvdhCzp2YdcyNy3G8Rkn4OLCNyMpl4QR0Q1791Q/eMB1s6xlc+OYFNxFY9glFFxdiQcgu/yJTNf8fTQovekLfwHyPGnQpmQ/mnTZTFmONm/d1kwVrXlPkXEsO/DQbnnU+LRfpj2gwYAEJDt+gai4S9a3VzcuAU2qbdnVzuEgbaNRcVO6fq0g03aYH2SQJhnICJgT7pICPz9AQQZ8uEsbSOnqD8ThQd9fL6+54cDdJSWt5RsZ6izl/Rco4noi7/7pkKF70IoGQNsPL30MZlNeIX8a8+yNMS+8jidwE7nko8egkWpW2xqNeSTUcAnzbr8HkgSFzmdMmAE0TlQE+GBeGU7JWSPamkDpum6ijXetbO84gAHxIViGblpnlBOsQZjqKFmBYFyygHVQhdd4CAJubaLLA5Cf3zDkx8O8P7YgW+GiKB04Q1rqAAsXViOQrNO5iqpOjMxULS8AT41/BoctWkbDpnaxKB49iqSYUefY1b5FQ5EsiZcMOloAt92owzK9Vji+OgF8dhhH6j0jQpoN4VkkpCGKohXwMK4lPp6PpK2omIqOgmctCpw6sQrOCFYMhBEZHCsJBAC++S2Rum5+1M8eZ6ov+reDwd4u6O5zEhctUxRbKWnKDmzC+F52sooIj6kU6zkbupmE+L2xiTolwswmC5aPOzhTKYweVAqD5hr38TzVZvYYXNRDMQphNwb0GTeh5g4/omz548x8CtOUzoZQbXVE4kEBb37rVAlDXI0ENBpj3pxCO7lNGoMfoAeFh1iC+ISpGssq8AS7UCnihp0oK3hhwM0nOz81hg6mRDiuO9DZ097sRaSHnl1GpyRUMdYirvpogqiT6JJglNiGdQEyUhduQ8JUw+s0KMAvTvlqJHPr5Mj1Kn5T3PhqlGRc+vF4+Fh5grE6MWUHlu3Tylx+mAnG6Mil7nQ4YGQir04loRrmicRnZ4/1pv/WYkKENRFahKzoU+2I0Im3LHdTYybXj1k+9EAX84M/c/JRLVA9CWWSkSdM2b5x83/ME3IvGFjAkeVdZF5Jx6g2SKDdAXEOR1DDOzBBlHdnTou8OphMt7jjoFDBYKenquLXzQOGIR54TUZNWuyZc2oP9hO172QVJ+tpp6A2Mh5Lsn6YBH1A1dQiDt2PmFapzUIIbcuxUzgnqSl34V7EVoLKP6vbF80Mu25H78NDpwd6lRO5coOW4nBfNWMLgk0WDJIm8rVVTLYxLKnNPW1T1QJy8mkez3rIgQF9Cim4zqN+DDW3A4Kg5Lh2MZgQk9ZnJGM8NhbGd0HQX8Rex3999BebwcG81FKvzWOU7BZ465PxiMF86z+6GmktGco4Y2vehJ+5yOmWHkPTHzth/Qo1pMowOf3y3T6mv/1cyL/a4Abm4fuCcKU2f39+BSVbuUuwFxN5kPOZN7U60oo4kUlC1nXwtJP6M4ie5xrAxf4NkYwoLlmQqqAbuJr6F49nUpB9Oivh7ZD9Yx+Y5ttsa/gXf+geStqW7/bcTQ6bmKXiylBbDSQKfypjuYzUTpFy/jUGYN19NzS7xRsfJanJotL9Z98HcSQzBl8pYuZ8vWHV8Cjh0PlIm3owf7P9FXahBebSZPwER/IDNEFoyYxytDPY1b2aJeMrl2A8lPayJTxnxaHEqAH87Q0j9efpIkTS2WR9BHj52xv4gZ7X7plcl37bS/lhsOVdEcZ7Bj8SjmB4w7eZ4PZ9jdIKcJKviYR6b9jgHFvPwFVs13leOJFjAAdgZQs6woB4WbazKenRNb/cIB/fnGvPoV67XE/T6QlrCsYQYBdraTrgiofs4MR969wJVs7kDzg8W2ZMNFgOIN68Rw7fnxjCSjMe6FDFUZhPvDn4ym/10kyRxf5j9LWu/D+HnB76QsRUKRqM5mTmNCXn2FSnq0JlCd/D5gkwhd+jZGnvYjKBwhaRXhatxYMqhHSgd1KdDAqxpKbEVb8wwHMQ0OHMkJg5RVVsERq8rVgaTimrk0WjT7bw+Fx3jwCQucYEdHQ/FskGMU8bSVnRRMvHPmmG6v0xtesgI+H14TmAYJHb8+shv4lHvF3fvWzcfA/dld2Ph2HJ/q9czf7kdJ6l0SMbu/ncegNiLTcPF0Phbrs3Ji1BN7FtOCwD3Eq5PH9SoS2zA8N9qualz3r+A8H+GeQgxCBa+MLIfOFGffiouZgFj4A5ke+uoKHSttP+Kfx6xHRoKxWJIPy/bkUnGsvJUKfuabQocCasyIUYrfDFOTrPb7OdWa0CjACuCyG5UXx7nQNlijjZMB+ZznK7/pqGvdsqyd/8ye/u0nH4p0o5tqDmI340Jk7wdA43TbSzdXCaaS46RQJrP7I/MVlPxzAPWQNWBW+6TqEzYhJ2vYJj6dTCwuQML35PoNAbn6ORxaZKBL0InfgtPivXxfI731tkqX2DphKzwQNmmtSuV/cLlfoBvitAcsGmsciCqLpg54PRPc4HCdQxMSgfsuyVGEVgbKsbUz0yir0dy1omhW0bt652cuQs9PbViNF88cCtz+C8nHPi9CK8XPmyVKP/M+Pr4AkxZY5yV3FIl2qsMLOFUkwK6Ao7taGdSqo3/sbKHln3fQlrHvOD4f77W7DLeNXZ0HMFufg8SWCHtfTSMikPle3MhQvdjstqd6jJRBVuzkU92d5d6uzCTJRj+pu+8+Ydl7a5LbRaScPQQfTYM9a/kQeeospmgRcZmPS4uoCYKkG6mjAuR0oArIoKjXpiO3HAxRNluqmOF7z44JhJe+BQfGpN/Fa3FUJTA6l973B7zT2Vuum19qayjLeut/M0ToszOWoh31E/kiqbT0iwAt0vxIt8vitcUA3tyr/D9nf+8w9DFBKTqfLVU9NDKZ/h8EerYkUNoLHX0qPej0Rd6kTxKh4iVo/D3HKiQUwuxXc9Go8D0N6SlaLNu7Zlrii7scD6PMViFk1FUmRIlT9A2jG1PJnzDWidSTUJmJoh3np6g5r16RJ+g/PCGzGYOB84I02TKAvyaj38ZlQkzoFUDziSN9WNmDEpF4B4lM/YFw0MNrexh/lJW022fZNFiWurtXIVlEYPRO4oWGKfhnheiOfvPcu8s4CoM7NkFFa5dzU7SxVIPvz0omMhMgLyxe9+PEAoSkazZ7y3PQUWkJfOTtSsv05HK7YByBcTld8cNwlpBo7UXRAlgNNJrUewqL17nVs0ITC+0QCLeu5Hgr4/eCANcPXwx9UzZXZbv7OwvzeYOleDyelr2syGVOTrrk3U08j97r+QpyUX6lCiW7d3xp8p4ix+zACa2bOmWZR4YPu7AR7V3zs5MEFpLj8jc9/PMAKPUZRpo9ShMhfftMT1NT0qvHY17fIovMq2uTWeCl7fhdaGIK2STjCRy4ZlGfwD1R5QNvnwDhjLmPZgahFtox3r0f4jVi1Cg5vOjOibERks8t2gMmgY4GXmmw2p3tz2JFed4rPoUzTeqS4b4V3vEFXNLMzfaplEwbRcRYMO/GF4Lvp80NclGimtjjv2o8HmMYMvtJ5l5ceUjz4bal3IufObiL/9UcEKWE+2ndjiv8s+NNoHse3Ly0zLembkskzgrEcIOZ0MwgFOJS0fAlW+pVI/1ig8/ZtugfE22aPx/kuc7sfV9bM8U2F/3XX5nCcw+d2uqUhhG39QcR4Ox8iMaBRW8wykS0RS3p3hIBc2liEUm11hnsGZKxetezsMKwBCTMeXz+fHauc57IFURPS21cGateXoSiAfZig9MfYUMyWxwopvu1oPIvo0iXQDPDYUgor2L6QE6Wof+LnO6KvEod+ohZQ/jKfHDfJXYgYjRsYGOdxu2MB3wvrzXvnvhoAeucmpsY2mHniS3bM6Iu1OH59iw//e3wIa9ELMFZoygggSvruwTxlR9paL/9ogM8PsrJVm982K8XshU17PRUcpYFCj7+10xOLfe2HWWmja7k7zJERlFcvJcKxhkryhMfSgOKMLeCOe8T5EyvcRN2IKe5CKPFLMn58rpnkscWFGPXX+q/wUWM96nqP5U2ciW05FECu+Y4Wgrv7xOqyugSlazcV03hFjKrZpFE+vQfhpbt3eUiYH3aRgYzFt5oafjRA0+DiFVnLTQ+xeZ7zbIX4M8qcWgCXu/AMikrrpgvlzYXaoEnO9dzIWZ0o8p9N1VyPsr2g4HvQ0Uuc0gAUY2BNCjFqoAIbGfwV6OW97S3A95R57KwA54esUYt/m/XWuNHXv/YCk1LTx9Rnui4BOQN8XIRtnVB79yGLX3NcxO5piPaH33+Fi8B/tkt8ky92fbv6owE+NbYuFuq/11HzGHrjVVwESXV+TDJ8a1PkJHRVrCj6Zat+E9TQgsT6NSVO96/v1nlsfw+e/WSHJ/XbK99p4570UgCjjBZsmMfZ67+PGNVIh3h8uT1iRKmtfAQPRfj9gHG+MGIZJXnALEmaPrBI5HbhsyucUVht9RxFXOtGHPqERcXkzesQIuVvPjcH8I2NhnM/GuD20Ds+apL1hSIjvLi+XK+gvX/+l5Z40EzV+Z09wo8ocssjAuZ8Fcf+p7l0lu/lbpL/MYdcf8I00tPq9tP5bXJUcP7Kc77/G+Xdu+PvEfgB+USxYeUff9S/2PHXiD8hv+212NfOiF7s/MLHtrUS8+1W31lOM9M7yKEb72k/xCI+6KIKSR9MMWTqrs49k8WLzj668+MXwTPbSQea15NSRbdcO/UKxPNOAAdz6VsAwre8jYTnOR9L8OLvMcn/2f0O7cs1IVC4PhIj0oFkxzpO+MViOxzisX/UfI6j4vJtJSNA12ycv16+GUEZPb+n/iIAvmh0g2OmJ7redjh8hc16N8nxYUGmsx+BrrXke0U6UqZT4jvRetpuU3Q4Sf95BpmmPTU0DI3Qwq15cxtP0OTRi21TZRJcsiV+TsBji2aeotglxmRVO2aVj6q9JcDHtDMCIZYpeK/aKBmmPTx0VJMNGv13jmMqCVJo+kwnoW9/Ao4GtN7xD3sBGT/ed2V336u90za9tGDhIa5uieSDiVC2xn4KsMXeoJlbb3z68mXrZR8ErntqADbzhJI8W/P6PVMjezTU1/zDASozM6MrCeik5EZjcYQcMfMRMxY+3RYxg7KhLEc6psx0K2rc+hbuRJJB5DfGdBPPv1bAYZ2+4zVK17gROPYPg52UDu10hVNGT7Q/AUwGGKYK1n78HbSSCkpq/tzkcLaM0D6z5a9ZZmvC8C9YlR5HbC/+8OluK24xWJoP0an2DVB/9kc4BoTtexwMQpmHhvp/NED93sC5m5uWpORHv+tcKA5DP69mxHDYvQuIeFrfgtyJvs3vX2iV37U02KcSBPyChSFfdhUrn2bRegc8aPdTAqa7KpVQvc2pZzAbegDJcKVDFG57ox81bgEOyqGXvUKgBI0vKOy63rIwRqcRiCpy5gQw24o4vE5b05yo999OidbJpuloFHrtVpgvbt3/+t9z/z8qoCTkSlHz/oQM+o3nD2kq9EsLW6uDzs9UFMHev4RDPTocd2Mz3fUYfO89oTLyWzY+rA2X6WOp9RJPMdzwTvHrtGOpwEddFaO4sZbq0cC/q5s6Bm3mZzgAEQcYF4OmT3F05STkWx3MFTMcrWPgi83+6FDrTqgm7FMqI9Y0YNnNjdwyHYaBpK2OJk9eNBwPSW1L/tBgeknJ0pWUHkehgeVd3Cwu7/XGAAn+yRuRZEK9Mwi/3m7jct7WyPmB9tNQmJ0l/+uznaP0NXRNfItmDh5AkSCt30LQ23Pbz49nsfTez2wd3f3PK7fwuQuo1185GoixZlv7uPxp1oJEeK3prxyueS46fFm/kAw742g7O+lj+2CFEnn8TaiHT8ZQ0w8HGNy5teP5pr3z4mXbOoXgUMYBi2zHPXb5aWYY56Y7Uxt8w1Esg9Tamfw6e/gY/5bTFEr9PkBAgmsWAbLdmh06FrTXRQF6x3wbkHN+X+ScjSGN+fO3QNKo2OY+y7HKu6+NfW8mF5Z8c28HItv60L5Ku/n/kEqseDbpfY9IjGUcMSzhrfxSZ/2wquFaXgA4o/HLj6+AdRerd+dVytMFe7pDIrIzE7sTFWTe1c6sWanPbP2TWSrHB43ymG0Sdr59NlR9v0VOXNgPxuFqW6B0aK114mjE3+YvEAp1o2sw/DdIo4MKBf45Akf1+mtUbr/JYPh4FBJIxjbYv+GQVdayDX5P7U9hdLNLzlxraYmbfACaUs2aBGjoeRgiu2JbqdREdQ5DBLaeucwLaUkUkt41TsLnEabXrGGgF1YO3q88e8FuSQDgOvsi5CBDEyPgfQ0Ys9lGp+Kdmd7C5G8ytJfUun7E4hFr7O9B0TEVfRdxSOQ7e/lvK/5cFeNFnjxinOq3sFHo2DkFJ3tMXwXQEneKP9NhXIXvsdsFy7baFlMu7tFz+mcjkdorOt7Steba3LRt74cBYO/QF43kI5sfuXOlmE2GTWv9MJ+zqm/QfZSIO9qmCBcRnJnICZ86kaBDdikyc0A9beLJNv8IkPUNGgeodYiwAROvOg4D5nm9G7g0LnBix3fJiFEOe4OO9fcMqBdCE9ZRBui9E+mmHetxi2nhLnP61rv2qoC4Y/0MzfkWf6RlHVcjmwOFQ5Lbd5UQXw7DImisGHo6T/1spZzxqOdaJH+D+Xvn/jnK4EFzvIgOOROlVuI7txJxVx0RqMS+RYw05xLIxNhBgqfvWzc/21tpNfmi9N5fHHlefoCODt2IUTMd+3P8uTf6up5NIUJAwV7enY6uuxi5E0E0GnDTX1gPCUNWuKm06Y43XvKHt8EC4yeaZu3DLRiV79Z1sdKyYQD4p/dIEdKdlrMzKl3NVw/mnrbYz2vBpPjGGCXeZ8pW+sLxuz+gJUxHFp1guacn9jXTUAz7eoxC6LyI4wD32V/8rff2brUsoP25vDmMqaTtdwt/D8RJL3/utHzubX7jxXDv/RMX0+PBtj9AQ9usUiH0ZSMIVuk65Ec330qI7WohwGC2OhoPtvblOoq+Zxgi8P++SHX6gPVBXp7dsfvg+tS4cjoNlwp7mhE8j7TSLeL9zfzKY4Cbr1Dgb+txkIvm7GButQPg41Pjjh6H8H3n4iNAfsxui9obV78Qc2Ya86gzeJTvRMaY31gJuzsc8IzSkYBtpsOAGAubCzQ8Cgi92HMdGdbSvkOit8xiae2fJOMZDgeJiSqtuKRNez8sACUNDSbTm2zqJ1dKTg4r5BWHK+Rhu27QmHzZ1yI0AdS1D84qczChO2wrkFGmvXjvBe4LHn45g28nhvmG9tUwicTx2/r6RPmxg/5LMX5+d42nE0Z7kbwKob/hTJa2WXNJvc+F1MYaIGOtpQBRMdjjSwu3dPzHc42F4E9p2Eadwnc4hGCC2vh8csTdYQFwdpWZuteLyNvfpmG1hBWl+3hyhvydTalS8+9a8cqR996iFWFOOWuTo04Ee2emAzzbe32ivU3OAjUOfta+E0f0Q0X3bQQAbvd5e6CpXEyVo/6m7wh/jxET77rfwWM+WLKw+22KHIHV9Jdv28CrsSK946U3r9uAwOpsdUJPvr2fFRd2982eSF35sAB03Jld9Vivp0dsjAZGkMpqXTtxUtLii9tiFYDl5tioMfOssXHeX+4j6e9sGMoa9zEmssAm8vI64zLGjRs3stm89gQgc8RRmwoy+vGXLG8IA+df4HCWFxt7P70zHk2BJRntR/qtN+NYZ/ub96AdjssTEjeZtsvhdXWIWbn2ucTAlEe2RRqvJrN1b+HRYQHQBupO3FQH+V45m4fRQqaWXzqUn67jtL8nR0IFrpM8MNR6hOW50Y4OSbOj/Njudzg81VIbAF9tt5u3+op2m+3WGtnfqLp6EI54xNwMRU7hETxiHzeeu1y+UkJkQ1UD7TJX0/Yj3Y5BXvKnASdxlMrhGIfU2o54QvX2zUTVsc43ChR3q+HKfN3HYQHID0Xs76VpafvPPSMtBB6/EUl5J+J5bnXlBBLGdrzAsMFtvbiAbNf8MXTnVZLirSuXNL7Ono/2mtbryuYtCDjmelT7AkKk9DZ6yP3mWhvHgRAMxKSD4//4gwRiwtmT2lsp8O5bFwIc1mbcNufA0acyk7PZz3u3bSae9blvOsbjWnsjk625eC27sGhoWADiqwAlJt4sasjn90EzKfueQjnn9uB9Ah174pn0UlNyGDjROpVFt/eO535wTsPNc78YmRk5+ClSNm57v7mS7BVpXQy9sYYOyLEchFDQjJr2L6sQvwd6/7UYh/4t64+pjaY8UrhNRj9t2x2DQ9l6Zh9e63ZaYv3eOOI1OT09SdzkC9ZyFTZzw53qc5X3h6cCZiLfuHbh/QXptUJN5JEHWkbGh6UMUV/LGjJyYn8bHgqyXWf4W7s8EDLjg/Ds8wO6VWOrrVV/8IlRDneOrrjEgPez61QeSvN+GTobR+t3vr1j7jgZOk2Sm37L3DGFBkz+FrLC9pGmwpba4sWI5EGLY162yzIme43rAHVnPr+GBxGp2zuc748MTx+wTc1usR0fP5EDfl+WE355L9Jr9vtiNOD8JyYtBv/Rfgw/9kpbikdn8HkY4IGFjicZO5HUgEbzLEqyx1OngSAD9ND9pG74OK+97gYQifUX7nTC6ls9BovV+LnsSwEzhnXCYb3dbMFSKKedpRJs3Ju2O/Pk4V/vELFt9r0skvq8NVumWzhgNAxeqBsWgBUy7psv+8ZNg0/fvE+Anw3TY2VfigmMWf1pKC2a3Gsje8c64T7vfFOqwDLHaSZov+0sHCdu6IBP+H/au8+3prO1X+DPnufM3u5pNjqhppGQXkhIQggQAiQ0AQGRjiBNwA4WbAw2xBF1sGNHLGAvgAhIk64gvQcC6b0QcOfMPs++zpvzcmY27Ot45x+487m+616/td4ssDl3fiDTMegz/NvmawB8nkRzA2RrYQJaDV9j4ukbBWabB/uT2OxZaRKqtYRC3q9RRlhvPjjbTrH0StORrPALosqyhuTBljB0gF/L1dv1dxeWBKCEafpQ+mkLwrHhydAppxDwHTZgyyd3RAo/weWc/doIxXVrgN4bOY02n/cwfzUMo+HnlCgLcGA5l2G/E8hV96J8Dr5Krl4gwemRJ4ZnHhs7f28c4H6+ikU2osdDQUT+7AEc9Ve5B/CQXvXabSXsszQXZ0OVP0C5/Kp75+QX3i1PAq53uza5JyP99dIMQdFWB9SNMRLcceOjxgKyNT7vjM1PDYlMy/IEGHIn0uJo5wpUe4yF3H7No/trYvoTs7+/qO1d4YO8ppS7AZ0xPEENwOjxqFZbtxKAhVi4qQSv0qKpayA2Nsi/Qvzi2uW8w1Rf1OJHNkKuGvL2xm6QZtEgJt2KDE/vZhktIhb8vtphRdimhjcbEoueLg2AIYoInOv2BtmgqrSvnX0ReW1AxIarYRYl9yHgj45g+z6mdTjkZ1mOU6IKRFCMm0AsBFrmapy/SCPERDswFtQ37OiwaqnuuTHZiGCTrx9VKGVV9U0fzheHS+XimmAU1Z6rSkbnK6UxzhCyaJaIcTmjEQSzc1WKJAJho3gL0g3UMbQZlbfYuEQAuQxktySUTcRH9ZdnuoLYPYFQixoc+VQf2Pr2sVXE8nEGIthhttCCynvqtGfiIxV4WyMPsrGlzaoHzdl2c8o+R6YNx71U2v1uH3ST2a4tVleGeeKOz29mu0Vz/pRNkUM9ba0IiGAmzBFk/HRohFSgUGiO+k5LxHNtYYwpNSsQgGjmBlgXGRaXCOBABuTi8+tsZ1PWsakQ2zinwjhjs1ocmTjLiNv42ZIBmyxxumL0Rs622SuNcCqSbP4JXKd8T4eimXclXcZmqEaF3xxxR4xFgmZBCmJZ2IX8ZAa0IVJMTRB2tBoI8mlp2SubvOB1n3+BpWw6rbwG8ANrtCO+Vv6a5lcHj/PUuhlPGGh69mRg0e/4C78P4Fka3oPbbh4OCXDa9pHpux52jgquwG78y/09SPCVhpUYhvAGyYo1Nwqjd30EGtcryFYYqfIywIIE8xfM+VpTU4Y0wkvADfA2rborH5zgDUCagi0t7Xd8iwl3IryVT50I2uHDHAw9H7sqXtx1GpUM0gsREMdZIckKSO6ramy/Uz4ik23EH1kyAEMk2a1DutPcgQJKn4pkMazZ9yiTO+DWV6cweILKnQIsVLS54vZrdvoYK6bQrO4TOJNo1SDgSSQRhBw4b053ZCo0klgXh9CrQ0L5lcm7j6kgkgl6JTEmeg+S+VcXOGBIw1OH46nmL5VcOybEukqURYDsn5/EJ9JT+ysIZPPnCtnbogDD0gHEZTvs/DybFhZtjXnyKcKDEvq4QXXMHxLKvwT3yB7wZLrOiCKSoT0apE27/pyn8wzNHjo5vCJ6Nhhl61FUnUSxz9Uq9NYEa4dVm99qNfPz0unYx2+qn+tFc9foP9LCqvR66YX1tD2T6gXKasDaelkCDP1T90KUK8qpqdfBmgU5wj3mwUnSLx3A1HoC/bQsJcoTRcz+RLtLIaGP9QZ70SC7+ERysGyW9uG2sssDuFPXhUELZMGvs9q3QDN0VKN22VHm1lUXRbh0lG/F/EgYDIJDAkpPVXWd5SuVKqVKr5mXNo53y+V6tTZmOFk9LxlyLbzxUdtikxLLmePBCkF8ebvzUcyRD1I7y43bljABukAWLb6j0JsGLfe6MIQFg+GUuVvueCBwKtDVZdfcDR9shzYi3GduMSft55oRjqcqDgT9oqdxSiX1BBfraz3FmdAfBnRcejAkGhjNQFh9uzLuGS+ZLpf21LUKbtwWfaq4wsaL5hdayraOqrWLLj/8uLb2sxSPPajuIAZvGpgZzwE44ouWEMCQ5gZYNzywKwQWTj6rycJ6RhIPTjJDUahhUfgGyn05BeMzOmBBY3Ypho/biC5P61Xr8R+195zXFklE7xFrPMRztlbxfXPy+aoiczIMlQ92cTcF2OMZGB+oOcveCmkZR/3JTSJpXIcLa9Dq5MdSC0t1GZsuo0d1DCQyYkTWDMQE5BmWEkAYuxZ6VPksPcAf5HLzthsRxXEoFATR8GckTaWc+IFZJ7cE6TszTIRI/zP7fHiJXMsBRSqn4iwc0RLdNeB/eb5tN8egIOlqtfoJcpv9qnOmQWTaun3I1YkEDDviDthq/fnnjUm37B1+vKoSVgek4p+JB6OgNSxuc3nyyqo56U5AGL5pSQEMFS4Y9BbBEfdEIGjn4GFWSKxt1MuSiB7fltlOV9S1+TNkWq3uPDVnUKuYHG2FblP1ImxP9H2OcCF6jqrvR1v9EMj3LHD6wb9kTqOYF7YpT2EhfhtDvaJjfBKLBDsYr/QaNcXW3svojmzQiYEwytGO3/Ej7xlXeryMdBqb6t307IlLwhIDxPsQ2E0j8QkeTAzncyHL0RJ5dTgvBr595gvLhdInz3CAK5Wkzd6Vh1UaFc2pV3YG5ZjDlXCMvyNWqtSbfnANmBs4HmQKgx+ULywu6HmvC6Ra5WybomZelQ3aMK3XZ3+PMkt9N/0Q60xIaJGlulLoLJX2nFczO22+JjgmmBxuWEoAqUHeFgmzb9T3H/OGUp27xh7S0Rzyix4q1u5nST4lKmh2wBa6STVR7LP+4sknmrxgrE65nW18TPjpCppuvO7dTNxP36zIneOlU1atcl9Ui6VTY1rdF7nkt/GvOgwOvqfSSFju0G0PZduorKvOMy37wH42COFEHgsVmXOvAg7HOLOvLSlAY5tBFLPhhxfT6ky0KXENqKs0nEB3vSbbAgUDLnIPe1nn8D6tdE/gSXgjQWh2HgvjPK5XM4yKwmvkwky4BRLzQrjFcQWcdnvyBHj11n1AFwT45MBIOz3wLI1qlZnBLSBSEC7n5iUHbSmWsFfyNMtNOQ7NIyB44L2PEw0sLMfDJUk192gpl4DCoO47zoYkNdUcckdQbXwEG2lmGQlcGQuExR1WpHHC8W01PnewVwQyVXn+RkwMk3Bd12PmRrSt0ipbVnOMyUUjA4cgTithtukhgUEOQG8a2XaP22UUGhG/W9cN4/j7RA6ox2MYsA+Vs/IzOylGOfOqA+SYXcN6/b1GRvjhQn7r666lBOj58njiwmYIJb/kQbzXd2aIZsFO/H5Hv9o+vKWnRWG1v4eb6WTffp/1yBNzMt6OTdDuiFJdc+smjhW+ZFrw+Wdzs/BjM6KxQiD5G8iemku0VT85hEPBDmxu6Yms2nlP7yP5aqVmxAiz0Wpaxk8JqnekNqoGWAxCxqx6oqT1xd4aze99buz3vy9wbrAlJ8rdGVl1kmENWpM6M/CrH9Qaop9oe4A+NTbLwcAtW3k+kafAftlihWBz4k9ex7sXdKEgKDCoWqH2/WswMD5qaFoxZWwOkS8o8HtHHtbumsuaEevnXzuxSipVqh6r8zjIDx6a4fqNYREm5bIYKjGMPDp46v735okJx3/3E8y/HyCwU6DOTbJ2fVV36kxgpNPVL1/yt7G2Digbj7t6Bb9W7Cdbg54P9WyAfIj0PCWTdZqts41UaLVpUFNrIHVK/Apjt8YE4njrTf7RWfmCekqr1Yn3t7LdHSaf25YoNO0NF3xccGnB3b1df0fam1FejQdhOZZ09QsopoDIgK1L5c/xlxhgMunEE9lkENMnfkTakBz0dHxc9cgubV3ugbFKJN2S9F5XEOLvv2lS8yDYwd35vz7KL9IQOCRXp+Oux+NWrb0u7hJtY1gB6UikBSD4bQU+jss/PXyxn1ekFXaKFTXBjhFEY3ylVkYyOmjqUiOugEZT4ZtmNnPQ0aMvyJHp5zs6hUudgOpHzJfK3kSsb9eUOC0g+Xb8Nlm2BdmNgLoxAbOl2NyUdxYDWfAhTXVRWAaEsE7+EBWz6s28Ws3HY1YdMsWX6mZKn9dnkmmEv222Id1xXW3vFHSmtf6D5nNsMxLIQdBZFRqZKtDazM0sXfMJxT6H7dKdQOEtczsKTkLbpi8l1T5eYgCDYeMF4bMTYeuwrIv1HCgJZJQx6mvmtgEJbWjyZwSQAuZUuykZXvWyXx/HAuJQBbqWPQRI2+b9orG5fAyASghpEEqE4ps33xwNIOWYGx0BoEyjzcxt96Nc7TfCh8+8nJtW3Q+D2FNzH/DOu6Xl2kSoPrqFWAyNYaiZ6QPT60P/Mb3UAL2xW9vLukpveSOpZwYQRBbMM6g/BoABwGGDbX4bE1k+3YrKNibMt109eR1ugX+pE6x3dLf63qFEpOOhmRwbvCv9JLdHqNKoO3XiQPLpLTT4997b7gXmnzkmnl+cl7+FILydrcv0OpbdbvqqS9rDXparXw7Ttu+63X7FB/KL4cuSJ0CYfuPpnsG5Gjxza/NAiiPEHRXW1Ikg0dwZI/wPDEgIqlL+0drN3uq4WDdMc4eclb9PwJvB9v71yszCcJL7hcwwM1uULYEaMCjR6dVivWquenh8YUH5RaNR8PWq5ruXQtkg/8WGcpyXNShqqjGVzahvi/NdV/75rndgWMGS7wK/fQzJtsdjn0kGLhOtdjSPezP8kDjcUK0nxInKSZQJEoBEaLrugA/RERY4vnDI1sGYPaxsc19p8Q1sdatUpp7nvQvG5sOtLLBrsB6NnsV6tVahXFBq+yWCU1lm+4kEkPu7ktudtXArV2vqXUmkxQm+Jp0QAs+RtUVSvG89WnqAtl7DwGmCx2VurdGadGrVVIm9N5TpckTzFAFj2mwWy+N9mSZbZsYZzkEOgPuCBpgNC1k/p5m+iiTYoN2z+2UDXRqJXNhZeh7ovK3igHF18W6Of28IE+bJwpDQ/sFB6aFK2WDRr+5ouNVTkYcfYadia5SP8bqRbu8wCp4jX3oA4ULh9eHaBK/3teFQmktq2VgmiGGNxN8e68G5RBsTb47dD2M6oyfnYiwcYKY3eQPJKPh3vj3aL9xLMVAzG9pD2M5C7tDHt3Wyx1whr+Jvq3/cZQr1o1GSHAJwZc9EVZPST9eqgqMTkXYFj6RXiV7ufWOkxxSvqUZqVMSP2cvhtTmu+NbV9PHqk8mhD8+Go287p36+iCW6fQ/HDw1gTZCuFk6dLZtdSPBqRbArlgLgjGpjHDloQMfnQYV45rUN2RX4AwTzDWENITAbiwmDOadZoq1XWZAL8Q9r8jQL0vpr+c5omDPFlckcnHQucLuWbucCx95VtrlRUR6BWsMyADDcenHvyKm31ZnxcZe2e0a7wZlHhwj2nB3f/1ghKrPzgCMI3bIU9oaVj0T8DSyclcngYJoj4js7K4p36oRsUDgJW0n4219WrDGywbhBmKT05snjde/v8HXdA8qH3IUwh29A6zlZ9Au0jMt32TQUytXLPMBhTPo4cysLEiJSXmlZBgCGKaafsY33/kIvU1y5T5Ad07+1KJCMNAUZv5HvtvwpwArVJg4jgskRSk2BZ7gJNEI4dt7TDw2AuFlEeQypBILP7TvPPY9r4fG6eDqlRq3RCngC/oDsaXDB3eSmrCjSfn4Sd0jgZwqJoR/jmOX1c2tqT+ZM9wzw24o7lkMC3hteYTigUPucDd5ws+IdByOJvuMfMrrbyYy/b5EVB6IRBPNC1cCF4KD8L7odDvloFHtS9MrZhWO0wpxuBDRPn3j827eeXCZXzi/KJ/flPqNc3mAJsgM4Aa1hfiaexRq1elFfx76+ieZieu5585S8PyXxqeuFF5NXIvzLl8US6L98oqfK76RDyOde/9CtujdP9yU84UulWuVJ29jDC2r+/ev2YMGCIL6484FMpWvyXIe18nsllsrelcKA3x5YvcaK6ktwjSAHP27pSiHjKY8BGDBlo7kbk4pAuODe1S5IlPN6Ff/jrdO1ZQJZJRYCdWaGHhA+ctpb0WlYFgCqlwcq9DOTDWMz2s43XLVWeGBo6sMnzZfFiupXPY0dKt1RysZ3XNVz9wCE/y61usse5Qj47vTD+q5JoUTeQ6Ttg3GQ5mb5RsFJSVAnZ5gHx4bhBqF57vTLEvPH6950MA+Uy9XaRyzlsPbDnfx4+mZEYdfEzoD0XazF5QHwWy0udqvlMqFSKlN0zXzaWTP5IfPepHJ6PdYXjyto7/cls7PKJqu3uNMozzu1o8cZxiEmjDikBe2NSiKWyYpLT9I4OGrQNX9ScXbwg+lqpYwnU6naLosfswG3TNb6M9dFPqy5IJ4uePDy48Ngq2BlL+p0tu2vIsNyAVAaFpQ6oUz29vVwp8feN05IChsN9rw9OHTVk0rxp+Vwh9mhVujdovM+jCZW3tDw84uAmFVoW0jsCojbnmyNbn5xcrK5eUKYcJWvkk089Np+Kyh/aro8P3UlEofx41h5RFWM1lM4qAgS3a/gQuPswOX1J458mNAfvr9cEmAwHGlsrsxzRa7ZfuHz9Wz/70k+SEeww9WpLn+WJxoXpmrCHoL+JXWh3s0JiXa4O6GdEomuI81XrACybL9NPZc+/+zckFojl8/KOw9BTTba/mjtZkf4Hoxmezo54ZkFvK7tZr4QshcTDDx7Z3xUNN4vrpe9K+9bNgkwvLzv4L4qt4BKWAP2sT/d/SL1oHMIEoPGeVeKnmcB4ZbxkjofXwZMqOcPl8eC3G1ntNovurY7Z/YSw2BmEUa2Hs7wVfV1jBT7/U4E5+/s/SoBm1/etIUxfrBPnqrlDiaahpHW+bok7XQuuziSeriyTS4bOFTyh3T+BwEspG/3SEiSuNHsj9KLjh7hjX3ycMRBSx5AQGfVc1E7YC4Zt4Tn1xulPKjjqnP8Pdng7MdqxfBve8LE63OENCM6zfxbyD5Le4SdI7C1TzopU11taGtY5eFXNyZT9xyy93OL8I4E9cwKhB2xmejrfu/OPm3w3LuMAPilZTUf+J9nLoUl5Rz190Whd3dI7sfTKGALp23105I+uvcJeOLdCCwznFgvlt1COMAskRdf/EQu7O0VaAdyr7vdKCZtzfd2cFwPMoENH4wJ2gSmvVD2dmjUs8VHQBDSGliUWDM08vQUCOMZst7NNZhJd/fCLKcEqEqLKz503up8fbv4JM7Gw9IZNCCYbg5N9ycxCcyxBe4vGV50PNnXm+gCxa1TS3rzyQws6rDZypUrQ9+e5X9R83/7iaUtJ+OaqViMtT0FYG4aoRe2XDqExQRHmJI2bZfyJfu352/muNmQcQyUacrlV28WlxNAb1nVpweF2ypu6oZeXIn3wtHBlLyq1pHI9TBgSmzqnFSraDmCdM2AYX2SjY9cFsg0vd4pTj6IH1O+W7XW+uIn2Wh+XFlrT49KqW9750b0L7/y5sH1uzD7VDM77FYrnzKN8sG2T+xfo11i4BRW3cOGCnmJTPAyr3X5ABhOFOf7V1yoOF9SLBwYqsXAQExWysnXvDfO2Iy0PSlxlxQKoUA1l3go3inWHkCJrRBIdH1zF11siQ4QJGFDcSDe6m/YtD31u7vGFBMShVoxfRmNC7BxJlhYdUh6W2YPuMIZ4FMEV2jE8WHZrOTh0V/rDvS8XkYJMBjuPsgJoqEpEb6VrWJFWzpu26kTG0POy6pSyUxW3N59/PcPxqT60YXWg/5wNpZpBjw3Pst7J5zV5IaTLCNSzKEW9G/dHMFwdOiJks9nAl3wUBwEwHiZ+uqZpjc77r9BuUw0k3W4ZOI1v/lhUWJsbvuXP6jvPwzAwFNfLWBCY3xZHnFlzTPhRL/sGOetzdLZx5yY2IjwHNuVpBDhh4UFTZQfBIZD2KDMTPMb38rlErmyW6PaT0gjoG2pkTCwmcVqkhV2LYMGuX5NrdfLmwJIuKBAe6are2yPTqO46uFs6Q83iQg6plxmAMOKf/D6y9ih5htQzk7smo6+IIw5YKvzvVrekzgm3QURhtjACHcqGFCNNncy1zONI6hWHBzI+9SpjL45iWa4X8gdrWnY4kq1I9qvtQ8xCo6v7bnTMRVS6oJ0j/Awe7j5uqhWzxcUetCdOMlmpn7nDMstAeOZr/8uErx6igKZmyC2g/J6Ri/eIwf6BeB8+6dkeW3uXiQSG4zDk4/OSjXTNz57eVGohQ/Qh4kIkgOY7rDDhuL9DHNGX+SwF7fTNwS4f0LSHbUSuZ8VcwgZsC+xX90gkPLq99/Zxghi2r7LfTJlWHYA4oxXE29HGmUT6RvA1pEw+vbZT4ub/a7tgtvHRY/1TmoF98JdoxkwiB054eKs5kvLgMon4agTLcKq8hzA0jzL5CfzH5Gru+dF6nipWi5QSzW7gNbsm5chyTmSeZFuujKCQAPmcAgYfCNX/H6mre1u73KbASdfHzt0I+3MsPhDViDMdCXdM7Bj9ol7TLAdAYuI/dCrXpCwNnmyiBQvDNWnXaPSf7nPlpcND5cQiUkvMuypEelOVm4alaj3twNlTR0vcJM8Y1CuWrwtlM4KYtsyAz1corzSd69ZUaLRyLuuPn7TVrfcAAyfE7ekbvai1cvVvGdEF3QUOCci/SkcSfUE+HIYrFttkhtaaecjC0snbKDHqcNvRrhK7bxiXiMQKVUaCVcpE04O38j3R1IRVTaVDR/DeAf5fU/LapuiSByXnxkZ2TQziGQ0oUbMbbnxsFK7/JbAb2PwYMQeRNSe6Ke9av3DycunaMjoVdtHXDasgvlQmSzvbXTKI6lG/7QpcQ8lKhj7XfLVp+els32VZ3qPdEreUfefI2eamBMhMBOKhwUmyd9zHSra2hmKBnNOpvmN+V1e33anRSbkPXl6eUfxpS11NcsQwPAP+WFrnx3IhFO5j9pHZmsytyaG7/hS0FUS4+hgDMOSkPitZQW9bzXq+S1uKMYPNiZe3tFAhwC4OzQo9O9utl62toEcWwRotx3dF+blWwR0ZhPWhJnYE/xPR+J9H6t18s6+0NXU7VlFIZmnVPeXI8Bv1ZdrDzBmk+KCY0KapmZVnxSi/vEmVV714f/mgCxRIdXuO2CddRJBTXWxu6OL91pq7FEM5LQJAkP8X2tJ35kZs6jbOKvMgzk+iDAcBrszhQgPSb5eVtA/pOhT6eJQHLR9SunNY9s2/4Ed/8EABsONC6dz40pPZGF37C2rq7zfNNtWLZeLeSnc8niEoy/KB2oOXJc5rFG/a5s6SQ4jpG2wBYGd9iCNHL63jn3aNiGefcHq65ytn5iSfOwZq5OL5bNavnrmRsaDofz9nizojV2TI/L5ZQsgMTQpB9+n7Dld6sRx9n+ZC4sPSi3cuuPCq4FppVL7LPcBCWOF83CzgNbzRTOSqbGpGVXPgRcDH7XyvrdzQx1KyYhaIc4c0S4oxVIFb3KB3y3sn6jLnxRsDB4bRYcnvDvyfFI5uWhYvgl4ece//71kvC676tQhNtXDh4B0WMukeqJCIkqbtUqVrv3nkzgrV/cV9BRP/FTjdJ9KI+IqpXyFTjM5Kxp+nmwykj97+WBRQ9E55tsYeCMKErzWNBG2mQH2mWC41b1Utg/JtB/SXyxfAL76wK4Tvyp6JnkNwsGGjqrUZPu/eqFdEOcQqMjytLeNGomm/CQ7EMzwN/1mu91GOmsQd7KM7ndCV2VGj3EFrFrrj0mCeLBjcR7gkDCHk7su7KHY1x+hOPhskExLlXL5vX25Bc8N0uU8A1p3PLh5vLezvGZcrtEouKPXS56kAFcjzMGgmMxdWR96uSLZwL0tDjCWdbI3HE4JQ7niPKyTFs+e9Qn3dAiBXwxwwe0PtymKYI6lIaNt91CNkAU1ZbH7RhTz/S/yMtDVRcVZ9wzLGcBws6ltnWz2IMt37/PubpGiWa7RHSzfYm2yLjm2uzgx0z9hiicQsvO9HAMoQEhwsl0aCGAblJuNpDlS6c5UtpM7HpqY4Oy6NyH6GDX9YU/ZJF82efegWN0R6rPL2ffaRUfc8ffLGuCfm+EnQ3MC3I1EosYduzUyrZaoh59l35rwSglaRaf7shP8s9U8TRW37syu7rJgikfeg7KDb1iMK+k82cSJHbU7KlyEs+NzL+W6mRGFfLzjSupx96hPrxu3vthiEtkqHJ8wGJY7gOEXQ962de7oE1u9otmpuFuNQzMy+bBO3BftnLU/sQHgt6lQptMuqBVq3fxY67BaqFCpuGNK5aJmQDqxqOb2a+dlIyqeZLThUyQBxnKJhEK2BQagRE2Pr+gn/+BW/xyAf9aVPZH5x4K2PMZ7pSTkihQi2bxcJH4kHGwvZYN/2a+VieQzlRJJS51QOFalFuvy3r6UdVy5PPhG0N3cev9ERAA9zjvuItMjiYOk7ttXfehWUwZfa9CoBYv/KQAGg65VL+p/UJLlstZq3bPgN6KeFrFYppxXhFXckNSm1v8ckLjnAh4WQwJkzGCLrDxph50CEPSr2zfRYMl++dfD3M9cyLBkX4iof1eTucjjS9u71YZ3E1zDfw7Avw6Jhr0Mo6KtMeTtGUnb4zJ+GXzDb24qZVJ+CS6wT31+YSOd9A0q1OHHvQh3z2wHOMBlazC7G5yVIr6aVXiosnlkVPVRqhDrRdeO+p7ufffHt/fnAxgMX56ydyWcxbE3EOxNorZu8dxn60iNCQu71oH3vJIEOYQCEO+CzT67WdjGEFg/U6+s93fbfaxMPTUnUwgUtdwu7txVjnxoR+bZKcOx9v9IgP9Tgrn63QBP8/DtTkeueIfEh9y5ejf2kKy6hZlKKa++E+KBibl0r+vJ6VPjvzR3DKtEQqVmuq0zg5mdxDwz1MfvUs7zLj7/M/r6NwCMGf7vxsXlLf5SUvJoJCvPoF806L8I9TPNlY26L9rwkV9VCkGnZIankGkVY1OfQ1PzAxnR6KgX73ZmD/7zCvzVn9Tdvy0B/2/960zX/6/bHd2imi9qFS4Mjj73yOw8XREgO//6Ycuf3sWSAQwZWqebss4YutblyA2G5sGJrA8PDK+jfpnYuGXvln15r3q2Phn/d/SxJAD/8ySOqnfxac3C3daXBkPnmY/NfX0NhrKKF+K7Lz9VPv/39bKES+B/JAT/vOIXdi5ZC0sLsAzqK8BXgK8AXwG+AnwF+ArwFeArwFeArwBfAb4CfAX4CvAV4CvAV4CvAP9/1f8GJ9sPx9khIn4AAAAASUVORK5CYII=",
                        "HuellaMinucia": "Rk1SACAyMAABSwANAAAAAAIAAgAAxQDFAQAAACcugTUBOX04gM4BHIg3gSIAtqVaQUMA6407gU8A4ZJAQLgBEn83QMABUotDgMMAz3ZfQMcA+4FHQNcAtRI8QN4Au3EzgP0AvWdKgTAAlU9bgLwBOH88gMUBNIg8gNwAxxVPQOEBEYs/QTAA5pBEgTYAyUhTQUUBiRdJgUoBPYIzgLQBRoM+gPEBglo7QMsBcVI7QQoBES43QQ8BmAs/QR0BUHA6gScBa249QTEBgxdEgTYBoA1FgVMBpmY8gSAAZadCgVYBbng/QMAAnBJWgMIBfVg5QOEBY0U7gOIBrWE+gTsBsApAgVoBrw0ygP4BXFs1QR0BeBo7gRgBvAY6gWUBkxk7gTgAcklBQP0BSDw4gTkBw2I0ABcAAgAXQgEPAOyGAQEBXEdBALoBaS5opw=="
                    },
                    "Case": {
                        "$type": "AmxPeruPSBActivities.Activities.External.CaseTypeDTO, AmxPeruPSBActivities",
                        "CaseId": var_Case_TicketNumber, //requerido
                        "ParentCaseId": "123421222",
                        "CaseCreationDate": var_Case_Createdon, //requerido
                        "PowerOfAttorneyFlag": "true",
                        "PowerOfAttorneyContact": {
                            "$type": "AmxPeruPSBActivities.Activities.External.PowerOfAttorneyContactTypeDTO, AmxPeruPSBActivities",
                            "FirstName": "MIGUEL ANGEL",
                            "FirstLastName": "PICASSO",
                            "SecondLastName": "PEREZ",
                            "DocumentType": "DNI",
                            "DocumentNumber": "44444443",
                            "MainPhone": "",
                            "EMail": ""
                        },
                        "CaseType": var_Case_CaseType, //requerido
                        "Category1": var_Case_Cat1, //requerido
                        "Category2": var_Case_Cat2, //requerido
                        "Category3": "",
                        "Category4": "",
                        "Category5": "",
                        "IndividualContact": {
                            "$type": "AmxPeruPSBActivities.Activities.External.IndividualContactTypeDTO, AmxPeruPSBActivities",
                            "CustomerId": "CUST0000002280",
                            "ContactId": "CON0000025",
                            "FirstName": "Pamela",
                            "FirstLastName": "Perez",
                            "SecondLastName": "",
                            "PrincipalAddress": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities",
                                "AddressId": "ADR0001",
                                "AddressType": "Casa",
                                "CityName": "Lima",
                                "DepartmentName": "Lima",
                                "DistrictName": "Ate",
                                "ProvinceName": "Lima",
                                "StandardAddress": ""
                            },
                            "DocumentType": "DNI",
                            "DocumentNumber": "7206310",
                            "MainPhone": "",
                            "EMail": ""
                        },
                        "CorporateAccount": {
                            "$type": "AmxPeruPSBActivities.Activities.External.CorporateAccountTypeDTO, AmxPeruPSBActivities",
                            "CurrentCorporateContact": {
                                "$type": "AmxPeruPSBActivities.Activities.External.CorporateContactTypeDTO, AmxPeruPSBActivities",
                                "FirstName": "JOSE LOPEZ",
                                "FirstLastName": "RAMOS",
                                "SecondLastName": "SANTOS",
                                "DocumentType": "DNI",
                                "DocumentNumber": "12345678",
                                "MainPhone": "",
                                "EMail": "",
                                "ConnectionName": "Legal representative"
                            },
                            "PrincipalLegalRepresentative": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalLegalRepresentativeTypeDTO, AmxPeruPSBActivities",
                                "FirstName": "JOSE LOPEZ",
                                "FirstLastName": "RAMOS",
                                "SecondLastName": "SANTOS",
                                "DocumentType": "DNI",
                                "DocumentNumber": "12345678",
                                "MainPhone": "",
                                "EMail": ""
                            },
                            "AccountId": "AC0001",
                            "CustomerId": "CUST0003",
                            "CompayName": "Empresa SAC",
                            "DocumentType": "RUC",
                            "DocumentNumber": "20012345678",
                            "MainPhone": "",
                            "PrincipalAddress": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities",
                                "AddressId": "ADRR00015",
                                "AddressType": "Casa",
                                "CityName": "Lima",
                                "DepartmentName": "Lima",
                                "DistrictName": "La Molina",
                                "ProvinceName": "Lima",
                                "StandardAddress": ""
                            },
                            "EMail": "",
                            "CustomerSegmentation": ""
                        },
                        "SalesOrganization": {
                            "$type": "AmxPeruPSBActivities.Activities.External.SalesOrganizationTypeDTO, AmxPeruPSBActivities",
                            "SalesOrganizationId": "FR01",
                            "SalesOrganizationAddress": "CA. CALLE #123 PISO 23, UBR. SANTA CATALINA, LA VICTORIA",
                            "SalesOrganizationName": "CAC BEGONIAS",
                            "SalesOrganizationZoneName": "LIMA CENTRO",
                            "SalesOrganizationChannelName": "CAC"
                        },
                        "TCRMUser": {
                            "$type": "AmxPeruPSBActivities.Activities.External.TCRMUserTypeDTO, AmxPeruPSBActivities",
                            "Username": "C15555",
                            "FirstName": "MARCO",
                            "FirstLastName": "GUZMAN",
                            "SecondLastName": "",
                            "EMail": "",
                            "Phone": "",
                            "PositionName": "ASESOR"
                        },
                        "NotificationEmail": "",
                        "SubscriptionCode": "",
                        "RelatedDirectoryNumber": "",
                        "ResolutionCode": "",
                        "ResolutionDate": "",
                        "NotificationDate": "",
                        "AppealDescription": "",
                        "AttachedDocumentsDTO": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [{
                                "$type": "AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities",
                                "AttachedDocumentName": "Evidencia2.jpg"
                            },
                            {
                                "$type": "AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities",
                                "AttachedDocumentName": "Documento2.pdf"
                            }]
                        },
                        "FinancialDocumentsDTO": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [{
                                "$type": "AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities",
                                "FinancialDocumentNumber": "55555454",
                                "FinancialDocumentEmissionDate": "05/06/2018",
                                "FinancialDocumentDueDate": "06/06/2018"
                            },
                            {
                                "$type": "AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities",
                                "FinancialDocumentNumber": "FINA0002",
                                "FinancialDocumentEmissionDate": "05/06/2018",
                                "FinancialDocumentDueDate": "06/06/2018"
                            }]
                        },
                        "BilledConcept": "",
                        "ProductOrServiceName": "",
                        "ClaimedAmount": "15.3",
                        "ReferencePhoneNumber": "754-6587",
                        "ClaimDescription": "",
                        "CustomerPetition": "",
                        "OsiptelComplaintId": "",
                        "IndecopiComplaintId": "",
                        "OsiptelGrievanceId": "",
                        "ResponseText": "",
                        "BossName": "Jorge Amparo",
                        "SarOffer": "",
                        "SarAnswer": "",
                        "SarId": "",
                        "TypeOfCopyRequested": "typeOfCopyRequested"
                    }
                }
            }


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
                    //clearInterval(myVar);
                    //alert("OK ");
                    //
                    if (data) {
                        //alert("Lista de Documentos :" + data.Output.response.listadoDocumentos);
                        var objResponseDoc = data.Output.response.listadoDocumentos;
                        var txt_documentIDTCRM = "";
                        var int_documenttype_Carta = 5;
                        var bln_filesenttoonbase = true;
                        var txt_filepath = "";
                        var txt_relatedentityname = "incident";
                        var txt_relatedentityguid = var_CaseId;
                        var int_status_Generated = 2;
                        var txt_ExtensionDoc = "";
                        var txt_TotalPaginasDoc = "";

                        for (i = 0; i <= objResponseDoc.length - 1; i++) {
                            txt_documentIDTCRM = ""; txt_filepath = "";
                            txt_documentIDTCRM = objResponseDoc[i].documentIDTCRM;
                            txt_filepath = objResponseDoc[i].UrlFTP;
                            txt_ExtensionDoc = objResponseDoc[i].Extension;
                            txt_TotalPaginasDoc = objResponseDoc[i].TotalPaginas;

                            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                            var objCaseType = Ust_Case.Funcion.fnc_getCaseTypeById(caseType[0].id);
                            if (objCaseType == null) { alert("objCaseType is empty"); return; }
                            tipoCasoCode = (objCaseType.attributes.ust_code === undefined) ? "" : objCaseType.attributes.ust_code.value;

                            if (tipoCasoCode == "004") { //Tipo Reclamo OSIPTEL
                                var hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                if (hiddenConsumeService == false) {
                                    Xrm.Page.getAttribute("ust_hiddenconsumeservice").setValue(true); //Cambia el value del campo a true

                                    hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                    if (hiddenConsumeService == true) {
                                        Xrm.Page.getAttribute("statuscode").setValue(864340002); //En Notificacion                                    
                                    }
                                }
                            }

                            Ust_Case.Funcion.updateCustomerDocumentByService008(txt_CustomerDocId, txt_documentIDTCRM, bln_filesenttoonbase, txt_filepath, int_documenttype_Carta, int_status_Generated);

                            var txt_Response_Id = Ust_Case.Funcion.fnc_documentLoadSignature(txt_documentIDTCRM, var_Case_TicketNumber, txt_filepath, txt_ExtensionDoc, txt_TotalPaginasDoc);

                            if (txt_Response_Id != null && txt_Response_Id != "")
                                Ust_Case.Funcion.updateCustomerDocumentByService001(txt_CustomerDocId, txt_Response_Id);

                        } /*Fin For*/

                        alert("Process Completed Successfully.");

                    }
                },
                error: function (data) {
                    //clearInterval(myVar);

                    alert(data.statusText);
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 21/07/2018
    // Req      : AMXPEASIS-3110
    // Function : Get Servicio 
    // PSB Name : AmxPeruCargaDocumentoFirma
    //=================================================================
    fnc_documentLoadSignature: function (txt_documentIDTCRM, txt_Case_TicketNumber, txt_filepath, txt_ExtensionDoc, txt_TotalPaginasDoc) {
        // 
        var txt_Response_Id = "";
        try {


            var psbWorkflowUrl;
            psbWorkflowUrl = Ust_Case.Funcion.fnc_getConfigValues("PsbRestServiceUrl");
            var serviceUrl = psbWorkflowUrl + 'AmxPeruCargaDocumentoFirma';
            var req =
            {
                "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
                "request": {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruCargaDocumentoFirmaRequestDTO, AmxPeruPSBActivities",
                    "almacenarDocumentoType": {
                        "$type": "AmxPeruPSBActivities.Activities.External.AlmacenarDocumentoRequestDTO, AmxPeruPSBActivities",
                        "documentList": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [
                                {
                                    "$type": "AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities",
                                    "idDocCliente": "DOC0002211",
                                    "idTransaccion": "CAS-00200-H2K5F9",
                                    "idDetalle": "",
                                    "rutaDocumento": "/home/usrhpxstrqa/exstream/hpeews/firmas/output/exstream/CONSTANCIA_UNION_SEPARACION_RECIBOS_UNIFICADO_0.pdf",
                                    "extension": {
                                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                        "attrName": "extension",
                                        "attrValue": "pdf"
                                    },
                                    "plantillaBRMS": "CONSTANCIA",
                                    "tipoObjeto": "OST",
                                    "valorObjeto": "2610032",
                                    "cantidadPaginas": {
                                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                        "attrName": "cantidadPaginas",
                                        "attrValue": ""
                                    },
                                    "flagCertificado": "0"
                                }
                            ]
                        },
                        "correoType": {
                            "$type": "AmxPeruPSBActivities.Activities.External.CorreoRequestDTO, AmxPeruPSBActivities",
                            "flagCorreo": {
                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                "attrName": "flagCorreo",
                                "attrValue": "false"
                            },
                            "destinatario": "",
                            "idPlantilla": ""
                        }
                    }
                }
            }

            //    {
            //    "request":
            //    {
            //        "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
            //        "request": {
            //            "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruCargaDocumentoFirmaRequestDTO, AmxPeruPSBActivities",
            //            "almacenarDocumentoType": {
            //                "$type": "AmxPeruPSBActivities.Activities.External.AlmacenarDocumentoRequestDTO, AmxPeruPSBActivities",
            //                "documentList": {
            //                    "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities]], mscorlib",
            //                    "$values": [
            //                        {
            //                            "$type": "AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities",
            //                            "idDocCliente": txt_documentIDTCRM,
            //                            "idTransaccion": txt_Case_TicketNumber,
            //                            "idDetalle": "",
            //                            "rutaDocumento": txt_filepath,
            //                            "extension": {
            //                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                                "attrName": "extension",
            //                                "attrValue": txt_ExtensionDoc
            //                            },
            //                            "plantillaBRMS": "CONSTANCIA",
            //                            "tipoObjeto": "OST",
            //                            "valorObjeto": "2610032",
            //                            "cantidadPaginas": {
            //                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                                "attrName": txt_TotalPaginasDoc,
            //                                "attrValue": ""
            //                            },
            //                            "flagCertificado": "0"
            //                        }
            //                    ]
            //                },
            //                "correoType": {
            //                    "$type": "AmxPeruPSBActivities.Activities.External.CorreoRequestDTO, AmxPeruPSBActivities",
            //                    "flagCorreo": {
            //                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                        "attrName": "flagCorreo",
            //                        "attrValue": "false"
            //                    },
            //                    "destinatario": "",
            //                    "idPlantilla": ""
            //                }
            //            }
            //        }
            //    }
            //};

            //alert(JSON.stringify(req));
            var ServiceStatus = "";
            $.ajax({
                type: "POST",
                url: serviceUrl,
                dataType: "json",
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                xhrFields:
                {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {

                    if (data) {
                        //alert(data.Output.response.Status);
                        //alert(data.Output.response.DescriptionResponse);
                        //txt_Response_Id = data.Output.response.Id; //Confirmar con Cleyton el nombre de este campo
                        //alert(txt_Response_Id);
                        txt_Response_Id = "VALOR_PRUEBA001";
                    }
                    ServiceStatus = "Success";
                },
                error: function (data) {
                    alert(data.statusText);
                    //ServiceStatus = "Fail";
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }

        return txt_Response_Id;

    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 23/07/2018
    // Req      : AMXPEASIS-3241
    // Function : Get Servicio - AmxPeruImprimirCase  
    // PSB      : INT-DOC-008
    //=================================================================
    fnc_generateResponseLetter: function () {

        try {

            var formType = Xrm.Page.ui.getFormType();
            if (formType != FORM_TYPE_UPDATE) return;

            //Datos del Caso
            var var_CaseId = Xrm.Page.data.entity.getId();
            if (var_CaseId == null || var_CaseId == "") { alert("Case is empty"); return; }

            var objInc = Ust_Case.Funcion.getIncidentById(var_CaseId);
            if (objInc == null) { alert("Case is empty"); return; }
            var var_Case_TicketNumber = (objInc.attributes.ticketnumber === undefined) ? "" : objInc.attributes.ticketnumber.value;
            var var_Case_Createdon = (objInc.attributes.createdon === undefined) ? "" : objInc.attributes.createdon.value;
            var var_Case_CaseType = (objInc.attributes.amxperu_casetype === undefined) ? "" : objInc.attributes.amxperu_casetype.formattedValue;
            var var_Case_Cat1 = (objInc.attributes.ust_category1 === undefined) ? "" : objInc.attributes.ust_category1.name;
            var var_Case_Cat2 = (objInc.attributes.ust_category2 === undefined) ? "" : objInc.attributes.ust_category2.name;
            var var_Case_Cat3 = (objInc.attributes.ust_category3 === undefined) ? "" : objInc.attributes.ust_category3.name;
            var var_Case_Cat4 = (objInc.attributes.ust_category4 === undefined) ? "" : objInc.attributes.ust_category4.name;
            var var_Case_Cat5 = (objInc.attributes.ust_category5 === undefined) ? "" : objInc.attributes.ust_category5.name;
            var var_Case_OsiptelNotAddressId = (objInc.attributes.ust_osiptelnotificationaddress === undefined) ? "" : objInc.attributes.ust_osiptelnotificationaddress.id;
            var var_Case_OwnerId = (objInc.attributes.ownerid === undefined) ? "" : objInc.attributes.ownerid.id;
            var var_Case_CreatedById = (objInc.attributes.createdby === undefined) ? "" : objInc.attributes.createdby.id;
            var var_Case_OsiptelNotEmail = (objInc.attributes.ust_osiptelnotificationemail === undefined) ? "" : objInc.attributes.ust_osiptelnotificationemail.value;
            var var_Case_OsiptelComplaintId = (objInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objInc.attributes.ust_osiptelcomplaintid.value;
            var var_ParentCaseId = (objInc.attributes.parentcaseid === undefined) ? "" : objInc.attributes.parentcaseid.id;
            var var_CustomerId = (objInc.attributes.customerid === undefined) ? "" : objInc.attributes.customerid.id;
            var var_CustContactId = (objInc.attributes.etel_customercontactid === undefined) ? "" : objInc.attributes.etel_customercontactid.id;


            //Datos del Padre Caso
            //var var_ParentCaseId="";
            //var Lookup_ParentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
            //if(Lookup_ParentCase != null) var_ParentCaseId = Lookup_ParentCase[0].id;
            //if(var_ParentCaseId == null || var_ParentCaseId == "") { alert("The ParentCase is empty"); return; } 
            var var_PCase_TicketNumber = "", var_PCase_OsiptelComplaintId = "";
            if (var_ParentCaseId != null && var_ParentCaseId != "") {
                var objPInc = getIncidentById(var_ParentCaseId);
                if (objPInc != null) {
                    var_PCase_TicketNumber = (objPInc.attributes.ticketnumber === undefined) ? "" : objPInc.attributes.ticketnumber.value;
                    var_PCase_OsiptelComplaintId = (objPInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objPInc.attributes.ust_osiptelcomplaintid.value;
                }

            }

            //Datos del Customer
            //var var_CustomerId="";
            //var Lookup_Customer = Xrm.Page.getAttribute("customerid").getValue();
            //if(Lookup_Customer != null) var_CustomerId = Lookup_Customer[0].id;
            //if(var_CustomerId == null || var_CustomerId == "") { alert("The CustomerId is empty"); return; } 

            var var_Cont_FisrtName = "", var_Cont_LastName = "", var_Cont_MiddleName = "", var_Cont_DocTypeName = "";
            var var_Cont_DocTypeNum = "", var_Cont_Mobile = "", var_Cont_Email = "";

            if (var_CustomerId != null && var_CustomerId != "") {
                var objContact = Ust_Case.Funcion.getContactById(var_CustomerId);
                if (objContact != null) {
                    var_Cont_FisrtName = (objContact.attributes.firstname === undefined) ? "" : objContact.attributes.firstname.value;
                    var_Cont_LastName = (objContact.attributes.lastname === undefined) ? "" : objContact.attributes.lastname.value;
                    var_Cont_MiddleName = (objContact.attributes.middlename === undefined) ? "" : objContact.attributes.middlename.value;
                    var_Cont_DocTypeName = (objContact.attributes.amxperu_documenttype === undefined) ? "" : objContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cont_DocTypeNum = (objContact.attributes.etel_passportnumber === undefined) ? "" : objContact.attributes.etel_passportnumber.value;
                    var_Cont_Mobile = (objContact.attributes.mobilephone === undefined) ? "" : objContact.attributes.mobilephone.value;
                    var_Cont_Email = (objContact.attributes.emailaddress1 === undefined) ? "" : objContact.attributes.emailaddress1.value;
                }

            }

            //Datos del Contact of Customer
            //var var_CustContactId="";
            //var Lookup_CustContact = Xrm.Page.getAttribute("etel_customercontactid").getValue(); //(Customer Contact, etel_customercontactid)
            //if(Lookup_CustContact != null) var_CustContactId = Lookup_CustContact[0].id;
            //if(var_CustContactId == null || var_CustContactId == "") { alert("The Customer ContactId is empty"); return; } 

            var var_Cust_Cont_FisrtName = "", var_Cust_Cont_LastName = "", var_Cust_Cont_MiddleName = "", var_Cust_Cont_DocTypeName = "";
            var var_Cust_Cont_DocTypeNum = "", var_Cust_Cont_Mobile = "", var_Cust_Cont_Email = "";

            if (var_CustContactId != null && var_CustContactId != "") {
                var objCustContact = getContactById(var_CustContactId);
                if (objCustContact != null) {
                    var_Cust_Cont_FisrtName = (objCustContact.attributes.firstname === undefined) ? "" : objCustContact.attributes.firstname.value;
                    var_Cust_Cont_LastName = (objCustContact.attributes.lastname === undefined) ? "" : objCustContact.attributes.lastname.value;
                    var_Cust_Cont_MiddleName = (objCustContact.attributes.middlename === undefined) ? "" : objCustContact.attributes.middlename.value;
                    var_Cust_Cont_DocTypeName = (objCustContact.attributes.amxperu_documenttype === undefined) ? "" : objCustContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cust_Cont_DocTypeNum = (objCustContact.attributes.etel_passportnumber === undefined) ? "" : objCustContact.attributes.etel_passportnumber.value;
                    var_Cust_Cont_Mobile = (objCustContact.attributes.mobilephone === undefined) ? "" : objCustContact.attributes.mobilephone.value;
                    var_Cust_Cont_Email = (objCustContact.attributes.emailaddress1 === undefined) ? "" : objCustContact.attributes.emailaddress1.value;
                }

            }

            //Direccion del Caso
            var var_ContAddr_Id = "", var_ContAddr_Type = "", var_ContAddr_City = "", var_ContAddr_Depa = "", var_ContAddr_Prov = "", var_ContAddr_Dist = "";
            var var_ContAddr_Line1 = "", var_ContAddr_Line2 = "", var_ContAddr_Line3 = "", var_ContAddr_StandardAddress = "";

            if (var_Case_OsiptelNotAddressId != null && var_Case_OsiptelNotAddressId != "") {
                var objCaseNotiAddress = Ust_Case.Funcion.getCustomerAddressById(var_Case_OsiptelNotAddressId);
                if (objCaseNotiAddress != null) {
                    var_ContAddr_Id = (objCaseNotiAddress.attributes.etel_customeraddressid === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddressid.value;
                    var_ContAddr_Type = (objCaseNotiAddress.attributes.etel_customeraddresstypecode === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddresstypecode.formattedValue;
                    var_ContAddr_City = (objCaseNotiAddress.attributes.etel_cityid === undefined) ? "" : objCaseNotiAddress.attributes.etel_cityid.name;
                    var_ContAddr_Depa = (objCaseNotiAddress.attributes.amxperu_department === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_department.name;
                    var_ContAddr_Prov = (objCaseNotiAddress.attributes.amxperu_province === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_province.name;
                    var_ContAddr_Dist = (objCaseNotiAddress.attributes.amxperu_district === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_district.name;
                    var_ContAddr_Line1 = (objCaseNotiAddress.attributes.amxperu_street1 === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_street1.formattedValue;
                    var_ContAddr_Line2 = (objCaseNotiAddress.attributes.etel_addressline2 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline2.value;
                    var_ContAddr_Line3 = (objCaseNotiAddress.attributes.etel_addressline3 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline3.value;
                    var_ContAddr_StandardAddress = var_ContAddr_Line1 + " " + var_ContAddr_Line2 + " " + var_ContAddr_Line3;
                }

            }

            //Datos del Usuario
            var var_Usr_UserName = "", var_Usr_FullName = "", var_Usr_Email = "", var_Usr_Mobile = "";
            var var_Usr_Position = "", var_Usr_FirstName = "", var_Usr_LastName = "", var_Usr_MiddleName = "";

            if (var_Case_OwnerId != null && var_Case_OwnerId != "") {
                var objUser = Ust_Case.Funcion.getUserById(var_Case_OwnerId);
                if (objUser != null) {
                    var_Usr_UserName = (objUser.attributes.domainname === undefined) ? "" : objUser.attributes.domainname.value;
                    var_Usr_FullName = (objUser.attributes.fullname === undefined) ? "" : objUser.attributes.fullname.value;
                    var_Usr_Email = (objUser.attributes.internalemailaddress === undefined) ? "" : objUser.attributes.internalemailaddress.value;
                    var_Usr_Mobile = (objUser.attributes.mobilephone === undefined) ? "" : objUser.attributes.mobilephone.value;
                    var_Usr_Position = (objUser.attributes.positionid === undefined) ? "" : objUser.attributes.positionid.value;
                    var_Usr_FirstName = (objUser.attributes.firstname === undefined) ? "" : objUser.attributes.firstname.value;
                    var_Usr_LastName = (objUser.attributes.lastname === undefined) ? "" : objUser.attributes.lastname.value;
                    var_Usr_MiddleName = (objUser.attributes.middlename === undefined) ? "" : objUser.attributes.middlename.value;
                }

            }

            //Datos del PDV
            var var_PDV_Id = "", var_PDV_Adress = "", var_PDV_Name = "", var_PDV_Zona = "", var_PDV_Chanel = "";
            if (var_Case_CreatedById != null && var_Case_CreatedById != "") {
                var objPDV = Ust_Case.Funcion.getDataPDVById(var_Case_CreatedById);
                if (objPDV != null) {
                    var_PDV_Id = (objPDV.attributes.amxperu_pointofsalesid === undefined) ? "" : objPDV.attributes.amxperu_pointofsalesid.value;
                    var_PDV_Adress = (objPDV.attributes.amxperu_address === undefined) ? "" : objPDV.attributes.amxperu_address.value;
                    var_PDV_Name = (objPDV.attributes.amxperu_name === undefined) ? "" : objPDV.attributes.amxperu_name.value;
                    var_PDV_Zona = (objPDV.attributes.amxperu_region === undefined) ? "" : objPDV.attributes.amxperu_region.name;
                    var_PDV_Chanel = (objPDV.attributes.amxperu_channelid === undefined) ? "" : objPDV.attributes.amxperu_channelid.name;
                }

            }

            //Creamos en Customer Document
            var txt_relatedentityname = "incident";
            var txt_relatedentityguid = var_CaseId;
            var txt_CustomerDocId = Ust_Case.Funcion.createCustomerDocument("Doc002", var_CustomerId, "contact", txt_relatedentityname, txt_relatedentityguid);

            var objCD = Ust_Case.Funcion.fnc_getCustomerDocument(var_CaseId);
            if (objCD != null) {
                var var_document_Id = (objCD.attributes.amxperu_documentid === undefined) ? "" : objCD.attributes.amxperu_documentid.value;
            }

            //configuracion para Envio de Documentos por Serviccio
            var psbWorkflowUrl;
            psbWorkflowUrl = Ust_Case.Funcion.fnc_getConfigValues("PsbRestServiceUrl");//http://localhost:6004/api/v1/workflow/
            var serviceUrl = psbWorkflowUrl + 'AmxPeruImprimirCase';

            var req =
            {
                "request": {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruImprimirCaseRequestDTO, AmxPeruPSBActivities",
                    "ListadoDocumentos": {
                        "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities]], mscorlib",
                        "$values": [{
                            "$type": "AmxPeruPSBActivities.Activities.External.ImprimirDocumentoTypeDTO, AmxPeruPSBActivities",
                            "DocumentIDTCRM": "DTCRM00001",
                            "Nombre": "CHQ_APELACION_OSIPTEL", //"CHQ_APELACION_OSIPTEL",
                            "FlagFirmaDigital": "true"
                        }
                        ]
                    },
                    "Huella": {
                        "$type": "AmxPeruPSBActivities.Activities.External.HuellaTypeDTO, AmxPeruPSBActivities",
                        "IdHuella": "",
                        "HuellaImagen": "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",
                        "HuellaMinucia": "Rk1SACAyMAABSwANAAAAAAIAAgAAxQDFAQAAACcugTUBOX04gM4BHIg3gSIAtqVaQUMA6407gU8A4ZJAQLgBEn83QMABUotDgMMAz3ZfQMcA+4FHQNcAtRI8QN4Au3EzgP0AvWdKgTAAlU9bgLwBOH88gMUBNIg8gNwAxxVPQOEBEYs/QTAA5pBEgTYAyUhTQUUBiRdJgUoBPYIzgLQBRoM+gPEBglo7QMsBcVI7QQoBES43QQ8BmAs/QR0BUHA6gScBa249QTEBgxdEgTYBoA1FgVMBpmY8gSAAZadCgVYBbng/QMAAnBJWgMIBfVg5QOEBY0U7gOIBrWE+gTsBsApAgVoBrw0ygP4BXFs1QR0BeBo7gRgBvAY6gWUBkxk7gTgAcklBQP0BSDw4gTkBw2I0ABcAAgAXQgEPAOyGAQEBXEdBALoBaS5opw=="
                    },
                    "Case": {
                        "$type": "AmxPeruPSBActivities.Activities.External.CaseTypeDTO, AmxPeruPSBActivities",
                        "CaseId": var_Case_TicketNumber, //requerido
                        "ParentCaseId": "123421222",
                        "CaseCreationDate": var_Case_Createdon, //requerido
                        "PowerOfAttorneyFlag": "true",
                        "PowerOfAttorneyContact": {
                            "$type": "AmxPeruPSBActivities.Activities.External.PowerOfAttorneyContactTypeDTO, AmxPeruPSBActivities",
                            "FirstName": "MIGUEL ANGEL",
                            "FirstLastName": "PICASSO",
                            "SecondLastName": "PEREZ",
                            "DocumentType": "DNI",
                            "DocumentNumber": "44444443",
                            "MainPhone": "",
                            "EMail": ""
                        },
                        "CaseType": var_Case_CaseType, //requerido
                        "Category1": var_Case_Cat1, //requerido
                        "Category2": var_Case_Cat2, //requerido
                        "Category3": "",
                        "Category4": "",
                        "Category5": "",
                        "IndividualContact": {
                            "$type": "AmxPeruPSBActivities.Activities.External.IndividualContactTypeDTO, AmxPeruPSBActivities",
                            "CustomerId": "CUST0000002280",
                            "ContactId": "CON0000025",
                            "FirstName": "Pamela",
                            "FirstLastName": "Perez",
                            "SecondLastName": "",
                            "PrincipalAddress": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities",
                                "AddressId": "ADR0001",
                                "AddressType": "Casa",
                                "CityName": "Lima",
                                "DepartmentName": "Lima",
                                "DistrictName": "Ate",
                                "ProvinceName": "Lima",
                                "StandardAddress": ""
                            },
                            "DocumentType": "DNI",
                            "DocumentNumber": "7206310",
                            "MainPhone": "",
                            "EMail": ""
                        },
                        "CorporateAccount": {
                            "$type": "AmxPeruPSBActivities.Activities.External.CorporateAccountTypeDTO, AmxPeruPSBActivities",
                            "CurrentCorporateContact": {
                                "$type": "AmxPeruPSBActivities.Activities.External.CorporateContactTypeDTO, AmxPeruPSBActivities",
                                "FirstName": "JOSE LOPEZ",
                                "FirstLastName": "RAMOS",
                                "SecondLastName": "SANTOS",
                                "DocumentType": "DNI",
                                "DocumentNumber": "12345678",
                                "MainPhone": "",
                                "EMail": "",
                                "ConnectionName": "Legal representative"
                            },
                            "PrincipalLegalRepresentative": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalLegalRepresentativeTypeDTO, AmxPeruPSBActivities",
                                "FirstName": "JOSE LOPEZ",
                                "FirstLastName": "RAMOS",
                                "SecondLastName": "SANTOS",
                                "DocumentType": "DNI",
                                "DocumentNumber": "12345678",
                                "MainPhone": "",
                                "EMail": ""
                            },
                            "AccountId": "AC0001",
                            "CustomerId": "CUST0003",
                            "CompayName": "Empresa SAC",
                            "DocumentType": "RUC",
                            "DocumentNumber": "20012345678",
                            "MainPhone": "",
                            "PrincipalAddress": {
                                "$type": "AmxPeruPSBActivities.Activities.External.PrincipalAddressTypeDTO, AmxPeruPSBActivities",
                                "AddressId": "ADRR00015",
                                "AddressType": "Casa",
                                "CityName": "Lima",
                                "DepartmentName": "Lima",
                                "DistrictName": "La Molina",
                                "ProvinceName": "Lima",
                                "StandardAddress": ""
                            },
                            "EMail": "",
                            "CustomerSegmentation": ""
                        },
                        "SalesOrganization": {
                            "$type": "AmxPeruPSBActivities.Activities.External.SalesOrganizationTypeDTO, AmxPeruPSBActivities",
                            "SalesOrganizationId": "FR01",
                            "SalesOrganizationAddress": "CA. CALLE #123 PISO 23, UBR. SANTA CATALINA, LA VICTORIA",
                            "SalesOrganizationName": "CAC BEGONIAS",
                            "SalesOrganizationZoneName": "LIMA CENTRO",
                            "SalesOrganizationChannelName": "CAC"
                        },
                        "TCRMUser": {
                            "$type": "AmxPeruPSBActivities.Activities.External.TCRMUserTypeDTO, AmxPeruPSBActivities",
                            "Username": "C15555",
                            "FirstName": "MARCO",
                            "FirstLastName": "GUZMAN",
                            "SecondLastName": "",
                            "EMail": "",
                            "Phone": "",
                            "PositionName": "ASESOR"
                        },
                        "NotificationEmail": "",
                        "SubscriptionCode": "",
                        "RelatedDirectoryNumber": "",
                        "ResolutionCode": "",
                        "ResolutionDate": "",
                        "NotificationDate": "",
                        "AppealDescription": "",
                        "AttachedDocumentsDTO": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [{
                                "$type": "AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities",
                                "AttachedDocumentName": "Evidencia2.jpg"
                            },
                            {
                                "$type": "AmxPeruPSBActivities.Activities.External.AttachedDocumentTypeDTO, AmxPeruPSBActivities",
                                "AttachedDocumentName": "Documento2.pdf"
                            }]
                        },
                        "FinancialDocumentsDTO": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [{
                                "$type": "AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities",
                                "FinancialDocumentNumber": "55555454",
                                "FinancialDocumentEmissionDate": "05/06/2018",
                                "FinancialDocumentDueDate": "06/06/2018"
                            },
                            {
                                "$type": "AmxPeruPSBActivities.Activities.External.FinancialDocumentTypeDTO, AmxPeruPSBActivities",
                                "FinancialDocumentNumber": "FINA0002",
                                "FinancialDocumentEmissionDate": "05/06/2018",
                                "FinancialDocumentDueDate": "06/06/2018"
                            }]
                        },
                        "BilledConcept": "",
                        "ProductOrServiceName": "",
                        "ClaimedAmount": "15.3",
                        "ReferencePhoneNumber": "754-6587",
                        "ClaimDescription": "",
                        "CustomerPetition": "",
                        "OsiptelComplaintId": "",
                        "IndecopiComplaintId": "",
                        "OsiptelGrievanceId": "",
                        "ResponseText": "",
                        "BossName": "Jorge Amparo",
                        "SarOffer": "",
                        "SarAnswer": "",
                        "SarId": "",
                        "TypeOfCopyRequested": "typeOfCopyRequested"
                    }
                }
            }


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
                    //clearInterval(myVar);
                    //alert("OK ");
                    //
                    if (data) {
                        //alert("Lista de Documentos :" + data.Output.response.listadoDocumentos);
                        var objResponseDoc = data.Output.response.listadoDocumentos;
                        var txt_documentIDTCRM = "";
                        var int_documenttype_Carta = 5;
                        var bln_filesenttoonbase = true;
                        var txt_filepath = "";
                        var txt_relatedentityname = "incident";
                        var txt_relatedentityguid = var_CaseId;
                        var int_status_Generated = 2;
                        var txt_ExtensionDoc = "";
                        var txt_TotalPaginasDoc = "";

                        for (i = 0; i <= objResponseDoc.length - 1; i++) {
                            txt_documentIDTCRM = ""; txt_filepath = "";
                            txt_documentIDTCRM = objResponseDoc[i].documentIDTCRM;
                            txt_filepath = objResponseDoc[i].UrlFTP;
                            txt_ExtensionDoc = objResponseDoc[i].Extension;
                            txt_TotalPaginasDoc = objResponseDoc[i].TotalPaginas;

                            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                            var objCaseType = Ust_Case.Funcion.fnc_getCaseTypeById(caseType[0].id);
                            if (objCaseType == null) { alert("objCaseType is empty"); return; }
                            tipoCasoCode = (objCaseType.attributes.ust_code === undefined) ? "" : objCaseType.attributes.ust_code.value;

                            if (tipoCasoCode == "007") { //Tipo Reclamo LDR
                                var hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                if (hiddenConsumeService == false) {
                                    Xrm.Page.getAttribute("ust_hiddenconsumeservice").setValue(true); //Cambia el value del campo a true

                                    hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                    if (hiddenConsumeService == true) {
                                        Xrm.Page.getAttribute("statuscode").setValue(864340002); //En Notificacion                                    
                                    }
                                }
                            }

                            Ust_Case.Funcion.updateCustomerDocumentByService008(txt_CustomerDocId, txt_documentIDTCRM, bln_filesenttoonbase, txt_filepath, int_documenttype_Carta, int_status_Generated);

                            var txt_Response_Id = Ust_Case.Funcion.fnc_documentLoadFirma(txt_documentIDTCRM, var_Case_TicketNumber, txt_filepath, txt_ExtensionDoc, txt_TotalPaginasDoc);

                            if (txt_Response_Id != null && txt_Response_Id != "")
                                Ust_Case.Funcion.updateCustomerDocumentByService001(txt_CustomerDocId, txt_Response_Id);

                        } /*Fin For*/

                        alert("Process Completed Successfully.");

                    }
                },
                error: function (data) {
                    //clearInterval(myVar);

                    alert(data.statusText);
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }


    },

    //=================================================================
    // Creator  : William Quiroz
    // Creation : 24/07/2018
    // Req      : AMXPEASIS-3241
    // Function : Get Servicio 
    // PSB      : INT-CHQ-2-001
    //=================================================================
    fnc_documentLoadFirma: function (txt_documentIDTCRM, var_Case_TicketNumber, txt_filepath, txt_ExtensionDoc, txt_TotalPaginasDoc) {
        var txt_Response_Id = "";
        try {


            var psbWorkflowUrl;
            psbWorkflowUrl = Ust_Case.Funcion.fnc_getConfigValues("PsbRestServiceUrl");
            var serviceUrl = psbWorkflowUrl + 'AmxPeruCargaDocumentoFirma';
            var req =
            {
                "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
                "request": {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruCargaDocumentoFirmaRequestDTO, AmxPeruPSBActivities",
                    "almacenarDocumentoType": {
                        "$type": "AmxPeruPSBActivities.Activities.External.AlmacenarDocumentoRequestDTO, AmxPeruPSBActivities",
                        "documentList": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [
                                {
                                    "$type": "AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities",
                                    "idDocCliente": "DOC0002211",
                                    "idTransaccion": "CAS-00200-H2K5F9",
                                    "idDetalle": "",
                                    "rutaDocumento": "/home/usrhpxstrqa/exstream/hpeews/firmas/output/exstream/CONSTANCIA_UNION_SEPARACION_RECIBOS_UNIFICADO_0.pdf",
                                    "extension": {
                                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                        "attrName": "extension",
                                        "attrValue": "pdf"
                                    },
                                    "plantillaBRMS": "CONSTANCIA",
                                    "tipoObjeto": "OST",
                                    "valorObjeto": "2610032",
                                    "cantidadPaginas": {
                                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                        "attrName": "cantidadPaginas",
                                        "attrValue": ""
                                    },
                                    "flagCertificado": "0"
                                }
                            ]
                        },
                        "correoType": {
                            "$type": "AmxPeruPSBActivities.Activities.External.CorreoRequestDTO, AmxPeruPSBActivities",
                            "flagCorreo": {
                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
                                "attrName": "flagCorreo",
                                "attrValue": "false"
                            },
                            "destinatario": "",
                            "idPlantilla": ""
                        }
                    }
                }
            }

            //    {
            //    "request":
            //    {
            //        "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
            //        "request": {
            //            "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruCargaDocumentoFirmaRequestDTO, AmxPeruPSBActivities",
            //            "almacenarDocumentoType": {
            //                "$type": "AmxPeruPSBActivities.Activities.External.AlmacenarDocumentoRequestDTO, AmxPeruPSBActivities",
            //                "documentList": {
            //                    "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities]], mscorlib",
            //                    "$values": [
            //                        {
            //                            "$type": "AmxPeruPSBActivities.Activities.External.DocumentoRequestDTO, AmxPeruPSBActivities",
            //                            "idDocCliente": txt_documentIDTCRM,
            //                            "idTransaccion": txt_Case_TicketNumber,
            //                            "idDetalle": "",
            //                            "rutaDocumento": txt_filepath,
            //                            "extension": {
            //                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                                "attrName": "extension",
            //                                "attrValue": txt_ExtensionDoc
            //                            },
            //                            "plantillaBRMS": "CONSTANCIA",
            //                            "tipoObjeto": "OST",
            //                            "valorObjeto": "2610032",
            //                            "cantidadPaginas": {
            //                                "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                                "attrName": txt_TotalPaginasDoc,
            //                                "attrValue": ""
            //                            },
            //                            "flagCertificado": "0"
            //                        }
            //                    ]
            //                },
            //                "correoType": {
            //                    "$type": "AmxPeruPSBActivities.Activities.External.CorreoRequestDTO, AmxPeruPSBActivities",
            //                    "flagCorreo": {
            //                        "$type": "AmxPeruPSBActivities.Activities.External.AttrNameValueObject, AmxPeruPSBActivities",
            //                        "attrName": "flagCorreo",
            //                        "attrValue": "false"
            //                    },
            //                    "destinatario": "",
            //                    "idPlantilla": ""
            //                }
            //            }
            //        }
            //    }
            //};

            //alert(JSON.stringify(req));
            var ServiceStatus = "";
            $.ajax({
                type: "POST",
                url: serviceUrl,
                dataType: "json",
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                xhrFields:
                {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (data) {

                    if (data) {
                        //alert(data.Output.response.Status);
                        //alert(data.Output.response.DescriptionResponse);
                        //txt_Response_Id = data.Output.response.Id; //Confirmar con Cleyton el nombre de este campo
                        //alert(txt_Response_Id);
                        txt_Response_Id = "VALOR_PRUEBA001";
                    }
                    ServiceStatus = "Success";
                },
                error: function (data) {
                    alert(data.statusText);
                    //ServiceStatus = "Fail";
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }

        return txt_Response_Id;

    },
    //=================================================================
    // Creator  : William Quiroz
    // Creation : 18/07/2018
    // Req      : 
    // Function : Get Config Entity CRM Configuration
    //=================================================================
    fnc_getConfigValues: function (value) {
        //
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
    },


    updateCustomerDocumentByService008: function (txt_CustomerDocument_Id, txt_documentid, bln_filesenttoonbase, txt_filepath, int_documenttype, int_status) {
        try {
            if (txt_CustomerDocument_Id == null || txt_CustomerDocument_Id == "") return false;
            var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("amxperu_customerdocument", txt_CustomerDocument_Id);
            //updateEntity.attributes["amxperu_name"] = txt_documentid; //txt
            updateEntity.attributes["amxperu_filesenttoonbase"] = bln_filesenttoonbase; //bool
            updateEntity.attributes["amxperu_filepath"] = txt_filepath; //txt
            updateEntity.attributes["amxperu_documenttype"] = { value: int_documenttype, type: "OptionSetValue" }; //5: Letter          
            updateEntity.attributes["amxperu_status"] = { value: int_status, type: "OptionSetValue" }; //2: Generated
            var updateResponse = XrmServiceToolkit.Soap.Update(updateEntity);
            if (updateResponse != "") {
                alert('Ocurrió un error al actualizar el campo tipo de plastico en la solicitud titular');
                return false;
            } else return true;
        }
        catch (ex) {
            alert(ex.message);
            return false;
        }
    },

    updateCustomerDocumentByService001: function (txt_CustomerDocument_Id, txt_documentidonbase) {
        try {
            if (txt_CustomerDocument_Id == null || txt_CustomerDocument_Id == "") return false;
            var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("amxperu_customerdocument", txt_CustomerDocument_Id);
            updateEntity.attributes["amxperu_documentidonbase"] = txt_documentidonbase;
            var updateResponse = XrmServiceToolkit.Soap.Update(updateEntity);
            if (updateResponse != "") {
                alert('Ocurrió un error al actualizar el campo tipo de plastico en la solicitud titular');
                return false;
            } else return true;
        }
        catch (ex) {
            alert(ex.message);
            return false;
        }
    },

    updateNetworkMassiveFaultStatus: function () {
        var networkmassive = Xrm.Page.getAttribute("ust_networkmassivefaultid").getValue();
        var status = "";

        var fetchXml = "<fetch distinct='false'>" +
            "<entity name='amxperu_networkincident'>" +
            "<attribute name='amxperu_networkincidentid' />" +
            "<attribute name='amxperu_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='statuscode' />" +
            "<attribute name='statecode' />" +
            "<attribute name='amxperu_status' />" +
            "<order attribute='amxperu_name' descending='false'/>" +
            "<filter type='and'>" +
            "<condition attribute='amxperu_networkincidentid' operator='eq' value='" + networkmassive[0].id + "' />" +
            "</filter>" +
            "</entity>" +
            "</fetch>";
        var datosNetwork = XrmServiceToolkit.Soap.Fetch(fetchXml);
        if (datosNetwork.length > 0) {
            var status = datosNetwork[0].attributes.amxperu_status.value;

            if (networkmassive != null) {

                if (status == 250000000) {
                    Xrm.Page.getAttribute("ust_networkmassivefaultstatus").setValue("Abierto");
                }
                if (status == 250000001) {
                    Xrm.Page.getAttribute("ust_networkmassivefaultstatus").setValue("Cerrado");
                }
            }
        }
    }
    ,

    //=================================================================
    // Creator  : 
    // Creation : 24/08/2018
    // Req      : AMXPEASIS-3249
    // Function :  
    //=================================================================


    fnc_FindListCaseCategory: function () {
        //debugger;
        var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

        var strConsultaTipoCaso = "amxperu_casetypeSet?$select=ust_Code,&$filter=amxperu_casetypeId eq guid'" + caseType[0].id + "'";
        var tipoCasoCode = "";

        ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strConsultaTipoCaso, function (result) {
            var datos = result;

            if (datos != null && datos.d.results.length > 0) {
                var entidad = datos.d.results[0];
                if (entidad.ust_Code != null) {

                    tipoCasoCode = entidad.ust_Code;
                }
            }
        });

        if (tipoCasoCode === "004") {

            var category1 = Xrm.Page.getAttribute('ust_category1').getValue();
            var category2 = Xrm.Page.getAttribute('ust_category2').getValue();
            var category3 = Xrm.Page.getAttribute('ust_category3').getValue();
            var category4 = Xrm.Page.getAttribute('ust_category4').getValue();
            var category5 = Xrm.Page.getAttribute('ust_category5').getValue();

            var ListCategory = [category1, category2, category3, category4, category5];

            //Escenario 01
            ListCategory.some(function (valor, indice, array) {
                if (valor != null) {
                    var XmlFecth = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "<entity name='" + valor[0].entityType + "'>" +
                        "<attribute name='" + valor[0].entityType + "id' />" +
                        "<attribute name='amxperu_name' />" +
                        "<attribute name='createdon' />" +
                        "<attribute name='ust_claimedosiptelinphasebreakdown' />" +
                        "<order attribute='amxperu_name' descending='false' />" +
                        "<filter type='and'>" +
                        "<condition attribute='" + valor[0].entityType + "id' operator='eq' uiname='' uitype='" + valor[0].entityType + "' value = '" + valor[0].id + "' />" +
                        "<condition attribute='ust_claimedosiptelinphasebreakdown' operator='eq' value='1' />" +
                        "</filter >" +
                        "</entity >" +
                        "</fetch >";

                    var data = XrmServiceToolkit.Soap.Fetch(XmlFecth);
                    if (data.length > 0) {
                        //  console.log(" cumple la condicion fase averia " + valor[0].entityType);
                        Xrm.Page.getAttribute('ust_complaintphase').setValue(864340000);
                        return true;
                    } else {
                        Xrm.Page.getAttribute('ust_complaintphase').setValue(864340001);
                    }

                } else {
                    Xrm.Page.getAttribute('ust_complaintphase').setValue(864340001);
                }
            });

            //Escenario 02
            ListCategory.some(function (valor, indice, array) {

                if (valor != null) {

                    var XmlFecth = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "<entity name='" + valor[0].entityType + "'>" +
                        "<attribute name='" + valor[0].entityType + "id' />" +
                        "<attribute name='amxperu_name' />" +
                        "<attribute name='createdon' />" +
                        "<attribute name='ust_allowcontractsmandatory' />" +
                        "<order attribute='amxperu_name' descending='false' />" +
                        "<filter type='and'>" +
                        "<condition attribute='" + valor[0].entityType + "id' operator='eq' uiname='' uitype='" + valor[0].entityType + "' value = '" + valor[0].id + "' />" +
                        "<condition attribute='ust_allowcontractsmandatory' operator='eq' value='0' />" +
                        "</filter >" +
                        "</entity >" +
                        "</fetch >";

                    var data = XrmServiceToolkit.Soap.Fetch(XmlFecth);
                    if (data.length > 0) {
                        //console.log(" cumple la condicion contract " + valor[0].entityType);
                        Xrm.Page.getAttribute("contractid").setRequiredLevel("none");
                        return true;
                    } else {
                        Xrm.Page.getAttribute("contractid").setRequiredLevel("required");
                    }

                } else {
                    Xrm.Page.getAttribute("contractid").setRequiredLevel("required");
                }

            });


            //Escenario 03
            ListCategory.some(function (valor, indice, array) {
                if (valor != null) {

                    var XmlFecth = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                        "<entity name='" + valor[0].entityType + "'>" +
                        "<attribute name='" + valor[0].entityType + "id' />" +
                        "<attribute name='amxperu_name' />" +
                        "<attribute name='createdon' />" +
                        "<attribute name='ust_allowcontractsmandatory' />" +
                        "<order attribute='amxperu_name' descending='false' />" +
                        "<filter type='and'>" +
                        "<condition attribute='" + valor[0].entityType + "id' operator='eq' uiname='' uitype='" + valor[0].entityType + "' value = '" + valor[0].id + "' />" +
                        "<condition attribute='ust_allowbillingdocuments' operator='eq' value='1' />" +
                        "</filter >" +
                        "</entity >" +
                        "</fetch >";

                    var data = XrmServiceToolkit.Soap.Fetch(XmlFecth);
                    if (data.length > 0) {
                        //console.log(" cumple la condicion contract " + valor[0].entityType);
                        Xrm.Page.getAttribute("etel_isdispute").setValue(true);

                        //#region Requerimiento 2926 - CodigoSeccion: R2926-01
                        // Autor: Luis Agui
                        // En esta seccion se va a realizarla validacion para mostrar o ocultar el WebResource
                        Xrm.Page.ui.tabs.get("tab_57").setVisible(true);
                        //#endregion

                        return true;
                    } else {
                        Xrm.Page.getAttribute("etel_isdispute").setValue(false);

                        //#region Requerimiento 2926 - CodigoSeccion: R2926-02
                        // Autor: Luis Agui
                        // En esta seccion se va a realizarla validacion para mostrar o ocultar el WebResource
                        Xrm.Page.ui.tabs.get("tab_57").setVisible(false);
                        //#endregion
                    }

                } else {
                    Xrm.Page.getAttribute("etel_isdispute").setValue(false);
                }

            });

        }

    }
    ,

    NotifyTrasu: function () {
        //alert("Prueba de boton");
        //debugger;;
        var flagsetconcluirost = Xrm.Page.getAttribute("ust_flaggenerateexcel").getValue();
        var flagrunpluginNew = false;
        if (flagsetconcluirost == false || flagsetconcluirost == null) flagrunpluginNew = true;
        Xrm.Page.getAttribute("ust_flaggenerateexcel").setValue(flagrunpluginNew);
        Xrm.Page.data.refresh(true).then(null, null);
    }
    /*,
	    fnc_retencion: function () {

        try {

            var formType = Xrm.Page.ui.getFormType();
            if (formType != FORM_TYPE_UPDATE) return;

            //Datos del Caso
            var var_CaseId = Xrm.Page.data.entity.getId();
            if (var_CaseId == null || var_CaseId == "") { alert("Case is empty"); return; }

            var objInc = Ust_Case.Funcion.getIncidentById(var_CaseId);
            if (objInc == null) { alert("Case is empty"); return; }
            var var_Case_TicketNumber = (objInc.attributes.ticketnumber === undefined) ? "" : objInc.attributes.ticketnumber.value;
            var var_Case_Createdon = (objInc.attributes.createdon === undefined) ? "" : objInc.attributes.createdon.value;
            var var_Case_CaseType = (objInc.attributes.amxperu_casetype === undefined) ? "" : objInc.attributes.amxperu_casetype.formattedValue;
            var var_Case_Cat1 = (objInc.attributes.ust_category1 === undefined) ? "" : objInc.attributes.ust_category1.name;
            var var_Case_Cat2 = (objInc.attributes.ust_category2 === undefined) ? "" : objInc.attributes.ust_category2.name;
            var var_Case_Cat3 = (objInc.attributes.ust_category3 === undefined) ? "" : objInc.attributes.ust_category3.name;
            var var_Case_Cat4 = (objInc.attributes.ust_category4 === undefined) ? "" : objInc.attributes.ust_category4.name;
            var var_Case_Cat5 = (objInc.attributes.ust_category5 === undefined) ? "" : objInc.attributes.ust_category5.name;
            var var_Case_OsiptelNotAddressId = (objInc.attributes.ust_osiptelnotificationaddress === undefined) ? "" : objInc.attributes.ust_osiptelnotificationaddress.id;
            var var_Case_OwnerId = (objInc.attributes.ownerid === undefined) ? "" : objInc.attributes.ownerid.id;
            var var_Case_CreatedById = (objInc.attributes.createdby === undefined) ? "" : objInc.attributes.createdby.id;
            var var_Case_OsiptelNotEmail = (objInc.attributes.ust_osiptelnotificationemail === undefined) ? "" : objInc.attributes.ust_osiptelnotificationemail.value;
            var var_Case_OsiptelComplaintId = (objInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objInc.attributes.ust_osiptelcomplaintid.value;
            var var_ParentCaseId = (objInc.attributes.parentcaseid === undefined) ? "" : objInc.attributes.parentcaseid.id;
            var var_CustomerId = (objInc.attributes.customerid === undefined) ? "" : objInc.attributes.customerid.id;
            var var_CustContactId = (objInc.attributes.etel_customercontactid === undefined) ? "" : objInc.attributes.etel_customercontactid.id;


            //Datos del Padre Caso
            //var var_ParentCaseId="";
            //var Lookup_ParentCase = Xrm.Page.getAttribute("parentcaseid").getValue();
            //if(Lookup_ParentCase != null) var_ParentCaseId = Lookup_ParentCase[0].id;
            //if(var_ParentCaseId == null || var_ParentCaseId == "") { alert("The ParentCase is empty"); return; } 
            var var_PCase_TicketNumber = "", var_PCase_OsiptelComplaintId = "";
            if (var_ParentCaseId != null && var_ParentCaseId != "") {
                var objPInc = getIncidentById(var_ParentCaseId);
                if (objPInc != null) {
                    var_PCase_TicketNumber = (objPInc.attributes.ticketnumber === undefined) ? "" : objPInc.attributes.ticketnumber.value;
                    var_PCase_OsiptelComplaintId = (objPInc.attributes.ust_osiptelcomplaintid === undefined) ? "" : objPInc.attributes.ust_osiptelcomplaintid.value;
                }

            }

            //Datos del Customer
            //var var_CustomerId="";
            //var Lookup_Customer = Xrm.Page.getAttribute("customerid").getValue();
			var customertype = Xrm.Page.getAttribute("amxperu_customertype").getValue();
            //if(Lookup_Customer != null) var_CustomerId = Lookup_Customer[0].id;
            //if(var_CustomerId == null || var_CustomerId == "") { alert("The CustomerId is empty"); return; } 

            var var_Cont_FisrtName = "", var_Cont_LastName = "", var_Cont_MiddleName = "", var_Cont_DocTypeName = "";
            var var_Cont_DocTypeNum = "", var_Cont_Mobile = "", var_Cont_Email = "";

            if (var_CustomerId != null && var_CustomerId != "") {
                var objContact = getContactById(var_CustomerId);
                if (objContact != null) {
                    var_Cont_FisrtName = (objContact.attributes.firstname === undefined) ? "" : objContact.attributes.firstname.value;
                    var_Cont_LastName = (objContact.attributes.lastname === undefined) ? "" : objContact.attributes.lastname.value;
                    var_Cont_MiddleName = (objContact.attributes.middlename === undefined) ? "" : objContact.attributes.middlename.value;
                    var_Cont_DocTypeName = (objContact.attributes.amxperu_documenttype === undefined) ? "" : objContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cont_DocTypeNum = (objContact.attributes.etel_passportnumber === undefined) ? "" : objContact.attributes.etel_passportnumber.value;
                    var_Cont_Mobile = (objContact.attributes.mobilephone === undefined) ? "" : objContact.attributes.mobilephone.value;
                    var_Cont_Email = (objContact.attributes.emailaddress1 === undefined) ? "" : objContact.attributes.emailaddress1.value;
                }

            }

            //Datos del Contact of Customer
            //var var_CustContactId="";
            //var Lookup_CustContact = Xrm.Page.getAttribute("etel_customercontactid").getValue(); //(Customer Contact, etel_customercontactid)
            //if(Lookup_CustContact != null) var_CustContactId = Lookup_CustContact[0].id;
            //if(var_CustContactId == null || var_CustContactId == "") { alert("The Customer ContactId is empty"); return; } 

            var var_Cust_Cont_FisrtName = "", var_Cust_Cont_LastName = "", var_Cust_Cont_MiddleName = "", var_Cust_Cont_DocTypeName = "";
            var var_Cust_Cont_DocTypeNum = "", var_Cust_Cont_Mobile = "", var_Cust_Cont_Email = "";

            if (var_CustContactId != null && var_CustContactId != "") {
                var objCustContact = getContactById(var_CustContactId);
                if (objCustContact != null) {
                    var_Cust_Cont_FisrtName = (objCustContact.attributes.firstname === undefined) ? "" : objCustContact.attributes.firstname.value;
                    var_Cust_Cont_LastName = (objCustContact.attributes.lastname === undefined) ? "" : objCustContact.attributes.lastname.value;
                    var_Cust_Cont_MiddleName = (objCustContact.attributes.middlename === undefined) ? "" : objCustContact.attributes.middlename.value;
                    var_Cust_Cont_DocTypeName = (objCustContact.attributes.amxperu_documenttype === undefined) ? "" : objCustContact.attributes.amxperu_documenttype.formattedValue;
                    var_Cust_Cont_DocTypeNum = (objCustContact.attributes.etel_passportnumber === undefined) ? "" : objCustContact.attributes.etel_passportnumber.value;
                    var_Cust_Cont_Mobile = (objCustContact.attributes.mobilephone === undefined) ? "" : objCustContact.attributes.mobilephone.value;
                    var_Cust_Cont_Email = (objCustContact.attributes.emailaddress1 === undefined) ? "" : objCustContact.attributes.emailaddress1.value;
                }

            }

            //Direccion del Caso
            var var_ContAddr_Id = "", var_ContAddr_Type = "", var_ContAddr_City = "", var_ContAddr_Depa = "", var_ContAddr_Prov = "", var_ContAddr_Dist = "";
            var var_ContAddr_Line1 = "", var_ContAddr_Line2 = "", var_ContAddr_Line3 = "", var_ContAddr_StandardAddress = "";

            if (var_Case_OsiptelNotAddressId != null && var_Case_OsiptelNotAddressId != "") {
                var objCaseNotiAddress = Ust_Case.Funcion.getCustomerAddressById(var_Case_OsiptelNotAddressId);
                if (objCaseNotiAddress != null) {
                    var_ContAddr_Id = (objCaseNotiAddress.attributes.etel_customeraddressid === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddressid.value;
                    var_ContAddr_Type = (objCaseNotiAddress.attributes.etel_customeraddresstypecode === undefined) ? "" : objCaseNotiAddress.attributes.etel_customeraddresstypecode.formattedValue;
                    var_ContAddr_City = (objCaseNotiAddress.attributes.etel_cityid === undefined) ? "" : objCaseNotiAddress.attributes.etel_cityid.name;
                    var_ContAddr_Depa = (objCaseNotiAddress.attributes.amxperu_department === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_department.name;
                    var_ContAddr_Prov = (objCaseNotiAddress.attributes.amxperu_province === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_province.name;
                    var_ContAddr_Dist = (objCaseNotiAddress.attributes.amxperu_district === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_district.name;
                    var_ContAddr_Line1 = (objCaseNotiAddress.attributes.amxperu_street1 === undefined) ? "" : objCaseNotiAddress.attributes.amxperu_street1.formattedValue;
                    var_ContAddr_Line2 = (objCaseNotiAddress.attributes.etel_addressline2 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline2.value;
                    var_ContAddr_Line3 = (objCaseNotiAddress.attributes.etel_addressline3 === undefined) ? "" : objCaseNotiAddress.attributes.etel_addressline3.value;
                    var_ContAddr_StandardAddress = var_ContAddr_Line1 + " " + var_ContAddr_Line2 + " " + var_ContAddr_Line3;
                }

            }

            //Datos del Usuario
            var var_Usr_UserName = "", var_Usr_FullName = "", var_Usr_Email = "", var_Usr_Mobile = "";
            var var_Usr_Position = "", var_Usr_FirstName = "", var_Usr_LastName = "", var_Usr_MiddleName = "";

            if (var_Case_OwnerId != null && var_Case_OwnerId != "") {
                var objUser = Ust_Case.Funcion.getUserById(var_Case_OwnerId);
                if (objUser != null) {
                    var_Usr_UserName = (objUser.attributes.domainname === undefined) ? "" : objUser.attributes.domainname.value;
                    var_Usr_FullName = (objUser.attributes.fullname === undefined) ? "" : objUser.attributes.fullname.value;
                    var_Usr_Email = (objUser.attributes.internalemailaddress === undefined) ? "" : objUser.attributes.internalemailaddress.value;
                    var_Usr_Mobile = (objUser.attributes.mobilephone === undefined) ? "" : objUser.attributes.mobilephone.value;
                    var_Usr_Position = (objUser.attributes.positionid === undefined) ? "" : objUser.attributes.positionid.value;
                    var_Usr_FirstName = (objUser.attributes.firstname === undefined) ? "" : objUser.attributes.firstname.value;
                    var_Usr_LastName = (objUser.attributes.lastname === undefined) ? "" : objUser.attributes.lastname.value;
                    var_Usr_MiddleName = (objUser.attributes.middlename === undefined) ? "" : objUser.attributes.middlename.value;
                }

            }

            //Datos del PDV
            var var_PDV_Id = "", var_PDV_Adress = "", var_PDV_Name = "", var_PDV_Zona = "", var_PDV_Chanel = "";
            if (var_Case_CreatedById != null && var_Case_CreatedById != "") {
                var objPDV = Ust_Case.Funcion.getDataPDVById(var_Case_CreatedById);
                if (objPDV != null) {
                    var_PDV_Id = (objPDV.attributes.amxperu_pointofsalesid === undefined) ? "" : objPDV.attributes.amxperu_pointofsalesid.value;
                    var_PDV_Adress = (objPDV.attributes.amxperu_address === undefined) ? "" : objPDV.attributes.amxperu_address.value;
                    var_PDV_Name = (objPDV.attributes.amxperu_name === undefined) ? "" : objPDV.attributes.amxperu_name.value;
                    var_PDV_Zona = (objPDV.attributes.amxperu_region === undefined) ? "" : objPDV.attributes.amxperu_region.name;
                    var_PDV_Chanel = (objPDV.attributes.amxperu_channelid === undefined) ? "" : objPDV.attributes.amxperu_channelid.name;
                }

            }
			
			var DecisionID = parent.Xrm.Page.getAttribute("DecisionID").getValue();
        var perfilAsesor = parent.Xrm.Page.getAttribute("perfilAsesor").getValue();
        var perfilEscalamiento = parent.Xrm.Page.getAttribute("perfilEscalamiento").getValue();
        var tipoProducto = parent.Xrm.Page.getAttribute("tipoProducto").getValue();
        var tipoOperacion = parent.Xrm.Page.getAttribute("tipoOperacion").getValue();
        var ostCotizada = parent.Xrm.Page.getAttribute("ostCotizada").getValue();
        var usuario = parent.Xrm.Page.getAttribute("usuario").getValue();
        var canal = parent.Xrm.Page.getAttribute("canal").getValue();
        var puntoVenta = parent.Xrm.Page.getAttribute("puntoVenta").getValue();
        var origen = parent.Xrm.Page.getAttribute("origen").getValue();
		
        var motivoSolicitud = parent.Xrm.Page.getAttribute("ust_transactiontypecode").getValue();
        var submotivoSolicitud = parent.Xrm.Page.getAttribute("submotivoSolicitud").getValue();
		
        var planAplicaMB = parent.Xrm.Page.getAttribute("planAplicaMB").getValue();
		var planAplicaVOZoSMS = parent.Xrm.Page.getAttribute("planAplicaVOZoSMS").getValue();
        var planRRSSFree = parent.Xrm.Page.getAttribute("planRRSSFree").getValue();
        var saldoMBLinea = parent.Xrm.Page.getAttribute("saldoMBLinea").getValue();
        var saldoMinutosLinea = parent.Xrm.Page.getAttribute("saldoMinutosLinea").getValue();
        var tipoPlay = parent.Xrm.Page.getAttribute("tipoPlay").getValue();
        var tieneConsumoExacto = parent.Xrm.Page.getAttribute("tieneConsumoExacto").getValue();
        var saldoIMR = parent.Xrm.Page.getAttribute("saldoIMR").getValue();
        var saldoIMF = parent.Xrm.Page.getAttribute("saldoIMF").getValue();
        var tienePrestamoEquipo = parent.Xrm.Page.getAttribute("tienePrestamoEquipo").getValue();
        var reparacionGarantia = parent.Xrm.Page.getAttribute("reparacionGarantia").getValue();
		
		
        var descripcion = parent.Xrm.Page.getAttribute("descripcion").getValue();
        var codigo = parent.Xrm.Page.getAttribute("codigo").getValue();
		
		
        var cantLlamUltMes = parent.Xrm.Page.getAttribute("cantLlamUltMes").getValue();
        var tieneAlquilerDecoHD = parent.Xrm.Page.getAttribute("tieneAlquilerDecoHD").getValue();
		var tieneAlquilerDecoBas = parent.Xrm.Page.getAttribute("tieneAlquilerDecoBas").getValue();
        var tieneAlquilerDecoDVR = parent.Xrm.Page.getAttribute("tieneAlquilerDecoDVR").getValue();
		var planoInstalacion = parent.Xrm.Page.getAttribute("planoInstalacion").getValue();
        var codigoUbigeo = parent.Xrm.Page.getAttribute("codigoUbigeo").getValue();
		
		
		var plazoAcuerdo = parent.Xrm.Page.getAttribute("plazoAcuerdo").getValue();
        var tipoAcuerdo = parent.Xrm.Page.getAttribute("tipoAcuerdo").getValue();
		var cargoFijo = parent.Xrm.Page.getAttribute("cargoFijo").getValue();
        var mesesVencimientoAcuerdo = parent.Xrm.Page.getAttribute("mesesVencimientoAcuerdo").getValue();
		var acuerdoLibre = parent.Xrm.Page.getAttribute("acuerdoLibre").getValue();
		
		var capacidadPagoCliente = parent.Xrm.Page.getAttribute("capacidadPagoCliente").getValue();
        var nivelSatisfaccionCliente = parent.Xrm.Page.getAttribute("nivelSatisfaccionCliente").getValue();
		var cantidadLineasCliente = parent.Xrm.Page.getAttribute("cantidadLineasCliente").getValue();
        var antiguedadCliente = parent.Xrm.Page.getAttribute("antiguedadCliente").getValue();
		var segmentoCliente = parent.Xrm.Page.getAttribute("segmentoCliente").getValue();
		var edadCliente = parent.Xrm.Page.getAttribute("edadCliente").getValue();
		var generoCliente = parent.Xrm.Page.getAttribute("generoCliente").getValue();
		var comportamientoPago = parent.Xrm.Page.getAttribute("comportamientoPago").getValue();


            //Obtener la Configuracion para Envio al Servicio
            var psbWorkflowUrl;
            psbWorkflowUrl = fnc_getConfigValues("AmxPeruConsultaRetencionEnrutamiento_URL");
            var serviceUrl = psbWorkflowUrl;

            var req =
            {
                    "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruConsultaRetencionEnrutamientoRequestDTO, AmxPeruPSBActivities",
                    "DecisionID": DecisionID,
                    "idCaso": var_Case_TicketNumber,
                    "perfilAsesor": perfilAsesor,
                    "perfilEscalamiento": perfilEscalamiento,
                    "tipoProducto": tipoProducto,
                    "tipoOperacion": tipoOperacion,
                    "ostCotizada": ostCotizada,
                    "usuario": usuario,
                    "canal": canal,
                    "puntoVenta": puntoVenta,
                    "origen": origen,
                    "motivo": {
                        "$type": "AmxPeruPSBActivities.Activities.External.MotivoRequestTypeDTO, AmxPeruPSBActivities",
                        "motivoSolicitud": motivoSolicitud,
                        "submotivoSolicitud": submotivoSolicitud
                    },
                    "servicio": {
                        "$type": "AmxPeruPSBActivities.Activities.External.ServicioRequestTypeDTO, AmxPeruPSBActivities",
                        "planAplicaMB": planAplicaMB,
                        "planAplicaVOZoSMS": planAplicaVOZoSMS,
                        "planRRSSFree": planRRSSFree,
                        "saldoMBLinea": saldoMBLinea,
                        "saldoMinutosLinea": saldoMinutosLinea,
                        "tipoPlay": tipoPlay,
                        "tieneConsumoExacto": tieneConsumoExacto,
                        "saldoIMR": saldoIMR,
                        "saldoIMF": saldoIMF,
                        "tienePrestamoEquipo": tienePrestamoEquipo,
                        "reparacionGarantia": reparacionGarantia,
                        "servicios": {
                            "$type": "System.Collections.Generic.List`1[[AmxPeruPSBActivities.Activities.External.ServicioReqTypeDTO, AmxPeruPSBActivities]], mscorlib",
                            "$values": [
                                {
                                    "$type": "AmxPeruPSBActivities.Activities.External.ServicioReqTypeDTO, AmxPeruPSBActivities",
                                    "descripcion": descripcion,
                                    "codigo": codigo
                                }
                            ]
                        },
                        "cantLlamUltMes": cantLlamUltMes,
                        "tieneAlquilerDecoHD": tieneAlquilerDecoHD,
                        "tieneAlquilerDecoBas": tieneAlquilerDecoBas,
                        "tieneAlquilerDecoDVR": tieneAlquilerDecoDVR,
                        "planoInstalacion": planoInstalacion,
                        "codigoUbigeo": codigoUbigeo,
                        "plan": {
                            "$type": "AmxPeruPSBActivities.Activities.External.PlanRequestTypeDTO, AmxPeruPSBActivities",
                            "plazoAcuerdo": plazoAcuerdo,
                            "tipoAcuerdo": tipoAcuerdo,
                            "cargoFijo": cargoFijo,
                            "mesesVencimientoAcuerdo": mesesVencimientoAcuerdo,
                            "acuerdoLibre": acuerdoLibre
                        }
                    },
                    "cliente": {
                        "$type": "AmxPeruPSBActivities.Activities.External.ClienteRequestTypeDTO, AmxPeruPSBActivities",
                        "idCliente": var_CustomerId,
                        "tipoCliente": customertype,
                        "capacidadPagoCliente": capacidadPagoCliente,
                        "nivelSatisfaccionCliente": nivelSatisfaccionCliente,
                        "cantidadLineasCliente": cantidadLineasCliente,
                        "antiguedadCliente": antiguedadCliente,
                        "segmentoCliente": segmentoCliente,
                        "edadCliente": edadCliente,
                        "generoCliente": generoCliente,
                        "comportamientoPago": comportamientoPago
                    }
                }


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
                    //clearInterval(myVar);
                    //alert("OK ");
                    //
                    if (data) {
                        //alert("Lista de Documentos :" + data.Output.response.listadoDocumentos);
                        var objResponseDoc = data.Output.response.listadoDocumentos;
                        var txt_documentIDTCRM = "";
                        var int_documenttype_Carta = 5;
                        var bln_filesenttoonbase = true;
                        var txt_filepath = "";
                        var txt_relatedentityname = "incident";
                        var txt_relatedentityguid = var_CaseId;
                        var int_status_Generated = 2;
                        var txt_ExtensionDoc = "";
                        var txt_TotalPaginasDoc = "";

                        for (i = 0; i <= objResponseDoc.length - 1; i++) {
                            txt_documentIDTCRM = ""; txt_filepath = "";
                            txt_documentIDTCRM = objResponseDoc[i].documentIDTCRM;
                            txt_filepath = objResponseDoc[i].UrlFTP;
                            txt_ExtensionDoc = objResponseDoc[i].Extension;
                            txt_TotalPaginasDoc = objResponseDoc[i].TotalPaginas;

                            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();

                            var objCaseType = Ust_Case.Funcion.fnc_getCaseTypeById(caseType[0].id);
                            if (objCaseType == null) { alert("objCaseType is empty"); return; }
                            tipoCasoCode = (objCaseType.attributes.ust_code === undefined) ? "" : objCaseType.attributes.ust_code.value;

                            if (tipoCasoCode == "007") { //Tipo Reclamo LDR
                                var hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                if (hiddenConsumeService == false) {
                                    Xrm.Page.getAttribute("ust_hiddenconsumeservice").setValue(true); //Cambia el value del campo a true

                                    hiddenConsumeService = Xrm.Page.getAttribute("ust_hiddenconsumeservice").getValue();

                                    if (hiddenConsumeService == true) {
                                        Xrm.Page.getAttribute("statuscode").setValue(864340002); //En Notificacion                                    
                                    }
                                }
                            }

                            Ust_Case.Funcion.updateCustomerDocumentByService008(txt_CustomerDocId, txt_documentIDTCRM, bln_filesenttoonbase, txt_filepath, int_documenttype_Carta, int_status_Generated);

                            var txt_Response_Id = Ust_Case.Funcion.fnc_documentLoadFirma(txt_documentIDTCRM, var_Case_TicketNumber, txt_filepath, txt_ExtensionDoc, txt_TotalPaginasDoc);

                            if (txt_Response_Id != null && txt_Response_Id != "")
                                Ust_Case.Funcion.updateCustomerDocumentByService001(txt_CustomerDocId, txt_Response_Id);

                        } //Fin For

                        alert("Process Completed Successfully.");

                    }
                },
                error: function (data) {

                    alert(data.statusText);
                }
            });

        }
        catch (ex) {
            alert(ex.message);
        }


    }*/

}