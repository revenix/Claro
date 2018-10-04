using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Komatsu_SistemaSeguros.ExtraClass
{
    public class HelperExportExcel
    {
        public readonly ExcelPackage package;
        public readonly ExcelWorksheet ws;
        private string _titulo;
        private string _piePagina;
        private string _tituloCabecera;
        private int _columnsCount;
        private int? _rowIndexInit;

        public HelperExportExcel(string titulo, string piePagina = "", string tituloCabecera = "", int columnsCount = 1)
        {
            this._titulo = titulo;
            this._piePagina = piePagina;
            this._tituloCabecera = tituloCabecera;
            this._columnsCount = columnsCount;

            package = new ExcelPackage();
            ws = package.Workbook.Worksheets.Add(this._titulo);
            ws.Workbook.Properties.Title = this._titulo;
            ws.Workbook.Properties.Author = "LuisAgui";
            ws.PrinterSettings.PaperSize = ePaperSize.A4;
            ws.PrinterSettings.Orientation = eOrientation.Landscape;
            ws.PrinterSettings.FitToPage = true;

            int lastIndexColumn = columnsCount;


            _rowIndexInit = 1;
        }

        public void CreateHeader(List<string> titulos)
        {
            int rowIndex = _rowIndexInit != null ? _rowIndexInit.Value : 1;
            for (int i = 1; i <= titulos.Count(); ++i)
            {
                string nombreCell = titulos[i - 1];
                PrepareDesignCellHead(ws.Cells[rowIndex, i], nombreCell);
                ws.Cells[rowIndex, i].Value = titulos[i - 1];
            }
            ws.Cells[rowIndex, 1, rowIndex, _columnsCount].AutoFilter = true;
        }

        public void AddDataCell(int index, int columna, Cell cell)
        {
            //ExcelRange excelRange = ws.Cells[index + 1, columna];
            int rowIndex = _rowIndexInit != null ? _rowIndexInit.Value - 1 : 0;
            ExcelRange excelRange = ws.Cells[(index + rowIndex) + 1, columna];
            excelRange.Value = cell.Value;

            switch (cell.Style)
            {
                case ColStyle.Index:
                    excelRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    break;
                case ColStyle.Number:
                    excelRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                    break;
                case ColStyle.Text:
                    excelRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                    break;
                case ColStyle.TextRed:
                    excelRange.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    excelRange.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#ff1d00"));
                    break;
                case ColStyle.TextGris:
                    excelRange.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    excelRange.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#ccc9c9"));
                    break;
                case ColStyle.TextCrema:
                    excelRange.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    excelRange.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#ffffbf"));
                    break;
                case ColStyle.Justified:
                    excelRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Justify;
                    break;
            }

            PrepareDesignCellBody(excelRange);
            ws.Cells[ws.Dimension.Address].AutoFitColumns();
        }

        public void PrepareDesignCellHead(ExcelRange Cell, string nombreCell)
        {
            Cell.Style.Fill.PatternType = ExcelFillStyle.Solid;

            if (nombreCell == "FLANOTELUSU" || nombreCell == "EMAILNOTUSUARIO" || nombreCell == "NUMTELFUSUARIO" || nombreCell == "DIRALTUSUARIO" || nombreCell == "EMAILNOTEO")
            {
                Cell.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#145dd1"));
                Cell.Style.Font.Color.SetColor(Color.White);
            }
            else
            {
                Cell.Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#fff53d"));
                Cell.Style.Font.Color.SetColor(Color.Black);
            }

            Cell.Style.Font.Bold = false;

            Cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;

            string borderColorHtml = "#000000";
            Cell.Style.Border.Top.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Bottom.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Right.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Left.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            Cell.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
        }

        public void PrepareDesignCellBody(ExcelRange Cell)
        {
            Cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            Cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;
            Cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            string borderColorHtml = "#000000";
            Cell.Style.Border.Top.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Bottom.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Right.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
            Cell.Style.Border.Left.Color.SetColor(ColorTranslator.FromHtml(borderColorHtml));
        }

        public string Export(string path)
        {
            string filename = "Trasu" + DateTime.Now.ToString("dd-MM-yyyy hhmmssfff") + ".xlsx";
            filename = filename.Replace("-","").Replace(" ","");
            var file = new FileInfo(Path.Combine(path, filename));
            package.SaveAs(file);
            return path + filename;
        }

        public Image ScaleImage(Image image, int maxWidth, int maxHeight)
        {
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);

            using (var graphics = Graphics.FromImage(newImage))
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);

            return newImage;
        }
    }

    public class Cell
    {
        public ColStyle Style { get; set; }
        public object Value { get; set; }
    }

    public enum ColStyle
    {
        Index,
        Number,
        Text,
        TextRed,
        TextCrema,
        TextGris,
        Justified
    }
}