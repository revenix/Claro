using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SendNotification.Test.Properties
{
    public class SendNotificationRequestMessage
    {
        public const string TiposNotificacionesSMS = "SMS";
        public const string TiposNotificacionesCORREO = "CORREO";
        public const string TiposNotificacionesUSSD = "USSD";
        public const string TiposNotificacionesIVR = "IVR";

        public const string IdentificadoresEnvioSMSOACMasivo = "SMSOACMasivo";
        public const string IdentificadoresEnvioSMSOACCorporativo = "SMSOACCorporativo";
        public const string IdentificadoresEnvioCampañaPrepago = "321";
        public const string IdentificadoresEnvioNotificacionCobranza = "742";


        public const string FlagHtmlEsHtml = "1";
        public const string FlagHtmlNoEsHtml = "0";

        private string _TIPO_NOTIFICACION;
        private string _IDENTIFICADOR_ENVIO;
        private string _MSISDN;
        private string _REMITENTE;
        private string _DESTINATARIO;
        private string _ASUNTO;
        private string _MENSAJE;
        private string _FLAG_HTML;
        private string _ID_PLANTILLA;
        private string _ID_ACCION;
        private string _FEC_NOTIFICACION;
        private object _AdditionalFieldsType;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 0)]
        public string TIPO_NOTIFICACION
        {
            get
            {
                return this._TIPO_NOTIFICACION;
            }
            set
            {
                this._TIPO_NOTIFICACION = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 1)]
        public string IDENTIFICADOR_ENVIO
        {
            get
            {
                return this._IDENTIFICADOR_ENVIO;
            }
            set
            {
                this._IDENTIFICADOR_ENVIO = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 2)]
        public string MSISDN
        {
            get
            {
                return this._MSISDN;
            }
            set
            {
                this._MSISDN = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 3)]
        public string REMITENTE
        {
            get
            {
                return this._REMITENTE;
            }
            set
            {
                this._REMITENTE = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 4)]
        public string DESTINATARIO
        {
            get
            {
                return this._DESTINATARIO;
            }
            set
            {
                this._DESTINATARIO = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 5)]
        public string ASUNTO
        {
            get
            {
                return this._ASUNTO;
            }
            set
            {
                this._ASUNTO = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 6)]
        public string MENSAJE
        {
            get
            {
                return this._MENSAJE;
            }
            set
            {
                this._MENSAJE = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 7)]
        public string FLAG_HTML
        {
            get
            {
                return this._FLAG_HTML;
            }
            set
            {
                this._FLAG_HTML = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 8)]
        public string ID_PLANTILLA
        {
            get
            {
                return this._ID_PLANTILLA;
            }
            set
            {
                this._ID_PLANTILLA = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 9)]
        public string ID_ACCION
        {
            get
            {
                return this._ID_ACCION;
            }
            set
            {
                this._ID_ACCION = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 10)]
        public string FEC_NOTIFICACION
        {
            get
            {
                return this._FEC_NOTIFICACION;
            }
            set
            {
                this._FEC_NOTIFICACION = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 11)]
        public object AdditionalFieldsType
        {
            get
            {
                return this._AdditionalFieldsType;
            }
            set
            {
                this._AdditionalFieldsType = value;
            }
        }
    }
    public class SendNotificationResponseMessage
    {
        private string _status;
        private string _codeResponse;
        private string _descriptionResponse;
        private string _date;
        private object _AdditionalFieldsType;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 0)]
        public string status
        {
            get
            {
                return this._status;
            }
            set
            {
                this._status = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 1)]
        public string codeResponse
        {
            get
            {
                return this._codeResponse;
            }
            set
            {
                this._codeResponse = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 2)]
        public string descriptionResponse
        {
            get
            {
                return this._descriptionResponse;
            }
            set
            {
                this._descriptionResponse = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 3)]
        public string date
        {
            get
            {
                return this._date;
            }
            set
            {
                this._date = value;
            }
        }

        [System.Xml.Serialization.XmlElementAttribute(IsNullable = true, Order = 4)]
        public object AdditionalFieldsType
        {
            get
            {
                return this._AdditionalFieldsType;
            }
            set
            {
                this._AdditionalFieldsType = value;
            }
        }
    }

}
