using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UstWcf.Response;
using UstWcf.Request;

namespace UstWcf.Data
{
    public class DAupdateCase
    {


        public UpdateCaseResponseMessage UpdateCase(UpdateCaseRequestMessage request)
        {
            
            UpdateCaseResponseMessage response = new UpdateCaseResponseMessage();
            try
            {

                response.caseId = request.caseId;
                response.successFlag = 1;

            }
            catch (Exception e)
            {
                throw;
            }
            return response;
        }







    }
}