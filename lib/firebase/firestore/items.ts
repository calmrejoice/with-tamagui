import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const itemsRef = collection(db, "items");

export const subItemsSnap = (uid: string, setItems: any) => {
  const q = query(itemsRef);

  const unsub = onSnapshot(q, (snapshot) => {
    setItems(snapshot.docs.map((snap) => snap.data()));
    console.log("fetched items");
  });

  return unsub;
};
