using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruAutomatizaDocumento
{
    public class AmxPeruAutomatizaDocumentoResponseDTO
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

    public class GeneralDocList
    {
        public string docName { get; set; }
        public string attrName { get; set; }
        public string attrVal { get; set; }
    }

    public class SpecificDocList
    {
        public string docName { get; set; }
        public string attrName { get; set; }
        public string attrVal { get; set; }
    }

    public class Response
    {
        public string partyOrderId { get; set; }
        public List<GeneralDocList> generalDocList { get; set; }
        public List<SpecificDocList> specificDocList { get; set; }
        public int Status { get; set; }
        public string CodeResponse { get; set; }
        public string DescriptionResponse { get; set; }
        public object ErrorLocation { get; set; }
    }

    public class Output
    {
        public Response response { get; set; }
    }
    
}
