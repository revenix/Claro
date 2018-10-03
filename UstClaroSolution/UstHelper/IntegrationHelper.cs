using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace ITC_CB_Helper
{
    public static class IntegrationHelper
    {
        public static string GetClientService(string rutaServicio,string dataJson, string user, string pass)
        {

            byte[] data = UTF8Encoding.UTF8.GetBytes(dataJson);

            HttpWebRequest request = WebRequest.Create(rutaServicio) as HttpWebRequest;
            request.Timeout = 10 * 1000;
            request.Method = "POST";
            request.ContentLength = data.Length;
            request.ContentType = "application/json; charset=utf-8";

            string credentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(user + ":" + pass));

            request.Headers.Add("Authorization", "Basic " + credentials);

            Stream postStream = request.GetRequestStream();
            postStream.Write(data, 0, data.Length);

            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string body = reader.ReadToEnd();

            return body;
        }


        //public static CBE_RetornoSinco getRespuestaSinco()
        //{

        //}



    }
}
