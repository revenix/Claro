using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruGeneraIncidencia
{

    public class GeneraIncidenciaRequestDTO
    {
        public Request request { get; set; }
    }

    public class Request
    {
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Urgency { get; set; }
        public string ServiceCI { get; set; }
        public string Impact { get; set; }
        public string Action { get; set; }
        public string Description { get; set; }
        public string CategorizationTier1 { get; set; }
        public string CategorizationTier2 { get; set; }
        public string CategorizationTier3 { get; set; }
        public string RecordType { get; set; }
        public string RecordID { get; set; }
    }

}
