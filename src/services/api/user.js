import { getDocs, orderBy, query } from "firebase/firestore";
import { usersCollection } from "../firebase/collections";

export const getUsers = async () => {
  const UsersSnapshot = await getDocs(query(usersCollection, orderBy("name")));
  const UsersList = UsersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return UsersList;
};
