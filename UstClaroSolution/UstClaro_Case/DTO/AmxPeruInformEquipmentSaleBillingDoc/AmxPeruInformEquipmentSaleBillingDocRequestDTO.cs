using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruInformEquipmentSaleBillingDoc
{
    public class AmxPeruInformEquipmentSaleBillingDocRequestDTO
    {
        public Request request { get; set; }
    }

    public class Request
    {
        public string _type { get; set; }
        public string PartyOrderId { get; set; }
        public string CustomerName { get; set; }
        public string TelephoneNumber { get; set; }
        public string CustomerId { get; set; }
        public string FullAddress { get; set; }
        public string AbsoluteLocalLocationX { get; set; }
        public string AbsoluteLocalLocationY { get; set; }
        public string PlaceId { get; set; }
        public string BusinessInteractionTypeName { get; set; }
        public string BusinessInteractionTypeName2 { get; set; }
        public string StartDateTime { get; set; }
        public string ScheduleHoursRange { get; set; }
        public string ProductSpecName { get; set; }
        public string ProductSpecDesc { get; set; }
        public int BaseDurationAmount { get; set; }
        public int QuantityAmount { get; set; }
        public int AppliedAmount { get; set; }
    }
}
