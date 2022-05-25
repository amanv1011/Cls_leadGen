import * as XLSX from "xlsx";

export const formatDate = (date, returnFormatType) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (returnFormatType === true) {
    return [year, month, day].join("-");
  } else return [month, day, year].join("/");
};

export const downloadInExcel = (JsonToDownload, downloadedExcelFileName) => {
  let workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.json_to_sheet(JsonToDownload);
  XLSX.utils.book_append_sheet(workBook, workSheet);
  XLSX.writeFile(workBook, `${downloadedExcelFileName}.xlsx`);
};
