import * as firebaseMethods from "firebase/firestore";
import { campgaignCollection } from "../firebase/collections";
import { firestore } from "../firebase/firebaseInit";

export const get_a_feild_in_a_document = async (
  a__campgaignId,
  statusvalue
) => {
  try {
    const documentRef = firebaseMethods.doc(
      firestore,
      "campaigns",
      a__campgaignId
    );
    return firebaseMethods.setDoc(documentRef, statusvalue, { merge: true });
  } catch (err) {
    return err;
  }
};

export const get_A_Campaign = async (a__campgaignId) => {
  try {
    const a__campaignSnaphot = firebaseMethods.doc(
      campgaignCollection,
      a__campgaignId
    );
    return firebaseMethods.getDoc(a__campaignSnaphot);
  } catch (err) {
    return err;
  }
};

export const getCampaignList = async () => {
  try {
    const campaignSnaphot = await firebaseMethods.getDocs(
      firebaseMethods.query(
        campgaignCollection,
        firebaseMethods.orderBy("status", "desc")
      )
    );
    const CompaignList = campaignSnaphot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return CompaignList;
  } catch (err) {
    return err;
  }
};

export const postCampaignData = async (addCompaignData) => {
  try {
    return await firebaseMethods.addDoc(campgaignCollection, addCompaignData);
  } catch (err) {
    return err;
  }
};

export const deleteCampaignData = async (campaignId) => {
  try {
    const campaignDel = firebaseMethods.doc(campgaignCollection, campaignId);
    await firebaseMethods.deleteDoc(campaignDel);
    return campaignDel;
  } catch (err) {
    return err;
  }
};

export const updateCampaignData = async (campaignId, campaignUpdateObject) => {
  try {
    const campaignUpdate = firebaseMethods.doc(campgaignCollection, campaignId);
    return await firebaseMethods.updateDoc(
      campaignUpdate,
      campaignUpdateObject
    );
  } catch (err) {
    return err;
  }
};
