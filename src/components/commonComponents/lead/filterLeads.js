import Fuse from "fuse.js";
import moment from "moment";

export const filterLeads = (
  campaignIds,
  leadsList,
  searchDate,
  searchQuery
) => {
  var finalFilteredResults = [];
  var filteredResults = [];

  if (searchDate === "") {
    filteredResults = [];
    for (let i = 0; i < campaignIds.length; i++) {
      for (let j = 0; j < leadsList.length; j++) {
        if (leadsList[j].campaignId === campaignIds[i].id) {
          filteredResults.push(leadsList[j]);
        }
      }
    }
    const fuse = new Fuse(filteredResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    finalFilteredResults = searchQuery
      ? results.map((results) => results.item)
      : filteredResults;
    return finalFilteredResults;
  }
  if (searchDate !== "") {
    filteredResults = [];
    for (let i = 0; i < campaignIds.length; i++) {
      for (let j = 0; j < leadsList.length; j++) {
        const start = moment(searchDate.start).format("YYYY-MM-DD");
        const end = moment(searchDate.end).format("YYYY-MM-DD");
        const between = moment
          .unix(leadsList[j].leadGeneratedDate.seconds)
          .format("YYYY-MM-DD");
        const unixTimestampStart = Math.floor(new Date(start).getTime() / 1000);
        const unixTimestampBetween = Math.floor(
          new Date(between).getTime() / 1000
        );
        const unixTimestampEnd = Math.floor(new Date(end).getTime() / 1000);
        if (
          leadsList[j].campaignId === campaignIds[i].id &&
          unixTimestampStart < unixTimestampBetween &&
          unixTimestampBetween < unixTimestampEnd
        ) {
          filteredResults.push(leadsList[j]);
        }
      }
    }
    const fuse = new Fuse(filteredResults, {
      keys: ["title", "summary", "companyName"],
    });
    const results = fuse.search(searchQuery);
    finalFilteredResults = searchQuery
      ? results.map((results) => results.item)
      : filteredResults;
    return finalFilteredResults;
  }
};
