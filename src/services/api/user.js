import { addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { usersCollection } from "../firebase/collections";

export const getUsers = async () => {
  const UsersSnapshot = await getDocs(query(usersCollection, orderBy("name")));
  const UsersList = UsersSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return UsersList;
};

export const addUsers = async (userInfo) => {
  const docRef = await addDoc(usersCollection, userInfo);
  return userInfo;
};
