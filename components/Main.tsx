import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Spinner, Stack } from "tamagui";
import Navigation from "./Navigation";
import SignInScreen from "../screens/SignInScreen";
import { useAuth } from "../providers/AuthProvider";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import BottomTabNavigaton from "./BottomTabNavigaton";

const Main = () => {
  const { isLoading, user, setUser } = useAuth();
  const [request, response, promptAsync] = useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID || "",
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID || "",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      });
    }
  }, [response]);
  if (isLoading) {
    return (
      <Stack flexDirection={`column`} height={`100%`} justifyContent="center">
        <Spinner />
      </Stack>
    );
  }
  if (user) {
    return <BottomTabNavigaton />;
  }
  return <SignInScreen promptAsync={promptAsync} />;
};

export default Main;
