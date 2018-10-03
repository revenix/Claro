using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using UstClaro_Case._DTO;
using UstClaro_Case.Utilities;

namespace UstClaro_Case.PSBServices
{
    public class PSBServices : IPSBServices
    {
        AmxPeruTransaccionDisputaDTO IPSBServices.CrearDisputa_INT_CHQ_2_010(IOrganizationService _service, string request, string url, string amxperuname)
        {
            var str = @"{
                                            ""msisdnWriteRequestModel"": {
                                            ""$type"": ""AmxPeruPSBActivities.Activities.MSISDN.msisdnWriteRequestModel , AmxPeruPSBActivities"",
                                            ""IsLock"": false,
                                            ""MsisdnSdpId"": ""0"",";
            str += "\"MsisdnNumber\": " + "\"" + "" + "\"" + ",";
            str += "\"OrderResourceGuid\": " + "\"" + "" + "\"" + "}" +
                   "}";

            AmxPeruTransaccionDisputaDTO response = new AmxPeruTransaccionDisputaDTO();

            //TO DO: INICIO HARDCODE. hardcodeamos el request, url y amxperuname para fines de prueba. Debe ser BORRADO.
            var _ProblemID = "39271465"; //TO DO:
            var _PartyAccountID = "39275295"; //TO DO:
            var _BillingAmountUnit = "604"; //TO DO:
            var _BillingAmount = "100.89"; //TO DO:
            var _ServiceSpecTypeName = "MOVIL"; //TO DO:
            var _EntitySpecType = "REC"; //TO DO:
            var _EntitySpecID = "TRX-08021_002"; //TO DO:
            var _IntStartDate = "2016-01-15"; //TO DO:
            var _Description = "Reclamos"; //TO DO:
            var _BusinessIntTypeName = "I"; //TO DO:
            var _ReasonCode = "12"; //TO DO:

            amxperuname = "AmxPeruTransaccionDisputas";
            url = "http://localhost:6004/api/v1/workflow/AmxPeruTransaccionDisputas";
            request = @"{
                            ""disputaWriteRequestModel"":{
                            ""$type"":""AmxPeruPSBActivities.Activities.External.AmxPeruCrearDisputaRequestDTO, AmxPeruPSBActivities"",
                            ""CustomerID"":"""",";

            request += "\"ProblemID\": " + "\"" + _ProblemID + "\"" + ",";
            request += "\"PartyAccountID\":" + "\"" + _PartyAccountID + "\"" + ",";
            request += "\"BillingAmountUnit\":" + "\"" + _BillingAmountUnit + "\"" + ",";
            request += "\"BillingAmount\":" + "\"" + _BillingAmount + "\"" + ",";
            request += "\"ServiceSpecTypeName\":" + "\"" + _ServiceSpecTypeName + "\"" + ",";
            request += "\"EntitySpecType\":" + "\"" + _EntitySpecType + "\"" + ",";
            request += "\"EntitySpecID\":" + "\"" + _EntitySpecID + "\"" + ",";
            request += "\"IntStartDate\":" + "\"" + _IntStartDate + "\"" + ",";
            request += "\"Description\":" + "\"" + _Description + "\"" + ",";
            request += "\"BusinessIntTypeName\":" + "\"" + _BusinessIntTypeName + "\"" + ",";
            request += "\"ReasonCode\":" + "\"" + _ReasonCode + "\"" + ",";
            request += "\"Reson\":" + "\"" + "" + "\"" + "}" + "}";


            //TO DO:FIN HARDCODE. hardcodeamos el request, url y amxperuname para fines de prueba. Debe ser BORRADO.
            Util util = new Util();
            try
            {
                response = Newtonsoft.Json.JsonConvert.DeserializeObject<AmxPeruTransaccionDisputaDTO>(util.SendRestRequest(_service, request, url, amxperuname));

                return response;
            }
            catch (Exception)
            {
                //TO DO:Manejo de excepciones o logging.
                throw;
            }


        }

    }
}
