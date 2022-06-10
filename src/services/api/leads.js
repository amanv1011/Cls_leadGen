import { getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import {
  leadsCollection,
  fullDescriptionCollection,
} from "../firebase/collections";

export const getLeadsList = async () => {
  const leadsSnapshot = await getDocs(query(leadsCollection, orderBy("title")));
  const LeadsList = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return LeadsList;
};

export const getLeadsFullDescription = async () => {
  try {
    const leadsSnapshot = await getDocs(fullDescriptionCollection);
    const fullDescriptionList = leadsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return fullDescriptionList;
  } catch (error) {
    return error.message;
  }
};

export const approvRejectLeads = async (leadsId, leadStatus) => {
  console.log(leadsId);
  try {
    if (typeof leadsId === "string") {
      const updateApproveReject = doc(leadsCollection, leadsId);
      await updateDoc(updateApproveReject, { status: leadStatus });
      return { leadsId, leadStatus };
    } else {
      leadsId.map(async (lead) => {
        const updateApproveReject = doc(leadsCollection, lead);
        await updateDoc(updateApproveReject, { status: leadStatus });
        return { leadsId, leadStatus };
      });
    }
  } catch (err) {
    return err;
  }
};
