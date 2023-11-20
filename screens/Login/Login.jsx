import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Checkbox_Unselected from "../../assets/Checkbox_Unselected.png";
import Checkbox_selected from "../../assets/Checkbox_Selected.png";
import Google_Logo from "../../assets/Google_Logo.png";
import GenieCart_Logo from "../../assets/GenieCart_Teal.png";

const Login = ({ navigation }) => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  return (
    <View className="flex-1 px-4 flex justify-center">
      <View
        className="flex justify-center items-center py-5"
        style={{ gap: 10 }}
      >
        <Image
          source={GenieCart_Logo}
          resizeMode="contain"
          style={{ height: 40 }}
          className="py-2 mb-10"
        />
        <View className="flex w-[100%] px-2" style={{ gap: 15 }}>
          <TextInput
            placeholder="Email or Username"
            value={uniqueId}
            onChangeText={(e) => setUniqueId(e)}
            className="border border-[#349b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
            className="border border-[#348b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
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
              style={{ height: 14, width: "auto", aspectRatio: 1 }}
            />
            <Text
              style={{ fontFamily: "Montserrat_Medium" }}
              className="text-[#349b7e]"
            >
              Remember Me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{ fontFamily: "Montserrat_Medium" }}
              className="text-[#349b7e]"
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="flex justify-center items-center bg-[#349b7e] rounded w-[95%]"
          style={{ elevation: 5, paddingVertical: 10 }}
        >
          {loading ? (
            <ActivityIndicator size={20} color={"white"} />
          ) : (
            <Text
              className="text-white"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex flex-row pt-2">
          <Text style={{ fontFamily: "Montserrat_Medium" }}>
            Don't have an Account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              className="text-[#349b7e]"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Register Now.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-b w-[85%] border-gray-300 py-2 mb-4"></View>
        <TouchableOpacity
          className="flex flex-row items-center justify-between space-x-2 w-[95%] bg-[#349b7e] py-2 pl-5 rounded"
          style={{ elevation: 5 }}
        >
          <Image
            source={Google_Logo}
            resizeMode="contain"
            style={{ height: 25, width: "auto", aspectRatio: 1 }}
          />
          <Text
            className="text-white pr-7"
            style={{ fontFamily: "Montserrat_Medium" }}
          >
            Login with Google
          </Text>
          <View></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
