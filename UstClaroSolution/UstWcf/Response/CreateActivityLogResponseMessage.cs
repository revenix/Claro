using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.Response
{
    [DataContract]
    public class CreateActivityLogResponseMessage
    {
        [DataMember]
        public int status { get; set; }
        [DataMember]
        public string codeResponse { get; set; }

        [DataMember]
        public string descriptionResponse { get; set; }

        [DataMember]
        public DateTime date { get; set; }

    }
}


