using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Libreria_ExportExcel.DTO;
using Libreria_ExportExcel;
namespace Generar_Excel_Test
{
    class Program
    {
        static void Main(string[] args)
        {
            GenerarExcel generar = new GenerarExcel();
            generar.ExportSiniestro();
            Console.ReadKey();
        }
    }
}
