import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const deleteApi = async (table, id) => {
  await deleteDoc(doc(db, table, id));
};
