using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace UstWcf.BusinessEntities
{
    [DataContract]
    public class Input
    {
        [DataContract]
        public class AmxperuSendNotificationRequest 
        {
            [DataMember]
            public string TemplateID { get; set; }

            [DataMember]
            public string BodyMail { get; set; }

            [DataMember]
            public string Description { get; set; }

            [DataMember]
            public string DispatchID { get; set; }

            [DataMember]
            public string ExternalIDs { get; set; }

            [DataMember]
            public string InteractionDate { get; set; }

            [DataMember]
            public string MailSender { get; set; }

            [DataMember]
            public string regardingentityId { get; set; }

            [DataMember]
            public string MailRecipient { get; set; }

            [DataMember]
            public string regardingentityname { get; set; }

            [DataMember]
            public string SubjectMail { get; set; }

            [DataMember]
            public string Text01 { get; set; }

            [DataMember]
            public string Text02 { get; set; }

            [DataMember]
            public string Text03 { get; set; }

            [DataMember]
            public List<KeyValuePair> AttributeValuePair { get; set; }

            [DataMember]
            public List<Documents> Documentslist { get; set; }

        }

        [DataContract]
        public class KeyValuePair
        {
            [DataMember]
            public string nameField { get; set; }
            [DataMember]
            public string valueField { get; set; }
        }

        [DataContract]
        public class Documents
        {
            [DataMember]
            public string Description { get; set; }
            [DataMember]
            public string DocumentName { get; set; }

            [DataMember]
            public byte[] OutputFile { get; set; }
        }

    }
}