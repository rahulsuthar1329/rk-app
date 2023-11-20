import { ToastAndroid } from "react-native";

export default showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
