import React, { useContext, createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { subItemsSnap } from "../lib/firebase/firestore/items";
import { subFilesSnap } from "../lib/firebase/firestore/files";

export const UserDataContext = createContext({});

export const UserDataProvider = ({ children }: any) => {
  const [items, setItems] = useState<any>([]);
  const [files, setFiles] = useState<any>([]);
  const { user } = useAuth();
  const uid = user?.uid || "";

  useEffect(() => {
    if (!uid) return;
    const unsubItems = subItemsSnap(uid, setItems);
    const unsubFiles = subFilesSnap(uid, setFiles);
    return () => {
      unsubItems();
      unsubFiles();
    };
  }, [uid]);

  return (
    <UserDataContext.Provider value={{ items, files }}>
      {children}
    </UserDataContext.Provider>
  );
};

interface UserDataProps {
  items: any[];
  files: IFile[];
}

export const useUserData = () => {
  return useContext(UserDataContext) as UserDataProps;
};
