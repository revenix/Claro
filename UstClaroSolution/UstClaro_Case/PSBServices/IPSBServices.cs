using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using UstClaro_Case.DTO.AmxPeruTicketRemedy;
using UstClaro_Case.DTO.AmxPeruAutomatizaDocumento;
using UstClaro_Case.DTO.AmxPeruTransaccionDisputa;
using UstClaro_Case.DTO.AmxPeruImprimirCase;
using UstClaro_Case.DTO.AmxPeruGeneraIncidencia;
using UstClaro_Case.DTO.AmxPeruConsultaDocumentoOnBase;
using UstClaro_Case.DTO.AmxPeruInformEquipmentSaleBillingDoc;

namespace UstClaro_Case.PSBServices
{
    public interface IPSBServices
    {
        AmxPeruInformEquipmentSaleBillingDocResponseDTO InformEquipmentSaleBillingDoc(IOrganizationService _service, AmxPeruInformEquipmentSaleBillingDocRequestDTO requestDTO, string url);

        ConsultaDocumentoOnBaseResponseDTO ConsultaDocumentoOnBase(IOrganizationService _service, ConsultaDocumentoOnBaseRequestDTO requestDTO, string url);

        GeneraIncidenciaResponseDTO GeneraIncidencia(IOrganizationService _service, GeneraIncidenciaRequestDTO requestDTO, string url);

        AmxPeruImprimirCaseResponseDTO ImprimirCase(IOrganizationService _service, AmxPeruImprimirCaseRequestDTO requestDTO, string url);

        AmxPeruAutomatizaDocumentoResponseDTO AutomatizaDocumento(IOrganizationService _service, AmxPeruAutomatizaDocumentoRequestDTO requestDTO, string url);

        AmxPeruTicketRemedyResponseDTO ModificarTicket(IOrganizationService _service, AmxPeruTicketRemedyRequestDTO requestDTO, string url);

        AmxPeruCrearDisputaResponseDTO CrearDisputa(IOrganizationService _service, AmxPeruCrearDisputaRequestDTO request, string url);

    }
}
