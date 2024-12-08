import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const post = async (table, body) => {
  console.log({ table, body });

  return await addDoc(collection(db, table), body)
    .then((res) => {
      console.log({ res });
      return true;
    })
    .catch((err) => {
      console.log({ err });

      return err;
    });
};
