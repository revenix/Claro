using Komatsu_SistemaSeguros.ExtraClass;
using Libreria_ExportExcel.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace Libreria_ExportExcel
{
    public class GenerarExcel
    {

        public List<Trasu> ObtenerLista_Trasu()
        {
            //Aqui se tiene que hacer la consulta para traer la lista
            //por temas de prueba por el momento esta en duro
            List<Trasu> _ListTrasu = new List<Trasu>();
            //string tex = File.ReadAllText(HttpContext.Current.Server.MapPath("/List_Test/List_Trasu.json"));
            string text = "[{\"NOMEO\": \"AMERICA MOVIL PERÚ SAC \",\"NUMRUCEO\": 20467534026,\"EMAILEO\": \"atenciondereclamos@claro.com.pe\",\"NUMCARTALTRASU\": \"DAC-REC-RQJ/71936-18\",\"FECCARTALTRASU\": \"13.07.2018\",\"NUMFOLCARTALTRASU\": 8,\"CLARECURSO\": \"RQJ\",\"CODSERVCONTRATADO\": 29201,\"NUMSERVABONADO\": 985344589,\"NUMSERVRECLAMO\": 985344589,\"CODSUBCRECLAMO\": 2700,\"NUMRECIBORECLAMO\": \"\",\"FECRECIBORECLAMO\": null,\"FECVENCRECIBRECLAMO\": null,\"DESPERIODRECLAMO\": \"\",\"MONRECLAMO\": null,\"CODMONEDARECLAMO\": null,\"DESSUMILLARECLAMO\": \"No contestación oportuna del reclamo\",\"CODMEDIOPROBATORIO\": 42,\"FECEJECRESOLTRASU\": \"\",\"NUMREPORTEEO\": \"\",\"FECREPORTEEO\": \"\",\"NUMRECLAMOEO\": \"180350040-1\",\"FECPRESRECLAMO\": \"02.07.2018\",\"CODMEDIORECLAMO\": 1,\"NUMRESOL1ERA\": \"125\",\"FECRESOL1ERA\": \"\",\"CODSENTRESOL1ERA\": 125,\"FECNOTIFRESOL1ERA\": \"\",\"DIRNOTIFRESOL1ERA\": \"CA  BARRIO LA ACHIRANA S/N MZ N  LT 8 -LOS AQUIJES-ICA-ICA\",\"FECRECURSORECON1ERA\": \"\",\"CODMEDIORECON1ERA\": \"\",\"NUMRESOLRECON1ERA\": \"\",\"FECRESOLRECON1ERA\": \"\",\"CODSENTRECON1ERA\": \"\",\"FECNOTIFRESOLREC1ERA\": \"\",\"DIRNOTIFRESOLREC1ERA\": \"\",\"FECPRESENAPELACQUEJA\": \"11.07.2018\",\"CODMEDIOAPELAQUEJA\": 5,\"NOMABONADO\": \"ROSA JULIA\",\"APEABONADO\": \"CORDERO RAMIREZ\",\"CODDOCABONADO\": 1,\"NUMDOCABONADO\": 21472656,\"DIRABONADO\": \"CA  BARRIO LA ACHIRANA S/N MZ N  LT 8 -LOS AQUIJES-ICA-ICA\",\"NOMRECLAMANTE\": \"ROSA JULIA\",\"APERECLAMANTE\": \"CORDERO RAMIREZ\",\"CODDOCRECLAMANTE\": 1,\"NUMDOCRECLAMANTE\": 21472656,\"DIRRECLAMANTE\": \"CA  BARRIO LA ACHIRANA S/N MZ N  LT 8 -LOS AQUIJES-ICA-ICA\",\"NOMAPELANTE\": \"\",\"APEAPELANTE\": \"\",\"CODDOCAPELANTE\": null,\"NUMDOCAPELANTE\": null,\"DIRAPELANTE\": \"\",\"NOMQUEJOSO\": \"ROSA JULIA\",\"APEQUEJOSO\": \"CORDERO RAMIREZ\",\"CODQUEJOSO\": 1,\"NUMDOCQUEJOSO\": 21472656,\"DIRQUEJOSO\": \"CA  BARRIO LA ACHIRANA S/N MZ N  LT 8 -LOS AQUIJES-ICA-ICA\",\"DIRPROCESAL\": \"NR\",\"CODUBIGEODPROC\": 110103,\"FLANOTELUSU\": 0,\"EMAILNOTUSUARIO\": \"\",\"NUMTELFUSUARIO\": \"NR\",\"DIRALTUSUARIO\": \"NR\",\"EMAILNOTEO\": \"atenciondereclamos@claro.com.pe\"},{\"NOMEO\": \"AMERICA MOVIL PERÚ SAC \",\"NUMRUCEO\": 20467534026,\"EMAILEO\": \"atenciondereclamos@claro.com.pe\",\"NUMCARTALTRASU\": \"DAC-REC-RQJ/71937-18\",\"FECCARTALTRASU\": \"13.07.2018\",\"NUMFOLCARTALTRASU\": 16,\"CLARECURSO\": \"RQJ\",\"CODSERVCONTRATADO\": 29201,\"NUMSERVABONADO\": 993757960,\"NUMSERVRECLAMO\": 993757960,\"CODSUBCRECLAMO\": 2700,\"NUMRECIBORECLAMO\": \"\",\"FECRECIBORECLAMO\": null,\"FECVENCRECIBRECLAMO\": null,\"DESPERIODRECLAMO\": \"\",\"MONRECLAMO\": null,\"CODMONEDARECLAMO\": null,\"DESSUMILLARECLAMO\": \"No contestación oportuna del reclamo\",\"CODMEDIOPROBATORIO\": 42,\"FECEJECRESOLTRASU\": \"\",\"NUMREPORTEEO\": \"\",\"FECREPORTEEO\": \"\",\"NUMRECLAMOEO\": \"180348389-1\",\"FECPRESRECLAMO\": \"02.07.2018\",\"CODMEDIORECLAMO\": 1,\"NUMRESOL1ERA\": \"125\",\"FECRESOL1ERA\": \"\",\"CODSENTRESOL1ERA\": 125,\"FECNOTIFRESOL1ERA\": \"\",\"DIRNOTIFRESOL1ERA\": \"PS - PASAJE LIBERTAD 251-SAN JUAN DE LURIGANCHO-LIMA-LIMA\",\"FECRECURSORECON1ERA\": \"\",\"CODMEDIORECON1ERA\": \"\",\"NUMRESOLRECON1ERA\": \"\",\"FECRESOLRECON1ERA\": \"\",\"CODSENTRECON1ERA\": \"\",\"FECNOTIFRESOLREC1ERA\": \"\",\"DIRNOTIFRESOLREC1ERA\": \"\",\"FECPRESENAPELACQUEJA\": \"10.07.2018\",\"CODMEDIOAPELAQUEJA\": 5,\"NOMABONADO\": \"BRIAN KEVIN\",\"APEABONADO\": \"ROMERO ARRIOLA\",\"CODDOCABONADO\": 1,\"NUMDOCABONADO\": 70044759,\"DIRABONADO\": \"PS - PASAJE LIBERTAD 251-SAN JUAN DE LURIGANCHO-LIMA-LIMA\",\"NOMRECLAMANTE\": \"BRIAN KEVIN\",\"APERECLAMANTE\": \"ROMERO ARRIOLA\",\"CODDOCRECLAMANTE\": 1,\"NUMDOCRECLAMANTE\": 70044759,\"DIRRECLAMANTE\": \"PS - PASAJE LIBERTAD 251-SAN JUAN DE LURIGANCHO-LIMA-LIMA\",\"NOMAPELANTE\": \"\",\"APEAPELANTE\": \"\",\"CODDOCAPELANTE\": null,\"NUMDOCAPELANTE\": null,\"DIRAPELANTE\": \"\",\"NOMQUEJOSO\": \"BRIAN KEVIN\",\"APEQUEJOSO\": \"ROMERO ARRIOLA\",\"CODQUEJOSO\": 1,\"NUMDOCQUEJOSO\": 70044759,\"DIRQUEJOSO\": \"PS - PASAJE LIBERTAD 251-SAN JUAN DE LURIGANCHO-LIMA-LIMA\",\"DIRPROCESAL\": \"NR\",\"CODUBIGEODPROC\": 150132,\"FLANOTELUSU\": 1,\"EMAILNOTUSUARIO\": \"c_brianromero@grupogss.com\",\"NUMTELFUSUARIO\": \"NR\",\"DIRALTUSUARIO\": \"NR\",\"EMAILNOTEO\": \"atenciondereclamos@claro.com.pe\"},{\"NOMEO\": \"AMERICA MOVIL PERÚ SAC \",\"NUMRUCEO\": 20467534026,\"EMAILEO\": \"atenciondereclamos@claro.com.pe\",\"NUMCARTALTRASU\": \"DAC-REC-RQJ/71939-18\",\"FECCARTALTRASU\": \"13.07.2018\",\"NUMFOLCARTALTRASU\": 15,\"CLARECURSO\": \"RQJ\",\"CODSERVCONTRATADO\": 28305,\"NUMSERVABONADO\": 64496,\"NUMSERVRECLAMO\": 64496,\"CODSUBCRECLAMO\": 2700,\"NUMRECIBORECLAMO\": \"\",\"FECRECIBORECLAMO\": null,\"FECVENCRECIBRECLAMO\": null,\"DESPERIODRECLAMO\": \"\",\"MONRECLAMO\": null,\"CODMONEDARECLAMO\": null,\"DESSUMILLARECLAMO\": \"No contestación oportuna del reclamo\",\"CODMEDIOPROBATORIO\": 42,\"FECEJECRESOLTRASU\": \"\",\"NUMREPORTEEO\": \"\",\"FECREPORTEEO\": \"\",\"NUMRECLAMOEO\": \"180342926-1\",\"FECPRESRECLAMO\": \"02.07.2018\",\"CODMEDIORECLAMO\": 1,\"NUMRESOL1ERA\": \"125\",\"FECRESOL1ERA\": \"\",\"CODSENTRESOL1ERA\": 125,\"FECNOTIFRESOL1ERA\": \"\",\"DIRNOTIFRESOL1ERA\": \"AV ANTONIO RAYMONDI 360 -CHICLAYO-CHICLAYO-LAMBAYEQUE\",\"FECRECURSORECON1ERA\": \"\",\"CODMEDIORECON1ERA\": \"\",\"NUMRESOLRECON1ERA\": \"\",\"FECRESOLRECON1ERA\": \"\",\"CODSENTRECON1ERA\": \"\",\"FECNOTIFRESOLREC1ERA\": \"\",\"DIRNOTIFRESOLREC1ERA\": \"\",\"FECPRESENAPELACQUEJA\": \"11.07.2018\",\"CODMEDIOAPELAQUEJA\": 5,\"NOMABONADO\": \"PEDRO DAVID\",\"APEABONADO\": \"GOMEZ MERINO\",\"CODDOCABONADO\": 1,\"NUMDOCABONADO\": 16618632,\"DIRABONADO\": \"AV ANTONIO RAYMONDI 360 -CHICLAYO-CHICLAYO-LAMBAYEQUE\",\"NOMRECLAMANTE\": \"PEDRO DAVID\",\"APERECLAMANTE\": \"GOMEZ MERINO\",\"CODDOCRECLAMANTE\": 1,\"NUMDOCRECLAMANTE\": 16618632,\"DIRRECLAMANTE\": \"AV ANTONIO RAYMONDI 360 -CHICLAYO-CHICLAYO-LAMBAYEQUE\",\"NOMAPELANTE\": \"\",\"APEAPELANTE\": \"\",\"CODDOCAPELANTE\": null,\"NUMDOCAPELANTE\": null,\"DIRAPELANTE\": \"\",\"NOMQUEJOSO\": \"PEDRO DAVID\",\"APEQUEJOSO\": \"GOMEZ MERINO\",\"CODQUEJOSO\": 1,\"NUMDOCQUEJOSO\": 16618632,\"DIRQUEJOSO\": \"AV ANTONIO RAYMONDI 360 -CHICLAYO-CHICLAYO-LAMBAYEQUE\",\"DIRPROCESAL\": \"NR\",\"CODUBIGEODPROC\": 140101,\"FLANOTELUSU\": 1,\"EMAILNOTUSUARIO\": \"pdgomezmerino@gmail.com\",\"NUMTELFUSUARIO\": \"NR\",\"DIRALTUSUARIO\": \"NR\",\"EMAILNOTEO\": \"atenciondereclamos@claro.com.pe\"}]";
            _ListTrasu = JsonConvert.DeserializeObject<List<Trasu>>(text);

            return _ListTrasu;
        }

        public string Exportar_Excel(string path , List<Trasu> listaFetch)
        {
            var helper = new HelperExportExcel("Trasu", "piePagina", "", 66);
            List<string> headers = new List<string>();
            Type type = typeof(Trasu);

            foreach (PropertyInfo propertyInfo in type.GetProperties())
            {
                headers.Add(propertyInfo.Name);
            }

            helper.CreateHeader(headers);
            int indice = 1;
            // List<Trasu> list = ObtenerLista_Trasu();
             List<Trasu> list = listaFetch;

            foreach (var item in list)
            {
                //Type _type = item.GetType();
                //PropertyInfo[] listaPropiedades = _type.GetProperties();

                //int _indice = 1;
                //foreach (PropertyInfo propiedad in listaPropiedades)
                //{
                //    var value = propiedad.GetValue(item, null);
                //    helper.AddDataCell(indice, _indice, new Cell { Style = ColStyle.Text, Value = value });
                //    _indice++;
                //}
                //66
                helper.AddDataCell(indice, 1, new Cell { Style = ColStyle.TextRed, Value = item.NOMEO });
                helper.AddDataCell(indice, 2, new Cell { Style = ColStyle.Text, Value = item.NUMRUCEO });
                helper.AddDataCell(indice, 3, new Cell { Style = ColStyle.Text, Value = item.EMAILEO });
                helper.AddDataCell(indice, 4, new Cell { Style = ColStyle.TextGris, Value = item.NUMCARTALTRASU });
                helper.AddDataCell(indice, 5, new Cell { Style = ColStyle.Text, Value = item.FECCARTALTRASU });
                helper.AddDataCell(indice, 6, new Cell { Style = ColStyle.Text, Value = item.NUMFOLCARTALTRASU });
                helper.AddDataCell(indice, 7, new Cell { Style = ColStyle.Text, Value = item.CLARECURSO });
                helper.AddDataCell(indice, 8, new Cell { Style = ColStyle.TextCrema, Value = item.CODSERVCONTRATADO });
                helper.AddDataCell(indice, 9, new Cell { Style = ColStyle.Text, Value = item.NUMSERVABONADO });
                helper.AddDataCell(indice, 10, new Cell { Style = ColStyle.Text, Value = item.NUMSERVRECLAMO });
                helper.AddDataCell(indice, 11, new Cell { Style = ColStyle.TextCrema, Value = item.CODSUBCRECLAMO });
                helper.AddDataCell(indice, 12, new Cell { Style = ColStyle.Text, Value = item.NUMRECIBORECLAMO });
                helper.AddDataCell(indice, 13, new Cell { Style = ColStyle.Text, Value = item.FECRECIBORECLAMO });
                helper.AddDataCell(indice, 14, new Cell { Style = ColStyle.Text, Value = item.FECVENCRECIBRECLAMO });
                helper.AddDataCell(indice, 15, new Cell { Style = ColStyle.Text, Value = item.DESPERIODRECLAMO });
                helper.AddDataCell(indice, 16, new Cell { Style = ColStyle.Text, Value = item.MONRECLAMO });
                helper.AddDataCell(indice, 17, new Cell { Style = ColStyle.Text, Value = item.CODMONEDARECLAMO });
                helper.AddDataCell(indice, 18, new Cell { Style = ColStyle.TextCrema, Value = item.DESSUMILLARECLAMO });
                helper.AddDataCell(indice, 19, new Cell { Style = ColStyle.Text, Value = item.CODMEDIOPROBATORIO });
                helper.AddDataCell(indice, 20, new Cell { Style = ColStyle.Text, Value = item.FECEJECRESOLTRASU });
                helper.AddDataCell(indice, 21, new Cell { Style = ColStyle.Text, Value = item.NUMREPORTEEO });
                helper.AddDataCell(indice, 22, new Cell { Style = ColStyle.Text, Value = item.FECREPORTEEO });
                helper.AddDataCell(indice, 23, new Cell { Style = ColStyle.TextCrema, Value = item.NUMRECLAMOEO });
                helper.AddDataCell(indice, 24, new Cell { Style = ColStyle.Text, Value = item.FECPRESRECLAMO });
                helper.AddDataCell(indice, 25, new Cell { Style = ColStyle.Text, Value = item.CODMEDIORECLAMO });
                helper.AddDataCell(indice, 26, new Cell { Style = ColStyle.Text, Value = item.NUMRESOL1ERA });
                helper.AddDataCell(indice, 27, new Cell { Style = ColStyle.Text, Value = item.FECRESOL1ERA });
                helper.AddDataCell(indice, 28, new Cell { Style = ColStyle.Text, Value = item.CODSENTRESOL1ERA });
                helper.AddDataCell(indice, 29, new Cell { Style = ColStyle.Text, Value = item.FECNOTIFRESOL1ERA });
                helper.AddDataCell(indice, 30, new Cell { Style = ColStyle.Text, Value = item.DIRNOTIFRESOL1ERA });
                helper.AddDataCell(indice, 31, new Cell { Style = ColStyle.Text, Value = item.FECRECURSORECON1ERA });
                helper.AddDataCell(indice, 32, new Cell { Style = ColStyle.Text, Value = item.CODMEDIORECON1ERA });
                helper.AddDataCell(indice, 33, new Cell { Style = ColStyle.Text, Value = item.NUMRESOLRECON1ERA });
                helper.AddDataCell(indice, 34, new Cell { Style = ColStyle.Text, Value = item.FECRESOLRECON1ERA });
                helper.AddDataCell(indice, 35, new Cell { Style = ColStyle.Text, Value = item.CODSENTRECON1ERA });
                helper.AddDataCell(indice, 36, new Cell { Style = ColStyle.Text, Value = item.FECNOTIFRESOLREC1ERA });
                helper.AddDataCell(indice, 37, new Cell { Style = ColStyle.Text, Value = item.DIRNOTIFRESOLREC1ERA });
                helper.AddDataCell(indice, 38, new Cell { Style = ColStyle.TextGris, Value = item.FECPRESENAPELACQUEJA });
                helper.AddDataCell(indice, 39, new Cell { Style = ColStyle.Text, Value = item.CODMEDIOAPELAQUEJA });
                helper.AddDataCell(indice, 40, new Cell { Style = ColStyle.Text, Value = item.NOMABONADO });
                helper.AddDataCell(indice, 41, new Cell { Style = ColStyle.Text, Value = item.APEABONADO });
                helper.AddDataCell(indice, 42, new Cell { Style = ColStyle.Text, Value = item.CODDOCABONADO });
                helper.AddDataCell(indice, 43, new Cell { Style = ColStyle.Text, Value = item.NUMDOCABONADO });
                helper.AddDataCell(indice, 44, new Cell { Style = ColStyle.Text, Value = item.DIRABONADO });
                helper.AddDataCell(indice, 45, new Cell { Style = ColStyle.Text, Value = item.NOMRECLAMANTE });
                helper.AddDataCell(indice, 46, new Cell { Style = ColStyle.Text, Value = item.APERECLAMANTE });
                helper.AddDataCell(indice, 47, new Cell { Style = ColStyle.Text, Value = item.CODDOCRECLAMANTE });
                helper.AddDataCell(indice, 48, new Cell { Style = ColStyle.Text, Value = item.NUMDOCRECLAMANTE });
                helper.AddDataCell(indice, 49, new Cell { Style = ColStyle.Text, Value = item.DIRRECLAMANTE });
                helper.AddDataCell(indice, 50, new Cell { Style = ColStyle.Text, Value = item.NOMAPELANTE });
                helper.AddDataCell(indice, 51, new Cell { Style = ColStyle.Text, Value = item.APEAPELANTE });
                helper.AddDataCell(indice, 52, new Cell { Style = ColStyle.Text, Value = item.CODDOCAPELANTE });
                helper.AddDataCell(indice, 53, new Cell { Style = ColStyle.Text, Value = item.NUMDOCAPELANTE });
                helper.AddDataCell(indice, 54, new Cell { Style = ColStyle.Text, Value = item.DIRAPELANTE });
                helper.AddDataCell(indice, 55, new Cell { Style = ColStyle.Text, Value = item.NOMQUEJOSO });
                helper.AddDataCell(indice, 56, new Cell { Style = ColStyle.Text, Value = item.APEQUEJOSO });
                helper.AddDataCell(indice, 57, new Cell { Style = ColStyle.Text, Value = item.CODQUEJOSO });
                helper.AddDataCell(indice, 58, new Cell { Style = ColStyle.Text, Value = item.NUMDOCQUEJOSO });
                helper.AddDataCell(indice, 59, new Cell { Style = ColStyle.Text, Value = item.DIRQUEJOSO });
                helper.AddDataCell(indice, 60, new Cell { Style = ColStyle.Text, Value = item.DIRPROCESAL });
                helper.AddDataCell(indice, 61, new Cell { Style = ColStyle.Text, Value = item.CODUBIGEODPROC });
                helper.AddDataCell(indice, 62, new Cell { Style = ColStyle.Text, Value = item.FLANOTELUSU });
                helper.AddDataCell(indice, 63, new Cell { Style = ColStyle.Text, Value = item.EMAILNOTUSUARIO });
                helper.AddDataCell(indice, 64, new Cell { Style = ColStyle.Text, Value = item.NUMTELFUSUARIO });
                helper.AddDataCell(indice, 65, new Cell { Style = ColStyle.Text, Value = item.DIRALTUSUARIO });
                helper.AddDataCell(indice, 66, new Cell { Style = ColStyle.Text, Value = item.EMAILNOTEO });
                Console.WriteLine(indice + ": " + helper);
                indice++;
            }

            string url = helper.Export(path);

            return url;
        }
    }
}
