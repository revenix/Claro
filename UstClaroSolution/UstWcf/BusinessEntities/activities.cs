using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class activities
    {
        [DataMember]
        public string activityId { get; set; }
        [DataMember]
        public string activityName { get; set; }
        [DataMember]
        public string activityDescription { get; set; }
        [DataMember]
        public string Status { get; set; }
    }
}



