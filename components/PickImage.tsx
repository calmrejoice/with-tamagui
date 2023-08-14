import React, { useState } from "react";
import { Button, Progress, Stack } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../lib/firebase/storage";
import { useAuth } from "../providers/AuthProvider";
import uuid from "react-native-uuid";

const PickImage = ({}: {}) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<any>("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      setImage(image);
      const fileId: any = uuid.v4();
      uploadFile(image, fileId, "image", user?.uid, setProgress);
    }
  };
  return (
    <Stack>
      {image && <Stack></Stack>}
      <Button onPress={pickImage}>Pick Image</Button>
      <Button onPress={() => setImage(null)}>Remove Image</Button>
      <Progress value={progress}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </Stack>
  );
};

export default PickImage;
