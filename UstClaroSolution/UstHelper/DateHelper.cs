using Microsoft.Xrm.Sdk;
using System;
using System.Globalization;
using System.Linq;
using UST;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;

namespace CMV_Helper
{
    public static class DateHelper
    {

        public static bool IsItWeekend(DateTime date)
        {
            return (date.DayOfWeek == DayOfWeek.Saturday) || (date.DayOfWeek == DayOfWeek.Sunday);
        }

        public static bool CheckHolidays(DateTime date, UstServiceContext svcContext)
        {
            //Business Closure Calendar
            CMV_ITC_DATA.Calendar calendars = svcContext.CalendarSet.FirstOrDefault(c => c.Name == "Holiday Schedule-Cartera");

            return calendars.CalendarRules.Any(e => e.StartTime.Value.Equals(date.Date));
        }

        public static int GetMonthsDifference(DateTime initialDate, DateTime finalDate, bool evaluaNegatividad)
        {
            int meses = 0;
            //Valida que las dos fechas tengan al menos un valor.
            if (initialDate == null)
                throw new InvalidPluginExecutionException("Ocurrió un error al momento de calcular la diferencia de meses entre dos fechas, falta parámetro fecha inicial.");

            if (finalDate == null)
                throw new InvalidPluginExecutionException("Ocurrió un error al momento de calcular la diferencia de meses entre dos fechas, falta parámetro fecha final");

            if (evaluaNegatividad == true)
                meses = (initialDate.Month - finalDate.Month) + 12 * (initialDate.Year - finalDate.Year);
            else
                meses = Math.Abs((initialDate.Month - finalDate.Month) + 12 * (initialDate.Year - finalDate.Year));

            return meses;
        }


       
        /// <summary>
        /// Retrieves the current users timezone code
        /// </summary>
        /// <param name="service"> IOrganizationService </param>
        /// <returns></returns>
        /// 
        private static int? RetrieveCurrentUsersSettings(IOrganizationService service)
        {
            var currentUserSettings = service.RetrieveMultiple(
                new QueryExpression("usersettings")
                {
                    ColumnSet = new ColumnSet("timezonecode"),
                    Criteria = new FilterExpression
                    {
                        Conditions =
                        {
                            new ConditionExpression("systemuserid", ConditionOperator.EqualUserId)
                        }
                    }
                }).Entities[0].ToEntity<Entity>();
            //return time zone code
            return (int?)currentUserSettings.Attributes["timezonecode"];
        }

        /// <summary>
        ///  Retrive the local time from the UTC time.
        /// </summary>
        /// <param name="utcTime">UTC Date time which needs to convert to Local DateTime </param>
        /// <;param name="timeZoneCode">TimeZoneCode </param>
        /// <param name="service">OrganizationService service</param>
        /// <returns></returns>
        public static DateTime RetrieveLocalTimeFromUTCTime(DateTime utcTime, IOrganizationService service)
        {
            int? timeZoneCode = RetrieveCurrentUsersSettings(service);

            if (!timeZoneCode.HasValue)
                return DateTime.Now;
            var request = new LocalTimeFromUtcTimeRequest
            {
                TimeZoneCode = timeZoneCode.Value,
                UtcTime = utcTime.ToUniversalTime()
            };
            var response = (LocalTimeFromUtcTimeResponse)service.Execute(request);
            return response.LocalTime;
        }
        /// <summary>
        ///  Retrive the UTC DateTime from Local Date time format.
        /// </summary>
        /// <param name="localTime">;Local Date time which needs to convert to UTC</param>
        /// <param name="timeZoneCode">TimeZoneCode </param>
        /// <param name="service">IOrganizationService service</param>
        /// <returns> </returns>
       public static DateTime RetrieveUTCTimeFromLocalTime(DateTime localTime, IOrganizationService service)
        {
            int? timeZoneCode = RetrieveCurrentUsersSettings(service);

            if (!timeZoneCode.HasValue)
                return DateTime.Now;
            var request = new UtcTimeFromLocalTimeRequest
            {
                TimeZoneCode = timeZoneCode.Value,
                LocalTime = localTime
            };
            var response = (UtcTimeFromLocalTimeResponse)service.Execute(request);
            return response.UtcTime;
        }


    }
}
