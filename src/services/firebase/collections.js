import { collection } from "firebase/firestore";
import { firestore } from "./firebaseInit";

console.log(`web/${process.env.NODE_ENV}/campaigns`);

export const campgaignCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/campaigns`
);
export const crawledDataCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/crawledData`
);
export const fullDescriptionCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/fullDescription`
);
export const leadsCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/leads`
);
export const usersCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/users`
);
export const assignedLeadCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/assignedLead`
);
export const assignedCampaignCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/assignedCampaign`
);
export const countryCollection = collection(
  firestore,
  `web/${process.env.NODE_ENV}/country`
);
