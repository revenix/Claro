using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class networkElementsImpacted
    {
        [DataMember]
        public string networkElementId { get; set; }
        [DataMember]
        public string networkElementType { get; set; }
        [DataMember]
        public string networkElementStatus { get; set; }
    }
}