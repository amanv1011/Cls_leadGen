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
    // const campaignSnaphot = await firebaseMethods.getDocs(
    //   campgaignCollection,
    //   firebaseMethods.query(
    //     campgaignCollection,
    //     firebaseMethods.orderBy("campaignCreatedAt"),
    //     firebaseMethods.limit(3)
    //   )
    // );
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

// export const assignCampaign = async (campaignId, userId) => {
//   const leadsSnapshot = await firebaseMethods.getDocs(
//     assignedCampaignCollection
//   );
//   const list = leadsSnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   const filt = list.filter((element) => element.campaignId === campaignId);

//   if (filt.length === 0) {
//     // await addDoc(assignedCampaignCollection, { campaignId: campaignId, userId: [userId] });
//     const newCityRef = firebaseMethods.doc(
//       assignedCampaignCollection,
//       campaignId
//     );
//     await firebaseMethods.setDoc(newCityRef, {
//       campaignId: campaignId,
//       userId: [userId],
//     });
//     return "Assigned Successfully";
//   } else {
//     //find for existing user
//     const documnet = firebaseMethods.doc(
//       assignedCampaignCollection,
//       campaignId
//     );
//     await firebaseMethods.updateDoc(documnet, {
//       campaignId: campaignId,
//       userId: firebaseMethods.arrayUnion(userId),
//     });
//     return "Assigned Successfully";
//   }
// };

export const assignCampaign = async (leadId, userId) => {
  const leadsSnapshot = await firebaseMethods.getDocs(
    assignedCampaignCollection
  );
  const list = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  leadId &&
    leadId.forEach(async (ele) => {
      const filt = list.filter((element) => element.leadId === leadId);
      if (filt.length === 0) {
        // await addDoc(assignedLeadCollection, { leadId: leadId, userId: [userId] });
        const newCityRef = firebaseMethods.doc(assignedCampaignCollection, ele);
        await firebaseMethods.setDoc(newCityRef, {
          leadId: ele,
          userId: userId,
        });
        return "Assigned Successfully";
      } else {
        //find for existing user
        const documnet = firebaseMethods.doc(assignedCampaignCollection, ele);
        await firebaseMethods.updateDoc(documnet, {
          leadId: ele,
          userId: firebaseMethods.arrayUnion(...userId),
        });
        return "Assigned Successfully";
      }
    });
};
