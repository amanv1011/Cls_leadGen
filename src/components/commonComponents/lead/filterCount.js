export const filterCount = (campaignIdCount, genratedLeadData) => {
  var leadListForCount = [];
  for (let i = 0; i < campaignIdCount.length; i++) {
    for (let j = 0; j < genratedLeadData.length; j++) {
      if (genratedLeadData[j].campaignId === campaignIdCount[i].id) {
        leadListForCount.push(genratedLeadData[j]);
      }
    }
  }
  return leadListForCount;
};
