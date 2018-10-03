using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruTransaccionDisputa
{
    public class AmxPeruCrearDisputaRequestDTO
    {
        public Request request { get; set; }
    }

    public class Request
    {
        public string _type { get; set; }
        public string CustomerID { get; set; }
        public string ProblemID { get; set; }
        public string PartyAccountID { get; set; }
        public string BillingAmountUnit { get; set; }
        public string BillingAmount { get; set; }
        public string ServiceSpecTypeName { get; set; }
        public string EntitySpecType { get; set; }
        public string EntitySpecID { get; set; }
        public string IntStartDate { get; set; }
        public string Description { get; set; }
        public string BusinessIntTypeName { get; set; }
        public string ReasonCode { get; set; }
        public string Reson { get; set; }
    }

   
}
