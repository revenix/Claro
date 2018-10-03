using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ITC.Helper.Functions
{
    public static class FunctionsHelper
    {
        public static char ProximaLetra(char pLeter)
        {
            int index = Array.IndexOf(LetrasAbcdario, pLeter) + 1;

            if (index >= LetrasAbcdario.Length || index < 0)
            {
                return 'A';
            }

            return LetrasAbcdario[index];
        }

        public static char[] LetrasAbcdario => "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".ToCharArray();

        /// <summary>
        /// Obtiene el texto del item de un campo picklist.
        /// </summary>
        /// <param name="entityName">NOmbre de la entidad donde se encuentra el campo</param>
        /// <param name="attributeName">Nombre del campo tipo picklist</param>
        /// <param name="optionSetValue">Valor del picklist </param>
        /// <param name="service">Objeto de servicio.</param>
        /// <returns></returns>
        public static string GetPickListText(string entityName, string attributeName, int optionSetValue, IOrganizationService service)
        {
            string entityLogicalName = entityName;
            RetrieveEntityRequest retrieveDetails = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.All,
                LogicalName = entityLogicalName
            };
            RetrieveEntityResponse retrieveEntityResponseObj = (RetrieveEntityResponse)service.Execute(retrieveDetails);
            Microsoft.Xrm.Sdk.Metadata.EntityMetadata metadata = retrieveEntityResponseObj.EntityMetadata;
            Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata picklistMetadata = metadata.Attributes.FirstOrDefault(attribute => String.Equals(attribute.LogicalName, attributeName, StringComparison.OrdinalIgnoreCase)) as Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata;
            Microsoft.Xrm.Sdk.Metadata.OptionSetMetadata options = picklistMetadata.OptionSet;
            IList<OptionMetadata> picklistOption = (from o in options.Options
                                                    where o.Value.Value == optionSetValue
                                                    select o).ToList();
            string picklistLabel = (picklistOption.First()).Label.UserLocalizedLabel.Label;
            return picklistLabel;
        }

        public static void SetTrace(Entity pEntity, string pMessage)
        {
            if(pEntity != null && pEntity.Attributes.Contains("rrm_trace"))
            {
                string trace = pEntity["rrm_trace"] + Environment.NewLine + DateTime.Now.ToString("F") + pMessage;

                pEntity["rrm_trace"] = trace.Length > 5000
                            ? "..." + trace.Substring(trace.Length - 5000)
                            : trace;
            }
        }
    }
}