import { FlatList, View, useColorScheme } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Progress,
  Stack,
  Theme,
  YStack,
  Image,
  ScrollView,
  XStack,
  Text,
} from "tamagui";
import { StatusBar } from "expo-status-bar";
import { auth, db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "../providers/UserDataProvider";
import PickImage from "../components/PickImage";
import { useAuth } from "../providers/AuthProvider";
import { deleteFileFromStorage } from "../lib/firebase/storage";

const HomeScreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { items, files } = useUserData();
  const onAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Theme name={colorScheme === "dark" ? "dark" : "light"}>
      <Button onPress={() => navigation.navigate("Details")}>
        Go Detailss
      </Button>

      <Button onPress={onAdd}>Add doc to firebase</Button>
      <Button
        onPress={async () => {
          await signOut(auth);
          AsyncStorage.removeItem("@user");
        }}
      >
        Logout
      </Button>

      <Stack flex={1} ai={`center`} jc={`center`} flexDirection={`column`}>
        {items?.map((item: any, i: number) => (
          <YStack key={i}>
            <Button>{item.first}</Button>
          </YStack>
        ))}
      </Stack>

      <Progress />
      <PickImage />

      <Button
        onPress={() => {
          fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then((response) => response.json())
            .then((json) => console.log(json));
        }}
      >
        Dummy APi
      </Button>

      {/* <ScrollView width={`75%`} flexWrap="wrap" flexDirection="row">
        {files?.map((file, i) => (
          <XStack key={i} flexWrap="wrap">
            <Image source={{ uri: file.url }} width={100} height={100} />
            <Button
              position="absolute"
              onPress={async () =>
                await deleteFileFromStorage(user?.uid, file.id)
              }
            >
              Delete
            </Button>
          </XStack>
        ))}
      </ScrollView> */}
      <FlatList
        data={files}
        keyExtractor={(file) => file.url}
        renderItem={({ item }) => (
          <Stack width={`${100 / 3} %`}>
            <Image source={{ uri: item.url }} height={150} />

            <Button
              position="absolute"
              onPress={async () =>
                await deleteFileFromStorage(user?.uid, item.id)
              }
            >
              Delete
            </Button>
          </Stack>
        )}
        numColumns={3}
        contentContainerStyle={{ gap: 0 }}
        columnWrapperStyle={{ gap: 0 }}
      />

      <YStack f={1} jc="center" ai="center" backgroundColor={"$backgroundSoft"}>
        <StatusBar style="auto" />
      </YStack>
    </Theme>
  );
};

export default HomeScreen;
