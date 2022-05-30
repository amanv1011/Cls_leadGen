import * as XLSX from "xlsx";

export const downloadInExcel = (JsonToDownload, downloadedExcelFileName) => {
  let workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.json_to_sheet(JsonToDownload);
  XLSX.utils.book_append_sheet(workBook, workSheet);
  XLSX.writeFile(workBook, `${downloadedExcelFileName}.xlsx`);
};
