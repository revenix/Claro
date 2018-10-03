using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruInformEquipmentSaleBillingDoc
{
    public class AmxPeruInformEquipmentSaleBillingDocResponseDTO
    {
        public object CurrentBookmark { get; set; }
        public Output Output { get; set; }
        public bool CanRollback { get; set; }
        public DateTime RunDate { get; set; }
        public string InstanceId { get; set; }
        public string WorkflowName { get; set; }
        public string WorkflowVersion { get; set; }
        public int Status { get; set; }
    }

    public class Response
    {
        public string InquiryResponseId { get; set; }
        public int Status { get; set; }
        public string CodeResponse { get; set; }
        public string DescriptionResponse { get; set; }
        public string ErrorLocation { get; set; }
    }

    public class Output
    {
        public Response response { get; set; }
    }

    
}
