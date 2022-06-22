import { getDocs } from "firebase/firestore";
import { countryCollection } from "../firebase/collections";

export const getCountry = async () => {
  const UsersSnapshot = await getDocs(countryCollection);
  const counrtyList = UsersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return counrtyList;
};
