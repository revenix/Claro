using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruTicketRemedy
{
    public class AmxPeruTicketRemedyRequestDTO
    {
        public string _type { get; set; }
        public Request request { get; set; }
    }

    public class AmxPeruTicketRemedyRequestDTO2
    {
        public string userId { get; set; }
        public string password { get; set; }
        public string ticketId { get; set; }
        public string ticketDesc { get; set; }
        public string reason { get; set; }
        public string ticketState { get; set; }
    }

    public class Request
    {
        public string _type { get; set; }
        public string userId { get; set; }
        public string password { get; set; }
        public string ticketId { get; set; }
        public string ticketDesc { get; set; }
        public string reason { get; set; }
        public string ticketState { get; set; }
    }

}
