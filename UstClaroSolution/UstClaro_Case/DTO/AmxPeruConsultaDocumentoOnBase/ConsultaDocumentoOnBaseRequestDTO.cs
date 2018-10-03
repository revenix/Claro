using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruConsultaDocumentoOnBase
{
    public class ConsultaDocumentoOnBaseRequestDTO
    {
        public Request request { get; set; }
    }
    public class Request
    {
        public string documentId { get; set; }
    }
}
