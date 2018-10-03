using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace UstClaro_Case.Utilities
{
    public class HTTPClientUtil
    {
        public static async Task<string> requestServicePOST(string endpoint, object postData)
        {
            if (!string.IsNullOrEmpty(endpoint))
            {
                string result = string.Empty;
                try
                {
                    using (var client = new HttpClient())
                    {
                        var stringContent = new StringContent(JsonConvert.SerializeObject(postData), Encoding.UTF8, "application/json");
                        HttpResponseMessage response = await client.PostAsync(endpoint, stringContent);
                        if (response.IsSuccessStatusCode)
                        {
                            //almacenando el response del servicio   
                            result = response.Content.ReadAsStringAsync().Result;
                        }
                    }
                }
                catch (Exception ex)
                {
                }

                return result;
            }

            return "";

        }
    }
}
