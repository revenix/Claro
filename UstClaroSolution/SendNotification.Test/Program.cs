using SendNotification.Test.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace SendNotification.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            Test();
        }
        private static void Test()
        {
            var request = new SendNotificationRequestMessage()
            {
                TIPO_NOTIFICACION = "Abajo posibles valores",
                //SendNotificationRequestMessage.TiposNotificacionesCORREO
                //SendNotificationRequestMessage.TiposNotificacionesIVR
                //SendNotificationRequestMessage.TiposNotificacionesSMS
                //SendNotificationRequestMessage.TiposNotificacionesUSSD
                ASUNTO = "Asunto del email",
                IDENTIFICADOR_ENVIO = "Abajo posibles valores",
                //SendNotificationRequestMessage.IdentificadoresEnvioCampañaPrepago
                //SendNotificationRequestMessage.IdentificadoresEnvioNotificacionCobranza
                //SendNotificationRequestMessage.IdentificadoresEnvioSMSOACCorporativo,
                //SendNotificationRequestMessage.IdentificadoresEnvioSMSOACMasivo

                MSISDN = "Numero Telefono",
                REMITENTE = "Direccion email emisor",
                DESTINATARIO = "Direccion email destinatario",
                MENSAJE = "Cuerpo del mensaje",
                FLAG_HTML = "Abajo posibles valores",
                //SendNotificationRequestMessage.FlagHtmlEsHtml
                //SendNotificationRequestMessage.FlagHtmlNoEsHtml
                ID_PLANTILLA = "ID Plantilla",
                ID_ACCION = "ID Acction",
                FEC_NOTIFICACION = "Fecha de envio en formato dd/MM/yyyy",
                AdditionalFieldsType = new List<KeyValuePair<string,string>>()
                {
                    new KeyValuePair<string, string>("campo", "valor"),
                }
            };

            //AutoNumberCasePortClient client = new AutoNumberCasePortClient("AutoNumberCasePort");

            BasicHttpBinding myBinding = new BasicHttpBinding("sendNotification");
            //myBinding.CloseTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.OpenTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.ReceiveTimeout = new TimeSpan(0, 0, 10, 0, 0);
            //myBinding.SendTimeout = new TimeSpan(0, 0, 1, 0, 0);
            //myBinding.BypassProxyOnLocal = false;
            //myBinding.MaxBufferPoolSize = 524288;
            //myBinding.MaxReceivedMessageSize = 65536;
            //myBinding.UseDefaultWebProxy = true;
            //myBinding.AllowCookies = false;
            //We need the IP address
            //EndpointIdentity endpointIdentity = EndpointIdentity.CreateUpnIdentity("usuario");
            EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://localhost:9991/esb/common/conAutoNumberCase/v2/?wsdl"));//I have to change this.

            using (SendNotificationPortChannel proxy = new ChannelFactory<AutoNumberCasePortChannel>(myBinding, myEndpoint).CreateChannel())
            {
                AutoNumberCaseResponse response = proxy.AutoNumberCase(request);
                var codigo = response.OutputParameters.O_ID_CASE;
            }

        }
    }
}
