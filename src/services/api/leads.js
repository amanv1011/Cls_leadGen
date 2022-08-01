import {
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  leadsCollection,
  fullDescriptionCollection,
  assignedLeadCollection,
} from "../firebase/collections";

export const getLeadsList = async () => {
  const leadsSnapshot = await getDocs(
    query(leadsCollection, orderBy("leadGeneratedDate", "desc"))
  );
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

export const approvRejectLeads = async (leadsId, leadStatus, reason) => {
  try {
    if (leadStatus === -1) {
      leadsId.forEach(async (lead) => {
        const updateApproveReject = doc(leadsCollection, lead);
        await updateDoc(updateApproveReject, {
          status: leadStatus,
          reason: reason,
        });
      });
    } else {
      leadsId.forEach(async (lead) => {
        const updateApproveReject = doc(leadsCollection, lead);
        await updateDoc(updateApproveReject, { status: leadStatus });
      });
    }
    return { leadsId: leadsId, status: leadStatus };
  } catch (err) {
    return err;
  }
};
let prevOpt = [];
export const assignLead = async (leadId, userId, mutliple) => {
  let flag = false;
  let intersection;
  if (prevOpt.length === 0 && mutliple) {
    prevOpt = userId;
  } else {
    if (userId.length < prevOpt.length) {
      intersection = prevOpt.filter((x) => !userId.includes(x));
      flag = true;
    }
    prevOpt = userId;
  }
  if (mutliple && mutliple === true) {
    const leadsSnapshot = await getDocs(assignedLeadCollection);
    const list = await leadsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    leadId &&
      leadId.forEach(async (ele) => {
        const filt = list?.filter((element) => element.leadId === ele);

        if (filt.length === 0) {
          // await addDoc(assignedLeadCollection, { leadId: leadId, userId: [userId] });
          const newCityRef = doc(assignedLeadCollection, ele);
          await setDoc(newCityRef, {
            leadId: ele,
            userId: userId,
          });
        } else {
          //find for existing user
          if (flag === false) {
            const documnet = doc(assignedLeadCollection, ele);
            await updateDoc(documnet, {
              leadId: ele,
              userId: arrayUnion(...userId),
            });
          }
          if (flag === true) {
            const documnet = doc(assignedLeadCollection, ele);
            await updateDoc(documnet, {
              leadId: ele,
              userId: arrayRemove(...intersection),
            });
            flag = false;
            intersection = [];
          }
        }
      });
    return { leadId: leadId, userId: userId };
  } else {
    const leadsSnapshot = await getDocs(assignedLeadCollection);
    const list = leadsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    leadId &&
      leadId.forEach(async (ele) => {
        const filt = list?.filter((element) => element.leadId === leadId);
        if (filt.length === 0) {
          // await addDoc(assignedLeadCollection, { leadId: leadId, userId: [userId] });
          const newCityRef = doc(assignedLeadCollection, ele);
          await setDoc(newCityRef, {
            leadId: ele,
            userId: userId,
          });
        } else {
          //find for existing user
          const documnet = doc(assignedLeadCollection, ele);
          await updateDoc(documnet, {
            leadId: ele,
            userId: arrayUnion(...userId),
          });
        }
      });
    return { leadId: leadId, userId: userId };
  }
};

export const addNotes = async (leadsId, notes) => {
  leadsId &&
    leadsId.forEach(async (ele) => {
      const leadObject = doc(leadsCollection, ele);
      await updateDoc(leadObject, { notes: arrayUnion(notes) });
    });
  return { leadsId: leadsId, notes: notes };
};

export const updateLeadViewStatus = async (leadsId) => {
  const leadObject = doc(leadsCollection, leadsId);
  await updateDoc(leadObject, { seen: true });
  return { leadsId: leadsId, seen: true };
};

export const getAssignedLeads = async () => {
  try {
    const assignedLeadsSnapshot = await getDocs(assignedLeadCollection);
    const assignedLeadsList = assignedLeadsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return assignedLeadsList;
  } catch (error) {
    return error.message;
  }
};
