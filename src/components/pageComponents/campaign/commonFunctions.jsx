import * as XLSX from "xlsx";

export const downloadInExcel = (JsonToDownload, downloadedExcelFileName) => {
  let workBook = XLSX.utils.book_new();
  let workSheet = XLSX.utils.json_to_sheet(JsonToDownload);
  XLSX.utils.book_append_sheet(workBook, workSheet);
  XLSX.writeFile(workBook, `${downloadedExcelFileName}.xlsx`);
};

export const ownerFilter = (
  filteredCampaigns,
  options,
  ownerFilterValue,
  assignedCampaigns,
  campaignsList
) => {
  const ownerNameFilterId = options?.filter(
    (user) => user.name === ownerFilterValue
  );

  const arr = [];
  assignedCampaigns &&
    ownerNameFilterId &&
    assignedCampaigns.forEach((campaign) => {
      if (campaign.userId.includes(ownerNameFilterId[0]?.userId)) {
        arr.push(campaign.campaignId);
      }
    });
  const filtered = [];
  arr.forEach((assignedCampaign) => {
    campaignsList.forEach((campaign) => {
      if (campaign.id === assignedCampaign) {
        filtered.push(campaign);
      }
    });
  });
  const combinedFilteredCampaigns = [...filteredCampaigns, ...filtered];
  return combinedFilteredCampaigns;
};
