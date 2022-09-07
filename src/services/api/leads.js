import {
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
  setDoc,
  arrayUnion,
  writeBatch,
} from "firebase/firestore";
import {
  leadsCollection,
  fullDescriptionCollection,
  assignedLeadCollection,
  blockedCompaniesListCollection,
} from "../firebase/collections";
import { firestore } from "../firebase/firebaseInit";

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
  const batchArray = [];
  batchArray.push(writeBatch(firestore));
  let operationCounter = 0;
  let batchIndex = 0;

  try {
    leadsId.forEach(async (lead) => {
      const updateApproveReject = doc(leadsCollection, lead);
      if (leadStatus === -1) {
        batchArray[batchIndex].update(updateApproveReject, {
          status: leadStatus,
          reason: reason,
        });
      } else {
        batchArray[batchIndex].update(updateApproveReject, {
          status: leadStatus,
        });
      }

      operationCounter++;
      if (operationCounter === 499) {
        batchArray.push(writeBatch(firestore));
        batchIndex++;
        operationCounter = 0;
      }
    });

    batchArray.forEach(async (batch) => await batch.commit());

    return { leadsId: leadsId, status: leadStatus };
  } catch (err) {
    return err;
  }
};

export const assignLead = async (leadId, userId, mutliple) => {
  const leadsSnapshot = await getDocs(assignedLeadCollection);
  const list = leadsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  if (mutliple === true) {
    /*Multiple assigning here */
    leadId &&
      leadId.forEach(async (ele) => {
        const filt = list?.filter((element) => element.leadId === ele);
        const documnet = doc(assignedLeadCollection, ele);
        if (filt.length) {
          await updateDoc(documnet, {
            leadId: ele,
            userId: arrayUnion(...userId),
          });
        } else {
          await setDoc(documnet, {
            leadId: ele,
            userId: userId,
          });
        }
      });
    return { leadId: leadId, userId: userId };
  } else {
    /*single assigning here */
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
