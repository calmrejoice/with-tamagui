import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { createFile, deleteFile } from "./firestore/files";
import { uriToBlob } from "../../utils/uriToBlob";

export const uploadFile = async (
  uri: string,
  fileId: string,
  fileType: string,
  uid: string,
  setProgress: any
) => {
  if (!uid) {
    alert("Please login to upload files");
    return;
  }

  try {
    const blobFile = await uriToBlob(uri);

    const storageRef = ref(storage, "files/" + `${uid}/` + fileId);
    const uploadTask = uploadBytesResumable(storageRef, blobFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(parseInt(progress.toFixed(0)));
        console.log(progress, "progress");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          await createFile(fileId, uid, downloadURL);
        });
      }
    );
  } catch (error) {
    alert(error);
  }
};

export const deleteFileFromStorage = async (uid: string, fileId: string) => {
  // Create a reference to the file to delete
  const fileRef = ref(storage, "files/" + `${uid}/` + fileId);

  // Delete the file
  deleteObject(fileRef)
    .then(async () => {
      // File deleted successfully
      // Delete from database
      await deleteFile(fileId);
      console.log("file deleted");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      alert(error.message);
    });
};
