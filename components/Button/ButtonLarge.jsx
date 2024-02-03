import { TouchableOpacity, Text } from "react-native";
import React from "react";

const ButtonLarge = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="align-self-stretch bg-[#349b7e] rounded py-[10]"
      style={styles.button_shadow}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text className="text-center text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLarge;
