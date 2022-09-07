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

export const typesOfSource = [
  {
    value: "indeed_aus",
    sourceName: "Indeed Australia",
  },
  {
    value: "indeed_ca",
    sourceName: "Indeed Canada",
  },
  {
    value: "indeed_ch",
    sourceName: "Indeed China",
  },
  {
    value: "indeed_fi",
    sourceName: "Indeed Finland",
  },
  {
    value: "indeed_il",
    sourceName: "Indeed Italy",
  },
  {
    value: "indeed_pt",
    sourceName: "Indeed Portugal",
  },
  {
    value: "indeed_sg",
    sourceName: "Indeed Singapore",
  },
  {
    value: "indeed_se",
    sourceName: "Indeed Sweden",
  },
  {
    value: "indeed_ae",
    sourceName: "Indeed UAE",
  },
  {
    value: "indeed_uk",
    sourceName: "Indeed United Kingdom",
  },
  {
    value: "indeed_usa",
    sourceName: "Indeed USA",
  },
  {
    value: "seek_aus",
    sourceName: "Seek Australia",
  },
  {
    value: "linkedin",
    sourceName: "Linkedin",
  },
];
