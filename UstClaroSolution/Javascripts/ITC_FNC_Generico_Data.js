// =================================================
// Creador      : Sergio Atencio
// Creación     : 26/09/2013
// Entidad      : Para todas, funcion general de datos
// Estado       : Proceso
// =================================================


// Variables públicas que definen temas de configuración para la conexión con Dynamics CRM 2011.
var oContext = Xrm.Page.context;  
var oUniqueName = oContext.getOrgUniqueName();
//var oServerUrl = location.protocol + "//" + window.location.host + "/" + oUniqueName
var oServerUrl = oContext.getClientUrl();

var oDataEndpointUrl = oServerUrl + "/XRMServices/2011/OrganizationData.svc/"; 



if (typeof (ITC_FNC_Generico_Data) == "undefined")
{ ITC_FNC_Generico_Data = {}; }

ITC_FNC_Generico_Data.Funcion = {

	
	//============================================================================
	// Creador : Sergio Atencio
    // Creación: 26/09/2013
    // Función : Procedimiento para consultar registros a Dynamics CRM 2011.
	// Params  : consulta =
	// Output  : 
	//==============================================================================
	fnc_consulta_record: function(consulta,callback){
		
		this.fnc_ejecutarConsulta(consulta,callback);
		
	},

	//============================================================================
	// Creador : Sergio Atencio
    // Creación: 26/09/2013
    // Función : Procedimiento para ejecutar la consulta
	// Params  : consulta = 
	//			 callback = 
	// Output  : 
	//==============================================================================
	fnc_ejecutarConsulta: function(consulta,callback){
	
		   $.ajax({ type: "GET",  
            contentType: "application/json; charset=utf-8",  
            datatype: "json",
            async: false,
            url: oDataEndpointUrl + consulta,  
            beforeSend: function (XMLHttpRequest) {  
                //Specifying this header ensures that the results will be returned as JSON.  
                XMLHttpRequest.setRequestHeader("Accept", "application/json");  
            },  
            success: function (data, textStatus, XmlHttpRequest) { 
                //callback(data.d.results) 
				callback(data) 
            },  
            error: function (XMLHttpRequest, textStatus, errorThrown) {  
                /*alert("failure");  
				alert(XMLHttpRequest.status);  
				alert(XMLHttpRequest.responseText);  
				alert(textStatus); */
                alert(errorThrown); 
            }  
        });  
  
	},
	
    //============================================================================
	// Creador : Sergio Atencio
    // Creación: 25/10/2013
    // Función : Verifica si el usuario tiene un rol especifico (No borrar, es llamado desde un boton del ribbon)
	// Params  : roleName nombre del rol a evaluar
	// Output  : Boolean
    //==============================================================================
	UserHasRole: function(roleName) {
 
		var objcontext = Xrm.Page.context; 
        var strorgName =  objcontext.getOrgUniqueName();
		var strserverUrl =  location.protocol + "//" + window.location.host + "/" + strorgName;
		
		var oDataEndpointUrl = strserverUrl + "/XRMServices/2011/OrganizationData.svc/";
		oDataEndpointUrl += "RoleSet?$top=1&$filter=Name eq '" + roleName + "'";
		var service = this.GetRequestObject();
		
	
		if (service != null) {
			
			service.open("GET", oDataEndpointUrl, false);
			service.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
			service.setRequestHeader("Accept", "application/json, text/javascript");
			service.send(null);
			var requestResults = eval('(' + service.responseText + ')').d;
			if (requestResults != null && requestResults.results.length == 1) {
				var role = requestResults.results[0]; 
				var id = role.RoleId;
				var currentUserRoles = Xrm.Page.context.getUserRoles();
				for (var i = 0; i < currentUserRoles.length; i++) {
					var userRole = currentUserRoles[i];
					if (this.GuidsAreEqual(userRole, id)) {
						return true;
					}
				}
			}
		}
	 
		return false;
		
	},
	
    //============================================================================
	// Creador : Sergio Atencio
    // Creación: 25/10/2013
    // Función : Retorna objeto de envio de peticion. (Uso Interno)
	// Params  : 
	// Output  : 
    //==============================================================================
	GetRequestObject: function () {
		if (window.XMLHttpRequest) {
			return new window.XMLHttpRequest;
		}
		else {
			try {
				return new ActiveXObject("MSXML2.XMLHTTP.3.0");
			}
			catch (ex) {
				return null;
			}
		}
	},

    
    //============================================================================
	// Creador : Sergio Atencio
    // Creación: 25/10/2013
    // Función : Compara dos Guids, (Uso Interno)
	// Params  : guid1= Guid a comparar 1
    //           guid2= Guid a comparar 2
    //==============================================================================
	GuidsAreEqual:function(guid1, guid2) {
		var isEqual = false;
		if (guid1 == null || guid2 == null) {
			isEqual = false;
		}
		else {
			isEqual = guid1.replace(/[{}]/g, "").toLowerCase() == guid2.replace(/[{}]/g, "").toLowerCase();
		}
 
		return isEqual;
	},





	fnc_updateRecord: function (id, entityObject, odataSetName) {

        var jsonEntity = window.JSON.stringify(entityObject);
        var serverUrl = Xrm.Page.context.getServerUrl();

        //The OData end-point

        var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";

        $.ajax({

            type: "POST",

            contentType: "application/json; charset=utf-8",

        datatype: "json",
        async: false,
        data: jsonEntity,

        url: serverUrl + ODATA_ENDPOINT + "/" + odataSetName + "(guid'" + id + "')",


        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
            //Specify the HTTP method MERGE to update just the changes you are submitting.
            XMLHttpRequest.setRequestHeader("X-HTTP-Method", "MERGE");
        },

            success: function (data, textStatus, XmlHttpRequest) {
                
            },

            error: function (XmlHttpRequest, textStatus, errorThrown) {
                if (XmlHttpRequest && XmlHttpRequest.responseText) {
                    alert("Error mientras se intentaba actualizar " + odataSetName+ " ; Error – " + XmlHttpRequest.responseText);
                }

           }

            });

    }

	
}
	