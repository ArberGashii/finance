import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const get = async (table, field, condition) => {
  // Create an empty array to store constraints
  const constraints = [];

  // If field and condition are provided, push a where clause into the constraints
  if (field && condition) {
    const [operator, value] = condition;
    constraints.push(where(field, operator, value));
  }

  // Create a reference to the collection
  const collectionRef = collection(db, table);

  // Create a query with the constraints
  const q = query(collectionRef, ...constraints);

  try {
    // Fetch the documents using getDocs
    const snapshot = await getDocs(q);

    // Map over the documents and extract the data
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // Return the data
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
