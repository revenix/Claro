﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------



[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
[System.ServiceModel.ServiceContractAttribute(Namespace = "http://xmlns.ericcson.com/CON_JDBC_ESB/ConAutoNumberCase", ConfigurationName = "AutoNumberCasePort")]
public interface AutoNumberCasePort
{

    // CODEGEN: Se está generando un contrato de mensaje, ya que la operación AutoNumberCase no es RPC ni está encapsulada en un documento.
    [System.ServiceModel.OperationContractAttribute(Action = "AutoNumberCase", ReplyAction = "*")]
    [System.ServiceModel.XmlSerializerFormatAttribute()]
    AutoNumberCaseResponse AutoNumberCase(AutoNumberCaseRequest request);

    [System.ServiceModel.OperationContractAttribute(Action = "AutoNumberCase", ReplyAction = "*")]
    System.Threading.Tasks.Task<AutoNumberCaseResponse> AutoNumberCaseAsync(AutoNumberCaseRequest request);
}

/// <remarks/>
[System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.0.30319.33440")]
[System.SerializableAttribute()]
[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://xmlns.oracle.com/pcbpel/adapter/db/sp/SP_AUTONUMBER_CASE")]
public partial class InputParameters
{

    private string i_CO_IDField;

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 0)]
    public string I_CO_ID
    {
        get
        {
            return this.i_CO_IDField;
        }
        set
        {
            this.i_CO_IDField = value;
        }
    }
}

/// <remarks/>
[System.CodeDom.Compiler.GeneratedCodeAttribute("svcutil", "4.0.30319.33440")]
[System.SerializableAttribute()]
[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://xmlns.oracle.com/pcbpel/adapter/db/sp/SP_AUTONUMBER_CASE")]
public partial class OutputParameters
{

    private string o_ID_CASEField;

    private string o_RES_CODEField;

    private string o_RES_DESField;

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 0)]
    public string O_ID_CASE
    {
        get
        {
            return this.o_ID_CASEField;
        }
        set
        {
            this.o_ID_CASEField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 1)]
    public string O_RES_CODE
    {
        get
        {
            return this.o_RES_CODEField;
        }
        set
        {
            this.o_RES_CODEField = value;
        }
    }

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 2)]
    public string O_RES_DES
    {
        get
        {
            return this.o_RES_DESField;
        }
        set
        {
            this.o_RES_DESField = value;
        }
    }
}

[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
[System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
[System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
public partial class AutoNumberCaseRequest
{

    [System.ServiceModel.MessageBodyMemberAttribute(Namespace = "http://xmlns.oracle.com/pcbpel/adapter/db/sp/SP_AUTONUMBER_CASE", Order = 0)]
    public InputParameters InputParameters;

    public AutoNumberCaseRequest()
    {
    }

    public AutoNumberCaseRequest(InputParameters InputParameters)
    {
        this.InputParameters = InputParameters;
    }
}

[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
[System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
[System.ServiceModel.MessageContractAttribute(IsWrapped = false)]
public partial class AutoNumberCaseResponse
{

    [System.ServiceModel.MessageBodyMemberAttribute(Namespace = "http://xmlns.oracle.com/pcbpel/adapter/db/sp/SP_AUTONUMBER_CASE", Order = 0)]
    public OutputParameters OutputParameters;

    public AutoNumberCaseResponse()
    {
    }

    public AutoNumberCaseResponse(OutputParameters OutputParameters)
    {
        this.OutputParameters = OutputParameters;
    }
}

[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
public interface AutoNumberCasePortChannel : AutoNumberCasePort, System.ServiceModel.IClientChannel
{
}

[System.Diagnostics.DebuggerStepThroughAttribute()]
[System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
public partial class AutoNumberCasePortClient : System.ServiceModel.ClientBase<AutoNumberCasePort>, AutoNumberCasePort
{

    public AutoNumberCasePortClient()
    {
    }

    public AutoNumberCasePortClient(string endpointConfigurationName) :
        base(endpointConfigurationName)
    {
    }

    public AutoNumberCasePortClient(string endpointConfigurationName, string remoteAddress) :
        base(endpointConfigurationName, remoteAddress)
    {
    }

    public AutoNumberCasePortClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) :
        base(endpointConfigurationName, remoteAddress)
    {
    }

    public AutoNumberCasePortClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) :
        base(binding, remoteAddress)
    {
    }

    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    AutoNumberCaseResponse AutoNumberCasePort.AutoNumberCase(AutoNumberCaseRequest request)
    {
        return base.Channel.AutoNumberCase(request);
    }

    public OutputParameters AutoNumberCase(InputParameters InputParameters)
    {
        AutoNumberCaseRequest inValue = new AutoNumberCaseRequest();
        inValue.InputParameters = InputParameters;
        AutoNumberCaseResponse retVal = ((AutoNumberCasePort)(this)).AutoNumberCase(inValue);
        return retVal.OutputParameters;
    }

    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    System.Threading.Tasks.Task<AutoNumberCaseResponse> AutoNumberCasePort.AutoNumberCaseAsync(AutoNumberCaseRequest request)
    {
        return base.Channel.AutoNumberCaseAsync(request);
    }

    public System.Threading.Tasks.Task<AutoNumberCaseResponse> AutoNumberCaseAsync(InputParameters InputParameters)
    {
        AutoNumberCaseRequest inValue = new AutoNumberCaseRequest();
        inValue.InputParameters = InputParameters;
        return ((AutoNumberCasePort)(this)).AutoNumberCaseAsync(inValue);
    }
}