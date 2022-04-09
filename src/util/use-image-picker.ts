import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { auth, bucket, db } from "./firebase";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker(initImg = "") {
  const [image, setImage] = useState<string>(initImg);
  let DBImag = "";
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async (teamName: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Fetch the photo with it's local URI
      const file = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const id = auth.currentUser?.uid;
      // Create a ref in Firebase (I'm using my user's ID)
      const ref = bucket.ref().child(`teams-avatar/${teamName}`);

      // Upload Base64 image to Firebase
      const snapshot = await ref.putString(file, "base64");
      if (snapshot.state == "success") {
        // Create a download URL
        DBImag = await snapshot.ref.getDownloadURL();
        setImage(result.uri);
      }
    }
  };

  return {
    pickImage,
    image,
    DBImag,
  };
}
