import {
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  leadsCollection,
  fullDescriptionCollection,
  assignedLeadCollection,
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
      return { leadsId: leadsId, status: leadStatus };
    } else {
      leadsId.map(async (lead) => {
        const updateApproveReject = doc(leadsCollection, lead);
        await updateDoc(updateApproveReject, { status: leadStatus });
      });
      return { leadsId: leadsId, status: leadStatus };
    }
  } catch (err) {
    return err;
  }
};

export const assignLead = async (leadId, userId) => {
  const leadsSnapshot = await getDocs(assignedLeadCollection);
  const list = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const filt = list.filter((element) => element.leadId === leadId);

  if (filt.length === 0) {
    // await addDoc(assignedLeadCollection, { leadId: leadId, userId: [userId] });
    const newCityRef = doc(assignedLeadCollection, leadId);
    await setDoc(newCityRef, {
      leadId: leadId,
      userId: [userId],
    });
    return "Assigned Successfully";
  } else {
    //find for existing user
    const documnet = doc(assignedLeadCollection, leadId);
    await updateDoc(documnet, { leadId: leadId, userId: arrayUnion(userId) });
    return "Assigned Successfully";
  }
};

export const addNotes = async (leadsId, notes) => {
  console.log(leadsId, notes);
  const leadObject = doc(leadsCollection, leadsId);
  await updateDoc(leadObject, { notes: arrayUnion(notes) });
  return { leadsId: leadsId, notes: notes };
};
