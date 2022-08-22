import { collection } from "firebase/firestore";
import { firestore } from "./firebaseInit";

console.log(`web/${process.env.REACT_APP_ENV}/campaigns`);

export const campgaignCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/campaigns`
);
export const crawledDataCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/crawledData`
);
export const fullDescriptionCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/fullDescription`
);
export const leadsCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/leads`
);
export const usersCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/users`
);
export const assignedLeadCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/assignedLead`
);
export const assignedCampaignCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/assignedCampaign`
);
export const countryCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/country`
);
export const blockedCompaniesListCollection = collection(
  firestore,
  `web/${process.env.REACT_APP_ENV}/blockedCompaniesList`
);
