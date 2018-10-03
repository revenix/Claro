using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UstClaro_Case.DTO.AmxPeruImprimirCase
{
    public class AmxPeruImprimirCaseRequestDTO
    {
        public Request request { get; set; }
    }

    public class Value
    {
        public string _type { get; set; }
        public string DocumentIDTCRM { get; set; }
        public string Nombre { get; set; }
        public string FlagFirmaDigital { get; set; }
    }

    public class ListadoDocumentos
    {
        public string _type { get; set; }
        public List<Value> _values { get; set; }
    }

    public class Huella
    {
        public string _type { get; set; }
        public string IdHuella { get; set; }
        public string HuellaImagen { get; set; }
        public string HuellaMinucia { get; set; }
    }

    public class PowerOfAttorneyContact
    {
        public string _type { get; set; }
        public string FirstName { get; set; }
        public string FirstLastName { get; set; }
        public string SecondLastName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string MainPhone { get; set; }
        public string EMail { get; set; }
    }

    public class PrincipalAddress
    {
        public string _type { get; set; }
        public string AddressId { get; set; }
        public string AddressType { get; set; }
        public string CityName { get; set; }
        public string DepartmentName { get; set; }
        public string DistrictName { get; set; }
        public string ProvinceName { get; set; }
        public string StandardAddress { get; set; }
    }

    public class IndividualContact
    {
        public string _type { get; set; }
        public string CustomerId { get; set; }
        public string ContactId { get; set; }
        public string FirstName { get; set; }
        public string FirstLastName { get; set; }
        public string SecondLastName { get; set; }
        public PrincipalAddress PrincipalAddress { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string MainPhone { get; set; }
        public string EMail { get; set; }
    }

    public class CurrentCorporateContact
    {
        public string _type { get; set; }
        public string FirstName { get; set; }
        public string FirstLastName { get; set; }
        public string SecondLastName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string MainPhone { get; set; }
        public string EMail { get; set; }
        public string ConnectionName { get; set; }
    }

    public class PrincipalLegalRepresentative
    {
        public string _type { get; set; }
        public string FirstName { get; set; }
        public string FirstLastName { get; set; }
        public string SecondLastName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string MainPhone { get; set; }
        public string EMail { get; set; }
    }

    public class PrincipalAddress2
    {
        public string _type { get; set; }
        public string AddressId { get; set; }
        public string AddressType { get; set; }
        public string CityName { get; set; }
        public string DepartmentName { get; set; }
        public string DistrictName { get; set; }
        public string ProvinceName { get; set; }
        public string StandardAddress { get; set; }
    }

    public class CorporateAccount
    {
        public string _type { get; set; }
        public CurrentCorporateContact CurrentCorporateContact { get; set; }
        public PrincipalLegalRepresentative PrincipalLegalRepresentative { get; set; }
        public string AccountId { get; set; }
        public string CustomerId { get; set; }
        public string CompayName { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public string MainPhone { get; set; }
        public PrincipalAddress2 PrincipalAddress { get; set; }
        public string EMail { get; set; }
        public string CustomerSegmentation { get; set; }
    }

    public class SalesOrganization
    {
        public string _type { get; set; }
        public string SalesOrganizationId { get; set; }
        public string SalesOrganizationAddress { get; set; }
        public string SalesOrganizationName { get; set; }
        public string SalesOrganizationZoneName { get; set; }
        public string SalesOrganizationChannelName { get; set; }
    }

    public class TCRMUser
    {
        public string _type { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string FirstLastName { get; set; }
        public string SecondLastName { get; set; }
        public string EMail { get; set; }
        public string Phone { get; set; }
        public string PositionName { get; set; }
    }

    public class Value2
    {
        public string _type { get; set; }
        public string AttachedDocumentName { get; set; }
    }

    public class AttachedDocumentsDTO
    {
        public string _type { get; set; }
        public List<Value2> _values { get; set; }
    }

    public class Value3
    {
        public string _type { get; set; }
        public string FinancialDocumentNumber { get; set; }
        public string FinancialDocumentEmissionDate { get; set; }
        public string FinancialDocumentDueDate { get; set; }
    }

    public class FinancialDocumentsDTO
    {
        public string _type { get; set; }
        public List<Value3> _values { get; set; }
    }

    public class Case
    {
        public string _type { get; set; }
        public string CaseId { get; set; }
        public string ParentCaseId { get; set; }
        public DateTime CaseCreationDate { get; set; }
        public string PowerOfAttorneyFlag { get; set; }
        public PowerOfAttorneyContact PowerOfAttorneyContact { get; set; }
        public string CaseType { get; set; }
        public string Category1 { get; set; }
        public string Category2 { get; set; }
        public string Category3 { get; set; }
        public string Category4 { get; set; }
        public string Category5 { get; set; }
        public IndividualContact IndividualContact { get; set; }
        public CorporateAccount CorporateAccount { get; set; }
        public SalesOrganization SalesOrganization { get; set; }
        public TCRMUser TCRMUser { get; set; }
        public string NotificationEmail { get; set; }
        public string SubscriptionCode { get; set; }
        public string RelatedDirectoryNumber { get; set; }
        public string ResolutionCode { get; set; }
        public string ResolutionDate { get; set; }
        public string NotificationDate { get; set; }
        public string AppealDescription { get; set; }
        public AttachedDocumentsDTO AttachedDocumentsDTO { get; set; }
        public FinancialDocumentsDTO FinancialDocumentsDTO { get; set; }
        public string BilledConcept { get; set; }
        public string ProductOrServiceName { get; set; }
        public string ClaimedAmount { get; set; }
        public string ReferencePhoneNumber { get; set; }
        public string ClaimDescription { get; set; }
        public string CustomerPetition { get; set; }
        public string OsiptelComplaintId { get; set; }
        public string IndecopiComplaintId { get; set; }
        public string OsiptelGrievanceId { get; set; }
        public string ResponseText { get; set; }
        public string BossName { get; set; }
        public string SarOffer { get; set; }
        public string SarAnswer { get; set; }
        public string SarId { get; set; }
        public string TypeOfCopyRequested { get; set; }
    }

    public class Request
    {
        public string _type { get; set; }
        public ListadoDocumentos ListadoDocumentos { get; set; }
        public Huella Huella { get; set; }
        public Case Case { get; set; }
    }

    
}
