using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using UstWcf.Request;
using UstWcf.Response;

namespace UstWcf
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IService1" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface ICrmService
    {
        [OperationContract]
        CreateActivityLogResponseMessage CreateActivityLog(CreateActivityLogRequestMessage request);

        [OperationContract]
        UpdateNetworkIncidentResponseMessage UpdateNetworkIncident(UpdateNetworkIncidentRequestMessage request);

        [OperationContract]
        ResponseMessage SearchCase(RequestCase request);

        [OperationContract]
        UpdateCaseResponseMessage UpdateCase(UpdateCaseRequestMessage request);

        [OperationContract]
        UpdateOrCloseTaskCaseResponse UpdateStatusTaskRemedy(UpdateOrCloseTaskCaseRequest request);

        [OperationContract]
        bool ProbarConexionCRM();

        // TODO: agregue aquí sus operaciones de servicio
    }


    // Utilice un contrato de datos, como se ilustra en el ejemplo siguiente, para agregar tipos compuestos a las operaciones de servicio.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
