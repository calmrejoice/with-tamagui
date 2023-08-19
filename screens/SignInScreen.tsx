import { useEffect, useState } from "react";
import { Button, Text, YStack } from "tamagui";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignInScreen = ({ promptAsync }: { promptAsync: any }) => {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const loginWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { identityToken } = credential;
      console.log(credential);

      if (identityToken) {
        console.log("identityToken", identityToken);

        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        const credential = provider.credential({
          idToken: identityToken,
        });

        try {
          const { user } = await signInWithCredential(auth, credential);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
        // await signInWithCredential(auth, credential);
      }

      // signed in
    } catch (e: any) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return (
    <YStack justifyContent="center" height={`100%`}>
      <Text>SignInScreen</Text>
      <Button
        onPress={() => {
          promptAsync();
        }}
      >
        Sign in with Google
      </Button>
      {appleAuthAvailable && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{
            width: 200,
            height: 44,
          }}
          onPress={loginWithApple}
        />
      )}
    </YStack>
  );
};

export default SignInScreen;
