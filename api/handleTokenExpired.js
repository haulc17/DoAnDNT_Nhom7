// utils/handleTokenExpired.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const handleTokenExpired = async (navigation) => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");

  Alert.alert("Phiên đăng nhập đã hết hạn", "Vui lòng đăng nhập lại.", [
    {
      text: "OK",
      onPress: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      },
    },
  ]);
};
