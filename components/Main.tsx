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
    iosClientId:
      "507961954303-ea0c1iqpvsf0k7cduqga984jnkc9p8dn.apps.googleusercontent.com",
    androidClientId:
      "507961954303-tn6p2ql3k8dmv6810bh26hf8n97e0hok.apps.googleusercontent.com",
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
