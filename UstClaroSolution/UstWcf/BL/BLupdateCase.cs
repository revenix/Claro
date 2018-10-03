using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UstWcf.Response;
using UstWcf.Request;
namespace UstWcf.BL
{
    public class BLUpdateCase
    {

        public UpdateCaseResponseMessage UpdateCase(UpdateCaseRequestMessage request)
        {

            UpdateCaseResponseMessage response  = null;
            try
            {
                Data.DAupdateCase da = new Data.DAupdateCase();
                
               response=da.UpdateCase(request);
               


            }
            catch
            {
                //Log evento de errores
                response = null;
            }
            return response;
        }




        

        











    }









}