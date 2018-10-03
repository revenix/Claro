using Libreria_ExportExcel;
using System;
using System.Web.Mvc;

namespace Probando_DescargaExcel.Controllers
{
    public class HomeController : Controller
    {
        GenerarExcel export = new GenerarExcel();
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Contact()
        {
            return export.ExportSiniestro();
        }
    }
}