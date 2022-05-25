import { collection } from "firebase/firestore";
import { firestore } from "./firebaseInit";

export const campgaignCollection = collection(firestore, "campaigns");
export const fullDescriptionCollection = collection(
  firestore,
  "fullDescription"
);
export const leadsCollection = collection(firestore, "leads");
