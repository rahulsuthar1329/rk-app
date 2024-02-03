import { TouchableOpacity, Text } from "react-native";
import React from "react";
import styles from "../../styles/styles";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#349b7e] rounded py-[10] w-20"
      activeOpacity={0.8}
      style={styles.button_shadow}
      onPress={onPress}
    >
      <Text className={`text-center text-white`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
