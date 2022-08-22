import * as firebaseMethods from "firebase/firestore";
import { blockedCompaniesListCollection } from "../firebase/collections";

export const getBlockedCompaniesList = async () => {
  try {
    const blockedCompaniesSnaphot = await firebaseMethods.getDocs(
      blockedCompaniesListCollection
    );
    const blockedCompaniesList = blockedCompaniesSnaphot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return blockedCompaniesList;
  } catch (err) {
    return err;
  }
};

export const postBlockedCompany = async (blockedCompany) => {
  try {
    return await firebaseMethods.addDoc(
      blockedCompaniesListCollection,
      blockedCompany
    );
  } catch (err) {
    return err;
  }
};

export const deleteBlockedCompaniesList = async (id) => {
  try {
    const campaignDel = firebaseMethods.doc(blockedCompaniesListCollection, id);
    await firebaseMethods.deleteDoc(campaignDel);
    return campaignDel;
  } catch (err) {
    return err;
  }
};
