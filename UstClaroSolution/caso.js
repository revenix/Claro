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

if (typeof (Ust_Case) == "undefined")
{ Ust_Case = {}; }

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

        var type = Xrm.Page.ui.getFormType();
        if (type !== CRM_FORM_TYPE_UPDATE) {
            // debugger;
            Ust_Case.Funcion.fnc_toggleSectionDisplayState();
            Ust_Case.Funcion.fnc_showCorrespondingTab();
            Ust_Case.Funcion.fnc_CustomerRelatedSAR();
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("general", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_27", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("AssociatedCase", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_26", true);

            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
        }

        else if (type == CRM_FORM_TYPE_UPDATE) {
            //debugger;

            Ust_Case.Funcion.fnc_toggleSectionDisplayState();
            Ust_Case.Funcion.fnc_fiedRequired();
            Ust_Case.Funcion.fnc_SateFase_FieldsRequerid();

            Ust_Case.Funcion.fnc_CustomerRelatedSAR();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("general", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_27", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("AssociatedCase", true);
            ITC_FNC_Generico.Funcion.fnc_showHideTabs("tab_26", true);

            var correlativoSAR = Xrm.Page.getAttribute("ust_correlationsar").getValue(); //SAR OSIPTEL  
            var correlativoReclamo = Xrm.Page.getAttribute("ust_osiptelcomplaintid").getValue(); //Claim OSIPTEL 
            var correlativoQuejaOsiptel = Xrm.Page.getAttribute("ust_grievanceinternalid").getValue(); //Queja OSIPTEL   
            var reclamoLDR = Xrm.Page.getAttribute("ust_indecopicomplaintid").getValue(); //Reclamo LDR
            var correlativoOsiptel = Xrm.Page.getAttribute("ust_osipteldenunciationid").getValue(); //OSIPTEL Denunciation(Denuncia)
            var denunciaIndecopi = Xrm.Page.getAttribute("ust_expedientnumber").getValue(); //Denuncia(Complaint) Indecopi  
            var reclamoSAC = Xrm.Page.getAttribute("ust_saccomplaintid").getValue(); //Reclamo SAC  
            var complaintPhase = Xrm.Page.getAttribute("ust_complaintphase").getValue();
            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();

            if (correlativoSAR != null && sarResponse == "864340001") { //No Aceptada
                /*Ocultar campo*/
                Xrm.Page.getAttribute("amxperu_casetype").controls.forEach(function (control, index) { control.setDisabled(true); });
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
            }
            else if (correlativoSAR != null && sarResponse == "864340000") // Aceptada) 
            {
                /*Ocultar campo*/
                Xrm.Page.getAttribute("amxperu_casetype").controls.forEach(function (control, index) { control.setDisabled(true); });
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");
            }
            else if (correlativoOsiptel != null) {
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELDenunciation", true);
                //Set mandatory fields according tab. 
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("006");
            }

            else if (correlativoReclamo != null && sarResponse == null && complaintPhase == "864340001") { //1st Instance
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
            }
            else if (correlativoReclamo != null && sarResponse == "864340000" && complaintPhase != "864340002") // Aceptada
            {
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
            }

            else if (correlativoReclamo != null && complaintPhase == "864340002") { // Appeal
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
            }
            else if (correlativoReclamo != null && complaintPhase == "864340002" && sarResponse == "864340000") { // Appeal
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");
            }
            else if (correlativoQuejaOsiptel != null) { //Queja OSIPTEL
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OsiptelGrievance", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("005");
            }
            else if (reclamoLDR != null) { //Reclamo LDR
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimLDR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("007");
            }
            else if (denunciaIndecopi != null) { //Reclamo LDR
                /*Ocultar campo*/
                Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("IndecopiDenunciation", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("008");
            }
            else if (reclamoSAC != null) { //Reclamo SAC
                /*Ocultar campo*/
                //Xrm.Page.getControl("amxperu_casetype").setDisabled(true);
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimSAC", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("009");
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
    },



    //=================================================================
    // Creator  : Sergio Atencio
    // Creation : 22/05/2018
    // Function : Show tabs depends on case typifications.
    //=================================================================
    onchange_CaseTypification: function () {

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
        var type = Xrm.Page.ui.getFormType();
        if (type !== CRM_FORM_TYPE_UPDATE) {

            Ust_Case.Funcion.fnc_QuestionSaveCase(econtext);
        }
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
        debugger;
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
                if (tipoCasoCode === "003") { // OSIPTEL SAR Related information.

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
                else if (tipoCasoCode === "004") { // Tipo de caso: "Reclamo OSIPTEL" -- " CLAIM OSIPTEL" ??

                    var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();

                    if (sarResponse == "864340001") // No Aceptada
                    {
                        ITC_FNC_Generico.Funcion.fnc_showHideTabs("ClaimOsiptel", true);

                        //Set mandatory fields according tab. 
                        Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso(tipoCasoCode);

                        ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                        //Set mandatory fields according tab.
                        Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");

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
                else if (tipoCasoCode === "005") { // Tipo de caso: "QUEJA OSIPTEL" --  "OSIPTEL Complain"

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
                else if (tipoCasoCode === "006")// Tipo de caso: "Denuncia OSIPTEL" -- "OSIPTEL Complaint" ??
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
                else if (tipoCasoCode === "007") { // Tipo de caso: "RECLAMO LDR" -- "LDR Claim"

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
                else if (tipoCasoCode === "008") { // Tipo de caso: "DENUNCIA INDECOPI"--"INDECOPI Complaint"

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

                } else if (tipoCasoCode === "009") { // Tipo de caso: "RECLAMO SAC" -- "SAC Claim"

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
                else if (tipoCasoCode === "010") { // Tipo de caso "RETENCION / FIDELIZACION" -- "Retention / Loyalty"

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
        // debugger;
        try {

            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();
            var caseType = Xrm.Page.getAttribute("amxperu_casetype").getValue();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");
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

            if (tipoCasoCode === "003" && sarResponse == "864340001") {// No aceptada

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
            else if (tipoCasoCode == "004" && sarResponse == "864340001") // No aceptada
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

        //debugger;
        try {

            var complaintPhase = Xrm.Page.getAttribute("ust_complaintphase").getValue();
            var sarResponse = Xrm.Page.getAttribute("ust_sarresponse").getValue();
            Ust_Case.Funcion.fnc_fiedRequired();
            Xrm.Page.getAttribute("amxperu_casetype").setRequiredLevel("required");
            Xrm.Page.getAttribute("customerid").setRequiredLevel("required");

            if (complaintPhase == "864340002" && sarResponse == null)// Appeal
            {
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", true);

                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");

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
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELSAR", true);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340000" && sarResponse == null)// Grievance
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
                Ust_Case.Funcion.fnc_Clearformfields("OsiptelGrievance");
                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimLDR");
                Ust_Case.Funcion.fnc_Clearformfields("IndecopiDenunciation");
                Ust_Case.Funcion.fnc_Clearformfields("ClaimSAC");
            }
            else if (complaintPhase == "864340000" && sarResponse == "864340001")// Grievance y No Aceptada
            {
                Ust_Case.Funcion.fnc_fiedRequired();
                ITC_FNC_Generico.Funcion.fnc_showHideTabs("OSIPTELAppealComplain", false);
                //Set mandatory fields according tab.
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("011");

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
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

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
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("004");

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
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
                Ust_Case.Funcion.fnc_fiedsRequiredTypeCaso("003");

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
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

                Ust_Case.Funcion.fnc_Clearformfields("OSIPTELSAR");
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
    // Creation : 16/06/2018
    // Function : Identify Phase of the process and type of case to show required fields. OnLoad
    //=================================================================
    fnc_SateFase_FieldsRequerid: function () {
        debugger;
        Xrm.Page.data.process.addOnStageChange(Ust_Case.Funcion.fnc_OnchangeFase);

    },

    fnc_OnchangeFase: function () {
        debugger;
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
                //Devuelve el estado actual de la instancia del proceso
                var proceso = Xrm.Page.data.process.getStatus();

                var fetchXMLC = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
                fetchXMLC += '<entity name="ust_canalization">';
                fetchXMLC += '<attribute name="ust_canalizationid" />';
                fetchXMLC += '<attribute name="ust_stagename" />';
                fetchXMLC += '<attribute name="createdon" />';
                fetchXMLC += '<attribute name="statuscode" />';
                fetchXMLC += '<attribute name="statecode" />';
                fetchXMLC += '<attribute name="ust_description" />';
                fetchXMLC += '<attribute name="ust_casetypeid" />';
                fetchXMLC += '<order attribute="ust_stagename" descending="false" />';
                fetchXMLC += '<filter type="and">';
                fetchXMLC += '<condition attribute="ust_casetypeid" operator="eq" value="' + caseType[0].id + '" />';
                fetchXMLC += '<condition attribute="ust_stagename" operator="eq" value="' + stage.getName() + '" />';
                fetchXMLC += '</filter>';
                fetchXMLC += '</entity>';
                fetchXMLC += '</fetch>';

                var fetchDataC = XrmServiceToolkit.Soap.Fetch(fetchXMLC);
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

                                        if (nameFase == "Notify Customer" || nameFase == "Notificar Al Cliente")
                                            Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)

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

                if (proceso == "active") {
                    var nameFase = stage.getName(); //"Notify Customer"

                    //Update StatusCode
                    if (nameFase == "Identity" || nameFase == "Identificación") {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente 
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            //Xrm.Page.data.process.movePrevious(function () { Xrm.Page.data.process.setActiveStage(stage.getId()); });
                            isOK = true;
                        }
                    }
                    else if (nameFase == "Documents" || nameFase == "Documentación") {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFase == "Research" || nameFase == "Investigación") {
                        Xrm.Page.getAttribute("statuscode").setValue(864340008); //Pendiente
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFase == "Notify Customer" || nameFase == "Notificar Cliente") {
                        Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }
                    else if (nameFase == "Resuelt" || nameFase == "Resolver") {
                        //Xrm.Page.getAttribute("statuscode").setValue(864340001); //Con Resolucion varia portipo de caso pendiente(validarlo)
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.data.process.movePrevious(function () { Xrm.Page.data.process.setActiveStage(stage.getId()); });
                            isOK = true;
                        }
                    }
                        //if (letterCourier == true) {
                        //    Xrm.Page.getAttribute("statuscode").setValue(864340002); //En Notificacion                                    
                        //}
                        //if (notificationEmail == true) {
                        //    Xrm.Page.getAttribute("statuscode").setValue(864340003); //Notificado      
                        //}
                    else if (nameFase == "Notify TRASU" || nameFase == "Notificar TRASU") {
                        Xrm.Page.getAttribute("statuscode").setValue(864340004); //Por Elevar
                        var complet = Ust_Case.Funcion.fnc_btnResolve(false);
                        if (complet == true) {
                            Xrm.Page.getAttribute("ust_flagtask").setRequiredLevel("required");
                            isOK = true;
                        }
                    }

                    //else if (generatedInformationFile == true) {
                    //    Xrm.Page.getAttribute("statuscode").setValue(864340005); //Elevado
                    //}
                    //Update StatusCode                
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

        if (typeCaso == "003") { //SAR OSIPTEL
            Xrm.Page.getAttribute("ust_saroffer").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_sarresponse").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_dateofacceptance").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_acceptancemechanism").setRequiredLevel("required");
        }
        else if (typeCaso == "004") { //RECLAMO OSIPTEL
            Xrm.Page.getAttribute("ust_osiptelcomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_complaintphase").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_registrationdateclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_notificationtypeosiptelclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_webaccessnotificationtype").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_appliestoallservicenumbers").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_dateofnotification").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_generatedbyldr").setRequiredLevel("required");
        }
        else if (typeCaso == "005") { //QUEJA OSIPTEL
            //Xrm.Page.getAttribute("ust_grievanceinternalid").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_osiptelgrievanceid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_resultgrievanceosiptel").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_trasurecordnumbergrievanceosiptel").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_trasuemissiondategrievance").setRequiredLevel("required");
            ////Xrm.Page.getAttribute("ust_claroreceptiondategrievance").setRequiredLevel("required");
        }
        else if (typeCaso == "006") { //DENUNCIA OSIPTEL
            Xrm.Page.getAttribute("ust_osipteldenunciationid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_osiptelemissiondate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_claroreceiveddate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_denunciationtranscription").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_expectedresolutiontime").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_relatedsarcomplaintgrievance").setRequiredLevel("required");
        }
        else if (typeCaso == "007") { //RECLAMO LDR
            Xrm.Page.getAttribute("ust_indecopicomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_notificationtype").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_nameoffathermother").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_identificationdocument").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_namesoftheclaimantldr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_claimantssurnameldr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_detailoftheclaim").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_priority").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_resultdateldr").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_responsetext").setRequiredLevel("required");
            //Xrm.Page.getAttribute("ust_channeled").setRequiredLevel("required");     
        }
        else if (typeCaso == "008") { //DENUNCIA(COMPLAINT) INDECOPI
            Xrm.Page.getAttribute("ust_expedientnumber").setRequiredLevel("required");//INDECOPI Denunciation Id
            Xrm.Page.getAttribute("ust_indecopiauthority").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_sanctionrisk").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_denunciationstage").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_indecopiresolution").setRequiredLevel("required");
        }
        else if (typeCaso == "009") { //RECLAMO SAC
            Xrm.Page.getAttribute("ust_saccomplaintid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_indecopioffice").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_result").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_resultdate").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_answertext").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_costofconclusion").setRequiredLevel("required");
        }
        else if (typeCaso == "010") { //RETENCION / FIDELIZACION
            Xrm.Page.getAttribute("ust_transactiontype").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_retentionandloyaltyoptions").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_consumedimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_actualimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_availableimf").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_consumedimr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_actualimr").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_availableimr").setRequiredLevel("required");
        }
        else if (typeCaso == "011") //OSIPTELAppealComplain
        {
            Xrm.Page.getAttribute("ust_saraid").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_appealdescription").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_saraoffer").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_saraanswer").setRequiredLevel("required");
            Xrm.Page.getAttribute("ust_trasuresolution").setRequiredLevel("required");
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
        //debugger;

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
        var grievanceInternalId = Xrm.Page.getAttribute("ust_grievanceinternalid").getValue();

        //if we dont have parent case or currentCaseType or grievanceId exists
        if (objCaseType == null || grievanceInternalId != null) {
            return false;
        }

        if (objParentCase != null) {
            //get the parent case type code : 004 OSIPTEL Complaint
            //SDK.REST.retrieveRecord(objParentCase[0].id, "Incident", "ust_osiptelcomplaintid,amxperu_amxperu_casetype_incident_CaseType/ust_Code", 'amxperu_amxperu_casetype_incident_CaseType', function (result) {
            XrmServiceToolkit.Rest.Retrieve(objParentCase[0].id, "IncidentSet", "amxperu_OSIPTELComplaintID,TicketNumber,ust_OsiptelComplaintid,amxperu_amxperu_casetype_incident_CaseType/ust_Code", 'amxperu_amxperu_casetype_incident_CaseType', function (result) {
                parentCaseTypeCode = result.amxperu_amxperu_casetype_incident_CaseType.ust_Code;
                osiptelComplaintId = result.ust_OsiptelComplaintid;
                //ticketNumber = result.TicketNumber;
                //var ust_OsiptelComplaintid = result.ust_OsiptelComplaintid;

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);


            //get the current case type code : 005 OSIPTEL Grievance
            XrmServiceToolkit.Rest.Retrieve(objCaseType[0].id, "amxperu_casetypeSet", "ust_Code", null, function (result) {
                currentCaseTypeCode = result.ust_Code;

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);

            //If parent case is OSIPTEL COMPLAINT & current case is OSIPTEL Grievance
            if (parentCaseTypeCode == "004" && currentCaseTypeCode == "005") //
            {
                //Get the list of codes.
                XrmServiceToolkit.Rest.RetrieveMultiple("IncidentSet", "?$filter=ParentCaseId/Id eq (guid'" + objParentCase[0].id + "') and amxperu_CaseType/Id eq (guid'" + objCaseType[0].id + "')", function (results) {

                    total = results.length + 1;

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
        //debugger;
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
        //debugger;

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
        // debugger;

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
                roleName = results[0].connection_role_connections2.Name;
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
            ITC_FNC_Generico.fnc_Clearfields('ust_contactdocid');
            ITC_FNC_Generico.fnc_Clearfields('ust_contactnamecase');
            ITC_FNC_Generico.fnc_Clearfields('ust_contactconectiontype');

        }
    }
,

    fnc_OnChange_CustomerField: function () {
        
        var objCustomer = Xrm.Page.getAttribute("customerid").getValue();
 
        if (objCustomer != null) {

            XrmServiceToolkit.Rest.Retrieve(objCustomer[0].id, "ContactSet", "amxperu_DocumentType,amxperu_hiddenconnectiontype,etel_iddocumentnumber,etel_passportnumber,FullName", null, function (result) {
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
 

            }, function (error) {
                Xrm.Utility.alertDialog(error.message);
            }, false);
 

        } else {
            ITC_FNC_Generico.fnc_Clearfields('ust_customername');
            ITC_FNC_Generico.fnc_Clearfields('amxperu_documenttype');
            ITC_FNC_Generico.fnc_Clearfields('amxperu_documentnumber');
            ITC_FNC_Generico.fnc_Clearfields('ust_customerid');
            ITC_FNC_Generico.fnc_Clearfields('amxperu_customertype');
        }
    },


    fnc_OnChange_CustomerOpsitelField: function () {

        var objCustomer = Xrm.Page.getAttribute("ust_appealcontactcomplaint").getValue();


        if (objCustomer != null) {

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
                "<condition attribute='contactid' operator='eq' uiname='' uitype='contact' value='" + objCustomer[0].id + " ' />" +
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
                if (conectionType != null) {
                    Xrm.Page.getAttribute("ust_appealconnectiontype").setValue(conectionType.value);
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

        var objCustomer = Xrm.Page.getAttribute("ust_contactcase").getValue();

        if (objCustomer != null) {

            XrmServiceToolkit.Rest.Retrieve(objCustomer[0].id, "ContactSet", "amxperu_DocumentType,amxperu_hiddenconnectiontype,etel_iddocumentnumber,etel_passportnumber,LastName,FullName", null, function (result) {

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
                if (conectionType != null) {
                    Xrm.Page.getAttribute("ust_grievanceconnectiontype").setValue(conectionType);
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
    // Creator  : William Quiroz
    // Creation : 03/07/2018
    // Function : Generate Cod Resolution
    // REQ      : AMXPEASIS-3097
    //=================================================================
    fnc_generateResolution: function () {

        //Siempre que los cambios de etapa activen una función onchange
        stage = Xrm.Page.data.process.getActiveStage();
        //Devuelve el estado actual de la instancia del proceso
        var proceso = Xrm.Page.data.process.getStatus();

        var flagGeneracionCod = Xrm.Page.getAttribute("ust_flaggeneraciondocument").getValue();

        if (flagGeneracionCod == true) {
            if (proceso == "active") {
                var nameFase = stage.getName(); //"Research"                                                             

                if (nameFase == "Research" || nameFase == "Investigación") {

                    var typeCaseId = Xrm.Page.getAttribute("amxperu_casetype").getValue();
                    var nCode = null;

                    var fetchXML = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
                    fetchXML += '<entity name="amxperu_casetype">';
                    fetchXML += '<attribute name="amxperu_casetypeid" />';
                    fetchXML += '<attribute name="amxperu_name" />';
                    fetchXML += '<attribute name="createdon" />';
                    fetchXML += '<attribute name="statuscode" />';
                    fetchXML += '<attribute name="ust_code" />';
                    fetchXML += '<order attribute="amxperu_name" descending="false" />';
                    fetchXML += '<filter type="and">';
                    fetchXML += '<condition attribute="amxperu_casetypeid" operator="eq" value="' + typeCaseId[0].id + '" />';
                    fetchXML += '</filter>';
                    fetchXML += '</entity>';
                    fetchXML += '</fetch>';

                    var fetchData = XrmServiceToolkit.Soap.Fetch(fetchXML);

                    if (fetchData.length > 0) {
                        var code04 = fetchData[0].attributes.ust_code.value;

                        if (code04 == "004" && flagGeneracionCod == true) {

                            var hoy = new Date();
                            var dd = hoy.getDate();
                            var mm = hoy.getMonth() + 1; //hoy es 0!
                            var anio = hoy.getFullYear();

                            //today.setDate(today.getDate());
                            Xrm.Page.getAttribute("ust_resolutiondate").setValue(new Date());

                            // Xrm.Page.attribute("ust_resolutiondate").setValue(hoy);

                            var areaEmpleado = "DAC-REC";// Área del empleado (obtenida de la entidad usuario en CRM)
                            var sufijo = "R";
                            var codUsuario = "XXXXX"; //Código del usuario (obtenido de la entidad usuario en CRM).

                            //Get the list of codes.
                            XrmServiceToolkit.Rest.RetrieveMultiple("IncidentSet", "?$filter=amxperu_CaseType/Id eq (guid'" + typeCaseId[0].id + "')", function (results) {

                                total = results.length + 1;

                            }, function (error) {
                                Xrm.Utility.alertDialog(error.message);
                            }, function () {
                                //On Complete - Do Something
                            }, false);

                            nCode = total;

                            //var anioactual = anio.split(0, 2);

                            var anioac = String(anio);
                            var anioactual = anioac.substring(4 , 2);

                            var resolucion = areaEmpleado + "-" + sufijo + "/" + codUsuario + "-" + nCode + "-" + anioactual;
                            //Set the total
                            Xrm.Page.getAttribute("ust_resolutioncode").setValue(resolucion);

                        }

                    }
                }
            }


            //Para siguiente req relacionado
            //if (nameFase == "Appeal" || nameFase == "Apelar") {
            //    var escalacion = "E";
            //}
            //else if (nameFase == "Appeal" || nameFase == "Apelar")
            //{
            //    var informativo = "I"
            //}
        }
    }
}

