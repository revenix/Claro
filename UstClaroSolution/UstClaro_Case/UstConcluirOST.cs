using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Client;
using System.ServiceModel;
using Microsoft.Xrm.Sdk.Query;
using System.ServiceModel.Channels;

using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Messages;
using System.Configuration;
using System.Data;
using UstClaro_Case.Utilities;
//using AmxPeruCommonLibrary;
using AmxPeruPSBActivities.Activities.BiAdjustment.BscsBookingRequestWrite;
using BookingRequestWrite = AmxPeruPSBActivities.Activities.BiAdjustment.BscsBookingRequestWrite;
//using BASearch = AmxPeruCommonLibrary.ServiceContracts.Services.BscsBillingAccountSearch;
//using System.Activities;

///  /// <summary>
/// Creador : William Quiroz  
/// Actualización: 20/09/2018
/// Función : Concluir OST.
/// Evento  : Post-Operation
/// Req.    : AMXPEASIS-3236
/// Entidad : OST_Presential
/// </summary>
/// 

namespace UstClaro_Case
{
    public class UstConcluirOST : IPlugin
    {
        ITracingService myTrace;
        IOrganizationService service;
        //int occtype = 0;
        double montopagar = 0;
       // public double repositioncost = 0;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            //IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            service = factory.CreateOrganizationService(context.UserId);

            IOrganizationService iServices = ((IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory))).CreateOrganizationService(new Guid?(context.UserId));

            // Get a reference to the tracing service.
            myTrace = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            //myTrace.Trace("Inicio:");

            try
            {
                Entity target = (Entity)context.InputParameters["Target"];

                if (target.Attributes.Contains("ust_flagsetconcluirost") && target["ust_flagsetconcluirost"] != null)
                {
                    if (context.MessageName == "Update")
                    {
                        //Variables Locales                         
                        int tipoPagoSeleccionado = 0;                     
                        int estadoequipoPrestamo = 0;
                        int tipopagoEquipo = 0;
                        int precioReposicion = 0;
                        EntityReference deviceowner = null;
                        string externalid = string.Empty;

                        Entity ostPresential = service.Retrieve("ust_ostpresential", target.Id, new ColumnSet("ust_selectedpaymenttyperepair", "ust_finalamounttopay", "ust_lentdevicereturnedstatus", "ust_selectedpaymenttypepenalty", "ust_repositioncost", "ust_finalamounttopay", "ust_repositioncost", "ust_deviceowner"));

                        if (ostPresential != null)
                        {
                            if (ostPresential.Attributes.Contains("ust_selectedpaymenttyperepair") && ostPresential["ust_selectedpaymenttyperepair"] != null)
                            {
                                tipoPagoSeleccionado = ((OptionSetValue)ostPresential.Attributes["ust_selectedpaymenttyperepair"]).Value;
                                myTrace.Trace("tipoPagoSeleccionado:" + tipoPagoSeleccionado);
                            }

                            if (ostPresential.Attributes.Contains("ust_finalamounttopay") && ostPresential["ust_finalamounttopay"] != null)
                            {
                                //myTrace.Trace("montopagar Descr:" + Convert.ToDouble(ostPresential["ust_finalamounttopay"]));
                                //montopagar = Convert.ToDouble(ostPresential.Attributes["ust_finalamounttopay"].ToString());
                                //myTrace.Trace("montopagar:" + montopagar);
                                montopagar = 1500;
                                myTrace.Trace("montopagar:" + montopagar);
                            }
                            else
                            {
                                if (ostPresential.Attributes.Contains("ust_repositioncost") && ostPresential["ust_repositioncost"] != null)
                                {
                                    montopagar = (int)ostPresential.Attributes["ust_repositioncost"];                                   
                                }
                            }

                            if (ostPresential.Attributes.Contains("ust_deviceowner") && ostPresential["ust_deviceowner"] != null)
                            {
                                deviceowner = ((EntityReference)ostPresential.Attributes["ust_deviceowner"]);
                                myTrace.Trace("deviceowner:" + deviceowner);

                                Entity individual = service.Retrieve("contact", deviceowner.Id, new ColumnSet("etel_externalid"));

                                if (individual.Attributes.Contains("etel_externalid") && individual["etel_externalid"] != null)
                                {
                                    externalid = individual.Attributes["etel_externalid"].ToString();
                                    myTrace.Trace("externalid:" + externalid);
                                }

                                Entity billingaccount = service.Retrieve("etel_billingaccount", deviceowner.Id, new ColumnSet("etel_billingaccountid"));
                            }

                            if (tipoPagoSeleccionado == 864340001 && montopagar > 0)
                            {
                                ///Invocar al Servicio

                                myTrace.Trace("Ingreso al Servicio:");
                                string strBookingResponseWriteService = getBookingRequestWriteService(montopagar, externalid);

                                myTrace.Trace("strBookingResponseWriteService:" + strBookingResponseWriteService);

                            }

                            if (ostPresential.Attributes.Contains("ust_lentdevicereturnedstatus") && ostPresential["ust_lentdevicereturnedstatus"] != null)
                            {
                                estadoequipoPrestamo = ((OptionSetValue)ostPresential.Attributes["ust_lentdevicereturnedstatus"]).Value;
                            }

                            if (ostPresential.Attributes.Contains("ust_selectedpaymenttypepenalty") && ostPresential["ust_selectedpaymenttypepenalty"] != null)
                            {
                                tipopagoEquipo = ((OptionSetValue)ostPresential.Attributes["ust_selectedpaymenttypepenalty"]).Value;
                            }

                            if (ostPresential.Attributes.Contains("ust_repositioncost") && ostPresential["ust_repositioncost"] != null)
                            {
                                precioReposicion = (int)ostPresential.Attributes["ust_repositioncost"];
                            }

                            if (estadoequipoPrestamo == 864340001 && tipopagoEquipo == 864340001 && precioReposicion > 0)
                            {
                                ///Invocar al Servicio
                                myTrace.Trace("Ingreso al Servicio 2:");
                                string strBookingResponseWriteService = getBookingRequestWriteService(precioReposicion, "");
                            }

                            //if (ostPresential.Attributes.Contains("amxperu_occtype") && ostPresential["amxperu_occtype"] != null)
                            //{
                            //    occtype = (int)ostPresential.Attributes["amxperu_occtype"];
                            //}  
                           
                        }

                        throw new InvalidPluginExecutionException("Mensaje de error. ");
                    }
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string getBookingRequestWriteService(double montopagar, string externalid)
        {
            string strBookingRequestWriteService = null;

            try
            {
                BasicHttpBinding myBinding = new BasicHttpBinding();
                myBinding.Name = "BSCS_BookingRequestWrite";

                string PhaseNameEN = Util.GetCrmConfiguration(service, myBinding.Name);
                //Get the real URL from the parameters.
                //EndpointAddress myEndpoint = new EndpointAddress(new Uri("http://10.96.143.69:13331/wsi/services/ws_CIL_7_BookingRequestWriteService"));


                var authorization = new BookingRequestWrite.valuesListpartRequest()
                {
                    key = "ADMX",
                    value = "ADMX"
                };
                AddressHeader header = AddressHeader.CreateAddressHeader(authorization);

                EndpointAddress myEndpoint = new EndpointAddress(new Uri(PhaseNameEN), new[] { header});//I have to change this.

                var request = new bookingRequestWriteRequest()
                {
                    inputAttributes = new inputAttributes()
                    {
                        actionCode = "I",  //inserir una nueva OCC
                        feeClass = "3",  //generación de OCC para BSCS
                        feeType = "N",   //cargo no recurrente
                        rpcodePub = "OCCRP", //Rate plan de BSCS
                        spcodePub = "BOCCS", //Service Plan de BSCS
                        sncode = 30,    //occtype  pendiente de enviar los códigos correspondientes de BSCS para OST. 
                        sncodeSpecified = true,              
                        amount = new money() { amount = montopagar, currency = "PEN" },
                        numPeriods = "1",  //cuotas,enviar siempre 1.
                        remark = "", //AdjustmentType,
                        billingAccountCode =  "BA-718766", //BillingAccountCode,
                        csIdPub = externalid //"CUST0000000101" //CustExtId
                    }
                };
                    

                using (BookingRequestWriteServiceChannel proxy = new ChannelFactory<BookingRequestWriteServiceChannel>(myBinding, myEndpoint).CreateChannel())
                {
                    BookingRequestWrite.sessionChangeRequest _sessionChangeRequest = new BookingRequestWrite.sessionChangeRequest()
                    {
                        values = new BookingRequestWrite.valuesListpartRequest[] { new BookingRequestWrite.valuesListpartRequest() { key = "ADMX", value = "ADMX" } }
                    };

                    BookingRequestWrite.bookingRequestWriteRequest _bookingRequestWriteRequest = new BookingRequestWrite.bookingRequestWriteRequest()
                    {
                        inputAttributes = request.inputAttributes,
                        sessionChangeRequest = _sessionChangeRequest
                    };


                    BookingRequestWrite.bookingRequestWriteResponse1 BscsResponse = new BookingRequestWrite.bookingRequestWriteResponse1();

                    BscsResponse = proxy.bookingRequestWrite(new BookingRequestWrite.bookingRequestWriteRequest1() { bookingRequestWriteRequest = _bookingRequestWriteRequest });
                                       
                    //proxy.bookingRequestWrite(new bookingRequestWrite.bookingRequestWriteRequest1() { bookingRequestWriteRequest = request });
                    
                    if (BscsResponse != null)
                        strBookingRequestWriteService = BscsResponse.bookingRequestWriteResponse.ToString();
                }

            }
            catch (EndpointNotFoundException ex)
            {
                throw new EndpointNotFoundException(ex.Message, ex);
            }
            catch (Exception)
            {
                throw;
            }

            return strBookingRequestWriteService;
        }
        
    }
}
