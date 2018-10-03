using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace UstWcf.Global
{
    public class Util
    {

        public static string WSConexion(string pmetodo, string puri, string pcontenttype, string pjson)
        {
            string strUrlServicios = System.Configuration.ConfigurationManager.AppSettings["ServiciosUrl"].ToString();
            string Response = string.Empty;
            try
            {
                string Method = pmetodo; //parametro
                string uri = strUrlServicios + puri; //parametro

                HttpWebRequest req = WebRequest.Create(uri) as HttpWebRequest;
                req.KeepAlive = false;
                req.Method = Method.ToUpper();

                byte[] buffer = Encoding.UTF8.GetBytes(pjson); //parametro
                req.ContentLength = buffer.Length;
                req.ContentType = pcontenttype; //parametro
                Stream PostData = req.GetRequestStream();
                PostData.Write(buffer, 0, buffer.Length);
                PostData.Close();

                HttpWebResponse resp = req.GetResponse() as HttpWebResponse;

                //Encoding enc = System.Text.Encoding.GetEncoding(1252);
                Encoding enc = System.Text.Encoding.UTF8;
                StreamReader loResponseStream =
                new StreamReader(resp.GetResponseStream(), enc);

                //loResponseStream.
                Response = loResponseStream.ReadToEnd();

                loResponseStream.Close();
                resp.Close();

            }
            catch (Exception ex)
            {
                Global.AuditoriaUT.GenerarLogError("WSConexion", "WSConexion", ex.Message, Global.AuditoriaUT.TipoExtension.Txt);
            }

            return Response;
        }
    }
}