import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const put = async (table, body) => {
  console.log({ body });

  return await updateDoc(doc(db, table, body.id), {
    ...body,
  })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log({ err });

      return err;
    });
};
