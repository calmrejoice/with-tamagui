import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useUserData } from "../providers/UserDataProvider";
import { AntDesign } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigaton = () => {
  const { files } = useUserData();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#e91e63",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return (
                <AntDesign
                  name="home"
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
              );
            },
            tabBarBadge: files?.length || undefined,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigaton;
