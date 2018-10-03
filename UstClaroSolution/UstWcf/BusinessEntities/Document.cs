using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class Document
    {
        [DataMember]
        public string documentId { get; set; }

        [DataMember]
        public string documentCode { get; set; }

        [DataMember]
        public string documentURLFtp { get; set; }

        [DataMember]
        public string fileName { get; set; }

        [DataMember]
        public string fileExtension { get; set; }

        [DataMember]
        public string documentIdOnbase { get; set; }
        
    }
}