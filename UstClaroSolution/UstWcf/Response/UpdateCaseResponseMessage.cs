using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using UstWcf.BusinessEntities;

namespace UstWcf.Response
{
    [DataContract]
    public class UpdateCaseResponseMessage
    {

        [DataMember]
        public int successFlag { get; set; }
        [DataMember]
        public string caseId { get; set; }

        [DataMember]
        public string errorMessage { get; set; }
    }
}