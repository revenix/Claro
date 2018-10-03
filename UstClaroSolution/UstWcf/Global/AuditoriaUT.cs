using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace UstWcf.Global
{
    public class AuditoriaUT
    {
        #region Configuracion
        public static string getValueConfig(String strKey)
        {
            try
            {
                string strValue = string.Empty;

                if (ConfigurationManager.AppSettings.AllKeys.Contains(strKey))
                    strValue = ConfigurationManager.AppSettings[strKey];

                return strValue;
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Enumeradores
        public sealed class TipoExtension
        {
            public static readonly string Csv = ".csv";
            public static readonly string Txt = ".txt";
        }
        #endregion

        #region Logs
        public static void GenerarLogError(string strNombreArchivo, string objecto, string mensajeError, String strExtension)
        {
            //string rutaLog = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string rutaLog = getValueConfig("RUTA_LOG");
            string archivo = Path.Combine(rutaLog, String.Format("{0}_" + strNombreArchivo + strExtension, DateTime.Now.ToString("yyyyMMdd")));

            using (StreamWriter swLogError = new StreamWriter(archivo, true))
            {
                string line = string.Format("{0},{1},{2} \n", DateTime.Now.ToString("hh:mm:ss"), objecto, mensajeError);
                swLogError.WriteLine(line);
                swLogError.Close();
            }
        }
        public static void GenerarLog(DateTime inicio, String strNombreArchivo, String strExtension)
        {
            //string rutaLog = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string rutaLog = getValueConfig("RUTA_LOG");
            string archivo = Path.Combine(rutaLog, String.Format("{0}_" + strNombreArchivo + strExtension, DateTime.Now.ToString("yyyyMMdd")));

            using (StreamWriter swLog = new StreamWriter(archivo, true))
            {
                swLog.WriteLine(string.Format("Inicio: {0}", inicio.ToString("dd/MM/yyyy hh:mm:ss")));
                swLog.Close();
            }
        }
        public static void GenerarLogTrama(string strNombreArchivo, string objecto, string mensajeError, String strExtension)
        {
            //string rutaLog = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string rutaLog = getValueConfig("RUTA_LOG_TRAMA");
            string archivo = Path.Combine(rutaLog, String.Format("{0}_" + strNombreArchivo + strExtension, DateTime.Now.ToString("yyyyMMdd")));

            using (StreamWriter swLogError = new StreamWriter(archivo, true))
            {
                string line = string.Format("{0},{1},{2} \n", DateTime.Now.ToString("hh:mm:ss"), objecto, mensajeError);
                swLogError.WriteLine(line);
                swLogError.Close();
            }
        }
        #endregion
    }
}