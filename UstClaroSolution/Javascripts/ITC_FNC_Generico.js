// =================================================
// Creador      : Sergio Atencio
// Creación     : 22/05/2018
// Entidad      : Para entidades genericas
// Estado       : Proceso
// =================================================

if (typeof (ITC_FNC_Generico) == "undefined")
{ ITC_FNC_Generico = {}; }

ITC_FNC_Generico.Funcion = {

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 20/09/2013
    // Función : Procedimiento que concatena todos los textos de los "Objetos"
    //  		 pasados por orden en que los envías.
    // Params  : objetos = Array de todos los nombres de los campos a concatenar.
    // Output  : String con todos los textos concatenados.
    //==============================================================================
    fnc_concatenar: function (objetos) {

        if (objetos == null) return "";

        var sResultado = "";

        for (var i in objetos) {
            var sNomCampo = objetos[i];
            if (sNomCampo != null && sNomCampo != "") {
                // Obtenemos el objeto.
                control = Xrm.Page.ui.controls.get(sNomCampo);
                if (control != null) {
                    var str = control.getControlType();

                    if (control.getControlType() == "standard") { //Textbox
                        //Obtenemos el valor de la caja de texto.
                        var valor = Xrm.Page.getAttribute(sNomCampo).getValue();
                        if (valor != null) {
                            sResultado = sResultado + valor + " ";
                        }
                    } else if (control.getControlType() == "lookup") { // lookup

                        var valores = Xrm.Page.getAttribute(sNomCampo).getValue();
                        if (valores != null) {
                            sResultado = sResultado + valores[0].name + " ";
                        }

                    } else if (control.getControlType() == "optionset") //picklist
                    {
                        var valor;
                        if (Xrm.Page.getAttribute(sNomCampo).getValue() != null) { // Obtenemos el nombre de la opcion del item.
                            valor = Xrm.Page.getAttribute(sNomCampo).getSelectedOption().text;
                            sResultado = sResultado + valor + " ";
                        }
                    }
                }
            }
        }

        //Llamamos a trim.
        return this.fnc_trim(sResultado);

    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 20/09/2013
    // Función : Procedimiento que quita los espacios al final de un texto.
    // Params  : sTexto = Texto a quitar espacios al final.
    // Output  : String con el texto sin espacios al final
    //==============================================================================
    fnc_trim: function (sTexto) {
        if (sTexto != null) {
            return sTexto.replace(/^\s+/g, '').replace(/\s+$/g, '')
        }
    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 20/09/2013
    // Función : Procedimiento que evalue si el texto pasado como parametro es solo letras.
    // Params  : sTexto = Texto a validar que sea solo letras.
    // Output  : Boolean indicando si es solo letras o no.
    //==============================================================================
    fnc_validaSoloLetras: function (sTexto) {
        if (sTexto == null)
            return false;

        if (sTexto != null && sTexto != "") {

            var letters = /^[A-Za-z]+$/;
            if (sTexto.match(letters)) {
                return true;
            }
            else {
                return false;
            }

        }
    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 27/11/2016
    // Función : Procedimiento que valida solo números
    // Params  : pTexto = valor a validar.
    //           pLongitud = Cantidad de caracteres que quieres que se valide.    
    //==============================================================================
    fnc_validaSoloNumeros: function (pTexto,  pLongitud) {

            if (pTexto !== null) {

                var numbers = /^[0-9]+$/;

                if (pTexto.match(numbers) && pTexto.length === pLongitud) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        

    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 02/12/2016
    // Función : Procedimiento que valida solo números por rango.
    // Params  : pTexto = valor a validar.
    //           pLongitudInicial = Cantidad de caracteres desde donde empieza la validación.    
    //           pLongitudFinal = Cantidad de caracteres final hasta donde validara.
    //==============================================================================
    fnc_validaSoloNumerosRango: function (pTexto, pLongitudInicial, pLongitudFinal) {

        if (pTexto !== null) {

            var numbers = /^[0-9]+$/;

            if (pTexto.match(numbers) && (pTexto.length >= pLongitudInicial && pTexto.length <= pLongitudFinal)) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }


    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 20/09/2013
    // Función : Función
    // Params  : valor = Fecha que se va a comparar.
    //		   : aceptaIgual = booleano que indica si se va a validar la fecha actual.
    // Output  : boolean = indica true si la fecha pasada es menor
    //==============================================================================
    fnc_validaFechaMenorAFechaActual: function (valor, aceptaIgual) {

        if (valor == null)
            return false;

        var fSolicitud = new Date(valor);
        var today = new Date();

        if ((fSolicitud.getDate().toString() + fSolicitud.getMonth().toString() + fSolicitud.getFullYear().toString()) == (today.getDate().toString() + today.getMonth().toString() + today.getFullYear().toString())) {
            if (aceptaIgual)
                return true;
            else
                return false;
        } else {
            //Preguntar a Jose si esto tambien valida la fecha actual.
            if (fSolicitud < today) {
                //Xrm.Page.getAttribute("rrm_requestdate").setValue(null);
                //alert("La fecha ingresada es menor que la fecha del sistema");
                return true;
            }
        }

        return false;
    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 29/10/2013
    // Función : Función
    // Params  : recordId  : El guid del registro entidad al cual esta registrado el Wrokflow.
    //           workFlowId: El id del workflow el cual se ejecutará
    // Output  : 
    //==============================================================================
    fnc_ejecutarWorkFlow: function (recordId, workflowId,callback) {

        var objcontext = Xrm.Page.context;
        var strorgName = objcontext.getOrgUniqueName();
        var strserverUrl = location.protocol + "//" + window.location.host + "/" + strorgName;

        var url;
        var OrgServicePath = "/XRMServices/2011/Organization.svc/web";
        url = strserverUrl + OrgServicePath;

        var request;
        request = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                            "<s:Body>" +
                            "<Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">" +
                                "<request i:type=\"b:ExecuteWorkflowRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">" +
                                "<a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">" +
                                    "<a:KeyValuePairOfstringanyType>" +
                                    "<c:key>EntityId</c:key>" +
                                    "<c:value i:type=\"d:guid\" xmlns:d=\"http://schemas.microsoft.com/2003/10/Serialization/\">" + recordId + "</c:value>" +
                                    "</a:KeyValuePairOfstringanyType>" +
                                    "<a:KeyValuePairOfstringanyType>" +
                                    "<c:key>WorkflowId</c:key>" +
                                    "<c:value i:type=\"d:guid\" xmlns:d=\"http://schemas.microsoft.com/2003/10/Serialization/\">" + workflowId + "</c:value>" +
                                    "</a:KeyValuePairOfstringanyType>" +
                                "</a:Parameters>" +
                                "<a:RequestId i:nil=\"true\" />" +
                                "<a:RequestName>ExecuteWorkflow</a:RequestName>" +
                                "</request>" +
                            "</Execute>" +
                            "</s:Body>" +
                        "</s:Envelope>";

        var req = new XMLHttpRequest();
        req.open("POST", url, true)
        // Responses will return XML. It isn't possible to return JSON.
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
        req.onreadystatechange = function () { callback(req); };
        //function () { ITC_FNC_Generico.Funcion.assignResponse(req); };
        req.send(request);

    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 22/15/2018
    // Función : Función
    // Params  : tabname = tab name
    //           visible = conditional show or hide
    // Output  : 
    //==============================================================================
    fnc_showHideTabs: function (tabname, visible) {

        Xrm.Page.ui.tabs.get(tabname).setVisible(visible);
     
    },

    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 31/05/2018
    // Función : Get all translation of one formid.
    // Params  : lcid = language code, 3082:spanish and 1033: English
    // Output  : Array with all translations
    // Example of use:  var datos = ITC_FNC_Generico.Funcion.fnc_getAllTranslations(1033, 'js_BI_CustomertBillingAddress');
    //==============================================================================
    fnc_getAllTranslations: function(lcid, formId) {

        var objTranslations;
        
        var strQueryTranslations =
            "etel_translationSet?$select=etel_lcid,etel_code,etel_formid,etel_lcid,etel_message&$filter=etel_lcid eq " +
            lcid + " and etel_formid eq '" + formId + "'";

        ITC_FNC_Generico_Data.Funcion.fnc_consulta_record(strQueryTranslations, function (result) {

            var datos = result;

            if (datos != null && datos.d.results.length > 0) {

                objTranslations = datos.d.results;
            }
        });

        return objTranslations;

    },


    //============================================================================
    // Creador : Sergio Atencio
    // Creación: 31/05/2018
    // Función : Get only one record translation
    // Params  : translations: with all translation
    //           code: control name.
    // Output  : message string.
    // Example of use:  var mensaje = ITC_FNC_Generico.Funcion.fnc_getMessageTranslation(datos, "tNumberOfCopies");
    //==============================================================================
    fnc_getMessageTranslation: function (translations, code) {

        var message = "";

        if (translations != null && translations.length > 0) {

            for (var i = 0; i < translations.length; i++ ) {
                var entidad = translations[i];

                if (entidad !== null && entidad !== undefined) {

                    if (entidad.etel_code === code) {
                        message = entidad.etel_message;
                        break;
                    }

                }

            }


        }

        return message;
    },


    //============================================================================
    // Creador : William Quiroz
    // Creación: 04/06/2018
    // Función : update required fields of crm not required
    // Params  :                
    // Output  : 
    //==============================================================================
    fnc_CampoRequeridos: function () {

        var attributes = Xrm.Page.data.entity.attributes.get();
        for (var i in attributes) {
            var attribute = attributes;

            var requiredLevel = attribute[i].getRequiredLevel();
            var value = "";
            //if (attribute[i].getValue()!=null){value=attribute[i].getValue()};
            var control = attribute[i].getName();
            //var atributos_requerido = ["isdecrementing", "responsiblecontactid"];
            //Nivelrequerido_none(control);    
            Xrm.Page.getAttribute(control).setRequiredLevel("none");
        }

    },

    //============================================================================
    // Creador : William Quiroz
    // Creación: 04/06/2018
    // Función : Clear form fields
    // Params  :                
    // Output  : 
    //==============================================================================
    fnc_Clearfields: function (tabName) {

        var fieldList = new Array();
        var tab = Xrm.Page.ui.tabs.get(tabName);

        tab.sections.forEach(function (section, sectionIndex)
        {
            section.controls.forEach(function (control, controlIndex)
            {
                switch (control.getControlType())
                {
                    case "standard":
                    case "lookup":
                    case "optionset":
                        var attribute = control.getAttribute();

                        if (attribute != null)
                        {
                            fieldList.push(attribute.setValue(null));
                        }
                        break;
                }
            });
        });

        return fieldList;
    },
 
    //============================================================================
    // Creador : William Quiroz
    // Creación: 04/06/2018
    // Función : Disabling all Fields on a Form
    // Params  :                
    // Output  : 
    //==============================================================================
    fnc_disableAllFields: function () {

        Xrm.Page.ui.controls.forEach(function (control, i) {
            if (control && control.getDisabled && !control.getDisabled()) {
                control.setDisabled(true);
            }
        });
    },

    //============================================================================
    // Creador : William Quiroz
    // Creación: 13/06/2018
    // Función : Función
    // Params  : visible = conditional show or hide
    // Output  : 
    //==============================================================================
    fnc_disableSectionDisplayState: function () {

        var tabs = Xrm.Page.ui.tabs.get();
        for (var i in tabs) {
            var tab = tabs[i];    
            tab.setVisible(false);
        }
    }
    
}
