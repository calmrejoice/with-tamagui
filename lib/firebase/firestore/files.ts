import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const filesRef = collection(db, "files");

export const subFilesSnap = (uid: string, setFiles: any) => {
  const q = query(filesRef);

  const unsub = onSnapshot(q, (snapshot) => {
    setFiles(snapshot.docs.map((snap) => snap.data()));
    console.log("fetched files");
  });

  return unsub;
};

export const createFile = async (imageId: string, uid: string, url: string) => {
  try {
    const imageData: IFile = {
      id: imageId,
      uid,
      url,
      created: serverTimestamp(),
      modified: serverTimestamp(),
    };
    await setDoc(doc(filesRef, imageId), imageData);
    console.log("file created");
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteFile = async (id: string) => {
  try {
    await deleteDoc(doc(filesRef, id));
    console.log("file deleted");
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateImage = async (file: IFile) => {
  try {
    const newImage: IFile = {
      ...file,
      modified: serverTimestamp(),
    };
    await setDoc(doc(filesRef, file.id), newImage);
    console.log("file created");
  } catch (error: any) {
    console.log(error.message);
  }
};
