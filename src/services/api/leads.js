import { getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { leadsCollection } from "../firebase/collections";

export const getLeadsList = async () => {
  const leadsSnapshot = await getDocs(leadsCollection);
  const LeadsList = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return LeadsList;
};

export const approvRejectLeads = async (leadsId, leadStatus) => {
  try {
    const updateApproveReject = doc(leadsCollection, leadsId);
    await updateDoc(updateApproveReject, { status: leadStatus });
  } catch (err) {
    return err;
  }
};
