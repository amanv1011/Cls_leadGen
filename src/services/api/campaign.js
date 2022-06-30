import * as firebaseMethods from "firebase/firestore";
import {
  campgaignCollection,
  crawledDataCollection,
  assignedCampaignCollection,
} from "../firebase/collections";
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
        firebaseMethods.orderBy("campaignCreatedAt", "desc")
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

export const getLastCrawledDate = async (campaignId) => {
  try {
    const crawledDataSnaphot = await firebaseMethods.getDocs(
      crawledDataCollection
    );
    const CompaignList = crawledDataSnaphot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return CompaignList.filter((item) => item.campaign_id === campaignId);
  } catch (err) {
    return err;
  }
};

export const assignCampaign = async (campaignId, userId) => {
  const campaignsSnapshot = await firebaseMethods.getDocs(
    assignedCampaignCollection
  );
  const list = campaignsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  campaignId &&
    campaignId.forEach(async (ele) => {
      const filt = list.filter((element) => element.campaignId === campaignId);
      if (filt.length === 0) {
        const newCityRef = firebaseMethods.doc(assignedCampaignCollection, ele);
        await firebaseMethods.setDoc(newCityRef, {
          campaignId: ele,
          userId: userId,
        });
      } else {
        //find for existing user
        const documnet = firebaseMethods.doc(assignedCampaignCollection, ele);
        await firebaseMethods.updateDoc(documnet, {
          campaignId: ele,
          userId: firebaseMethods.arrayUnion(...userId),
        });
      }
    });
  return { campaignId: campaignId, userId: userId };
};

export const getAssignedCampaigns = async () => {
  try {
    const assignedCampaignsSnapshot = await firebaseMethods.getDocs(
      assignedCampaignCollection
    );
    const assignedCampaignssList = assignedCampaignsSnapshot.docs.map(
      (doc) => ({
        ...doc.data(),
        id: doc.id,
      })
    );
    return assignedCampaignssList;
  } catch (error) {
    return error.message;
  }
};

export const updateCampaignViewStatus = async (campaignId) => {
  const leadObject = firebaseMethods.doc(campgaignCollection, campaignId);
  await firebaseMethods.updateDoc(leadObject, { campaignSeen: true });
  return { campaignId: campaignId, campaignSeen: true };
};
