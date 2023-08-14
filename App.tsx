import { useFonts } from "expo-font";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import { maybeCompleteAuthSession } from "expo-web-browser";

import { UserDataProvider } from "./providers/UserDataProvider";
import { AuthProvider } from "./providers/AuthProvider";
import Main from "./components/Main";
import { GlassfyProvider } from "./providers/GlassfyProvider";

maybeCompleteAuthSession();

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <UserDataProvider>
          <GlassfyProvider>
            <Main />
          </GlassfyProvider>
        </UserDataProvider>
      </AuthProvider>
    </TamaguiProvider>
  );
}
