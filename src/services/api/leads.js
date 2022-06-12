import {
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
  where,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  leadsCollection,
  fullDescriptionCollection,
  assignedLeadCollection,
} from "../firebase/collections";
import { firestore } from "../firebase/firebaseInit";

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
        return { leadsId: leadsId, status: leadStatus };
      });
    }
  } catch (err) {
    return err;
  }
};

export const assignLead = async (leadId, userId) => {
  console.log(userId, leadId);
  const leadsSnapshot = await getDocs(assignedLeadCollection);
  const list = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const filt = list.filter((element) => element.leadId === leadId);
  console.log(filt);
  if (filt.length === 0) {
    // await addDoc(assignedLeadCollection, { leadId: leadId, userId: [userId] });
    const newCityRef = doc(assignedLeadCollection, leadId);
    await setDoc(newCityRef, {
      leadId: leadId,
      userId: [userId],
    });
  } else {
    //find for existing user

    const documnet = doc(assignedLeadCollection, leadId);
    await updateDoc(documnet, { leadId: leadId, userId: arrayUnion(userId) });
  }

  // const exisitingLead = await assignedLeadCollection
  //   .where("leadId", "==", leadId)
  //   .get();
  // console.log(q);
  // if (q) {
  //   console.log("q esixt");
  //   const exisitinguser = query(
  //     assignedLeadCollection,
  //     where("userId", "==", userId)
  //   );
  //   // await assignedLeadCollection
  //   //   .where("userId", "==", userId)
  //   //   .get();
  //   if (!exisitinguser) {
  //     const documnet = doc(assignedLeadCollection, leadId);
  //     await setDoc(documnet, { userId: userId });
  //   } else {
  //     const documnet = doc(assignedLeadCollection, leadId);
  //     await updateDoc(documnet, { userId: userId });
  //   }
  // } else {
  //   console.log("came here");
  // const documnet = doc(assignedLeadCollection, leadId);
  // await setDoc(documnet, { leadId: leadId, userId: userId });
  // }
};
