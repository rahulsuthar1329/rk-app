import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import path from "./../../path";
import styles from "../../styles/styles";
import * as Screen from "../../Constants/Types";
import { setLogin } from "../../store/slices/AuthSlice";
import showToast from "./../../components/Toast/Toast";
import Google_Logo from "../../assets/Google_Logo.png";
import GenieCart_Logo from "../../assets/GenieCart_Teal.png";
import InputField from "./../../components/InputField/InputField";
import Checkbox_selected from "../../assets/Checkbox_Selected.png";
import Checkbox_Unselected from "../../assets/Checkbox_Unselected.png";

const Login = ({ navigation }) => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();

  // Submit form
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (uniqueId.trim() && password.trim()) {
        const response = await axios.post(`${path}/auth/login`, {
          uniqueId,
          password,
        });
        if (response.status === 200) {
          const { user, token } = response?.data;
          dispatch(setLogin({ user, token }));
          showToast("Login Successfully.");
          setLoading(false);
        }
      } else {
        if (!uniqueId.trim()) {
          setLoading(false);
          showToast("Please enter username or email.");
          return;
        }
        if (!password.trim()) {
          setLoading(false);
          showToast("Please enter password.");
          return;
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        showToast(error.response.data.message);
        setLoading(false);
        return;
      }
      showToast("Internal Server Error!");
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  return (
    <View className="flex-1 px-4 flex justify-center">
      <View className="flex justify-center items-center py-5 space-y-[10]">
        <Image
          source={GenieCart_Logo}
          resizeMode="contain"
          className="py-2 mb-10 h-[40]"
        />
        <View className="flex w-[100%] px-2 flex-col" style={styles.input_gap}>
          <InputField
            type="uniqueId"
            state={uniqueId}
            setState={setUniqueId}
            placeholder="Email or Username"
          />

          <InputField
            type="password"
            state={password}
            setState={setPassword}
            placeholder="Password"
          />
        </View>
        <View className="flex flex-row items-center justify-between p-2 mb-5 w-[95%]">
          <TouchableOpacity
            className="flex flex-row items-center space-x-2"
            onPress={() => setIsRemember(!isRemember)}
          >
            <Image
              source={isRemember ? Checkbox_selected : Checkbox_Unselected}
              resizeMode="contain"
              style={styles.checkbox}
            />
            <Text style={styles.montserrat_medium} className="text-[#349b7e]">
              Remember Me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screen.forgot_password)}
          >
            <Text style={styles.montserrat_medium} className="text-[#349b7e]">
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex justify-center items-center bg-[#349b7e] rounded w-[95%] py-[10]"
          style={styles.button_shadow}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size={20} color={"white"} />
          ) : (
            <Text className="text-white" style={styles.montserrat_medium}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex flex-row pt-2">
          <Text style={styles.montserrat_medium}>Don't have an Account ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screen.register)}
          >
            <Text className="text-[#349b7e]" style={styles.montserrat_medium}>
              Register Now.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-b w-[85%] border-gray-300 py-2 mb-4"></View>
        <TouchableOpacity className="flex flex-row items-center justify-between space-x-2 w-[95%] bg-[#349b7e] py-2 pl-5 rounded">
          <Image
            source={Google_Logo}
            resizeMode="contain"
            style={styles.google_icon}
          />
          <Text className="text-white pr-7" style={styles.montserrat_medium}>
            Login with Google
          </Text>
          <View></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
