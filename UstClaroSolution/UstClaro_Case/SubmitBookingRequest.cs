
namespace AmxPeruPSBActivities.Activities.BiAdjustment.BscsBookingRequestWrite
{
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7", ConfigurationName = "BookingRequestWriteService")]
    public interface BookingRequestWriteService
    {

        // CODEGEN: Generating message contract since the operation bookingRequestWrite is neither RPC nor document wrapped.
        [System.ServiceModel.OperationContractAttribute(Action = "", ReplyAction = "*")]
        [System.ServiceModel.XmlSerializerFormatAttribute()]
        bookingRequestWriteResponse1 bookingRequestWrite(bookingRequestWriteRequest1 request);

        [System.ServiceModel.OperationContractAttribute(Action = "", ReplyAction = "*")]
        System.Threading.Tasks.Task<bookingRequestWriteResponse1> bookingRequestWriteAsync(bookingRequestWriteRequest1 request);
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/bookingrequestwrite")]
    public partial class bookingRequestWriteRequest
    {

        private inputAttributes inputAttributesField;

        private sessionChangeRequest sessionChangeRequestField;

        /// <remarks/>
        public inputAttributes inputAttributes
        {
            get
            {
                return this.inputAttributesField;
            }
            set
            {
                this.inputAttributesField = value;
            }
        }

        /// <remarks/>
        public sessionChangeRequest sessionChangeRequest
        {
            get
            {
                return this.sessionChangeRequestField;
            }
            set
            {
                this.sessionChangeRequestField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/bookingrequestwrite")]
    public partial class inputAttributes
    {

        private string actionCodeField;

        private string feeClassField;

        private long rpcodeField;

        private bool rpcodeFieldSpecified;

        private string rpcodePubField;

        private long spcodeField;

        private bool spcodeFieldSpecified;

        private string spcodePubField;

        private long sncodeField;

        private bool sncodeFieldSpecified;

        private string sncodePubField;

        private long rpVscodeField;

        private bool rpVscodeFieldSpecified;

        private long eventCodeField;

        private bool eventCodeFieldSpecified;

        private money amountField;

        private double amountRelField;

        private bool amountRelFieldSpecified;

        private string numPeriodsField;

        private System.DateTime periodEndDateField;

        private bool periodEndDateFieldSpecified;

        private bool firstPeriodProrateField;

        private bool firstPeriodProrateFieldSpecified;

        private System.DateTime validFromField;

        private bool validFromFieldSpecified;

        private string glcodeField;

        private string remarkField;

        private long seqnoField;

        private bool seqnoFieldSpecified;

        private string feeTypeField;

        private string billFormatField;

        private long jobcostField;

        private bool jobcostFieldSpecified;

        private string jobcostPubField;

        private long jobcostdiscField;

        private bool jobcostdiscFieldSpecified;

        private string jobcostdiscPubField;

        private long jobcostminField;

        private bool jobcostminFieldSpecified;

        private string jobcostminPubField;

        private string glcodediscField;

        private string glcodeminField;

        private long ivIdField;

        private bool ivIdFieldSpecified;

        private string servcatCodeField;

        private string servCodeField;

        private string servTypeField;

        private string fuPackIdField;

        private string fuPackIdPubField;

        private string fuVerField;

        private string fuPkverField;

        private string fuPkelsqField;

        private double fuNumField;

        private bool fuNumFieldSpecified;

        private long recordIdField;

        private bool recordIdFieldSpecified;

        private string recordSubIdField;

        private string rerateSeqnoField;

        private long recordSummaryIdField;

        private bool recordSummaryIdFieldSpecified;

        private string basePartIdField;

        private string chargePartIdField;

        private string dirnumField;

        private string devicenumField;

        private System.DateTime callDateField;

        private bool callDateFieldSpecified;

        private string billingAccountCodeField;

        private long billingAccountIdField;

        private bool billingAccountIdFieldSpecified;

        private long csIdField;

        private bool csIdFieldSpecified;

        private string csIdPubField;

        private long coIdField;

        private bool coIdFieldSpecified;

        private string coIdPubField;

        private long payerCustomerIdField;

        private bool payerCustomerIdFieldSpecified;

        /// <remarks/>
        public string actionCode
        {
            get
            {
                return this.actionCodeField;
            }
            set
            {
                this.actionCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string feeClass
        {
            get
            {
                return this.feeClassField;
            }
            set
            {
                this.feeClassField = value;
            }
        }

        /// <remarks/>
        public long rpcode
        {
            get
            {
                return this.rpcodeField;
            }
            set
            {
                this.rpcodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool rpcodeSpecified
        {
            get
            {
                return this.rpcodeFieldSpecified;
            }
            set
            {
                this.rpcodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string rpcodePub
        {
            get
            {
                return this.rpcodePubField;
            }
            set
            {
                this.rpcodePubField = value;
            }
        }

        /// <remarks/>
        public long spcode
        {
            get
            {
                return this.spcodeField;
            }
            set
            {
                this.spcodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool spcodeSpecified
        {
            get
            {
                return this.spcodeFieldSpecified;
            }
            set
            {
                this.spcodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string spcodePub
        {
            get
            {
                return this.spcodePubField;
            }
            set
            {
                this.spcodePubField = value;
            }
        }

        /// <remarks/>
        public long sncode
        {
            get
            {
                return this.sncodeField;
            }
            set
            {
                this.sncodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool sncodeSpecified
        {
            get
            {
                return this.sncodeFieldSpecified;
            }
            set
            {
                this.sncodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string sncodePub
        {
            get
            {
                return this.sncodePubField;
            }
            set
            {
                this.sncodePubField = value;
            }
        }

        /// <remarks/>
        public long rpVscode
        {
            get
            {
                return this.rpVscodeField;
            }
            set
            {
                this.rpVscodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool rpVscodeSpecified
        {
            get
            {
                return this.rpVscodeFieldSpecified;
            }
            set
            {
                this.rpVscodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public long eventCode
        {
            get
            {
                return this.eventCodeField;
            }
            set
            {
                this.eventCodeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool eventCodeSpecified
        {
            get
            {
                return this.eventCodeFieldSpecified;
            }
            set
            {
                this.eventCodeFieldSpecified = value;
            }
        }

        /// <remarks/>
        public money amount
        {
            get
            {
                return this.amountField;
            }
            set
            {
                this.amountField = value;
            }
        }

        /// <remarks/>
        public double amountRel
        {
            get
            {
                return this.amountRelField;
            }
            set
            {
                this.amountRelField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool amountRelSpecified
        {
            get
            {
                return this.amountRelFieldSpecified;
            }
            set
            {
                this.amountRelFieldSpecified = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string numPeriods
        {
            get
            {
                return this.numPeriodsField;
            }
            set
            {
                this.numPeriodsField = value;
            }
        }

        /// <remarks/>
        public System.DateTime periodEndDate
        {
            get
            {
                return this.periodEndDateField;
            }
            set
            {
                this.periodEndDateField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool periodEndDateSpecified
        {
            get
            {
                return this.periodEndDateFieldSpecified;
            }
            set
            {
                this.periodEndDateFieldSpecified = value;
            }
        }

        /// <remarks/>
        public bool firstPeriodProrate
        {
            get
            {
                return this.firstPeriodProrateField;
            }
            set
            {
                this.firstPeriodProrateField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool firstPeriodProrateSpecified
        {
            get
            {
                return this.firstPeriodProrateFieldSpecified;
            }
            set
            {
                this.firstPeriodProrateFieldSpecified = value;
            }
        }

        /// <remarks/>
        public System.DateTime validFrom
        {
            get
            {
                return this.validFromField;
            }
            set
            {
                this.validFromField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool validFromSpecified
        {
            get
            {
                return this.validFromFieldSpecified;
            }
            set
            {
                this.validFromFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string glcode
        {
            get
            {
                return this.glcodeField;
            }
            set
            {
                this.glcodeField = value;
            }
        }

        /// <remarks/>
        public string remark
        {
            get
            {
                return this.remarkField;
            }
            set
            {
                this.remarkField = value;
            }
        }

        /// <remarks/>
        public long seqno
        {
            get
            {
                return this.seqnoField;
            }
            set
            {
                this.seqnoField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool seqnoSpecified
        {
            get
            {
                return this.seqnoFieldSpecified;
            }
            set
            {
                this.seqnoFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string feeType
        {
            get
            {
                return this.feeTypeField;
            }
            set
            {
                this.feeTypeField = value;
            }
        }

        /// <remarks/>
        public string billFormat
        {
            get
            {
                return this.billFormatField;
            }
            set
            {
                this.billFormatField = value;
            }
        }

        /// <remarks/>
        public long jobcost
        {
            get
            {
                return this.jobcostField;
            }
            set
            {
                this.jobcostField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool jobcostSpecified
        {
            get
            {
                return this.jobcostFieldSpecified;
            }
            set
            {
                this.jobcostFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string jobcostPub
        {
            get
            {
                return this.jobcostPubField;
            }
            set
            {
                this.jobcostPubField = value;
            }
        }

        /// <remarks/>
        public long jobcostdisc
        {
            get
            {
                return this.jobcostdiscField;
            }
            set
            {
                this.jobcostdiscField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool jobcostdiscSpecified
        {
            get
            {
                return this.jobcostdiscFieldSpecified;
            }
            set
            {
                this.jobcostdiscFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string jobcostdiscPub
        {
            get
            {
                return this.jobcostdiscPubField;
            }
            set
            {
                this.jobcostdiscPubField = value;
            }
        }

        /// <remarks/>
        public long jobcostmin
        {
            get
            {
                return this.jobcostminField;
            }
            set
            {
                this.jobcostminField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool jobcostminSpecified
        {
            get
            {
                return this.jobcostminFieldSpecified;
            }
            set
            {
                this.jobcostminFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string jobcostminPub
        {
            get
            {
                return this.jobcostminPubField;
            }
            set
            {
                this.jobcostminPubField = value;
            }
        }

        /// <remarks/>
        public string glcodedisc
        {
            get
            {
                return this.glcodediscField;
            }
            set
            {
                this.glcodediscField = value;
            }
        }

        /// <remarks/>
        public string glcodemin
        {
            get
            {
                return this.glcodeminField;
            }
            set
            {
                this.glcodeminField = value;
            }
        }

        /// <remarks/>
        public long ivId
        {
            get
            {
                return this.ivIdField;
            }
            set
            {
                this.ivIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ivIdSpecified
        {
            get
            {
                return this.ivIdFieldSpecified;
            }
            set
            {
                this.ivIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string servcatCode
        {
            get
            {
                return this.servcatCodeField;
            }
            set
            {
                this.servcatCodeField = value;
            }
        }

        /// <remarks/>
        public string servCode
        {
            get
            {
                return this.servCodeField;
            }
            set
            {
                this.servCodeField = value;
            }
        }

        /// <remarks/>
        public string servType
        {
            get
            {
                return this.servTypeField;
            }
            set
            {
                this.servTypeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string fuPackId
        {
            get
            {
                return this.fuPackIdField;
            }
            set
            {
                this.fuPackIdField = value;
            }
        }

        /// <remarks/>
        public string fuPackIdPub
        {
            get
            {
                return this.fuPackIdPubField;
            }
            set
            {
                this.fuPackIdPubField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string fuVer
        {
            get
            {
                return this.fuVerField;
            }
            set
            {
                this.fuVerField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string fuPkver
        {
            get
            {
                return this.fuPkverField;
            }
            set
            {
                this.fuPkverField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string fuPkelsq
        {
            get
            {
                return this.fuPkelsqField;
            }
            set
            {
                this.fuPkelsqField = value;
            }
        }

        /// <remarks/>
        public double fuNum
        {
            get
            {
                return this.fuNumField;
            }
            set
            {
                this.fuNumField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool fuNumSpecified
        {
            get
            {
                return this.fuNumFieldSpecified;
            }
            set
            {
                this.fuNumFieldSpecified = value;
            }
        }

        /// <remarks/>
        public long recordId
        {
            get
            {
                return this.recordIdField;
            }
            set
            {
                this.recordIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool recordIdSpecified
        {
            get
            {
                return this.recordIdFieldSpecified;
            }
            set
            {
                this.recordIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string recordSubId
        {
            get
            {
                return this.recordSubIdField;
            }
            set
            {
                this.recordSubIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string rerateSeqno
        {
            get
            {
                return this.rerateSeqnoField;
            }
            set
            {
                this.rerateSeqnoField = value;
            }
        }

        /// <remarks/>
        public long recordSummaryId
        {
            get
            {
                return this.recordSummaryIdField;
            }
            set
            {
                this.recordSummaryIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool recordSummaryIdSpecified
        {
            get
            {
                return this.recordSummaryIdFieldSpecified;
            }
            set
            {
                this.recordSummaryIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string basePartId
        {
            get
            {
                return this.basePartIdField;
            }
            set
            {
                this.basePartIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(DataType = "integer")]
        public string chargePartId
        {
            get
            {
                return this.chargePartIdField;
            }
            set
            {
                this.chargePartIdField = value;
            }
        }

        /// <remarks/>
        public string dirnum
        {
            get
            {
                return this.dirnumField;
            }
            set
            {
                this.dirnumField = value;
            }
        }

       /// <remarks/>
        public string devicenum
        {
            get
            {
                return this.devicenumField;
            }
            set
            {
                this.devicenumField = value;
            }
        }

        /// <remarks/>
        public System.DateTime callDate
        {
            get
            {
                return this.callDateField;
            }
            set
            {
                this.callDateField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool callDateSpecified
        {
            get
            {
                return this.callDateFieldSpecified;
            }
            set
            {
                this.callDateFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string billingAccountCode
        {
            get
            {
                return this.billingAccountCodeField;
            }
            set
            {
                this.billingAccountCodeField = value;
            }
        }

        /// <remarks/>
        public long billingAccountId
        {
            get
            {
                return this.billingAccountIdField;
            }
            set
            {
                this.billingAccountIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool billingAccountIdSpecified
        {
            get
            {
                return this.billingAccountIdFieldSpecified;
            }
            set
            {
                this.billingAccountIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        public long csId
        {
            get
            {
                return this.csIdField;
            }
            set
            {
                this.csIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool csIdSpecified
        {
            get
            {
                return this.csIdFieldSpecified;
            }
            set
            {
                this.csIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string csIdPub
        {
            get
            {
                return this.csIdPubField;
            }
            set
            {
                this.csIdPubField = value;
            }
        }

        /// <remarks/>
        public long coId
        {
            get
            {
                return this.coIdField;
            }
            set
            {
                this.coIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool coIdSpecified
        {
            get
            {
                return this.coIdFieldSpecified;
            }
            set
            {
                this.coIdFieldSpecified = value;
            }
        }

        /// <remarks/>
        public string coIdPub
        {
            get
            {
                return this.coIdPubField;
            }
            set
            {
                this.coIdPubField = value;
            }
        }

        /// <remarks/>
        public long payerCustomerId
        {
            get
            {
                return this.payerCustomerIdField;
            }
            set
            {
                this.payerCustomerIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool payerCustomerIdSpecified
        {
            get
            {
                return this.payerCustomerIdFieldSpecified;
            }
            set
            {
                this.payerCustomerIdFieldSpecified = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://lhsgroup.com/lhsws/money")]
    public partial class money
    {

        private double amountField;

        private string currencyField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order = 0)]
        public double amount
        {
            get
            {
                return this.amountField;
            }
            set
            {
                this.amountField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order = 1)]
        public string currency
        {
            get
            {
                return this.currencyField;
            }
            set
            {
                this.currencyField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/bookingrequestwrite")]
    public partial class bookingRequestWriteResponse
    {
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/sessionchange")]
    public partial class valuesListpartRequest
    {

        private string keyField;

        private string valueField;

        /// <remarks/>
        public string key
        {
            get
            {
                return this.keyField;
            }
            set
            {
                this.keyField = value;
            }
        }

        /// <remarks/>
        public string value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.6.1055.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/sessionchange")]
    public partial class sessionChangeRequest
    {

        private valuesListpartRequest[] valuesField;

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("item", IsNullable = false)]
        public valuesListpartRequest[] values
        {
            get
            {
                return this.valuesField;
            }
            set
            {
                this.valuesField = value;
            }
        }
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
    public partial class bookingRequestWriteRequest1
    {

        [System.ServiceModel.MessageBodyMemberAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/bookingrequestwrite", Order = 0)]
        public bookingRequestWriteRequest bookingRequestWriteRequest;

        public bookingRequestWriteRequest1()
        {
        }

        public bookingRequestWriteRequest1(bookingRequestWriteRequest bookingRequestWriteRequest)
        {
            this.bookingRequestWriteRequest = bookingRequestWriteRequest;
        }
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
    public partial class bookingRequestWriteResponse1
    {

        [System.ServiceModel.MessageBodyMemberAttribute(Namespace = "http://ericsson.com/services/ws_CIL_7/bookingrequestwrite", Order = 0)]
        public bookingRequestWriteResponse bookingRequestWriteResponse;

        public bookingRequestWriteResponse1()
        {
        }

        public bookingRequestWriteResponse1(bookingRequestWriteResponse bookingRequestWriteResponse)
        {
            this.bookingRequestWriteResponse = bookingRequestWriteResponse;
        }
    }

    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface BookingRequestWriteServiceChannel : BookingRequestWriteService, System.ServiceModel.IClientChannel
    {
    }

    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class BookingRequestWriteServiceClient : System.ServiceModel.ClientBase<BookingRequestWriteService>, BookingRequestWriteService
    {

        public BookingRequestWriteServiceClient()
        {
        }

        public BookingRequestWriteServiceClient(string endpointConfigurationName) :
                base(endpointConfigurationName)
        {
        }

        public BookingRequestWriteServiceClient(string endpointConfigurationName, string remoteAddress) :
                base(endpointConfigurationName, remoteAddress)
        {
        }

        public BookingRequestWriteServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) :
                base(endpointConfigurationName, remoteAddress)
        {
        }

        public BookingRequestWriteServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
                base(binding, remoteAddress)
        {
        }

        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        bookingRequestWriteResponse1 BookingRequestWriteService.bookingRequestWrite(bookingRequestWriteRequest1 request)
        {
            return base.Channel.bookingRequestWrite(request);
        }

        public bookingRequestWriteResponse bookingRequestWrite(bookingRequestWriteRequest bookingRequestWriteRequest)
        {
            bookingRequestWriteRequest1 inValue = new bookingRequestWriteRequest1();
            inValue.bookingRequestWriteRequest = bookingRequestWriteRequest;
            bookingRequestWriteResponse1 retVal = ((BookingRequestWriteService)(this)).bookingRequestWrite(inValue);
            return retVal.bookingRequestWriteResponse;
        }

        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<bookingRequestWriteResponse1> BookingRequestWriteService.bookingRequestWriteAsync(bookingRequestWriteRequest1 request)
        {
            return base.Channel.bookingRequestWriteAsync(request);
        }

        public System.Threading.Tasks.Task<bookingRequestWriteResponse1> bookingRequestWriteAsync(bookingRequestWriteRequest bookingRequestWriteRequest)
        {
            bookingRequestWriteRequest1 inValue = new bookingRequestWriteRequest1();
            inValue.bookingRequestWriteRequest = bookingRequestWriteRequest;
            return ((BookingRequestWriteService)(this)).bookingRequestWriteAsync(inValue);
        }
    }
}
