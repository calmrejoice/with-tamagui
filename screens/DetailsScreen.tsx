import { View, Text } from "react-native";
import React from "react";
import { Button } from "tamagui";
import { useGlassfy } from "../providers/GlassfyProvider";

const DetailsScreen = ({ navigation }: any) => {
  const { offerings } = useGlassfy();
  console.log(offerings);

  return (
    <View>
      <Text>Details</Text>
      <Button onPress={() => navigation.navigate("Home")}>Go Home</Button>
    </View>
  );
};

export default DetailsScreen;
