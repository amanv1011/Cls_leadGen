export const getTotalCount = (campaignList, leadsList) => {
    let leadCount = 0;
    for (let i = 0; i < campaignList.length; i++) {
      for (let j = 0; j < leadsList.length; j++) {
        if (leadsList[j].campaignId === campaignList[i].id) {
          leadCount++;
        }
      }
    }
    return leadCount;
}