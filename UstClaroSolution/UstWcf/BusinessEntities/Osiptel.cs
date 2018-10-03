using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class Osiptel
    {
        [DataMember]
        public string caseId { get; set; }

        //[DataMember]
        //public string result { get; set; }

        [DataMember]
        public bool powerOfAttorneyFlag { get; set; }

        [DataMember]
        public string caseCreatorName { get; set; }

        [DataMember]
        public string caseCreatorLastName { get; set; }

        [DataMember]
        public string caseCreatorDocumentType { get; set; }

        [DataMember]
        public string caseCreatorDocumentNumber { get; set; }

        [DataMember]
        public string caseCreatorRole { get; set; }
    }
}