var CRM_FORM_TYPE_CREATE = 1;
var CRM_FORM_TYPE_UPDATE = 2;
var CRM_FORM_TYPE_READ = 3;

if (typeof (Ust_LuisAgui) == "undefined") { Ust_LuisAgui = {}; }
var formType = Xrm.Page.ui.getFormType();

Ust_LuisAgui.Funcion = {

    // #region Creator       : Luis Agui (3208)
    /*        
     *        Creation      : 31/07/2018
     *        Requerimiento : 62-03-001  3208.
    */
    
    /* Obtengo y seteo los datos del contacto en la region Contact of delivered device. */
    fn_OnLoadContactField: function () {
        if (formType == CRM_FORM_TYPE_UPDATE) {
            Xrm.Page.getAttribute("ust_ownerdevice").setValue(null);
            Xrm.Page.getAttribute("ust_typedocument").setValue(null);
            Xrm.Page.getAttribute("ust_documentnumber").setValue(null);

            var deviceowner = Xrm.Page.getAttribute("ust_deviceowner").getValue();
            if (deviceowner != null) {
                var objDO = new Array();
                objDO[0] = new Object();
                objDO[0].id = deviceowner[0].id;
                objDO[0].name = deviceowner[0].name;
                objDO[0].entityType = deviceowner[0].entityType;

                var deviceownerdocumenttype = Xrm.Page.getAttribute("ust_deviceownerdocumenttype").getValue();
                var deviceownerdocumentnumber = Xrm.Page.getAttribute("ust_deviceownerdocumentnumber").getValue();

                Xrm.Page.getAttribute("ust_ownerdevice").setValue(objDO);
                Xrm.Page.getAttribute("ust_typedocument").setValue(deviceownerdocumenttype);
                Xrm.Page.getAttribute("ust_documentnumber").setValue(deviceownerdocumentnumber);
            }
        }
    },

    /* Description   : Dependiendo de un flag habilito la busqueda de un contacto. */
    fn_OnChangeDeviceOwnerTakesDevice: function () {
        var flag = Xrm.Page.getAttribute("ust_deviceownertakesdevice").getValue();
        if (flag != null) {
            if (flag) {
                Xrm.Page.getAttribute("ust_contactname").setValue(null);
                Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(null);
                Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(null);

                Xrm.Page.getAttribute("ust_contactname").setRequiredLevel("none");
                Xrm.Page.getControl("ust_contactname").setDisabled(true);

            } else {
                Xrm.Page.getAttribute("ust_contactname").setRequiredLevel("required");
                Xrm.Page.getControl("ust_contactname").setDisabled(false);
                debugger;
                var contact = Xrm.Page.getAttribute("ust_contactnameid").getValue();
                console.log(contact);
                if (contact != null) {
                    var object = new Array();
                    object[0] = new Object();
                    object[0].id = contact[0].id;
                    object[0].name = contact[0].name;
                    object[0].entityType = contact[0].entityType;

                    var type = Xrm.Page.getAttribute("ust_contactdocumenttype").getValue();
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
        if (objContactModel != null) {
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

                if (DocumentType != null) {
                    Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(DocumentType.formattedValue);
                }
                if (dni != null) {
                    Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(dni.value);
                }
            }
        } else {
            Xrm.Page.getAttribute("ust_contactname").setValue(null);
            Xrm.Page.getAttribute("ust_contactdocumenttypedelivery").setValue(null);
            Xrm.Page.getAttribute("ust_contactdocumentnumberdelivery").setValue(null);
        }
        
    }

    // #endregion
    
}