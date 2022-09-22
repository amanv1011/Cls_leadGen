import * as firebaseMethods from "firebase/firestore";
import { countryCollection } from "../firebase/collections";

export const getCountry = async () => {
  const countrySnapshot = await firebaseMethods.getDocs(
    firebaseMethods.query(
      countryCollection,
      firebaseMethods.orderBy("country_name")
    )
  );

  const counrtyList = countrySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return counrtyList;
};
