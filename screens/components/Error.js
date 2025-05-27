import { Alert } from "react-native";

export default function showError(
  title = "Lỗi",
  message = "Đã xảy ra lỗi. Vui lòng thử lại sau."
) {
  Alert.alert(title, message, [{ text: "OK" }]);
}
