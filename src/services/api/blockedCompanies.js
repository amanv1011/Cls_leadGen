import * as firebaseMethods from "firebase/firestore";
import { blockedCompaniesListCollection } from "../firebase/collections";
import { firestore } from "../firebase/firebaseInit";

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

export const postBlockedCompany = async (objectsToAdd) => {
  const batchArray = [];
  batchArray.push(firebaseMethods.writeBatch(firestore));
  let operationCounter = 0;
  let batchIndex = 0;
  let newDocRef;
  objectsToAdd.forEach((document) => {
    newDocRef = firebaseMethods.doc(blockedCompaniesListCollection);
    batchArray[batchIndex].set(newDocRef, document);

    operationCounter++;
    if (operationCounter === 499) {
      batchArray.push(firebaseMethods.writeBatch(firestore));
      batchIndex++;
      operationCounter = 0;
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  });
  batchArray.forEach(async (batch) => await batch.commit());
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  return newDocRef.id;
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
