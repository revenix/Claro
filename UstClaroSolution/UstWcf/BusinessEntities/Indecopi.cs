using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class Indecopi
    {
        [DataMember]
        public string caseId { get; set; }

        [DataMember]
        public bool ofAgeFlag { get; set; }

        [DataMember]
        public string parentName { get; set; }
    }
}