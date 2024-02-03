import { Image, Text, View } from "react-native";
import React, { useState } from "react";
import styles from "../../styles/styles";
import InputField from "./../../components/InputField/InputField";
import GenieCart_Logo from "../../assets/GenieCart_Teal.png";

const ForgotPassword = () => {
  const [localOtp, setLocalOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  return (
    <View className="px-6 flex justify-center items-stretch flex-1">
      <View className="flex justify-center items-center">
        <Image
          source={GenieCart_Logo}
          resizeMode="contain"
          className="h-[35] mb-3"
        />
      </View>
      <Text
        style={styles.montserrat_semibold}
        className="text-lg text-gray-600 py-4 text-center"
      >
        Reset your password
      </Text>
      {!otp ? (
        <View>
          <InputField
            type="combination"
            placeholder="Enter your email"
            buttonText={"Submit"}
            state={email}
            setState={setEmail}
          />
        </View>
      ) : (
        <View className="flex" style={styles.input_gap}>
          <InputField type="disabled" state={email} />
          <InputField
            type="combination"
            placeholder="Enter OTP (Check your email)"
            buttonText="Resend"
            state={localOtp}
            setState={setLocalOtp}
          />
          <InputField
            type="password"
            placeholder="Enter new password"
            state={password}
            setState={setPassword}
          />
          <InputField
            placeholder="Confirm new password"
            state={cnfpassword}
            setState={setCnfpassword}
            secureTextEntry={true}
          />
          <InputField type="button" placeholder="Create new password" />
        </View>
      )}
    </View>
  );
};

export default ForgotPassword;
