using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using UstClaro_Case._DTO;

namespace UstClaro_Case.PSBServices
{
    public interface IPSBServices
    {
        AmxPeruTransaccionDisputaDTO CrearDisputa_INT_CHQ_2_010(IOrganizationService _service, string request, string url, string amxperuname);
    }
}
