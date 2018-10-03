using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using UstWcf.Data;
using UstWcf.Response;
using UstWcf.Request;
using Microsoft.Xrm.Sdk;


namespace UstWcf
{


    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Service1" en el código, en svc y en el archivo de configuración.
    // NOTE: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Service1.svc o Service1.svc.cs en el Explorador de soluciones e inicie la depuración.
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class CrmService : ICrmService
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public UpdateNetworkIncidentResponseMessage UpdateNetworkIncident(UpdateNetworkIncidentRequestMessage request)
        {
            var response = new UpdateNetworkIncidentResponseMessage();
            response.successFlag = 1;

            return response;
        }

        public CreateActivityLogResponseMessage CreateActivityLog(CreateActivityLogRequestMessage request)
        {
            var response = new CreateActivityLogResponseMessage();
            response.status = 0;

            return response;
        }

        public ResponseMessage SearchCase(RequestCase request)
        {
            ResponseMessage response = null;
            try
            {
                BL.BLsearchCase obj = new BL.BLsearchCase();

                response = obj.SearchCase(request.request);

                //var daservice = new Data.DAsearchCase();
                //daservice.SearchCase("");

                //return new ResponseMessage()
                //{
                //    SuccessFlag = 0,
                //    Error = "No hubo error"
                //};

            }
            catch
            {
                //Log evento de errores
                response = null;
            }
            return response;
        }

        public UpdateCaseResponseMessage UpdateCase(UpdateCaseRequestMessage request)
        {
            //var response = new UpdateCaseResponseMessage();
            //response.successflag = 5;

            //return response;


            UpdateCaseResponseMessage response = null;
            try
            {

                BL.BLUpdateCase obj = new BL.BLUpdateCase();
                response = obj.UpdateCase(request);

            }
            catch
            {
                //Log evento de errores
                response = null;
            }
            return response;



        }

        

        

        ///  /// <summary>
        /// Creador : William Quiroz  
        /// Actualización: 11/07/2018
        /// Función : 
        /// Evento  : 
        /// Req.    : AMXPEASIS-3167
        /// Entidad : case
        /// </summary>
        public UpdateOrCloseTaskCaseResponse UpdateStatusTaskRemedy(UpdateOrCloseTaskCaseRequest request)
        {
            UpdateOrCloseTaskCaseResponse response = null;
            int resultado = 0;
            string estadosolicitud = string.Empty;

            try
            {
                //if (request.caseId != null && request.taskId != null && request.caseNumber != null && request.State != null)
                if (request.caseId != null)
                {

                    resultado = Case.Instancia.BuscarCaseExistente(request);
                    if (resultado == 2)
                    {
                        estadosolicitud = "1";

                        response = new UpdateOrCloseTaskCaseResponse()
                        {
                            estSol = estadosolicitud,
                            codSol = "", 
                            msgErr = "Actualizado correctamente."
                        };
                    }
                    else if (resultado == 1)
                    {
                        response = new UpdateOrCloseTaskCaseResponse()
                        {
                            estSol = "",
                            codSol = "3", //La tarea ya se encuentra cerrada
                            msgErr = "La tarea ya se encuentra cerrada."
                        };
                    }
                    else {

                        estadosolicitud = "2";

                        response = new UpdateOrCloseTaskCaseResponse()
                        {
                            estSol = estadosolicitud,
                            codSol = "1", 
                            msgErr = "Error en el servicio de CRM."
                        };
                    }
                }
                else if (request.caseId == null)
                {                   

                    response = new UpdateOrCloseTaskCaseResponse()
                    {
                        estSol = "", 
                        codSol = "5", 
                        msgErr = "El id del caso es obligatorio."
                    };
                }
                else if (request.taskId != null)
                {                 
                    response = new UpdateOrCloseTaskCaseResponse()
                    {
                        estSol = "", 
                        codSol = "4",
                        msgErr = "El id de la tarea es obligatorio."
                    };
                }
            }
            catch (Exception ex)
            {
                Global.AuditoriaUT.GenerarLogError("Task", "Error en el Servicio", ex.Message, Global.AuditoriaUT.TipoExtension.Txt);
                response.msgErr = ex.InnerException.ToString();
            }

            return response;
        }

        public bool ProbarConexionCRM()
        {
            Microsoft.Xrm.Sdk.Client.OrganizationServiceProxy _serviceProxy;
            Microsoft.Xrm.Sdk.IOrganizationService _service;
            Microsoft.Crm.Sdk.Samples.ServerConnection.Configuration serverConfig;

            try
            {
                Microsoft.Crm.Sdk.Samples.ServerConnection serverConnect = new Microsoft.Crm.Sdk.Samples.ServerConnection();
                serverConfig = serverConnect.GetServerConfiguration();

                // Connect to the CRM web service using a connection string.
                using (_serviceProxy = new Microsoft.Xrm.Sdk.Client.OrganizationServiceProxy(serverConfig.OrganizationUri, serverConfig.HomeRealmUri, serverConfig.Credentials, serverConfig.DeviceCredentials))
                {
                    _service = (Microsoft.Xrm.Sdk.IOrganizationService)_serviceProxy;
                    return true;
                }
            }
            // Catch any service fault exceptions that Microsoft Dynamics CRM throws.
            catch (FaultException<Microsoft.Xrm.Sdk.OrganizationServiceFault>)
            {
                // You can handle an exception here or pass it back to the calling method.
                throw;
            }
            catch (Exception)
            {
                return false;
            }

        }

    }


}
